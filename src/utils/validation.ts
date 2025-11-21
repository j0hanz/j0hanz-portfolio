import {
  EMAIL_PATTERN,
  ERROR_MESSAGES,
  MIN_MESSAGE_LENGTH,
  NAME_PATTERN,
  URL_PATTERN,
} from '@/config/constants';
import {
  ContactFormErrors,
  ContactFormValues,
  ValidationError,
} from '@/config/types';

export const validateName = (value: string): ValidationError => {
  const trimmed = value.trim();
  if (!trimmed) return ERROR_MESSAGES.NAME_REQUIRED;
  if (!NAME_PATTERN.test(trimmed)) return ERROR_MESSAGES.NAME_INVALID;
  return undefined;
};

export const validateEmail = (value: string): ValidationError => {
  const trimmed = value.trim();
  if (!trimmed) return ERROR_MESSAGES.EMAIL_REQUIRED;
  if (!EMAIL_PATTERN.test(trimmed)) return ERROR_MESSAGES.EMAIL_INVALID;
  return undefined;
};

export const validateUrl = (value: string): ValidationError => {
  const trimmed = value.trim();
  if (trimmed && !URL_PATTERN.test(trimmed)) {
    return ERROR_MESSAGES.URL_INVALID;
  }
  return undefined;
};

export const validateMessage = (value: string): ValidationError => {
  const trimmed = value.trim();
  if (!trimmed) return ERROR_MESSAGES.MESSAGE_REQUIRED;
  if (trimmed.length < MIN_MESSAGE_LENGTH) {
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
