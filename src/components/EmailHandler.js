import React, { useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';

const EmailHandler = ({ formData, onEmailSent }) => {
  const { name, email, company, url, message } = formData;
  const form = useRef(null);

  /* useEffect hook to send the email when formData changes */
  useEffect(() => {
    /* Function to send the email using emailjs */
    const sendEmail = () => {
      if (!form.current) return;
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          form.current,
          process.env.REACT_APP_USER_ID
        )
        .then(() => onEmailSent(true))
        .catch(() => onEmailSent(false));
    };
    sendEmail();
  }, [formData, onEmailSent]);

  return (
    <form ref={form} style={{ display: 'none' }}>
      <input type="hidden" name="to_email" value="your_email@example.com" />
      <input type="hidden" name="from_name" value={name} />
      <input type="hidden" name="from_email" value={email} />
      <input type="hidden" name="company" value={company} />
      <input type="hidden" name="url" value={url} />
      <input type="hidden" name="message" value={message} />
    </form>
  );
};

export default EmailHandler;
