import { describe, it, expect } from "vitest";
import PageMenu from "../PageMenu.astro";
import { renderComponent } from "./test-utils";

describe("PageMenu", () => {
  it("renders with id page-menu", async () => {
    const $ = await renderComponent(PageMenu);
    expect($("#page-menu").length).toBe(1);
  });

  it("has aria-label", async () => {
    const $ = await renderComponent(PageMenu);
    expect($("#page-menu").attr("aria-label")).toBe("Main menu");
  });

  it("starts translated off-screen", async () => {
    const $ = await renderComponent(PageMenu);
    expect($("#page-menu").hasClass("translate-x-full")).toBe(true);
  });

  it("is fixed positioned", async () => {
    const $ = await renderComponent(PageMenu);
    expect($("#page-menu").hasClass("fixed")).toBe(true);
  });

  it("renders navigation items", async () => {
    const $ = await renderComponent(PageMenu);
    const navLinks = $("nav a");
    expect(navLinks.length).toBeGreaterThanOrEqual(4);
  });

  it("renders Content heading", async () => {
    const $ = await renderComponent(PageMenu);
    expect($("#page-menu").text()).toContain("Content");
  });

  it("renders Follow Me text", async () => {
    const $ = await renderComponent(PageMenu);
    expect($("#page-menu").text()).toContain("Follow Me");
  });

  it("renders navigation links from constants", async () => {
    const $ = await renderComponent(PageMenu);
    expect($('a[href="/"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="/about"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="/works"]').length).toBeGreaterThanOrEqual(1);
    expect($('a[href="/contact"]').length).toBeGreaterThanOrEqual(1);
  });

  it("renders social links", async () => {
    const $ = await renderComponent(PageMenu);
    const socialLinks = $('a[target="_blank"]');
    expect(socialLinks.length).toBeGreaterThanOrEqual(2);
  });
});
