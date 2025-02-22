interface FormData {
  name: string;
  email: string;
  url: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  url?: string;
  message?: string;
}

export const validateForm = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};
  /* Validate name */
  if (!/^[a-zA-Z\s]{2,}$/.test(formData.name.trim())) {
    newErrors.name = 'Please enter a valid name.';
  }
  /* Validate email */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Email address is invalid.';
  }
  /* Validate URL if provided */
  if (
    formData.url.trim() &&
    !/^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?$/.test(formData.url.trim())
  ) {
    newErrors.url = 'URL is invalid.';
  }
  /* Validate message length */
  if (formData.message.trim().length < 10) {
    newErrors.message = 'Message must be at least 10 characters long.';
  }
  return newErrors;
};
