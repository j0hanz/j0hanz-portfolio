import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { QueryClientProvider } from '@tanstack/react-query';

import App from '@/App';
import AppThemeProvider from '@/components/AppThemeProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import { initEmailJs } from '@/lib/emailJs';
import { queryClient } from '@/utils/query';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import 'flag-icons/css/flag-icons.min.css';

// Initialize EmailJS
initEmailJs();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InitColorSchemeScript />
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
