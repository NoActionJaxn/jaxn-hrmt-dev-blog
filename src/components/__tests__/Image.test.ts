import { describe, it, expect } from "vitest";
import Image from "../Image.astro";
import { renderComponent } from "./test-utils";

describe("Image", () => {
  it("renders placeholder when no src is provided", async () => {
    const $ = await renderComponent(Image);
    const placeholder = $('[role="img"]');
    expect(placeholder.length).toBe(1);
    expect(placeholder.attr("aria-label")).toBe("Placeholder image");
  });

  it("renders placeholder with custom alt text", async () => {
    const $ = await renderComponent(Image, { alt: "Custom alt" });
    const placeholder = $('[role="img"]');
    expect(placeholder.attr("aria-label")).toBe("Custom alt");
  });

  it("applies custom class to placeholder", async () => {
    const $ = await renderComponent(Image, { class: "my-img" });
    const placeholder = $('[role="img"]');
    expect(placeholder.hasClass("my-img")).toBe(true);
  });

  it("renders placeholder icon", async () => {
    const $ = await renderComponent(Image);
    expect($('[role="img"] i.fa-image').length).toBe(1);
  });
});
