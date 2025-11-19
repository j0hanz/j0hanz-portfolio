import {
  EMAIL_PATTERN,
  ERROR_MESSAGES,
  MIN_MESSAGE_LENGTH,
  NAME_PATTERN,
  URL_PATTERN,
} from '@/config/constants';
import { ContactFormErrors, ContactFormValues } from '@/config/types';

const trim = (value: string): string => value.trim();

export const validateName = (value: string): string | undefined => {
  const trimmedValue = trim(value);
  if (!trimmedValue) return ERROR_MESSAGES.NAME_REQUIRED;
  if (!NAME_PATTERN.test(trimmedValue)) return ERROR_MESSAGES.NAME_INVALID;
  return undefined;
};

export const validateEmail = (value: string): string | undefined => {
  const trimmedValue = trim(value);
  if (!trimmedValue) return ERROR_MESSAGES.EMAIL_REQUIRED;
  if (!EMAIL_PATTERN.test(trimmedValue)) return ERROR_MESSAGES.EMAIL_INVALID;
  return undefined;
};

export const validateUrl = (value: string): string | undefined => {
  const trimmedValue = trim(value);
  if (trimmedValue && !URL_PATTERN.test(trimmedValue)) {
    return ERROR_MESSAGES.URL_INVALID;
  }
  return undefined;
};

export const validateMessage = (value: string): string | undefined => {
  const trimmedValue = trim(value);
  if (!trimmedValue) return ERROR_MESSAGES.MESSAGE_REQUIRED;
  if (trimmedValue.length < MIN_MESSAGE_LENGTH) {
    return ERROR_MESSAGES.MESSAGE_TOO_SHORT;
  }
  return undefined;
};

export const validateForm = (
  formData: ContactFormValues
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const nameError = validateName(formData.name);
  const emailError = validateEmail(formData.email);
  const urlError = validateUrl(formData.url);
  const messageError = validateMessage(formData.message);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (urlError) errors.url = urlError;
  if (messageError) errors.message = messageError;

  return errors;
};
