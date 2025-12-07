import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { AppProviders } from '@/components/AppProviders';
import { initEmailJs, validateEnvVars } from '@/lib/emailJs';

import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

// Validate required environment variables (fail-fast in development)
const { valid, missing } = validateEnvVars();
if (!valid && import.meta.env.DEV) {
  console.warn(
    `Missing required environment variables: ${missing.join(', ')}. ` +
      'Contact form will not work. See .env.example for required variables.'
  );
}

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
