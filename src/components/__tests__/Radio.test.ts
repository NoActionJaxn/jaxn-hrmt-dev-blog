import { describe, it, expect } from "vitest";
import Radio from "../Radio.astro";
import { renderComponent } from "./test-utils";

describe("Radio", () => {
  it("renders a radio input", async () => {
    const $ = await renderComponent(Radio);
    const input = $('input[type="radio"]');
    expect(input.length).toBe(1);
  });

  it("renders label text when provided", async () => {
    const $ = await renderComponent(Radio, { label: "Option A" });
    expect($("label").text()).toContain("Option A");
  });

  it("generates id from label", async () => {
    const $ = await renderComponent(Radio, { label: "Option A" });
    expect($("input").attr("id")).toBe("option-a");
  });

  it("uses provided id over generated one", async () => {
    const $ = await renderComponent(Radio, { label: "Option A", id: "custom-radio" });
    expect($("input").attr("id")).toBe("custom-radio");
  });

  it("renders without label text", async () => {
    const $ = await renderComponent(Radio);
    expect($('input[type="radio"]').length).toBe(1);
    expect($("label").text().trim()).toBe("");
  });

  it("hides native radio with sr-only", async () => {
    const $ = await renderComponent(Radio, { label: "Test" });
    expect($("input").hasClass("sr-only")).toBe(true);
  });

  it("renders custom visual radio (rounded)", async () => {
    const $ = await renderComponent(Radio, { label: "Test" });
    // The outer indicator has rounded-full
    const indicator = $("span.rounded-full");
    expect(indicator.length).toBeGreaterThanOrEqual(1);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Radio, { class: "my-radio" });
    expect($("label").hasClass("my-radio")).toBe(true);
  });

  it("passes through name attribute", async () => {
    const $ = await renderComponent(Radio, { name: "color", value: "red" });
    expect($("input").attr("name")).toBe("color");
    expect($("input").attr("value")).toBe("red");
  });
});
