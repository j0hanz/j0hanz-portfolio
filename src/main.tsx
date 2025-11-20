import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from '@/App';
import AppThemeProvider from '@/components/AppThemeProvider';
import { initEmailJs } from '@/lib/emailJs';

import '@/styles/toastify.css';
import '@/styles/variables.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import 'flag-icons/css/flag-icons.min.css';

// Initialize EmailJS
initEmailJs();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>
);
