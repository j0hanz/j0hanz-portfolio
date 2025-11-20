import { createContext } from 'react';

import { PaletteMode } from '@mui/material';

export type ThemeModeUpdater = (
  value: PaletteMode | ((previous: PaletteMode) => PaletteMode)
) => void;

export interface ThemeModeValue {
  mode: PaletteMode;
  toggleMode: () => void;
  setMode: ThemeModeUpdater;
}

export const ThemeMode = createContext<ThemeModeValue | null>(null);
