import React, { useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';

const EmailHandler = ({ formData, onEmailSent }) => {
  const { name, email, company, url, message } = formData;
  const form = useRef(null);

  /* Function to send email when explicitly called */
  const sendEmail = () => {
    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_USER_ID
      )
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        onEmailSent(true);
      })
      .catch((error) => {
        console.error('Failed to send email. Error details:', error);
        onEmailSent(false);
      });
  };

  useEffect(() => {
    sendEmail();
  }, []);

  return (
    <>
      {/* Hidden form that will be used by emailjs */}
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
