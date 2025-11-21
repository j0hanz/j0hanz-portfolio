import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import { SEND_ERROR_MESSAGE } from '@/config/constants';
import {
  ContactFormErrors,
  ContactFormValues,
  FieldName,
  SubmissionResult,
} from '@/config/types';
import { useDebounce } from '@/hooks';
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

const buildValuesFromFormData = (formData: FormData): ContactFormValues => ({
  name: (formData.get('name') ?? '') as string,
  email: (formData.get('email') ?? '') as string,
  company: (formData.get('company') ?? '') as string,
  url: (formData.get('url') ?? '') as string,
  message: (formData.get('message') ?? '') as string,
});

const useContactForm = () => {
  const [formData, setFormData] =
    useState<ContactFormValues>(buildInitialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'success'>(
    'idle'
  );

  const debouncedEmail = useDebounce(formData.email, 600);
  const debouncedUrl = useDebounce(formData.url, 600);
  const hasValidatedEmailRef = useRef(false);
  const hasValidatedUrlRef = useRef(false);

  useEffect(() => {
    if (!hasValidatedEmailRef.current) {
      hasValidatedEmailRef.current = true;
      return;
    }
    updateError(setErrors, 'email', validateEmail(debouncedEmail));
  }, [debouncedEmail]);

  useEffect(() => {
    if (!hasValidatedUrlRef.current) {
      hasValidatedUrlRef.current = true;
      return;
    }
    updateError(setErrors, 'url', validateUrl(debouncedUrl));
  }, [debouncedUrl]);

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

  useEffect(() => {
    if (submissionState !== 'success') return;

    const timeoutId = window.setTimeout(() => {
      setSubmissionState('idle');
    }, 3200);

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
        if (success) {
          resetFields();
          setSubmissionState('success');
          toast.success('Your message was sent successfully!');
          return { status: 'success' };
        }

        setSubmissionState('idle');
        toast.error(SEND_ERROR_MESSAGE);
        return { status: 'error', errorMessage: SEND_ERROR_MESSAGE };
      } catch {
        setSubmissionState('idle');
        toast.error(SEND_ERROR_MESSAGE);
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
