import { describe, it, expect } from "vitest";
import Checkbox from "../Checkbox.astro";
import { renderComponent } from "./test-utils";

describe("Checkbox", () => {
  it("renders a checkbox input", async () => {
    const $ = await renderComponent(Checkbox);
    const input = $('input[type="checkbox"]');
    expect(input.length).toBe(1);
  });

  it("renders label text when provided", async () => {
    const $ = await renderComponent(Checkbox, { label: "Accept terms" });
    expect($("label").text()).toContain("Accept terms");
  });

  it("generates id from label", async () => {
    const $ = await renderComponent(Checkbox, { label: "Accept terms" });
    expect($("input").attr("id")).toBe("accept-terms");
  });

  it("uses provided id over generated one", async () => {
    const $ = await renderComponent(Checkbox, { label: "Accept", id: "custom-id" });
    expect($("input").attr("id")).toBe("custom-id");
  });

  it("renders without label", async () => {
    const $ = await renderComponent(Checkbox);
    const input = $('input[type="checkbox"]');
    expect(input.length).toBe(1);

    // Only the wrapper and indicator spans, not the label text
    expect($("label").text().trim()).toBe("");
  });

  it("applies the sr-only class to hide native checkbox", async () => {
    const $ = await renderComponent(Checkbox, { label: "Test" });
    expect($("input").hasClass("sr-only")).toBe(true);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Checkbox, { class: "my-check" });
    expect($("label").hasClass("my-check")).toBe(true);
  });

  it("passes through additional attributes", async () => {
    const $ = await renderComponent(Checkbox, { name: "terms", value: "yes" });
    expect($("input").attr("name")).toBe("terms");
    expect($("input").attr("value")).toBe("yes");
  });
});
