import { describe, it, expect } from "vitest";
import TextArea from "../TextArea.astro";
import { renderComponent } from "./test-utils";

describe("TextArea", () => {
  it("renders a textarea element", async () => {
    const $ = await renderComponent(TextArea);
    expect($("textarea").length).toBe(1);
  });

  it("renders label when provided", async () => {
    const $ = await renderComponent(TextArea, { label: "Message" });
    expect($("label").text()).toContain("Message");
  });

  it("generates id from label", async () => {
    const $ = await renderComponent(TextArea, { label: "Your Message" });
    expect($("textarea").attr("id")).toBe("your-message");
  });

  it("uses provided id", async () => {
    const $ = await renderComponent(TextArea, { label: "Msg", id: "custom-ta" });
    expect($("textarea").attr("id")).toBe("custom-ta");
  });

  it("applies base wrapper classes with border", async () => {
    const $ = await renderComponent(TextArea);
    const wrapper = $("div").filter((_i, el) => $(el).hasClass("border-2"));
    expect(wrapper.length).toBeGreaterThanOrEqual(1);
  });

  it("applies default size (base = text-base)", async () => {
    const $ = await renderComponent(TextArea);
    expect($("textarea").hasClass("text-base")).toBe(true);
  });

  it("applies sm size", async () => {
    const $ = await renderComponent(TextArea, { size: "sm" });
    expect($("textarea").hasClass("text-sm")).toBe(true);
  });

  it("applies lg size", async () => {
    const $ = await renderComponent(TextArea, { size: "lg" });
    expect($("textarea").hasClass("text-lg")).toBe(true);
  });

  it("applies custom class to wrapper", async () => {
    const $ = await renderComponent(TextArea, { class: "my-textarea" });
    const wrapper = $(".my-textarea");
    expect(wrapper.length).toBe(1);
  });

  it("passes through placeholder attribute", async () => {
    const $ = await renderComponent(TextArea, { placeholder: "Type here..." });
    expect($("textarea").attr("placeholder")).toBe("Type here...");
  });

  it("passes through name attribute", async () => {
    const $ = await renderComponent(TextArea, { name: "message" });
    expect($("textarea").attr("name")).toBe("message");
  });

  it("textarea has resize-y class", async () => {
    const $ = await renderComponent(TextArea);
    expect($("textarea").hasClass("resize-y")).toBe(true);
  });
});
