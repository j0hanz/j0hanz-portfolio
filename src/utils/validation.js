export const validateForm = (formData) => {
  const newErrors = {};
  if (!/^[a-zA-Z\s]{2,}$/.test(formData.name.trim())) {
    newErrors.name = 'Please enter a valid name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Email address is invalid.';
  }
  if (
    formData.url.trim() &&
    !/^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?$/.test(formData.url.trim())
  ) {
    newErrors.url = 'URL is invalid.';
  }
  if (formData.message.trim().length < 10) {
    newErrors.message = 'Message must be at least 10 characters long.';
  }
  return newErrors;
};
