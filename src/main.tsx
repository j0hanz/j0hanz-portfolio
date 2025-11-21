import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import App from '@/App';
import AppThemeProvider from '@/components/AppThemeProvider';
import { NavigationProvider } from '@/components/NavigationProvider';
import { initEmailJs } from '@/lib/emailJs';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import 'flag-icons/css/flag-icons.min.css';

// Initialize EmailJS
initEmailJs();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InitColorSchemeScript />
    <AppThemeProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </AppThemeProvider>
  </StrictMode>
);
