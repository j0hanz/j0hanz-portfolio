import { useLayoutEffect } from 'react';

import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '@/config/theme';
import {
  AppThemeProviderProps,
  ThemeModeUpdater,
  ThemeModeValue,
} from '@/config/types';
import { ThemeMode } from '@/contexts/themeContext';
import { useStorage } from '@/hooks';

function AppThemeProvider({
  children,
}: AppThemeProviderProps): React.JSX.Element {
  const { value: storedTheme = 'light', set: setStoredTheme } =
    useStorage<PaletteMode>('theme', 'light', {
      serializer: (value) => value,
      parser: (value) => (value === 'dark' ? 'dark' : 'light'),
    });

  const mode = storedTheme ?? 'light';

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const toggleMode = () => {
    setStoredTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setMode: ThemeModeUpdater = (nextMode) => {
    setStoredTheme(nextMode);
  };

  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', mode);
      document.documentElement.setAttribute('data-bs-theme', mode);
    }
  }, [mode]);

  const contextValue: ThemeModeValue = { mode, toggleMode, setMode };

  return (
    <ThemeMode value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeMode>
  );
}

export default AppThemeProvider;
