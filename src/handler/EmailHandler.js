import React, { useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';

const EmailHandler = ({ formData, onEmailSent }) => {
  const form = useRef();

  useEffect(() => {
    const sendEmail = () => {
      emailjs
        .sendForm(
          'service_h7mpv2i',
          'template_mnrvg75',
          form.current,
          'kMJNphEQu6FYZEE90',
        )
        .then(
          (result) => {
            onEmailSent(true); // Notify parent component of success
          },
          (error) => {
            onEmailSent(false); // Notify parent component of failure
          },
        );
    };

    sendEmail(); // Automatically send email when component mounts
  }, [formData, onEmailSent]);

  return (
    <form ref={form} style={{ display: 'none' }}>
      <input type="hidden" name="to_email" value="l.johansson93@outlook.com" />
      <input type="hidden" name="from_name" value={formData.name} />
      <input type="hidden" name="from_email" value={formData.email} />
      <input type="hidden" name="message" value={formData.message} />
    </form>
  );
};

export default EmailHandler;
