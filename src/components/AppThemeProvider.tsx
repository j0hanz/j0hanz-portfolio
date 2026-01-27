import { ReactNode, useOptimistic, useTransition } from 'react';

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

function ThemeModeAdapter({ children }: Readonly<{ children: ReactNode }>) {
  const [isPending, startTransition] = useTransition();
  const { mode, systemMode, setMode } = useColorScheme();

  // Resolve actual mode: if 'system', use systemMode; fallback to 'light'
  const resolvedMode: PaletteMode =
    mode === 'system' ? (systemMode ?? 'light') : (mode ?? 'light');

  // Optimistic theme mode: immediately show toggled mode for instant feedback
  const [optimisticMode, setOptimisticMode] = useOptimistic<
    PaletteMode,
    PaletteMode
  >(resolvedMode, (_current, newMode) => newMode);

  // Wrap theme changes in transition with optimistic update for non-blocking UI
  const toggleMode = useEventCallback(() => {
    const nextMode = resolvedMode === 'dark' ? 'light' : 'dark';
    startTransition(() => {
      setOptimisticMode(nextMode);
      setMode(nextMode);
    });
  });

  const handleSetMode = useEventCallback(
    (nextMode: PaletteMode | ((prev: PaletteMode) => PaletteMode)) => {
      const computedMode =
        typeof nextMode === 'function' ? nextMode(resolvedMode) : nextMode;
      startTransition(() => {
        setOptimisticMode(computedMode);
        setMode(computedMode);
      });
    }
  );

  // Use optimistic mode for immediate UI updates, fallback to resolved mode
  const displayMode = isPending ? optimisticMode : resolvedMode;

  // Split context values for render optimization
  const stateValue: ThemeModeState = { mode: displayMode, isPending };
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
}: Readonly<AppThemeProviderProps>): React.JSX.Element {
  return (
    <ThemeProvider theme={appTheme} defaultMode="light">
      <CssBaseline />
      <ThemeModeAdapter>{children}</ThemeModeAdapter>
    </ThemeProvider>
  );
}

export { AppThemeProvider };
