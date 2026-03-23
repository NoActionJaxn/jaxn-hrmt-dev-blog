import { describe, it, expect } from "vitest";
import Text from "../Text.astro";
import { renderComponent } from "./test-utils";

describe("Text", () => {
  it("renders a span by default", async () => {
    const $ = await renderComponent(Text, {}, { default: "Hello world" });
    expect($("span").length).toBeGreaterThanOrEqual(1);
    expect($("span").first().text().trim()).toBe("Hello world");
  });

  it("applies base classes", async () => {
    const $ = await renderComponent(Text, {}, { default: "Text" });
    const el = $("span").first();
    expect(el.hasClass("font-sans")).toBe(true);
    expect(el.hasClass("text-neutral-700")).toBe(true);
  });

  it("applies default size (base = text-base)", async () => {
    const $ = await renderComponent(Text, {}, { default: "Text" });
    expect($("span").first().hasClass("text-base")).toBe(true);
  });

  it("applies xs size", async () => {
    const $ = await renderComponent(Text, { size: "xs" }, { default: "Text" });
    expect($("span").first().hasClass("text-xs")).toBe(true);
  });

  it("applies sm size", async () => {
    const $ = await renderComponent(Text, { size: "sm" }, { default: "Text" });
    expect($("span").first().hasClass("text-sm")).toBe(true);
  });

  it("applies lg size", async () => {
    const $ = await renderComponent(Text, { size: "lg" }, { default: "Text" });
    expect($("span").first().hasClass("text-lg")).toBe(true);
  });

  it("applies xl size", async () => {
    const $ = await renderComponent(Text, { size: "xl" }, { default: "Text" });
    expect($("span").first().hasClass("text-xl")).toBe(true);
  });

  it("renders with custom tag", async () => {
    const $ = await renderComponent(Text, { as: "p" }, { default: "Paragraph" });
    expect($("p").length).toBe(1);
    expect($("p").text().trim()).toBe("Paragraph");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Text, { class: "extra" }, { default: "Text" });
    expect($("span").first().hasClass("extra")).toBe(true);
    expect($("span").first().hasClass("font-sans")).toBe(true);
  });
});
