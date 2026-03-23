import { describe, it, expect } from "vitest";
import PageHeader from "../PageHeader.astro";
import { renderComponent } from "./test-utils";

describe("PageHeader", () => {
  it("renders a header element", async () => {
    const $ = await renderComponent(PageHeader);
    expect($("header").length).toBe(1);
  });

  it("has id page-header", async () => {
    const $ = await renderComponent(PageHeader);
    expect($("#page-header").length).toBe(1);
  });

  it("is fixed positioned", async () => {
    const $ = await renderComponent(PageHeader);
    expect($("header").hasClass("fixed")).toBe(true);
  });

  it("has high z-index", async () => {
    const $ = await renderComponent(PageHeader);
    expect($("header").hasClass("z-40")).toBe(true);
  });

  it("contains the Logo component (link to /)", async () => {
    const $ = await renderComponent(PageHeader);
    expect($('a[href="/"]').length).toBe(1);
  });

  it("contains the MenuButton", async () => {
    const $ = await renderComponent(PageHeader);
    expect($("[data-menu-toggle]").length).toBe(1);
  });

  it("uses flex layout", async () => {
    const $ = await renderComponent(PageHeader);
    expect($("header").hasClass("flex")).toBe(true);
    expect($("header").hasClass("items-center")).toBe(true);
    expect($("header").hasClass("justify-between")).toBe(true);
  });
});
