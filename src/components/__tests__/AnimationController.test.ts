import { describe, it, expect } from "vitest";
import AnimationController from "../AnimationController.astro";
import { renderComponent } from "./test-utils";

describe("AnimationController", () => {
  it("renders with data-animation-controller attribute", async () => {
    const $ = await renderComponent(AnimationController, {}, { default: "<div>child</div>" });
    expect($("[data-animation-controller]").length).toBe(1);
  });

  it("renders slot content", async () => {
    const $ = await renderComponent(AnimationController, {}, { default: "<p>Hello</p>" });
    expect($("[data-animation-controller]").html()).toContain("<p>Hello</p>");
  });

  it("has default delay of 200", async () => {
    const $ = await renderComponent(AnimationController, {}, { default: "<div>child</div>" });
    expect($("[data-animation-controller]").attr("data-animation-delay")).toBe("200");
  });

  it("has default duration of 300", async () => {
    const $ = await renderComponent(AnimationController, {}, { default: "<div>child</div>" });
    expect($("[data-animation-controller]").attr("data-animation-duration")).toBe("300");
  });

  it("accepts custom delay", async () => {
    const $ = await renderComponent(AnimationController, { delay: 100 }, { default: "<div>child</div>" });
    expect($("[data-animation-controller]").attr("data-animation-delay")).toBe("100");
  });

  it("accepts custom duration", async () => {
    const $ = await renderComponent(AnimationController, { duration: 300 }, { default: "<div>child</div>" });
    expect($("[data-animation-controller]").attr("data-animation-duration")).toBe("300");
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(AnimationController, { class: "my-class" }, { default: "<div>child</div>" });
    expect($("[data-animation-controller]").hasClass("my-class")).toBe(true);
  });
});
