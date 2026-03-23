import { describe, it, expect } from "vitest";
import Button from "../Button.astro";
import { renderComponent } from "./test-utils";

describe("Button", () => {
  it("renders a button element by default", async () => {
    const $ = await renderComponent(Button, {}, { default: "Click me" });
    const btn = $("button");
    expect(btn.length).toBe(1);
    expect(btn.text()).toBe("Click me");
    expect(btn.attr("type")).toBe("button");
  });

  it("applies default variant classes", async () => {
    const $ = await renderComponent(Button, {}, { default: "Click" });
    const btn = $("button");
    expect(btn.hasClass("bg-neutral-800")).toBe(true);
    expect(btn.hasClass("text-neutral-100")).toBe(true);
  });

  it("applies outline variant classes", async () => {
    const $ = await renderComponent(Button, { variant: "outline" }, { default: "Click" });
    const btn = $("button");
    expect(btn.hasClass("border-2")).toBe(true);
    expect(btn.hasClass("border-neutral-800")).toBe(true);
    expect(btn.hasClass("bg-transparent")).toBe(true);
  });

  it("applies ghost variant classes", async () => {
    const $ = await renderComponent(Button, { variant: "ghost" }, { default: "Click" });
    const btn = $("button");
    expect(btn.hasClass("bg-transparent")).toBe(true);
    expect(btn.hasClass("text-neutral-700")).toBe(true);
  });

  it("applies sm size classes", async () => {
    const $ = await renderComponent(Button, { size: "sm" }, { default: "Click" });
    expect($("button").hasClass("text-sm")).toBe(true);
  });

  it("applies lg size classes", async () => {
    const $ = await renderComponent(Button, { size: "lg" }, { default: "Click" });
    expect($("button").hasClass("text-lg")).toBe(true);
  });

  it("applies square class", async () => {
    const $ = await renderComponent(Button, { square: true }, { default: "X" });
    expect($("button").hasClass("aspect-square")).toBe(true);
  });

  it("applies round class", async () => {
    const $ = await renderComponent(Button, { round: true }, { default: "O" });
    expect($("button").hasClass("rounded-full")).toBe(true);
  });

  it("renders as custom tag", async () => {
    const $ = await renderComponent(Button, { as: "a", href: "/test" }, { default: "Link" });
    const el = $("a");
    expect(el.length).toBe(1);
    expect(el.attr("href")).toBe("/test");
  });

  it("renders asChild with data attribute", async () => {
    const $ = await renderComponent(
      Button,
      { asChild: true },
      { default: '<a href="/link">Go</a>' },
    );
    const wrapper = $("[data-button-as-child]");
    expect(wrapper.length).toBe(1);
    expect(wrapper.css("display")).toBe("contents");
  });

  it("includes base classes", async () => {
    const $ = await renderComponent(Button, {}, { default: "Click" });
    const btn = $("button");
    expect(btn.hasClass("inline-flex")).toBe(true);
    expect(btn.hasClass("items-center")).toBe(true);
    expect(btn.hasClass("cursor-pointer")).toBe(true);
  });
});
