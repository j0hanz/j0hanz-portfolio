import type { JSX, ReactNode } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';

import { AppThemeProvider } from '@/components/AppThemeProvider';
import { CvModalProvider } from '@/components/CvModalProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { MenuProvider } from '@/components/MenuProvider';
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

const MotionProvider: Provider = ({ children }) => (
  <MotionConfig reducedMotion="user">
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  </MotionConfig>
);

const ComposedProviders = composeProviders(
  QueryProvider,
  QueryErrorBoundaryProvider,
  AppThemeProvider,
  MotionProvider,
  SnackbarProvider,
  NavigationProvider,
  MenuProvider,
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
