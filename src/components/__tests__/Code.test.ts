import { describe, it, expect } from "vitest";
import Code from "../Code.astro";
import { renderComponent } from "./test-utils";

describe("Code", () => {
  it("renders a code element", async () => {
    const $ = await renderComponent(Code, {}, { default: "const x = 1" });
    expect($("code").length).toBe(1);
    expect($("code").text()).toBe("const x = 1");
  });

  it("applies base classes", async () => {
    const $ = await renderComponent(Code, {}, { default: "test" });
    const code = $("code");
    expect(code.hasClass("bg-neutral-800")).toBe(true);
    expect(code.hasClass("text-success-500")).toBe(true);
    expect(code.hasClass("font-mono")).toBe(true);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Code, { class: "extra" }, { default: "test" });
    expect($("code").hasClass("extra")).toBe(true);
    expect($("code").hasClass("font-mono")).toBe(true);
  });
});
