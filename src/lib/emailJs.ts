import emailjs from '@emailjs/browser';

import type { ContactFormValues as FormData } from '@/config/types';

// Required environment variables for EmailJS
const ENV_KEYS = [
  'VITE_SERVICE_ID',
  'VITE_TEMPLATE_ID',
  'VITE_USER_ID',
] as const;

// Gets environment variable or throws if missing
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (typeof value !== 'string') {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

// Validates all required environment variables at startup
export const validateEnvVars = (): { valid: boolean; missing: string[] } => {
  const missing = ENV_KEYS.filter(
    (key) => typeof import.meta.env[key] !== 'string'
  );
  return { valid: missing.length === 0, missing };
};

export const initEmailJs = (): void => {
  try {
    emailjs.init(getEnvVar('VITE_USER_ID'));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('EmailJS init failed:', error);
    }
  }
};

export const sendEmail = async (formData: FormData): Promise<boolean> => {
  try {
    const serviceId = getEnvVar('VITE_SERVICE_ID');
    const templateId = getEnvVar('VITE_TEMPLATE_ID');
    const userId = getEnvVar('VITE_USER_ID');

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || '',
        url: formData.url || '',
        message: formData.message,
      },
      userId
    );
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to send email:', error);
    }
    return false;
  }
};
