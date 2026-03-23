import { describe, it, expect } from "vitest";
import Card from "../Card.astro";
import { renderComponent } from "./test-utils";

describe("Card", () => {
  const baseProps = {
    title: "Test Card",
    description: "A test description",
    href: "/test-post",
  };

  it("renders article element", async () => {
    const $ = await renderComponent(Card, baseProps);
    expect($("article").length).toBe(1);
  });

  it("renders the title", async () => {
    const $ = await renderComponent(Card, baseProps);
    expect($("article").text()).toContain("Test Card");
  });

  it("renders the description", async () => {
    const $ = await renderComponent(Card, baseProps);
    expect($("article").text()).toContain("A test description");
  });

  it("renders a link with the provided href", async () => {
    const $ = await renderComponent(Card, baseProps);
    const link = $('a[href="/test-post"]');
    expect(link.length).toBe(1);
    expect(link.text()).toContain("Read More");
  });

  it("renders tags when provided", async () => {
    const $ = await renderComponent(Card, {
      ...baseProps,
      tags: ["astro", "vitest"],
    });
    const text = $("article").text();
    expect(text).toContain("astro");
    expect(text).toContain("vitest");
  });

  it("does not render tags section when empty", async () => {
    const $ = await renderComponent(Card, { ...baseProps, tags: [] });
    // The div.flex-wrap for tags should not exist
    expect($("article").text()).not.toContain("astro");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(Card, { ...baseProps, class: "custom-card" });
    expect($("article").hasClass("custom-card")).toBe(true);
  });

  it("renders a placeholder when no image is provided", async () => {
    const $ = await renderComponent(Card, baseProps);
    // Image component renders a placeholder div when no src
    const placeholder = $('[role="img"]');
    expect(placeholder.length).toBe(1);
  });

  it("renders the read more link", async () => {
    const $ = await renderComponent(Card, baseProps);
    const readMoreLink = $('a[href="/test-post"]');
    expect(readMoreLink.length).toBe(1);
    expect(readMoreLink.text().trim()).toContain("Read More");
  });
});
