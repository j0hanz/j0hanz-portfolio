import React, { useMemo } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '@/config/theme';
import { useStorage } from '@/hooks';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const { value: storedTheme } = useStorage<'dark' | 'light'>('theme', 'light');

  const theme = useMemo(() => {
    return storedTheme === 'dark' ? darkTheme : lightTheme;
  }, [storedTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
