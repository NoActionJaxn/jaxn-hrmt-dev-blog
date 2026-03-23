import { describe, it, expect } from "vitest";
import ConfirmDialog from "../ConfirmDialog.astro";
import { renderComponent } from "./test-utils";

describe("ConfirmDialog", () => {
  const baseProps = {
    title: "Delete Item",
    description: "Are you sure you want to delete this?",
  };

  it("renders with role=dialog", async () => {
    const $ = await renderComponent(ConfirmDialog, baseProps);
    expect($('[role="dialog"]').length).toBe(1);
  });

  it("renders the title", async () => {
    const $ = await renderComponent(ConfirmDialog, baseProps);
    expect($('[role="dialog"]').text()).toContain("Delete Item");
  });

  it("renders the description", async () => {
    const $ = await renderComponent(ConfirmDialog, baseProps);
    expect($('[role="dialog"]').text()).toContain(
      "Are you sure you want to delete this?",
    );
  });

  it("renders default confirm/cancel labels", async () => {
    const $ = await renderComponent(ConfirmDialog, baseProps);
    const text = $('[role="dialog"]').text();
    expect(text).toContain("Confirm");
    expect(text).toContain("Cancel");
  });

  it("renders custom confirm and cancel labels", async () => {
    const $ = await renderComponent(ConfirmDialog, {
      ...baseProps,
      confirmLabel: "Yes, Delete",
      cancelLabel: "No, Keep",
    });
    const text = $('[role="dialog"]').text();
    expect(text).toContain("Yes, Delete");
    expect(text).toContain("No, Keep");
  });

  it("has proper ARIA labelling attributes", async () => {
    const $ = await renderComponent(ConfirmDialog, baseProps);
    const dialog = $('[role="dialog"]');
    const labelledBy = dialog.attr("aria-labelledby");
    const describedBy = dialog.attr("aria-describedby");
    expect(labelledBy).toBeDefined();
    expect(describedBy).toBeDefined();
    expect($(`#${labelledBy}`).text()).toContain("Delete Item");
    expect($(`#${describedBy}`).text()).toContain("Are you sure");
  });

  it("renders confirm and cancel buttons", async () => {
    const $ = await renderComponent(ConfirmDialog, baseProps);
    expect($("[data-confirm-dialog-confirm]").length).toBe(1);
    expect($("[data-confirm-dialog-cancel]").length).toBe(1);
  });

  it("applies custom class", async () => {
    const $ = await renderComponent(ConfirmDialog, {
      ...baseProps,
      class: "dialog-custom",
    });
    expect($("[data-confirm-dialog]").hasClass("dialog-custom")).toBe(true);
  });
});
