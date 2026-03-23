import { experimental_AstroContainer as AstroContainer } from "astro/container";
import * as cheerio from "cheerio";

export async function renderComponent(
  Component: any,
  props: Record<string, any> = {},
  slots?: Record<string, string>,
) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Component, { props, slots });
  return cheerio.load(html);
}
