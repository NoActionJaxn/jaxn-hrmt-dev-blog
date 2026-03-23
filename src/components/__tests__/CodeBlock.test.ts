import { describe, it, expect } from "vitest";
import CodeBlock from "../CodeBlock.astro";
import { renderComponent } from "./test-utils";

describe("CodeBlock", () => {
  it("renders a pre > code structure", async () => {
    const $ = await renderComponent(CodeBlock, {}, { default: "console.log('hi')" });
    expect($("pre").length).toBe(1);
    expect($("pre code").length).toBe(1);
    expect($("pre code").text()).toBe("console.log('hi')");
  });

  it("renders copy button", async () => {
    const $ = await renderComponent(CodeBlock, {}, { default: "code" });
    const copyBtn = $("[data-codeblock-copy]");
    expect(copyBtn.length).toBe(1);
    expect(copyBtn.attr("aria-label")).toBe("Copy code");
  });

  it("renders with data-codeblock attribute", async () => {
    const $ = await renderComponent(CodeBlock, {}, { default: "code" });
    expect($("[data-codeblock]").length).toBe(1);
  });

  it("includes sr-only status element for copied feedback", async () => {
    const $ = await renderComponent(CodeBlock, {}, { default: "code" });
    const status = $("[data-codeblock-status]");
    expect(status.length).toBe(1);
    expect(status.attr("aria-live")).toBe("polite");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(CodeBlock, { class: "my-block" }, { default: "code" });
    expect($("[data-codeblock]").hasClass("my-block")).toBe(true);
  });

  it("applies base styling classes", async () => {
    const $ = await renderComponent(CodeBlock, {}, { default: "code" });
    const block = $("[data-codeblock]");
    expect(block.hasClass("bg-neutral-800")).toBe(true);
    expect(block.hasClass("font-mono")).toBe(true);
  });
});
