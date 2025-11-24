import { ContactFormErrors, ContactFormValues } from '@/config/types';
import { sendEmail } from '@/lib/emailJs';
import { validateForm } from '@/utils/validation';

export type ActionState = {
  success?: boolean;
  errors?: ContactFormErrors;
  message?: string;
  timestamp?: number;
  values?: ContactFormValues; // Return values to repopulate form on error
};

export async function sendEmailAction(
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const values: ContactFormValues = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: (formData.get('company') as string) || '',
    url: (formData.get('url') as string) || '',
    message: formData.get('message') as string,
  };

  const errors = validateForm(values);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: 'Please fix the errors below.',
      timestamp: Date.now(),
      values,
    };
  }

  try {
    const success = await sendEmail(values);
    if (success) {
      return {
        success: true,
        message: 'Your message was sent successfully!',
        timestamp: Date.now(),
        // Don't return values on success to clear the form (if we were using controlled state, but for uncontrolled we might need to reset the form ref)
      };
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please try again.',
        timestamp: Date.now(),
        values,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
      timestamp: Date.now(),
      values,
    };
  }
}
