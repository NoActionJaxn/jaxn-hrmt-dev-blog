import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import * as cheerio from "cheerio";

export async function renderComponent(
  Component: AstroComponentFactory,
  props: Record<string, unknown> = {},
  slots?: Record<string, string>,
) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Component, { props, slots });
  return cheerio.load(html);
}
