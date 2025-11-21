import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SEND_ERROR_MESSAGE } from '@/config/constants';
import {
  ContactFormErrors,
  ContactFormValues,
  FieldName,
  SubmissionResult,
} from '@/config/types';
import { useDebounce, useSnackbar } from '@/hooks';
import useEventCallback from '@/hooks/useEventCallback';
import { sendEmail } from '@/lib/emailJs';
import { validateEmail, validateForm, validateUrl } from '@/utils/validation';

const buildInitialValues = (): ContactFormValues => ({
  name: '',
  email: '',
  company: '',
  url: '',
  message: '',
});

const buildValuesFromFormData = (formData: FormData): ContactFormValues => ({
  name: (formData.get('name') ?? '') as string,
  email: (formData.get('email') ?? '') as string,
  company: (formData.get('company') ?? '') as string,
  url: (formData.get('url') ?? '') as string,
  message: (formData.get('message') ?? '') as string,
});

// Debounce delay constants
const EMAIL_DEBOUNCE_DELAY = 600;
const URL_DEBOUNCE_DELAY = 600;
const SUCCESS_RESET_DELAY = 3200;

/**
 * Updates or clears a field error in state
 */
const updateError = (
  setErrors: Dispatch<SetStateAction<ContactFormErrors>>,
  field: keyof ContactFormErrors,
  message?: string
): void => {
  setErrors((prev) => {
    // Clear error if no message
    if (!message) {
      if (!(field in prev)) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    }
    // Only update if message changed
    if (prev[field] === message) return prev;
    return { ...prev, [field]: message };
  });
};

/**
 * Hook to manage debounced field validation
 */
function useFieldValidation(
  value: string,
  validator: (val: string) => string | undefined,
  fieldName: keyof ContactFormErrors,
  setErrors: Dispatch<SetStateAction<ContactFormErrors>>,
  delay: number
) {
  const debouncedValue = useDebounce(value, delay);
  const hasValidated = useRef(false);

  useEffect(() => {
    // Skip initial validation
    if (!hasValidated.current) {
      hasValidated.current = true;
      return;
    }
    updateError(setErrors, fieldName, validator(debouncedValue));
  }, [debouncedValue, validator, fieldName, setErrors]);
}

const useContactForm = () => {
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] =
    useState<ContactFormValues>(buildInitialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'success'>(
    'idle'
  );

  // Debounced validation for email and URL
  useFieldValidation(
    formData.email,
    validateEmail,
    'email',
    setErrors,
    EMAIL_DEBOUNCE_DELAY
  );
  useFieldValidation(
    formData.url,
    validateUrl,
    'url',
    setErrors,
    URL_DEBOUNCE_DELAY
  );

  const handleChange = useEventCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name as FieldName]: value }));
    }
  );

  const resetFields = useEventCallback(() => {
    setFormData(buildInitialValues());
    setErrors({});
  });

  const resetForm = useEventCallback(() => {
    resetFields();
    setSubmissionState('idle');
  });

  // Auto-reset success state
  useEffect(() => {
    if (submissionState !== 'success') return;

    const timeoutId = window.setTimeout(() => {
      setSubmissionState('idle');
    }, SUCCESS_RESET_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [submissionState]);

  const [actionResult, submitAction, isPending] = useActionState<
    SubmissionResult,
    FormData
  >(
    async (_previousState, submittedFormData) => {
      const submittedValues = buildValuesFromFormData(submittedFormData);
      const newErrors = validateForm(submittedValues);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return { status: 'error' };
      }

      try {
        const success = await sendEmail(submittedValues);

        if (!success) {
          setSubmissionState('idle');
          showSnackbar(SEND_ERROR_MESSAGE, 'error');
          return { status: 'error', errorMessage: SEND_ERROR_MESSAGE };
        }

        resetFields();
        setSubmissionState('success');
        showSnackbar('Your message was sent successfully!', 'success');
        return { status: 'success' };
      } catch {
        setSubmissionState('idle');
        showSnackbar(SEND_ERROR_MESSAGE, 'error');
        return { status: 'error', errorMessage: SEND_ERROR_MESSAGE };
      }
    },
    { status: 'idle' }
  );

  const handleReset = useEventCallback(() => {
    resetForm();
  });

  return {
    isSending: isPending,
    submissionState,
    formData,
    errors,
    actionResult,
    handleChange,
    submitAction,
    handleReset,
  };
};

export default useContactForm;
