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

    // Additional URL protocol validation
    if (config.validateProtocol && trimmed) {
      try {
        const url = new URL(trimmed);
        if (!['http:', 'https:'].includes(url.protocol)) {
          return 'URL must use HTTP or HTTPS protocol';
        }
      } catch {
        // URL constructor threw error - already handled by pattern regex
      }
    }

    return undefined;
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
  email: createValidator({
    required: ERROR_MESSAGES.EMAIL_REQUIRED,
    pattern: {
      regex: VALIDATION.EMAIL_PATTERN,
      error: ERROR_MESSAGES.EMAIL_INVALID,
    },
  }),
  url: createValidator({
    optional: true,
    pattern: {
      regex: VALIDATION.URL_PATTERN,
      error: ERROR_MESSAGES.URL_INVALID,
    },
    validateProtocol: true,
  }),
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
