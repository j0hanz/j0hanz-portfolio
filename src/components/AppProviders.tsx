import { ReactNode } from 'react';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';

import AppThemeProvider from '@/components/AppThemeProvider';
import { CvModalProvider } from '@/components/CvModalProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import { NavigationProvider } from '@/components/NavigationProvider';
import { SnackbarProvider } from '@/components/SnackbarProvider';
import { queryClient } from '@/utils/query/index';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Wraps the application with all necessary context providers.
 * Order matters:
 * 1. QueryClientProvider (Data fetching)
 * 2. QueryErrorResetBoundary (Query error handling)
 * 3. ErrorBoundary (Global error handling)
 * 4. AppThemeProvider (Theme context)
 * 5. SnackbarProvider (Notifications)
 * 6. NavigationProvider (Routing/Navigation)
 * 7. CvModalProvider (Modal state)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      {/* 
        InitColorSchemeScript is placed here for SPA mode. 
        Ideally, this should be in index.html to prevent FOUC, 
        but for a pure client-side app, this ensures the script runs early in the React tree.
      */}
      <InitColorSchemeScript attribute="data-mui-color-scheme" />
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset}>
              <AppThemeProvider>
                <SnackbarProvider>
                  <NavigationProvider>
                    <CvModalProvider>{children}</CvModalProvider>
                  </NavigationProvider>
                </SnackbarProvider>
              </AppThemeProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </>
  );
}
