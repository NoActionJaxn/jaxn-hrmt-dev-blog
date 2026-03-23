import { describe, it, expect } from "vitest";
import PostInfo from "../PostInfo.astro";
import { renderComponent } from "./test-utils";

describe("PostInfo", () => {
  it("renders the container with border", async () => {
    const $ = await renderComponent(PostInfo, { createdAt: "2025-01-01" });
    const el = $("div").first();
    expect(el.hasClass("border-b-2")).toBe(true);
  });

  it("displays published date when createdAt is provided", async () => {
    const $ = await renderComponent(PostInfo, { createdAt: "2025-06-15T12:00:00" });
    expect($("div").text()).toContain("Published:");
    expect($("div").text()).toContain("June 15, 2025");
  });

  it("does not display published date when createdAt is not provided", async () => {
    const $ = await renderComponent(PostInfo);
    expect($("div").text()).not.toContain("Published:");
  });

  it("displays updated date when isUpdated is true and updatedAt is provided", async () => {
    const $ = await renderComponent(PostInfo, {
      createdAt: "2025-01-01T12:00:00",
      updatedAt: "2025-06-20T12:00:00",
      isUpdated: true,
    });
    expect($("div").text()).toContain("Updated:");
    expect($("div").text()).toContain("June 20, 2025");
  });

  it("does not display updated date when isUpdated is false", async () => {
    const $ = await renderComponent(PostInfo, {
      createdAt: "2025-01-01",
      updatedAt: "2025-06-20",
      isUpdated: false,
    });
    expect($("div").text()).not.toContain("Updated:");
  });

  it("displays read time when provided", async () => {
    const $ = await renderComponent(PostInfo, { readTime: 5 });
    expect($("div").text()).toContain("Read Time:");
    expect($("div").text()).toContain("5");
    expect($("div").text()).toContain("min read");
  });

  it("does not display read time when not provided", async () => {
    const $ = await renderComponent(PostInfo, { createdAt: "2025-01-01" });
    expect($("div").text()).not.toContain("Read Time:");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(PostInfo, { class: "custom-info" });
    expect($("div").first().hasClass("custom-info")).toBe(true);
  });
});
