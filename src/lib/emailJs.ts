import emailjs from '@emailjs/browser';

import { ContactFormValues as FormData } from '@/config/types';

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
    const [serviceId, templateId, userId] = ENV_KEYS.map(getEnvVar);

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
