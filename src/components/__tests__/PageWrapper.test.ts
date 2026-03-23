import { describe, it, expect } from "vitest";
import PageWrapper from "../PageWrapper.astro";
import { renderComponent } from "./test-utils";

describe("PageWrapper", () => {
  it("renders a main element with id page-wrapper", async () => {
    const $ = await renderComponent(PageWrapper, {}, { default: "<div>Content</div>" });
    expect($("#page-wrapper").length).toBe(1);
    expect($("main").length).toBe(1);
  });

  it("renders slot content", async () => {
    const $ = await renderComponent(PageWrapper, {}, { default: "<p>Page body</p>" });
    expect($("main").text()).toContain("Page body");
  });

  it("renders back to top button (desktop)", async () => {
    const $ = await renderComponent(PageWrapper, {}, { default: "Content" });
    expect($("[data-back-to-top]").length).toBe(1);
  });

  it("renders mobile back to top button", async () => {
    const $ = await renderComponent(PageWrapper, {}, { default: "Content" });
    expect($("[data-back-to-top-mobile]").length).toBe(1);
  });

  it("renders title when provided", async () => {
    const $ = await renderComponent(
      PageWrapper,
      { title: "My Page" },
      { default: "Content" },
    );
    expect($("main").text()).toContain("My Page");
  });

  it("renders description when provided", async () => {
    const $ = await renderComponent(
      PageWrapper,
      { description: "A description" },
      { default: "Content" },
    );
    expect($("main").text()).toContain("A description");
  });

  it("renders Back to Top text", async () => {
    const $ = await renderComponent(PageWrapper, {}, { default: "Content" });
    expect($("main").text()).toContain("Back to Top");
  });

  it("has transition classes", async () => {
    const $ = await renderComponent(PageWrapper, {}, { default: "Content" });
    expect($("main").hasClass("transition-all")).toBe(true);
  });
});
