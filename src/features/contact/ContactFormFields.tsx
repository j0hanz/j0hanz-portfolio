import React from 'react';

import { HiMiniExclamationCircle } from 'react-icons/hi2';
import {
  HiOutlineBriefcase,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineUser,
} from 'react-icons/hi2';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { FormFieldProps, FormFieldsProps } from '@/config/types';

import styles from './ContactForm.module.css';

function FormField({
  controlId,
  icon: Icon,
  type = 'text',
  name,
  placeholder,
  value,
  error,
  required = false,
  rows,
  onChange,
}: FormFieldProps): React.JSX.Element {
  const isTextarea = type === 'textarea';

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        id={controlId}
        name={name}
        type={isTextarea ? undefined : type}
        multiline={isTextarea}
        rows={isTextarea ? rows : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        error={!!error}
        fullWidth
        variant="standard"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Icon className={styles.inputGroupIcon} />
              </InputAdornment>
            ),
            className: styles.inputGroupControl,
            disableUnderline: false,
          },
          formHelperText: {
            sx: {
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mx: 0,
            },
          },
        }}
        sx={{
          '& .MuiInput-root': {
            '&:before': {
              borderBottom: '3px solid var(--form-border-color)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '3px solid var(--form-border-color)',
            },
            '&.Mui-error:before': {
              borderBottomColor: 'error.main',
            },
            '&.Mui-focused:after': {
              borderBottomColor: 'primary.main',
            },
          },
        }}
        helperText={
          error ? (
            <>
              <HiMiniExclamationCircle />
              {error}
            </>
          ) : null
        }
      />
    </Box>
  );
}

// Rendering form fields
function FormFields({
  formData,
  errors,
  handleChange,
}: FormFieldsProps): React.JSX.Element {
  return (
    <>
      <FormField
        controlId="formName"
        icon={HiOutlineUser}
        name="name"
        placeholder="enter your name..."
        value={formData.name}
        error={errors.name}
        required
        onChange={handleChange}
      />
      <FormField
        controlId="formEmail"
        icon={HiOutlineEnvelope}
        type="email"
        name="email"
        placeholder="enter your email..."
        value={formData.email}
        error={errors.email}
        required
        onChange={handleChange}
      />
      <FormField
        controlId="formCompany"
        icon={HiOutlineBriefcase}
        name="company"
        placeholder="company... (optional)"
        value={formData.company ?? ''}
        onChange={handleChange}
      />
      <FormField
        controlId="formUrl"
        icon={HiOutlineGlobeAlt}
        type="url"
        name="url"
        placeholder="website url... (optional)"
        value={formData.url ?? ''}
        error={errors.url}
        onChange={handleChange}
      />
      <FormField
        controlId="formMessage"
        icon={HiOutlineChatBubbleOvalLeft}
        type="textarea"
        name="message"
        placeholder="enter your message..."
        value={formData.message}
        error={errors.message}
        required
        rows={4}
        onChange={handleChange}
      />
    </>
  );
}

export default FormFields;
