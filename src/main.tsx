import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';

import App from '@/App';
import AppThemeProvider from '@/components/AppThemeProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SnackbarProvider } from '@/components/SnackbarProvider';
import { initEmailJs } from '@/lib/emailJs';
import { queryClient } from '@/utils/query/index';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import 'flag-icons/css/flag-icons.min.css';

// Initialize EmailJS
initEmailJs();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(
    'Root element not found. Ensure index.html has an element with id="root".'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <InitColorSchemeScript />
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset}>
            <AppThemeProvider>
              <SnackbarProvider>
                <App />
              </SnackbarProvider>
            </AppThemeProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  </StrictMode>
);
