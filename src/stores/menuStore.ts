import { atom } from "nanostores";

export const isMenuOpen = atom(true);

export function toggleMenu() {
  isMenuOpen.set(!isMenuOpen.get());
}
