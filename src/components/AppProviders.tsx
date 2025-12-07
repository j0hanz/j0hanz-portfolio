import type { JSX, ReactNode } from 'react';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';

import { AppThemeProvider } from '@/components/AppThemeProvider';
import { CvModalProvider } from '@/components/CvModalProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { NavigationProvider } from '@/components/NavigationProvider';
import { SnackbarProvider } from '@/components/SnackbarProvider';
import type { Provider } from '@/config/types';
import { queryClient } from '@/utils/query/index';

// Composes providers into nested structure (applies right-to-left)
// Example: compose(A, B, C) renders as <A><B><C>{children}</C></B></A>
const composeProviders = (...providers: Provider[]): Provider =>
  function ComposedProviders({ children }) {
    return providers.reduceRight<ReactNode>(
      (nested, Provider) => <Provider>{nested}</Provider>,
      children
    );
  };

// Wrapper providers with render props pattern
const QueryErrorBoundaryProvider: Provider = ({ children }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => <ErrorBoundary onReset={reset}>{children}</ErrorBoundary>}
  </QueryErrorResetBoundary>
);

const QueryProvider: Provider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Provider composition: outermost → innermost
// Order: Data layer → error handling → theming → notifications → navigation → modals
const ComposedProviders = composeProviders(
  QueryProvider,
  QueryErrorBoundaryProvider,
  AppThemeProvider,
  SnackbarProvider,
  NavigationProvider,
  CvModalProvider
);

export function AppProviders({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <InitColorSchemeScript attribute="data-mui-color-scheme" />
      <ComposedProviders>{children}</ComposedProviders>
    </>
  );
}
