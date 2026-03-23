import { describe, it, expect } from "vitest";
import MenuItem from "../MenuItem.astro";
import { renderComponent } from "./test-utils";

describe("MenuItem", () => {
  const baseProps = { index: 1, label: "About", href: "/about" };

  it("renders a list item", async () => {
    const $ = await renderComponent(MenuItem, baseProps);
    expect($("li").length).toBe(1);
  });

  it("renders a link with the correct href", async () => {
    const $ = await renderComponent(MenuItem, baseProps);
    const link = $("a");
    expect(link.attr("href")).toBe("/about");
  });

  it("renders the label", async () => {
    const $ = await renderComponent(MenuItem, baseProps);
    expect($("a").text()).toContain("About");
  });

  it("renders zero-padded index", async () => {
    const $ = await renderComponent(MenuItem, baseProps);
    expect($("a").text()).toContain("01");
  });

  it("pads single digit to two digits", async () => {
    const $ = await renderComponent(MenuItem, { index: 5, label: "Contact", href: "/contact" });
    expect($("a").text()).toContain("05");
  });

  it("handles two digit index", async () => {
    const $ = await renderComponent(MenuItem, { index: 12, label: "Page", href: "/page" });
    expect($("a").text()).toContain("12");
  });

  it("applies group hover classes for label", async () => {
    const $ = await renderComponent(MenuItem, baseProps);
    const label = $("a span:last-child");
    expect(label.hasClass("group-hover:text-success-500")).toBe(true);
  });
});
