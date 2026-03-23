import { describe, it, expect, beforeEach } from "vitest";
import { isMenuOpen, toggleMenu } from "../menuStore";

describe("menuStore", () => {
  beforeEach(() => {
    isMenuOpen.set(false);
  });

  it("defaults to false", () => {
    expect(isMenuOpen.get()).toBe(false);
  });

  it("toggleMenu switches from false to true", () => {
    toggleMenu();
    expect(isMenuOpen.get()).toBe(true);
  });

  it("toggleMenu switches back to false", () => {
    toggleMenu();
    toggleMenu();
    expect(isMenuOpen.get()).toBe(false);
  });

  it("can set directly", () => {
    isMenuOpen.set(true);
    expect(isMenuOpen.get()).toBe(true);
  });

  it("notifies subscribers", () => {
    const values: boolean[] = [];
    const unsub = isMenuOpen.subscribe((v) => values.push(v));
    toggleMenu();
    toggleMenu();
    unsub();
    // subscribe fires immediately with current value, then on each change
    expect(values).toEqual([false, true, false]);
  });
});
