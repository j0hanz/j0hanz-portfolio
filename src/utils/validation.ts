import {
  EMAIL_PATTERN,
  ERROR_MESSAGES,
  MIN_MESSAGE_LENGTH,
  NAME_PATTERN,
  URL_PATTERN,
} from '@/config/constants';
import type {
  ContactFormErrors,
  ContactFormValues,
  ValidationError,
} from '@/config/types';

interface ValidatorConfig {
  required?: string;
  pattern?: { regex: RegExp; error: string };
  minLength?: { value: number; error: string };
  optional?: boolean;
}

// Generic validator factory to reduce duplication
function createValidator(config: ValidatorConfig) {
  return (value: string): ValidationError => {
    const trimmed = value.trim();

    if (!trimmed) {
      return config.optional ? undefined : config.required;
    }

    if (config.pattern && !config.pattern.regex.test(trimmed)) {
      return config.pattern.error;
    }

    if (config.minLength && trimmed.length < config.minLength.value) {
      return config.minLength.error;
    }

    return undefined;
  };
}

export const validateName = createValidator({
  required: ERROR_MESSAGES.NAME_REQUIRED,
  pattern: { regex: NAME_PATTERN, error: ERROR_MESSAGES.NAME_INVALID },
});

export const validateEmail = createValidator({
  required: ERROR_MESSAGES.EMAIL_REQUIRED,
  pattern: { regex: EMAIL_PATTERN, error: ERROR_MESSAGES.EMAIL_INVALID },
});

export const validateUrl = createValidator({
  optional: true,
  pattern: { regex: URL_PATTERN, error: ERROR_MESSAGES.URL_INVALID },
});

export const validateMessage = createValidator({
  required: ERROR_MESSAGES.MESSAGE_REQUIRED,
  minLength: {
    value: MIN_MESSAGE_LENGTH,
    error: ERROR_MESSAGES.MESSAGE_TOO_SHORT,
  },
});

// Validator map for cleaner form validation
const validators: Record<
  keyof ContactFormErrors,
  (v: string) => ValidationError
> = {
  name: validateName,
  email: validateEmail,
  url: validateUrl,
  message: validateMessage,
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
