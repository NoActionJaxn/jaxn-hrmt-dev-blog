import { describe, it, expect } from "vitest";
import MenuButton from "../MenuButton.astro";
import { renderComponent } from "./test-utils";

describe("MenuButton", () => {
  it("renders a button with data-menu-toggle", async () => {
    const $ = await renderComponent(MenuButton);
    expect($("[data-menu-toggle]").length).toBe(1);
  });

  it("defaults to closed state (aria-expanded=false)", async () => {
    const $ = await renderComponent(MenuButton);
    expect($("[data-menu-toggle]").attr("aria-expanded")).toBe("false");
  });

  it("renders open state when isOpen=true", async () => {
    const $ = await renderComponent(MenuButton, { isOpen: true });
    expect($("[data-menu-toggle]").attr("aria-expanded")).toBe("true");
  });

  it("has aria-label for open menu when closed", async () => {
    const $ = await renderComponent(MenuButton);
    expect($("[data-menu-toggle]").attr("aria-label")).toBe("Open menu");
  });

  it("has aria-label for close menu when open", async () => {
    const $ = await renderComponent(MenuButton, { isOpen: true });
    expect($("[data-menu-toggle]").attr("aria-label")).toBe("Close menu");
  });

  it("stores label data attributes", async () => {
    const $ = await renderComponent(MenuButton);
    const btn = $("[data-menu-toggle]");
    expect(btn.attr("data-label-open")).toBe("Open menu");
    expect(btn.attr("data-label-close")).toBe("Close menu");
  });

  it("renders three line spans for hamburger icon", async () => {
    const $ = await renderComponent(MenuButton);
    const lines = $("[data-menu-toggle] span > span");
    expect(lines.length).toBe(3);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(MenuButton, { class: "my-btn" });
    expect($("[data-menu-toggle]").hasClass("my-btn")).toBe(true);
  });
});
