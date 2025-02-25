import { useRef, useEffect, FC, useCallback } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  company: string;
  url: string;
  message: string;
}

interface EmailHandlerProps {
  formData: FormData;
  onEmailSent: (success: boolean) => void;
}

// Handling email sending via EmailJS
const EmailHandler: FC<EmailHandlerProps> = ({ formData, onEmailSent }) => {
  const { name, email, company, url, message } = formData;
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = useCallback((): void => {
    if (!form.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID as string,
        import.meta.env.VITE_TEMPLATE_ID as string,
        form.current,
        import.meta.env.VITE_USER_ID as string,
      )
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        onEmailSent(true);
      })
      .catch((error) => {
        console.error('Failed to send email. Error details:', error);
        onEmailSent(false);
      });
  }, [onEmailSent]);

  useEffect(() => {
    sendEmail();
  }, [sendEmail]);

  return (
    <>
      <form ref={form} style={{ display: 'none' }}>
        <input type="hidden" name="from_name" value={name} />
        <input type="hidden" name="from_email" value={email} />
        <input type="hidden" name="company" value={company} />
        <input type="hidden" name="url" value={url} />
        <input type="hidden" name="message" value={message} />
      </form>
    </>
  );
};

export default EmailHandler;
