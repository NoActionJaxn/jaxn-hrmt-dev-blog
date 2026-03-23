import { describe, it, expect } from "vitest";
import TextInput from "../TextInput.astro";
import { renderComponent } from "./test-utils";

describe("TextInput", () => {
  it("renders an input element", async () => {
    const $ = await renderComponent(TextInput);
    expect($("input").length).toBe(1);
  });

  it("renders label when provided", async () => {
    const $ = await renderComponent(TextInput, { label: "Email" });
    expect($("label").text()).toContain("Email");
  });

  it("generates id from label", async () => {
    const $ = await renderComponent(TextInput, { label: "First Name" });
    expect($("input").attr("id")).toBe("first-name");
  });

  it("uses provided id", async () => {
    const $ = await renderComponent(TextInput, { label: "Email", id: "my-email" });
    expect($("input").attr("id")).toBe("my-email");
  });

  it("applies wrapper with border", async () => {
    const $ = await renderComponent(TextInput);
    const wrapper = $("div").filter((_i, el) => $(el).hasClass("border-2"));
    expect(wrapper.length).toBeGreaterThanOrEqual(1);
  });

  it("applies default size (base)", async () => {
    const $ = await renderComponent(TextInput);
    const wrapper = $(".border-2.border-neutral-800");
    expect(wrapper.hasClass("h-10.5")).toBe(true);
  });

  it("applies sm size", async () => {
    const $ = await renderComponent(TextInput, { size: "sm" });
    const wrapper = $(".border-2.border-neutral-800");
    expect(wrapper.hasClass("h-10")).toBe(true);
  });

  it("applies lg size", async () => {
    const $ = await renderComponent(TextInput, { size: "lg" });
    const wrapper = $(".border-2.border-neutral-800");
    expect(wrapper.hasClass("h-11")).toBe(true);
  });

  it("passes through type attribute", async () => {
    const $ = await renderComponent(TextInput, { type: "email" });
    expect($("input").attr("type")).toBe("email");
  });

  it("passes through placeholder", async () => {
    const $ = await renderComponent(TextInput, { placeholder: "Enter email" });
    expect($("input").attr("placeholder")).toBe("Enter email");
  });

  it("passes through name attribute", async () => {
    const $ = await renderComponent(TextInput, { name: "email" });
    expect($("input").attr("name")).toBe("email");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(TextInput, { class: "my-input" });
    const wrapper = $(".my-input");
    expect(wrapper.length).toBe(1);
  });

  it("label links to input via for attribute", async () => {
    const $ = await renderComponent(TextInput, { label: "Email" });
    const labelFor = $("label").attr("for");
    const inputId = $("input").attr("id");
    expect(labelFor).toBe(inputId);
  });
});
