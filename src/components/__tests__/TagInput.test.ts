import { describe, it, expect } from "vitest";
import TagInput from "../TagInput.astro";
import { renderComponent } from "./test-utils";

describe("TagInput", () => {
  const options = [
    { value: "js", label: "JavaScript" },
    { value: "ts", label: "TypeScript" },
    { value: "py", label: "Python" },
  ];

  it("renders the tag input wrapper", async () => {
    const $ = await renderComponent(TagInput, { options });
    expect($("[data-tag-input]").length).toBe(1);
  });

  it("stores options in data attribute", async () => {
    const $ = await renderComponent(TagInput, { options });
    const stored = JSON.parse($("[data-tag-input]").attr("data-options") || "[]");
    expect(stored).toEqual(options);
  });

  it("renders a text input", async () => {
    const $ = await renderComponent(TagInput, { options });
    expect($("[data-tag-text-input]").length).toBe(1);
  });

  it("renders hidden input for form value", async () => {
    const $ = await renderComponent(TagInput, { options, name: "tags" });
    const hidden = $("[data-tag-hidden]");
    expect(hidden.length).toBe(1);
    expect(hidden.attr("name")).toBe("tags");
  });

  it("renders default placeholder", async () => {
    const $ = await renderComponent(TagInput, { options });
    expect($("[data-tag-text-input]").attr("placeholder")).toBeDefined();
  });

  it("renders custom placeholder", async () => {
    const $ = await renderComponent(TagInput, { options, placeholder: "Add tags..." });
    expect($("[data-tag-text-input]").attr("placeholder")).toBe("Add tags...");
  });

  it("renders label when provided", async () => {
    const $ = await renderComponent(TagInput, { options, label: "Skills" });
    expect($("label").text()).toContain("Skills");
  });

  it("renders clear button (hidden by default)", async () => {
    const $ = await renderComponent(TagInput, { options });
    expect($("[data-tag-clear]").length).toBe(1);
    expect($("[data-tag-clear]").hasClass("hidden")).toBe(true);
  });

  it("renders dropdown menu (hidden by default)", async () => {
    const $ = await renderComponent(TagInput, { options });
    expect($("[data-tag-menu]").length).toBe(1);
    expect($("[data-tag-menu]").hasClass("hidden")).toBe(true);
  });

  it("renders template for tag chips", async () => {
    const $ = await renderComponent(TagInput, { options });
    expect($("[data-tag-template]").length).toBe(1);
  });

  it("applies sm size classes", async () => {
    const $ = await renderComponent(TagInput, { options, size: "sm" });
    expect($("[data-tag-wrapper]").hasClass("min-h-10")).toBe(true);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(TagInput, { options, class: "my-tags" });
    expect($("[data-tag-input]").hasClass("my-tags")).toBe(true);
  });

  it("sets required on hidden input when required", async () => {
    const $ = await renderComponent(TagInput, { options, required: true });
    expect($("[data-tag-hidden]").attr("required")).toBeDefined();
  });
});
