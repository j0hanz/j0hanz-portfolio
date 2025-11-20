import React from 'react';

import { HiMiniExclamationCircle } from 'react-icons/hi2';
import {
  HiOutlineBriefcase,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineUser,
} from 'react-icons/hi2';

import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { FormFieldProps, FormFieldsProps } from '@/config/types';

function FormField({
  controlId,
  icon: Icon,
  type = 'text',
  name,
  label,
  placeholder,
  value,
  error,
  required = false,
  rows,
  onChange,
}: FormFieldProps): React.JSX.Element {
  const isTextarea = type === 'textarea';
  const helperContent = error ? (
    <Stack component="span" direction="row" alignItems="center" gap={0.5}>
      <HiMiniExclamationCircle />
      {error}
    </Stack>
  ) : (
    ' '
  );

  return (
    <TextField
      id={controlId}
      name={name}
      label={label ?? placeholder}
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
      aria-invalid={!!error}
      aria-required={required}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                style={{
                  width: '1.1rem',
                  height: '1.1rem',
                }}
              />
            </InputAdornment>
          ),
          sx: {
            fontSize: '0.8rem',
            pl: 0.4,
            color: 'text.primary',
          },
        },
        inputLabel: {
          shrink: Boolean(value) || isTextarea,
        },
        formHelperText: {
          sx: {
            mx: 0,
          },
        },
        htmlInput: {
          sx: {
            '&::placeholder': {
              color: 'text.primary',
              opacity: 0.6,
            },
          },
        },
      }}
      sx={{
        '& .MuiInput-root': {
          '&:before': {
            borderBottom: '3px solid',
            borderBottomColor: 'divider',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '3px solid',
            borderBottomColor: 'divider',
          },
          '&.Mui-error:before': {
            borderBottomColor: 'error.main',
          },
          '&.Mui-focused:after': {
            borderBottomColor: 'primary.main',
          },
        },
      }}
      helperText={helperContent}
    />
  );
}

// Rendering form fields
function FormFields({
  formData,
  errors,
  handleChange,
}: FormFieldsProps): React.JSX.Element {
  return (
    <Stack spacing={2}>
      <FormField
        controlId="formName"
        icon={HiOutlineUser}
        name="name"
        label="Name"
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
        label="Email"
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
        label="Company"
        placeholder="company... (optional)"
        value={formData.company ?? ''}
        onChange={handleChange}
      />
      <FormField
        controlId="formUrl"
        icon={HiOutlineGlobeAlt}
        type="url"
        name="url"
        label="Website"
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
        label="Message"
        placeholder="enter your message..."
        value={formData.message}
        error={errors.message}
        required
        rows={4}
        onChange={handleChange}
      />
    </Stack>
  );
}

export default FormFields;
