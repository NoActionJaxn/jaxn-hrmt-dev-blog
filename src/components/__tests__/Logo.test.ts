import { describe, it, expect } from "vitest";
import Logo from "../Logo.astro";
import { renderComponent } from "./test-utils";

describe("Logo", () => {
  it("renders a link to homepage", async () => {
    const $ = await renderComponent(Logo);
    const link = $('a[href="/"]');
    expect(link.length).toBe(1);
  });

  it("renders the short title text", async () => {
    const $ = await renderComponent(Logo);
    const span = $("[data-short]");
    expect(span.length).toBe(1);
    expect(span.attr("data-short")).toBe("jaxn hrmt");
  });

  it("stores full title in data attribute", async () => {
    const $ = await renderComponent(Logo);
    const span = $("[data-full]");
    expect(span.attr("data-full")).toBe("jackson hermitt");
  });

  it("has aria-label with full title", async () => {
    const $ = await renderComponent(Logo);
    const div = $("[aria-label]");
    expect(div.attr("aria-label")).toBe("jackson hermitt");
  });

  it("marks decorative span with aria-hidden", async () => {
    const $ = await renderComponent(Logo);
    const span = $("[data-text]");
    expect(span.attr("aria-hidden")).toBe("true");
  });

  it("applies accent font class", async () => {
    const $ = await renderComponent(Logo);
    expect($("[data-text]").hasClass("font-accent")).toBe(true);
    expect($("[data-text]").hasClass("text-accent-500")).toBe(true);
  });
});
