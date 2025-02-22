import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { validateForm } from '@/utils/validation';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  email: string;
  company: string;
  url: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  url?: string;
  message?: string;
}

// Custom hook for managing contact form state and logic
const useContactForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    url: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    },
    [formData],
  );

  // Handle email sent status
  const handleEmailSent = useCallback((success: boolean) => {
    setIsSending(false);
    if (success) {
      setFormData({ name: '', email: '', company: '', url: '', message: '' });
      toast.success('Your message was sent successfully!');
    } else {
      toast.error('Failed to send message! Please try again later.');
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newErrors = validateForm(formData);
      setErrors(newErrors);
      const formValid = Object.keys(newErrors).length === 0;
      setValidated(formValid);
      if (formValid) {
        setIsSending(true);
      }
    },
    [formData],
  );

  // Handle form reset
  const handleReset = useCallback(() => {
    setFormData({ name: '', email: '', company: '', url: '', message: '' });
    setErrors({});
    setValidated(false);
  }, []);

  return {
    validated,
    isSending,
    formData,
    errors,
    handleChange,
    handleEmailSent,
    handleSubmit,
    handleReset,
  };
};

export default useContactForm;
