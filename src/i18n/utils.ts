import translations from "./en.json";

export function t(key: string): string {
  const parts = key.split(".");
  let current: unknown = translations;
  for (const part of parts) {
    if (current !== null && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === "string" ? current : key;
}
