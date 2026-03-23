import { describe, it, expect } from "vitest";
import CollapsibleGroup from "../CollapsibleGroup.astro";
import { renderComponent } from "./test-utils";

describe("CollapsibleGroup", () => {
  it("renders a container div", async () => {
    const $ = await renderComponent(CollapsibleGroup, {}, { default: "<div>Item</div>" });
    expect($("[data-collapsible-group]").length).toBe(1);
  });

  it("renders slot content", async () => {
    const $ = await renderComponent(
      CollapsibleGroup,
      {},
      { default: "<div>Child 1</div><div>Child 2</div>" },
    );
    expect($("[data-collapsible-group]").text()).toContain("Child 1");
    expect($("[data-collapsible-group]").text()).toContain("Child 2");
  });

  it("does not set data-accordion when accordion is false", async () => {
    const $ = await renderComponent(CollapsibleGroup, { accordion: false });
    expect($("[data-collapsible-group]").attr("data-accordion")).toBeUndefined();
  });

  it("sets data-accordion=true when accordion is true", async () => {
    const $ = await renderComponent(CollapsibleGroup, { accordion: true });
    expect($("[data-collapsible-group]").attr("data-accordion")).toBe("true");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(CollapsibleGroup, { class: "my-group" });
    expect($("[data-collapsible-group]").hasClass("my-group")).toBe(true);
  });

  it("applies flex column layout class", async () => {
    const $ = await renderComponent(CollapsibleGroup);
    const el = $("[data-collapsible-group]");
    expect(el.hasClass("flex")).toBe(true);
    expect(el.hasClass("flex-col")).toBe(true);
  });
});
