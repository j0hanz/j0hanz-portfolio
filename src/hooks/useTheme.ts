import { useContext } from 'react';

import { ThemeMode, ThemeModeValue } from '@/contexts/themeContext';

export const useTheme = (): ThemeModeValue => {
  const context = useContext(ThemeMode);
  if (!context) {
    throw new Error('useTheme must be used within AppThemeProvider');
  }
  return context;
};
