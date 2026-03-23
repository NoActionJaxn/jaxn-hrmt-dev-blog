import { describe, it, expect } from "vitest";
import Tag from "../Tag.astro";
import { renderComponent } from "./test-utils";

describe("Tag", () => {
  it("renders a span element by default", async () => {
    const $ = await renderComponent(Tag, {}, { default: "Astro" });
    expect($("span").length).toBeGreaterThanOrEqual(1);
    expect($("span").first().text()).toBe("Astro");
  });

  it("applies base classes", async () => {
    const $ = await renderComponent(Tag, {}, { default: "Tag" });
    const el = $("span").first();
    expect(el.hasClass("font-accent")).toBe(true);
    expect(el.hasClass("uppercase")).toBe(true);
    expect(el.hasClass("bg-neutral-800")).toBe(true);
    expect(el.hasClass("text-neutral-100")).toBe(true);
  });

  it("applies default size (base = text-sm)", async () => {
    const $ = await renderComponent(Tag, {}, { default: "Tag" });
    expect($("span").first().hasClass("text-sm")).toBe(true);
  });

  it("applies sm size", async () => {
    const $ = await renderComponent(Tag, { size: "sm" }, { default: "Tag" });
    expect($("span").first().hasClass("text-xs")).toBe(true);
  });

  it("applies lg size", async () => {
    const $ = await renderComponent(Tag, { size: "lg" }, { default: "Tag" });
    expect($("span").first().hasClass("text-base")).toBe(true);
  });

  it("renders with custom tag", async () => {
    const $ = await renderComponent(Tag, { as: "div" }, { default: "Tag" });
    expect($("div").length).toBeGreaterThanOrEqual(1);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Tag, { class: "custom-tag" }, { default: "Tag" });
    expect($("span").first().hasClass("custom-tag")).toBe(true);
  });
});
