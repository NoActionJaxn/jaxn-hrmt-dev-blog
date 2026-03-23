import { describe, it, expect } from "vitest";
import Select from "../Select.astro";
import { renderComponent } from "./test-utils";

describe("Select", () => {
  const options = [
    { value: "a", label: "Alpha" },
    { value: "b", label: "Beta" },
    { value: "c", label: "Gamma" },
  ];

  it("renders the select wrapper", async () => {
    const $ = await renderComponent(Select, { options });
    expect($("[data-select]").length).toBe(1);
  });

  it("renders trigger button", async () => {
    const $ = await renderComponent(Select, { options });
    expect($("[data-select-trigger]").length).toBe(1);
  });

  it("renders all options in listbox", async () => {
    const $ = await renderComponent(Select, { options });
    const optionEls = $("[data-select-option]");
    expect(optionEls.length).toBe(3);
  });

  it("renders options with correct values", async () => {
    const $ = await renderComponent(Select, { options });
    const values = $("[data-select-option]")
      .map((_i, el) => $(el).attr("data-value"))
      .get();
    expect(values).toEqual(["a", "b", "c"]);
  });

  it("renders option labels", async () => {
    const $ = await renderComponent(Select, { options });
    const labels = $("[data-select-option]")
      .map((_i, el) => $(el).text().trim())
      .get();
    expect(labels).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("shows placeholder text by default", async () => {
    const $ = await renderComponent(Select, { options });
    expect($("[data-select-display]").text().trim()).toBe("Choose...");
  });

  it("shows custom placeholder", async () => {
    const $ = await renderComponent(Select, { options, placeholder: "Choose..." });
    expect($("[data-select-display]").text().trim()).toBe("Choose...");
  });

  it("renders label when provided", async () => {
    const $ = await renderComponent(Select, { options, label: "Color" });
    expect($("label").text()).toContain("Color");
  });

  it("renders hidden input for form submission", async () => {
    const $ = await renderComponent(Select, { options, name: "choice" });
    const hidden = $("[data-select-value]");
    expect(hidden.length).toBe(1);
    expect(hidden.attr("name")).toBe("choice");
  });

  it("selects default value", async () => {
    const $ = await renderComponent(Select, { options, default: "b" });
    expect($("[data-select-value]").attr("value")).toBe("b");
    expect($("[data-select-display]").text().trim()).toBe("Beta");
  });

  it("menu starts hidden", async () => {
    const $ = await renderComponent(Select, { options });
    expect($("[data-select-menu]").hasClass("hidden")).toBe(true);
  });

  it("has proper ARIA attributes on trigger", async () => {
    const $ = await renderComponent(Select, { options });
    const trigger = $("[data-select-trigger]");
    expect(trigger.attr("aria-expanded")).toBe("false");
    expect(trigger.attr("aria-haspopup")).toBe("listbox");
  });

  it("options have role=option", async () => {
    const $ = await renderComponent(Select, { options });
    $("[data-select-option]").each((_i, el) => {
      expect($(el).attr("role")).toBe("option");
    });
  });

  it("applies sm size classes", async () => {
    const $ = await renderComponent(Select, { options, size: "sm" });
    expect($("[data-select-trigger]").hasClass("h-10")).toBe(true);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Select, { options, class: "my-select" });
    expect($("[data-select]").hasClass("my-select")).toBe(true);
  });
});
