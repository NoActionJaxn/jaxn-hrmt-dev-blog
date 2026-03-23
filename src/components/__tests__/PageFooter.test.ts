import { describe, it, expect } from "vitest";
import PageFooter from "../PageFooter.astro";
import { renderComponent } from "./test-utils";

describe("PageFooter", () => {
  it("renders with id page-footer", async () => {
    const $ = await renderComponent(PageFooter);
    expect($("#page-footer").length).toBe(1);
  });

  it("renders branding text", async () => {
    const $ = await renderComponent(PageFooter);
    expect($("#page-footer").text()).toContain("jaxn hrmt");
  });

  it("renders follow me text", async () => {
    const $ = await renderComponent(PageFooter);
    expect($("#page-footer").text()).toContain("Follow me");
  });

  it("renders social links", async () => {
    const $ = await renderComponent(PageFooter);
    const links = $("#page-footer a");
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it("social links open in new tab", async () => {
    const $ = await renderComponent(PageFooter);
    const links = $("#page-footer a");
    links.each((_i, el) => {
      expect($(el).attr("target")).toBe("_blank");
    });
  });

  it("social links have sr-only text for accessibility", async () => {
    const $ = await renderComponent(PageFooter);
    const srTexts = $("#page-footer .sr-only");
    expect(srTexts.length).toBeGreaterThanOrEqual(2);
  });

  it("renders GitHub link", async () => {
    const $ = await renderComponent(PageFooter);
    const github = $('a[href*="github.com"]');
    expect(github.length).toBe(1);
  });

  it("renders LinkedIn link", async () => {
    const $ = await renderComponent(PageFooter);
    const linkedin = $('a[href*="linkedin.com"]');
    expect(linkedin.length).toBe(1);
  });
});
