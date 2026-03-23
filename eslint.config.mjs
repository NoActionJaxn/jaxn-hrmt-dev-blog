import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ["**/*.astro", "**/*.astro/*.ts"],
    rules: {
      "no-undef": "off",
    },
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".astro/",
      "tina/__generated__/",
      "public/admin/",
    ],
  },
];
