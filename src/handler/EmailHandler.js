import React, { useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';

// Functional component EmailHandler
const EmailHandler = ({ formData, onEmailSent }) => {
  const { name, email, message } = formData;
  const form = useRef(null);

  useEffect(() => {
    if (form.current) {
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          form.current,
          process.env.REACT_APP_USER_ID
        )
        .then(() => onEmailSent(true))
        .catch(() => onEmailSent(false));
    }
  }, [name, email, message, onEmailSent]);

  return (
    <form ref={form} style={{ display: 'none' }}>
      <input type="hidden" name="to_email" value="l.johansson93@outlook.com" />
      <input type="hidden" name="from_name" value={name} />
      <input type="hidden" name="from_email" value={email} />
      <input type="hidden" name="message" value={message} />
    </form>
  );
};

export default EmailHandler;
