import { describe, it, expect } from "vitest";
import Info from "../Info.astro";
import { renderComponent } from "./test-utils";

describe("Info", () => {
  it("renders with default variant (info)", async () => {
    const $ = await renderComponent(Info, {}, { default: "Information" });
    const el = $('[role="status"]');
    expect(el.length).toBe(1);
    expect(el.hasClass("bg-neutral-200")).toBe(true);
  });

  it("renders slot content", async () => {
    const $ = await renderComponent(Info, {}, { default: "Some info text" });
    expect($('[role="status"]').text()).toContain("Some info text");
  });

  it("applies success variant", async () => {
    const $ = await renderComponent(Info, { variant: "success" }, { default: "Done" });
    const el = $('[role="status"]');
    expect(el.hasClass("bg-success-100")).toBe(true);
  });

  it("applies warning variant with alert role", async () => {
    const $ = await renderComponent(Info, { variant: "warning" }, { default: "Warning" });
    const el = $('[role="alert"]');
    expect(el.length).toBe(1);
    expect(el.hasClass("bg-warning-100")).toBe(true);
  });

  it("applies danger variant with alert role", async () => {
    const $ = await renderComponent(Info, { variant: "danger" }, { default: "Error" });
    const el = $('[role="alert"]');
    expect(el.length).toBe(1);
    expect(el.hasClass("bg-danger-100")).toBe(true);
  });

  it("renders correct icon for info variant", async () => {
    const $ = await renderComponent(Info, { variant: "info" }, { default: "Info" });
    expect($("i.fa-info").length).toBe(1);
  });

  it("renders correct icon for success variant", async () => {
    const $ = await renderComponent(Info, { variant: "success" }, { default: "Done" });
    expect($("i.fa-check").length).toBe(1);
  });

  it("renders correct icon for warning variant", async () => {
    const $ = await renderComponent(Info, { variant: "warning" }, { default: "Warn" });
    expect($("i.fa-exclamation").length).toBe(1);
  });

  it("renders correct icon for danger variant", async () => {
    const $ = await renderComponent(Info, { variant: "danger" }, { default: "Err" });
    expect($("i.fa-xmark").length).toBe(1);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Info, { class: "custom-info" }, { default: "Msg" });
    expect($('[role="status"]').hasClass("custom-info")).toBe(true);
  });
});
