import { useContext } from 'react';

import { ThemeModeValue } from '@/config/types';
import { ThemeMode } from '@/contexts/themeContext';

export const useTheme = (): ThemeModeValue => {
  const context = useContext(ThemeMode);
  if (!context) {
    throw new Error('useTheme must be used within AppThemeProvider');
  }
  return context;
};
