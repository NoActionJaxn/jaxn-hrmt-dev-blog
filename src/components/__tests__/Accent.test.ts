import { describe, it, expect } from "vitest";
import Accent from "../Accent.astro";
import { renderComponent } from "./test-utils";

describe("Accent", () => {
  it("renders with default props", async () => {
    const $ = await renderComponent(Accent, {}, { default: "Hello" });
    const el = $("p");
    expect(el.length).toBe(1);
    expect(el.text().trim()).toBe("Hello");
    expect(el.hasClass("font-accent")).toBe(true);
    expect(el.hasClass("text-accent-500")).toBe(true);
  });

  it("applies default size class (base = text-2xl)", async () => {
    const $ = await renderComponent(Accent, {}, { default: "Test" });
    expect($("p").hasClass("text-2xl")).toBe(true);
  });

  it("applies xs size class", async () => {
    const $ = await renderComponent(Accent, { size: "xs" }, { default: "Test" });
    expect($("p").hasClass("text-lg")).toBe(true);
  });

  it("applies sm size class", async () => {
    const $ = await renderComponent(Accent, { size: "sm" }, { default: "Test" });
    expect($("p").hasClass("text-xl")).toBe(true);
  });

  it("applies lg size class", async () => {
    const $ = await renderComponent(Accent, { size: "lg" }, { default: "Test" });
    expect($("p").hasClass("text-3xl")).toBe(true);
  });

  it("applies xl size class", async () => {
    const $ = await renderComponent(Accent, { size: "xl" }, { default: "Test" });
    expect($("p").hasClass("text-4xl")).toBe(true);
  });

  it("applies 2xl size class", async () => {
    const $ = await renderComponent(Accent, { size: "2xl" }, { default: "Test" });
    expect($("p").hasClass("text-5xl")).toBe(true);
  });

  it("renders with custom tag via as prop", async () => {
    const $ = await renderComponent(Accent, { as: "span" }, { default: "Span" });
    expect($("span").length).toBe(1);
    expect($("span").text().trim()).toBe("Span");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Accent, { class: "my-custom" }, { default: "Test" });
    expect($("p").hasClass("my-custom")).toBe(true);
    expect($("p").hasClass("font-accent")).toBe(true);
  });
});
