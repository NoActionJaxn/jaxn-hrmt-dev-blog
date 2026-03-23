# Jaxn's Dev Blog

A personal developer blog built with Astro and TinaCMS.

## Stack

- [Astro](https://astro.build) — Static site framework with SPA navigation via ClientRouter
- [TinaCMS](https://tina.io) — Git-backed headless CMS
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [TypeScript](https://www.typescriptlang.org)
- [GSAP](https://gsap.com) — Animations
- [nanostores](https://github.com/nanostores/nanostores) — Client-side state
- [marked](https://marked.js.org) — Markdown rendering
- [ESLint](https://eslint.org) — Linting (with eslint-plugin-astro + typescript-eslint)
- [Husky](https://typicode.github.io/husky) — Git hooks

## Getting Started

**Prerequisites:** Node.js >= 22.12.0

```sh
# Clone the repo
git clone https://github.com/NoActionJaxn/jaxn-hrmt-dev-blog.git
cd jaxn-hrmt-dev-blog

# Install dependencies
npm install

# Copy the example env file and fill in your TinaCMS keys
cp .env.example .env

# Start the dev server (Astro + TinaCMS)
npm run dev
```

The site runs at `http://localhost:4321` and the TinaCMS admin at `http://localhost:4321/admin`.

## Commands

| Command            | Action                               |
| :----------------- | :----------------------------------- |
| `npm run dev`      | Start dev server with TinaCMS        |
| `npm run build`    | Build production site to `./dist/`   |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Lint the project with ESLint         |
| `npm run lint:fix` | Lint and auto-fix issues             |

## Project Structure

```
src/
├── components/    # Reusable Astro components
├── content/       # CMS-managed content (works posts)
├── layouts/       # Page layouts
├── pages/         # File-based routing
├── styles/        # Global CSS
└── util/          # Utility functions
tina/
├── config.ts      # TinaCMS collection & field config
└── __generated__/ # Auto-generated TinaCMS types & client
public/
├── admin/         # TinaCMS admin dashboard
└── tina/          # CMS media uploads
```
