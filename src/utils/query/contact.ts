// Contact form mutation with TanStack Query
import { useMutation } from '@tanstack/react-query';

import type { ContactFormValues } from '@/config/types';
import { sendEmail } from '@/lib/emailJs';
import { validateForm } from '@/utils/validation';

// Submits contact form via EmailJS (validates and returns success/failure)
async function submitContactForm(data: ContactFormValues): Promise<boolean> {
  // Validate form data before submission
  const errors = validateForm(data);
  if (Object.keys(errors).length > 0) {
    // Throw first error message for mutation to catch
    const firstError = Object.values(errors)[0];
    throw new Error(firstError);
  }

  // Send email via EmailJS
  const success = await sendEmail(data);

  if (!success) {
    throw new Error('Failed to send message. Please try again.');
  }

  return success;
}

// Mutation hook for contact form (1 retry, with isPending/isSuccess/isError states)
export function useContactFormMutation() {
  return useMutation<boolean, Error, ContactFormValues>({
    mutationFn: submitContactForm,
    retry: 1,
    // Note: onSuccess and onError can be provided when calling mutate()
    // to integrate with component-specific logic like showing snackbars
  });
}
