import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import {
  ContactFormErrors,
  ContactFormValues,
  FieldName,
} from '@/config/types';
import { useDebounce, useUpdateEffect } from '@/hooks';
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

const applyValidationResult = (
  setErrors: Dispatch<SetStateAction<ContactFormErrors>>,
  field: keyof ContactFormErrors,
  message?: string
): void => {
  setErrors((prevErrors) => {
    // Early return if no message and field not present
    if (!message) {
      if (!(field in prevErrors)) return prevErrors;
      const { [field]: _removed, ...nextErrors } = prevErrors;
      return nextErrors;
    }

    // Early return if message hasn't changed
    if (prevErrors[field] === message) return prevErrors;

    return { ...prevErrors, [field]: message };
  });
};

const useContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] =
    useState<ContactFormValues>(buildInitialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const debouncedEmail = useDebounce(formData.email, 350);
  const debouncedUrl = useDebounce(formData.url, 350);

  useUpdateEffect(() => {
    applyValidationResult(setErrors, 'email', validateEmail(debouncedEmail));
  }, [debouncedEmail]);

  useUpdateEffect(() => {
    applyValidationResult(setErrors, 'url', validateUrl(debouncedUrl));
  }, [debouncedUrl]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name as FieldName]: value }));
  };

  const resetForm = () => {
    setFormData(buildInitialValues());
    setErrors({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        resetForm();
        toast.success('Your message was sent successfully!');
      } else {
        toast.error(SEND_ERROR_MESSAGE);
      }
    } catch {
      toast.error(SEND_ERROR_MESSAGE);
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    resetForm();
    setIsSending(false);
  };

  return {
    isSending,
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

export default useContactForm;
