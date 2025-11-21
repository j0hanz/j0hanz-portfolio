import { createContext } from 'react';

export type Direction = 'up' | 'down' | null;

export interface NavigationContextType {
  activeSectionIndex: number;
  activeSectionId: string;
  direction: Direction;
  setActiveSection: (index: number) => void;
  navigateTo: (id: string) => void;
  moveNext: () => void;
  movePrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);
