import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import {
  ContactFormErrors,
  ContactFormValues,
  FieldName,
} from '@/config/types';
import { useDebounce, useUpdateEffect } from '@/hooks';
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

const SEND_ERROR_MESSAGE = 'Failed to send message! Please try again later.';

const updateError = (
  setErrors: Dispatch<SetStateAction<ContactFormErrors>>,
  field: keyof ContactFormErrors,
  message?: string
): void => {
  setErrors((prev) => {
    if (!message) {
      if (!(field in prev)) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    }
    if (prev[field] === message) return prev;
    return { ...prev, [field]: message };
  });
};

const useContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] =
    useState<ContactFormValues>(buildInitialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'success'>(
    'idle'
  );

  const debouncedEmail = useDebounce(formData.email, 600);
  const debouncedUrl = useDebounce(formData.url, 600);

  useUpdateEffect(() => {
    updateError(setErrors, 'email', validateEmail(debouncedEmail));
  }, [debouncedEmail]);

  useUpdateEffect(() => {
    updateError(setErrors, 'url', validateUrl(debouncedUrl));
  }, [debouncedUrl]);

  const handleChange = useEventCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name as FieldName]: value }));
    }
  )!;

  const resetFields = useEventCallback(() => {
    setFormData(buildInitialValues());
    setErrors({});
  })!;

  const resetForm = useEventCallback(() => {
    resetFields();
    setSubmissionState('idle');
  })!;

  useEffect(() => {
    if (submissionState !== 'success') return;

    const timeoutId = window.setTimeout(() => {
      setSubmissionState('idle');
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [submissionState]);

  const handleSubmit = useEventCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newErrors = validateForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      setIsSending(true);
      try {
        const success = await sendEmail(formData);
        if (success) {
          resetFields();
          setSubmissionState('success');
          toast.success('Your message was sent successfully!');
        } else {
          setSubmissionState('idle');
          toast.error(SEND_ERROR_MESSAGE);
        }
      } catch {
        setSubmissionState('idle');
        toast.error(SEND_ERROR_MESSAGE);
      } finally {
        setIsSending(false);
      }
    }
  )!;

  const handleReset = useEventCallback(() => {
    resetForm();
    setIsSending(false);
  })!;

  return {
    isSending,
    submissionState,
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

export default useContactForm;
