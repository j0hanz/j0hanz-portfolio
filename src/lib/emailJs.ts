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

const buildTemplateParams = (formData: FormData): Record<string, string> => ({
  from_name: formData.name,
  from_email: formData.email,
  company: formData.company || '',
  url: formData.url || '',
  message: formData.message,
});

export const sendEmail = async (formData: FormData): Promise<boolean> => {
  const templateParams = buildTemplateParams(formData);

  try {
    const serviceId = getEnvVariable('VITE_SERVICE_ID');
    const templateId = getEnvVariable('VITE_TEMPLATE_ID');
    const userId = getEnvVariable('VITE_USER_ID');

    await emailjs.send(serviceId, templateId, templateParams, userId);
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('Failed to send email:', errorMessage);
    }
    return false;
  }
};
