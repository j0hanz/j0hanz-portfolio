import {
  ContactFormErrors,
  ContactFormValues,
  ValidationError,
} from '@/config/types';

const NAME_PATTERN = /^[a-zA-Z\s]{2,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;

const MIN_MESSAGE_LENGTH = 10;

const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Name is required.',
  NAME_INVALID: 'Please enter a valid name (letters and spaces only).',
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_INVALID: 'Email address is invalid.',
  URL_INVALID: 'URL is invalid.',
  MESSAGE_REQUIRED: 'Message is required.',
  MESSAGE_TOO_SHORT: `Message must be at least ${MIN_MESSAGE_LENGTH} characters long.`,
} as const;

const trim = (value: string): string => value.trim();

export const validateName = (value: string): ValidationError => {
  const trimmedValue = trim(value);
  if (!trimmedValue) return ERROR_MESSAGES.NAME_REQUIRED;
  if (!NAME_PATTERN.test(trimmedValue)) return ERROR_MESSAGES.NAME_INVALID;
  return undefined;
};

export const validateEmail = (value: string): ValidationError => {
  const trimmedValue = trim(value);
  if (!trimmedValue) return ERROR_MESSAGES.EMAIL_REQUIRED;
  if (!EMAIL_PATTERN.test(trimmedValue)) return ERROR_MESSAGES.EMAIL_INVALID;
  return undefined;
};

export const validateUrl = (value: string): ValidationError => {
  const trimmedValue = trim(value);
  if (trimmedValue && !URL_PATTERN.test(trimmedValue)) {
    return ERROR_MESSAGES.URL_INVALID;
  }
  return undefined;
};

export const validateMessage = (value: string): ValidationError => {
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
