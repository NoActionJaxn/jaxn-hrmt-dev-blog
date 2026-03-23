import { describe, it, expect } from "vitest";
import { t } from "../utils";

describe("i18n t()", () => {
  it("returns a translation for a valid key", () => {
    expect(t("logo.short")).toBe("jaxn hrmt");
  });

  it("returns a nested translation", () => {
    expect(t("logo.full")).toBe("jackson hermitt");
  });

  it("returns the key itself for an unknown key", () => {
    expect(t("nonexistent.key")).toBe("nonexistent.key");
  });

  it("returns the key for partially valid paths", () => {
    expect(t("logo.invalid")).toBe("logo.invalid");
  });

  it("returns nav translations", () => {
    expect(t("nav.index")).toBe("Index");
    expect(t("nav.about")).toBe("About");
    expect(t("nav.works")).toBe("Works");
    expect(t("nav.contact")).toBe("Contact");
  });

  it("returns dialog translations", () => {
    expect(t("dialog.confirm")).toBe("Confirm");
    expect(t("dialog.cancel")).toBe("Cancel");
  });

  it("returns the key when it is empty string", () => {
    expect(t("")).toBe("");
  });
});
