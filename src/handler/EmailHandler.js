import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const EmailHandler = ({ formData, onEmailSent }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_h7mpv2i', 'template_mnrvg75', form.current, 'kMJNphEQu6FYZEE90')
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          onEmailSent(true); // Callback to notify parent component of success
        },
        (error) => {
          console.error('Failed to send email.', error.text);
          onEmailSent(false); // Callback to notify parent component of failure
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} style={{ display: 'none' }}>
      <input type="hidden" name="to_email" value="l.johansson93@outlook.com" />
      <input type="hidden" name="from_name" value={formData.name} />
      <input type="hidden" name="from_email" value={formData.email} />
      <input type="hidden" name="message" value={formData.message} />
    </form>
  );
};

export default EmailHandler;
