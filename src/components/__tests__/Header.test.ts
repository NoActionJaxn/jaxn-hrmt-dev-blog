import { describe, it, expect } from "vitest";
import Header from "../Header.astro";
import { renderComponent } from "./test-utils";

describe("Header", () => {
  it("renders h1 by default", async () => {
    const $ = await renderComponent(Header, {}, { default: "Title" });
    expect($("h1").length).toBe(1);
    expect($("h1").text().trim()).toBe("Title");
  });

  it("renders correct heading variant", async () => {
    const $ = await renderComponent(Header, { variant: "h3" }, { default: "Sub" });
    expect($("h3").length).toBe(1);
    expect($("h3").text().trim()).toBe("Sub");
  });

  it("applies base font class", async () => {
    const $ = await renderComponent(Header, {}, { default: "Title" });
    expect($("h1").hasClass("font-header")).toBe(true);
  });

  it("applies default size (base = text-2xl)", async () => {
    const $ = await renderComponent(Header, {}, { default: "Title" });
    expect($("h1").hasClass("text-2xl")).toBe(true);
  });

  it("applies xl size", async () => {
    const $ = await renderComponent(Header, { size: "xl" }, { default: "Title" });
    expect($("h1").hasClass("text-5xl")).toBe(true);
  });

  it("applies lg size", async () => {
    const $ = await renderComponent(Header, { size: "lg" }, { default: "Title" });
    expect($("h1").hasClass("text-4xl")).toBe(true);
  });

  it("applies sm size", async () => {
    const $ = await renderComponent(Header, { size: "sm" }, { default: "Title" });
    expect($("h1").hasClass("text-xl")).toBe(true);
  });

  it("applies xs size", async () => {
    const $ = await renderComponent(Header, { size: "xs" }, { default: "Title" });
    expect($("h1").hasClass("text-base")).toBe(true);
  });

  it("applies h1/h2 color variant", async () => {
    const $ = await renderComponent(Header, { variant: "h2" }, { default: "Title" });
    expect($("h2").hasClass("text-neutral-800")).toBe(true);
  });

  it("applies h3/h4/h5 color variant", async () => {
    const $ = await renderComponent(Header, { variant: "h4" }, { default: "Title" });
    expect($("h4").hasClass("text-neutral-600")).toBe(true);
  });

  it("applies h6 color variant", async () => {
    const $ = await renderComponent(Header, { variant: "h6" }, { default: "Title" });
    expect($("h6").hasClass("text-neutral-900")).toBe(true);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Header, { class: "extra" }, { default: "Title" });
    expect($("h1").hasClass("extra")).toBe(true);
  });
});
