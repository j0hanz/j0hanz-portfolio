import React from 'react';

import {
  ChatBubbleOutline,
  EmailOutlined,
  ErrorOutline,
  LanguageOutlined,
  PersonOutline,
  WorkOutline,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import {
  ContactFormValues,
  FormFieldProps,
  FormFieldsProps,
} from '@/config/types';

const getHelperText = (error?: string): React.ReactNode => {
  if (!error) return undefined;
  return (
    <Stack component="span" direction="row" alignItems="center" gap={0.5}>
      <ErrorOutline sx={{ fontSize: '1rem' }} />
      {error}
    </Stack>
  );
};

type ContactFieldKey = keyof ContactFormValues;
type ContactFieldErrorKey = keyof FormFieldsProps['errors'];

interface ContactFieldConfig {
  key: ContactFieldKey;
  controlId: string;
  icon: React.ElementType;
  type?: FormFieldProps['type'];
  label: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  errorKey?: ContactFieldErrorKey;
  gridProps?: { xs?: number; md?: number };
}

const contactFieldConfigs: ContactFieldConfig[] = [
  {
    key: 'name',
    controlId: 'formName',
    icon: PersonOutline,
    label: 'Name',
    placeholder: 'enter your name...',
    required: true,
    errorKey: 'name',
    gridProps: { xs: 12, md: 6 },
  },
  {
    key: 'email',
    controlId: 'formEmail',
    icon: EmailOutlined,
    type: 'email',
    label: 'Email',
    placeholder: 'enter your email...',
    required: true,
    errorKey: 'email',
    gridProps: { xs: 12, md: 6 },
  },
  {
    key: 'company',
    controlId: 'formCompany',
    icon: WorkOutline,
    label: 'Company',
    placeholder: 'company... (optional)',
    gridProps: { xs: 12, md: 6 },
  },
  {
    key: 'url',
    controlId: 'formUrl',
    icon: LanguageOutlined,
    type: 'url',
    label: 'Website',
    placeholder: 'website url... (optional)',
    errorKey: 'url',
    gridProps: { xs: 12, md: 6 },
  },
  {
    key: 'message',
    controlId: 'formMessage',
    icon: ChatBubbleOutline,
    type: 'textarea',
    label: 'Message',
    placeholder: 'enter your message...',
    required: true,
    rows: 4,
    errorKey: 'message',
    gridProps: { xs: 12 },
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
      label={label}
      type={isTextarea ? undefined : type}
      multiline={isTextarea}
      rows={isTextarea ? rows : undefined}
      minRows={isTextarea ? rows : undefined}
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
            <InputAdornment
              position="start"
              sx={{
                alignSelf: isTextarea ? 'flex-start' : 'center',
                mt: 0,
                mr: 1,
              }}
            >
              <Icon sx={{ fontSize: '1.1rem', color: 'action.active' }} />
            </InputAdornment>
          ),
        },
        inputLabel: {
          shrink: true,
          sx: { fontSize: '0.875rem' },
        },
      }}
      sx={{
        '& .MuiInput-root': {
          '&:before': {
            borderBottom: '2px solid',
            borderBottomColor: 'divider',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '2px solid',
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
    <Grid container spacing={1.25}>
      {contactFieldConfigs.map((config) => (
        <Grid key={config.key} size={config.gridProps}>
          <FormField
            {...config}
            name={config.key}
            value={formData[config.key] ?? ''}
            error={config.errorKey ? errors[config.errorKey] : undefined}
            onChange={handleChange}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ContactFormFields;
