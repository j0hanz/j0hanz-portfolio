import emailjs from '@emailjs/browser';

import { ContactFormValues as FormData } from '@/config/types';

export const initEmailJs = (): void => {
  const userId = import.meta.env.VITE_USER_ID;
  if (typeof userId === 'string') {
    emailjs.init(userId);
  } else if (import.meta.env.DEV) {
    console.error('VITE_USER_ID is not defined');
  }
};

const getEnvVariable = (key: string): string => {
  const value = import.meta.env[key];
  if (typeof value !== 'string') {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const sendEmail = async (formData: FormData): Promise<boolean> => {
  const { name, email, company, url, message } = formData;

  const templateParams: Record<string, unknown> = {
    from_name: name,
    from_email: email,
    company,
    url,
    message,
  };

  try {
    const serviceId = getEnvVariable('VITE_SERVICE_ID');
    const templateId = getEnvVariable('VITE_TEMPLATE_ID');
    const userId = getEnvVariable('VITE_USER_ID');

    await emailjs.send(serviceId, templateId, templateParams, userId);
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      if (error instanceof Error) {
        console.error('Failed to send email:', error.message);
      } else {
        console.error('Failed to send email:', error);
      }
    }
    return false;
  }
};
