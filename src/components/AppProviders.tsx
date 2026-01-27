import type { JSX, ReactNode } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
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

const inputAutoFillStyles = (
  <GlobalStyles
    styles={{
      '@keyframes mui-auto-fill': { from: { display: 'block' } },
      '@keyframes mui-auto-fill-cancel': { from: { display: 'block' } },
    }}
  />
);

// Composes providers into nested structure (applies right-to-left)
// Example: compose(A, B, C) renders as <A><B><C>{children}</C></B></A>
const composeProviders = (...providers: Provider[]): Provider =>
  function ComposedProviders({
    children,
  }: Readonly<{ children: ReactNode }>): JSX.Element {
    const nested = providers.reduceRight<ReactNode>(
      (node, Provider) => <Provider>{node}</Provider>,
      children
    );
    return <>{nested}</>;
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
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <>
      <InitColorSchemeScript attribute="data-mui-color-scheme" />{' '}
      {inputAutoFillStyles} <ComposedProviders>{children}</ComposedProviders>
    </>
  );
}
