import { defineConfig } from "tinacms";

interface RichTextNode {
  text?: string;
  children?: RichTextNode[];
}

function extractText(node: RichTextNode | string | null | undefined): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.text) return node.text;
  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join("");
  }
  return "";
}

function calculateReadTime(body: RichTextNode | string | null | undefined): number {
  const text = extractText(body);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  server: {
    allowedOrigins: ['private'],
  },
  media: {
    tina: {
      mediaRoot: "tina",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "works",
        label: "Works",
        path: "src/content/works",
        defaultItem: () => ({
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isUpdated: false,
          metadata: {
            author: "Jackson Hermitt",
            type: "article",
          },
        }),
        ui: {
          beforeSubmit: async ({
            values,
            cms,
          }: {
            values: Record<string, unknown>;
            cms: { api: { tina: { request: (query: string, options: { variables: Record<string, unknown> }) => Promise<Record<string, unknown>> } } };
          }) => {
            const vals = values as {
              slug?: string;
              title?: string;
              createdAt?: string;
              description?: string;
              tags?: string[];
              thumbnail?: string;
              body?: RichTextNode;
              metadata?: {
                description?: string;
                keywords?: string[];
                image?: string;
                author?: string;
                type?: string;
              };
            };
            const now = new Date().toISOString();
            const createdAt = vals.createdAt || now;

            let slug = typeof vals.slug === "string" ? vals.slug.toLowerCase() : "";
            if (!slug && vals.title) {
              const baseSlug = slugify(vals.title);
              try {
                const existing = await cms.api.tina.request(
                  `query { worksConnection { edges { node { slug } } } }`,
                  { variables: {} }
                );
                const data = existing?.data as { worksConnection?: { edges?: { node?: { slug?: string } }[] } } | undefined;
                const slugs: string[] =
                  data?.worksConnection?.edges
                    ?.map((e) => e?.node?.slug)
                    ?.filter((s): s is string => Boolean(s)) ?? [];
                slug = baseSlug;
                let counter = 1;
                while (slugs.includes(slug)) {
                  slug = `${baseSlug}-${counter}`;
                  counter++;
                }
              } catch {
                slug = baseSlug;
              }
            }

            return {
              ...values,
              slug,
              createdAt,
              updatedAt: now,
              isUpdated: createdAt !== now,
              metadata: {
                ...(vals.metadata || {}),
                description: vals.description || vals.metadata?.description || "",
                keywords: vals.tags || vals.metadata?.keywords || [],
                image: vals.thumbnail || vals.metadata?.image || "",
                author: vals.metadata?.author || "Jackson Hermitt",
                type: vals.metadata?.type || "article",
                readTime: calculateReadTime(vals.body),
              },
            };
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description: "Auto-generated from title. Must be unique.",
          },
          {
            type: "datetime",
            name: "createdAt",
            label: "Created At",
          },
          {
            type: "datetime",
            name: "updatedAt",
            label: "Updated At",
          },
          {
            type: "boolean",
            name: "isUpdated",
            label: "Is Updated",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "object",
            name: "metadata",
            label: "Metadata",
            fields: [
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "author",
                label: "Author",
              },
              {
                type: "string",
                name: "keywords",
                label: "Keywords",
                list: true,
              },
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "type",
                label: "Type",
                options: ["website", "article"],
                ui: {
                  defaultValue: "article",
                },
              },
              {
                type: "number",
                name: "readTime",
                label: "Read Time (min)",
                description: "Auto-calculated on save from body content.",
                ui: {
                  component: () => null,
                },
              },
            ],
          },
        ],
      },
    ],
  },
});
