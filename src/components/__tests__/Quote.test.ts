import { describe, it, expect } from "vitest";
import Quote from "../Quote.astro";
import { renderComponent } from "./test-utils";

describe("Quote", () => {
  it("renders slot content", async () => {
    const $ = await renderComponent(Quote, {}, { default: "To be or not to be" });
    expect($("div").text()).toContain("To be or not to be");
  });

  it("renders quote icon", async () => {
    const $ = await renderComponent(Quote, {}, { default: "Quote" });
    expect($("i.fa-quote-left").length).toBe(1);
  });

  it("icon is aria-hidden", async () => {
    const $ = await renderComponent(Quote, {}, { default: "Quote" });
    expect($("i.fa-quote-left").attr("aria-hidden")).toBe("true");
  });

  it("applies accent styling to content wrapper", async () => {
    const $ = await renderComponent(Quote, {}, { default: "Quote text" });
    // The Accent component renders with font-accent class
    const accentEl = $(".font-accent");
    expect(accentEl.length).toBeGreaterThanOrEqual(1);
  });

  it("has padding classes on container", async () => {
    const $ = await renderComponent(Quote, {}, { default: "Quote" });
    const container = $("div").first();
    expect(container.hasClass("px-8")).toBe(true);
    expect(container.hasClass("py-16")).toBe(true);
  });
});
