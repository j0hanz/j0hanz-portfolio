import { createContext } from 'react';

export interface MenuState {
  isMenuOpen: boolean;
}

export interface MenuActions {
  openMenu: () => void;
  closeMenu: () => void;
}

export const MenuStateContext = createContext<MenuState | null>(null);
export const MenuActionsContext = createContext<MenuActions | null>(null);
