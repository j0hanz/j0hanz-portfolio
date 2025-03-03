import { ChangeEvent, memo } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { HiMiniExclamationCircle } from 'react-icons/hi2';
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineBriefcase,
  HiOutlineGlobeAlt,
  HiOutlineChatBubbleOvalLeft,
} from 'react-icons/hi2';
import styles from '@/sections/styles/ContactForm.module.css';

interface FormFieldsProps {
  formData: {
    name: string;
    email: string;
    company?: string;
    url?: string;
    message: string;
  };
  errors: {
    name?: string;
    email?: string;
    url?: string;
    message?: string;
  };
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

// Rendering form fields
const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <>
      {/* Name field */}
      <Form.Group controlId="formName">
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text className={styles.inputGroupIcon}>
            <HiOutlineUser />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="name"
            className={styles.inputGroupControl}
            placeholder="enter your name..."
            required
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
        </InputGroup>
        {errors.name ? (
          <div className={styles.errorMessage}>
            <HiMiniExclamationCircle className={`${styles.errorIcon} me-2`} />
            {errors.name}
          </div>
        ) : null}
      </Form.Group>
      {/* Email field */}
      <Form.Group controlId="formEmail">
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text className={styles.inputGroupIcon}>
            <HiOutlineEnvelope />
          </InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            className={styles.inputGroupControl}
            placeholder="enter your email..."
            required
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
        </InputGroup>
        {errors.email ? (
          <div className={styles.errorMessage}>
            <HiMiniExclamationCircle className={`${styles.errorIcon} me-2`} />
            {errors.email}
          </div>
        ) : null}
      </Form.Group>
      {/* Company field */}
      <Form.Group controlId="formCompany">
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text className={styles.inputGroupIcon}>
            <HiOutlineBriefcase />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="company"
            className={styles.inputGroupControl}
            placeholder="company... (optional)"
            value={formData.company}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      {/* URL field */}
      <Form.Group controlId="formUrl">
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Text className={styles.inputGroupIcon}>
            <HiOutlineGlobeAlt />
          </InputGroup.Text>
          <Form.Control
            type="url"
            name="url"
            className={styles.inputGroupControl}
            placeholder="website url... (optional)"
            value={formData.url}
            onChange={handleChange}
            isInvalid={!!errors.url}
          />
        </InputGroup>
        {errors.url ? (
          <div className={styles.errorMessage}>
            <HiMiniExclamationCircle className={`${styles.errorIcon} me-2`} />
            {errors.url}
          </div>
        ) : null}
      </Form.Group>
      {/* Message field */}
      <Form.Group controlId="formMessage">
        <InputGroup className={`${styles.inputGroupBody} ${styles.inputGroup}`}>
          <InputGroup.Text className={styles.inputGroupIcon}>
            <HiOutlineChatBubbleOvalLeft />
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            name="message"
            className={styles.inputGroupControl}
            rows={4}
            placeholder="enter your message..."
            required
            value={formData.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
          />
        </InputGroup>
        {errors.message ? (
          <div className={styles.errorMessage}>
            <HiMiniExclamationCircle className={`${styles.errorIcon} me-2`} />
            {errors.message}
          </div>
        ) : null}
      </Form.Group>
    </>
  );
};

export default memo(FormFields);
