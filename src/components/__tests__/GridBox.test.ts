import { describe, it, expect } from "vitest";
import GridBox from "../GridBox.astro";
import { renderComponent } from "./test-utils";

describe("GridBox", () => {
  it("renders a grid element", async () => {
    const $ = await renderComponent(GridBox, {}, { default: "<div>Item</div>" });
    const grid = $("[data-grid-columns]");
    expect(grid.length).toBe(1);
    expect(grid.hasClass("grid")).toBe(true);
  });

  it("defaults to 3 columns", async () => {
    const $ = await renderComponent(GridBox, {}, { default: "<div>Item</div>" });
    expect($("[data-grid-columns]").attr("data-grid-columns")).toBe("3");
  });

  it("applies 1 column class", async () => {
    const $ = await renderComponent(GridBox, { columns: 1 }, { default: "<div>Item</div>" });
    expect($("[data-grid-columns]").hasClass("grid-cols-1")).toBe(true);
  });

  it("applies 2 column classes", async () => {
    const $ = await renderComponent(GridBox, { columns: 2 }, { default: "<div>Item</div>" });
    const el = $("[data-grid-columns]");
    expect(el.hasClass("grid-cols-1")).toBe(true);
    expect(el.hasClass("sm:grid-cols-2")).toBe(true);
  });

  it("applies 4 column classes", async () => {
    const $ = await renderComponent(GridBox, { columns: 4 }, { default: "<div>Item</div>" });
    const el = $("[data-grid-columns]");
    expect(el.hasClass("lg:grid-cols-4")).toBe(true);
  });

  it("defaults to gap-4", async () => {
    const $ = await renderComponent(GridBox, {}, { default: "<div>Item</div>" });
    expect($("[data-grid-columns]").hasClass("gap-4")).toBe(true);
  });

  it("applies custom gap", async () => {
    const $ = await renderComponent(GridBox, { gap: 8 }, { default: "<div>Item</div>" });
    expect($("[data-grid-columns]").hasClass("gap-8")).toBe(true);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(GridBox, { class: "my-grid" }, { default: "<div>Item</div>" });
    expect($("[data-grid-columns]").hasClass("my-grid")).toBe(true);
  });

  it("stores column classes in data attribute", async () => {
    const $ = await renderComponent(GridBox, { columns: 3 }, { default: "<div>Item</div>" });
    const colClasses = $("[data-grid-columns]").attr("data-grid-col-classes");
    expect(colClasses).toContain("md:grid-cols-3");
  });
});
