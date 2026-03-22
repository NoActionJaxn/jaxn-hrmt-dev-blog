import { atom } from "nanostores";

const stored = typeof sessionStorage !== "undefined"
  ? sessionStorage.getItem("menuOpen")
  : null;

export const isMenuOpen = atom(stored === null ? false : stored === "true");

isMenuOpen.subscribe((open) => {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("menuOpen", String(open));
  }
});

export function toggleMenu() {
  isMenuOpen.set(!isMenuOpen.get());
}
