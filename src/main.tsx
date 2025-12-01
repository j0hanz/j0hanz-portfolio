import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { AppProviders } from '@/components/AppProviders';
import { initEmailJs } from '@/lib/emailJs';

import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

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
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
