import { describe, it, expect } from "vitest";
import formatDate from "../formatDate";

describe("formatDate", () => {
  it("formats a date string to US locale", () => {
    expect(formatDate("2025-01-15T12:00:00")).toBe("January 15, 2025");
  });

  it("formats another date correctly", () => {
    expect(formatDate("2024-12-25T12:00:00")).toBe("December 25, 2024");
  });

  it("handles ISO date strings", () => {
    expect(formatDate("2025-06-01T12:00:00Z")).toBe("June 1, 2025");
  });

  it("formats month correctly for February", () => {
    const result = formatDate("2025-02-14T12:00:00");
    expect(result).toContain("February");
    expect(result).toContain("14");
    expect(result).toContain("2025");
  });
});
