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

import {
  ContactFormValues,
  FormFieldProps,
  FormFieldsProps,
} from '@/config/types';

const getHelperText = (error?: string): React.ReactNode => {
  if (!error) return ' ';
  return (
    <Stack component="span" direction="row" alignItems="center" gap={0.5}>
      <HiMiniExclamationCircle />
      {error}
    </Stack>
  );
};

type ContactFieldKey = keyof ContactFormValues;
type ContactFieldErrorKey = keyof FormFieldsProps['errors'];

interface ContactFieldConfig {
  key: ContactFieldKey;
  controlId: string;
  icon: FormFieldProps['icon'];
  type?: FormFieldProps['type'];
  label: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  errorKey?: ContactFieldErrorKey;
}

const contactFieldConfigs: ContactFieldConfig[] = [
  {
    key: 'name',
    controlId: 'formName',
    icon: HiOutlineUser,
    label: 'Name',
    placeholder: 'enter your name...',
    required: true,
    errorKey: 'name',
  },
  {
    key: 'email',
    controlId: 'formEmail',
    icon: HiOutlineEnvelope,
    type: 'email',
    label: 'Email',
    placeholder: 'enter your email...',
    required: true,
    errorKey: 'email',
  },
  {
    key: 'company',
    controlId: 'formCompany',
    icon: HiOutlineBriefcase,
    label: 'Company',
    placeholder: 'company... (optional)',
  },
  {
    key: 'url',
    controlId: 'formUrl',
    icon: HiOutlineGlobeAlt,
    type: 'url',
    label: 'Website',
    placeholder: 'website url... (optional)',
    errorKey: 'url',
  },
  {
    key: 'message',
    controlId: 'formMessage',
    icon: HiOutlineChatBubbleOvalLeft,
    type: 'textarea',
    label: 'Message',
    placeholder: 'enter your message...',
    required: true,
    rows: 4,
    errorKey: 'message',
  },
];

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
      helperText={getHelperText(error)}
    />
  );
}

// Rendering contact form fields
function ContactFormFields({
  formData,
  errors,
  handleChange,
}: FormFieldsProps): React.JSX.Element {
  return (
    <Stack spacing={2}>
      {contactFieldConfigs.map(({ key, errorKey, ...fieldConfig }) => (
        <FormField
          key={fieldConfig.controlId}
          {...fieldConfig}
          name={key}
          value={formData[key] ?? ''}
          error={errorKey ? errors[errorKey] : undefined}
          onChange={handleChange}
        />
      ))}
    </Stack>
  );
}

export default ContactFormFields;
