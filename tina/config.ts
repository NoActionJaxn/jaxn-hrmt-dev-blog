import { defineConfig } from "tinacms";

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
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
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
            form,
          }: {
            values: Record<string, any>;
            cms: any;
            form: any;
          }) => {
            const now = new Date().toISOString();
            const createdAt = values.createdAt || now;

            let slug = values.slug ? values.slug.toLowerCase() : "";
            if (!slug && values.title) {
              const baseSlug = slugify(values.title);
              try {
                const existing = await cms.api.tina.request(
                  `query { worksConnection { edges { node { slug } } } }`,
                  { variables: {} }
                );
                const slugs: string[] =
                  existing?.data?.worksConnection?.edges
                    ?.map((e: any) => e?.node?.slug)
                    ?.filter(Boolean) ?? [];
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
                ...(values.metadata || {}),
                description: values.description || values.metadata?.description || "",
                keywords: values.tags || values.metadata?.keywords || [],
                image: values.thumbnail || values.metadata?.image || "",
                author: values.metadata?.author || "Jackson Hermitt",
                type: values.metadata?.type || "article",
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
            ],
          },
        ],
      },
    ],
  },
});
