export const validateForm = (formData) => {
  const newErrors = {};
  if (!/^[a-zA-Z\s]{2,}$/.test(formData.name.trim())) {
    newErrors.name = 'Please enter a valid name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }
  if (formData.message.trim().length < 10) {
    newErrors.message = 'Your message should be at least 10 characters long.';
  }
  return newErrors;
};
