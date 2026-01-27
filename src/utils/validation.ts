import { ERROR_MESSAGES, VALIDATION } from '@/config/constants';
import type {
  ContactFormErrors,
  ContactFormValues,
  ValidationError,
  ValidatorConfig,
} from '@/config/types';

// Generic validator factory
const createValidator =
  (config: ValidatorConfig) =>
  (value: string): ValidationError => {
    const trimmed = value.trim();
    if (!trimmed) return config.optional ? undefined : config.required;
    if (config.pattern && !config.pattern.regex.test(trimmed))
      return config.pattern.error;
    if (config.minLength && trimmed.length < config.minLength.value)
      return config.minLength.error;
    return undefined;
  };

const isValidEmail = (value: string): boolean => {
  if (value.includes(' ')) return false;
  const atIndex = value.indexOf('@');
  if (atIndex <= 0 || atIndex !== value.lastIndexOf('@')) return false;
  const domain = value.slice(atIndex + 1);
  if (!domain || domain.startsWith('.') || domain.endsWith('.')) return false;
  return domain.includes('.');
};

const isValidUrl = (value: string): boolean => {
  const normalized =
    value.startsWith('http://') || value.startsWith('https://')
      ? value
      : `https://${value}`;
  try {
    const url = new URL(normalized);
    return Boolean(url.hostname);
  } catch {
    return false;
  }
};

// Validator map (internal use only)
const validators: Record<
  keyof ContactFormErrors,
  (v: string) => ValidationError
> = {
  name: createValidator({
    required: ERROR_MESSAGES.NAME_REQUIRED,
    pattern: {
      regex: VALIDATION.NAME_PATTERN,
      error: ERROR_MESSAGES.NAME_INVALID,
    },
  }),
  email: (value: string): ValidationError => {
    const trimmed = value.trim();
    if (!trimmed) return ERROR_MESSAGES.EMAIL_REQUIRED;
    return isValidEmail(trimmed) ? undefined : ERROR_MESSAGES.EMAIL_INVALID;
  },
  url: (value: string): ValidationError => {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    return isValidUrl(trimmed) ? undefined : ERROR_MESSAGES.URL_INVALID;
  },
  message: createValidator({
    required: ERROR_MESSAGES.MESSAGE_REQUIRED,
    minLength: {
      value: VALIDATION.MIN_MESSAGE_LENGTH,
      error: ERROR_MESSAGES.MESSAGE_TOO_SHORT,
    },
  }),
};

export function validateForm(formData: ContactFormValues): ContactFormErrors {
  const entries = Object.entries(validators)
    .map(([key, validate]) => {
      const fieldKey = key as keyof ContactFormErrors;
      const error = validate(formData[fieldKey] ?? '');
      return error ? [fieldKey, error] : null;
    })
    .filter(
      (entry): entry is [keyof ContactFormErrors, string] => entry !== null
    );

  return Object.fromEntries(entries);
}
