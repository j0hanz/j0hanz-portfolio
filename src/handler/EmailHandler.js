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
          'service_h7mpv2i',
          'template_mnrvg75',
          form.current,
          'kMJNphEQu6FYZEE90'
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
