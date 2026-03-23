import { describe, it, expect } from "vitest";
import Collapsible from "../Collapsible.astro";
import { renderComponent } from "./test-utils";

describe("Collapsible", () => {
  it("renders with the title", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Details" },
      { default: "Body content" },
    );
    expect($("[data-collapsible-trigger]").text()).toContain("Details");
  });

  it("renders with data-collapsible attribute", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title" },
      { default: "Content" },
    );
    expect($("[data-collapsible]").length).toBe(1);
  });

  it("defaults to closed (aria-expanded=false)", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title" },
      { default: "Content" },
    );
    expect($("[data-collapsible-trigger]").attr("aria-expanded")).toBe("false");
  });

  it("can be open by default", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title", open: true },
      { default: "Content" },
    );
    expect($("[data-collapsible-trigger]").attr("aria-expanded")).toBe("true");
  });

  it("content is hidden when closed", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title" },
      { default: "Content" },
    );
    expect($("[data-collapsible-content]").hasClass("hidden")).toBe(true);
  });

  it("content is visible when open", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title", open: true },
      { default: "Visible content" },
    );
    expect($("[data-collapsible-content]").hasClass("hidden")).toBe(false);
    expect($("[data-collapsible-content]").text()).toContain("Visible content");
  });

  it("has proper ARIA attributes", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title" },
      { default: "Content" },
    );
    const trigger = $("[data-collapsible-trigger]");
    const content = $("[data-collapsible-content]");
    const panelId = content.attr("id");
    expect(trigger.attr("aria-controls")).toBe(panelId);
    expect(content.attr("role")).toBe("region");
  });

  it("renders chevron icon", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title" },
      { default: "Content" },
    );
    expect($("[data-collapsible-icon]").length).toBe(1);
    expect($("[data-collapsible-icon]").hasClass("fa-chevron-down")).toBe(true);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(
      Collapsible,
      { title: "Title", class: "custom" },
      { default: "Content" },
    );
    expect($("[data-collapsible]").hasClass("custom")).toBe(true);
  });
});
