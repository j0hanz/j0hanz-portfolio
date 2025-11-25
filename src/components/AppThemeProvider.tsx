import { ReactNode } from 'react';

import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useColorScheme,
} from '@mui/material';

import { appTheme } from '@/config/theme';
import { AppThemeProviderProps, ThemeModeValue } from '@/config/types';
import { ThemeMode } from '@/contexts/themeContext';

function ThemeModeAdapter({ children }: { children: ReactNode }) {
  const { mode, setMode } = useColorScheme();

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const contextValue: ThemeModeValue = {
    mode: (mode as PaletteMode) || 'light',
    toggleMode,
    setMode: (nextMode) => {
      if (typeof nextMode === 'function') {
        setMode(nextMode(mode as PaletteMode));
      } else {
        setMode(nextMode);
      }
    },
  };

  return <ThemeMode value={contextValue}>{children}</ThemeMode>;
}

function AppThemeProvider({
  children,
}: AppThemeProviderProps): React.JSX.Element {
  return (
    <ThemeProvider theme={appTheme} defaultMode="light">
      <CssBaseline />
      <ThemeModeAdapter>{children}</ThemeModeAdapter>
    </ThemeProvider>
  );
}

export default AppThemeProvider;
