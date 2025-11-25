import { ReactNode } from 'react';

import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useColorScheme,
} from '@mui/material';

import { appTheme } from '@/config/theme';
import type {
  AppThemeProviderProps,
  ThemeModeActions,
  ThemeModeState,
} from '@/config/types';
import {
  ThemeModeActionsContext,
  ThemeModeStateContext,
} from '@/contexts/themeContext';
import { useEventCallback } from '@/hooks';

function ThemeModeAdapter({ children }: { children: ReactNode }) {
  const { mode, setMode } = useColorScheme();

  const resolvedMode: PaletteMode = (mode as PaletteMode) || 'light';

  // Wrap actions with useEventCallback for stable references
  const toggleMode = useEventCallback(() => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark');
  });

  const handleSetMode = useEventCallback(
    (nextMode: PaletteMode | ((prev: PaletteMode) => PaletteMode)) => {
      if (typeof nextMode === 'function') {
        setMode(nextMode(resolvedMode));
      } else {
        setMode(nextMode);
      }
    }
  );

  // Split context values for render optimization
  const stateValue: ThemeModeState = { mode: resolvedMode };
  const actionsValue: ThemeModeActions = {
    toggleMode,
    setMode: handleSetMode,
  };

  // React 19: Render context directly without .Provider
  return (
    <ThemeModeActionsContext value={actionsValue}>
      <ThemeModeStateContext value={stateValue}>
        {children}
      </ThemeModeStateContext>
    </ThemeModeActionsContext>
  );
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
