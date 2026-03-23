import { describe, it, expect } from "vitest";
import FadeContainer from "../FadeContainer.astro";
import { renderComponent } from "./test-utils";

describe("FadeContainer", () => {
  it("renders with data-fade-container attribute", async () => {
    const $ = await renderComponent(FadeContainer, {}, { default: "<p>Content</p>" });
    expect($("[data-fade-container]").length).toBe(1);
  });

  it("renders slot content", async () => {
    const $ = await renderComponent(FadeContainer, {}, { default: "<p>Hello</p>" });
    expect($("[data-fade-container]").html()).toContain("<p>Hello</p>");
  });

  it("starts with opacity 0", async () => {
    const $ = await renderComponent(FadeContainer, {}, { default: "<div>child</div>" });
    expect($("[data-fade-container]").attr("style")).toContain("opacity: 0");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(FadeContainer, { class: "my-fade" }, { default: "<div>child</div>" });
    expect($("[data-fade-container]").hasClass("my-fade")).toBe(true);
  });
});
