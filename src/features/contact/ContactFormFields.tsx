import React, { useState } from 'react';

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
import { AnimatePresence, motion } from 'motion/react';

import {
  ContactFormValues,
  FormFieldProps,
  FormFieldsProps,
} from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { motionVariants } from '@/utils/motionVariants';

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
  const [isFocused, setIsFocused] = useState(false);
  const { getTransition, prefersReducedMotion } = useAnimationConfig();

  return (
    <motion.div
      initial={false}
      animate={
        prefersReducedMotion
          ? { scale: 1, boxShadow: 'none' }
          : {
              scale: isFocused ? 1.01 : 1,
              boxShadow: isFocused
                ? '0 18px 40px rgba(15, 23, 42, 0.28)'
                : '0 8px 22px rgba(15, 23, 42, 0.12)',
            }
      }
      transition={getTransition('smooth', { duration: 0.35 })}
      style={{
        borderRadius: 16,
        padding: prefersReducedMotion ? 0 : '6px 10px',
      }}
    >
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
    </motion.div>
  );
}

// Rendering contact form fields
function ContactFormFields({
  formData,
  errors,
  handleChange,
}: FormFieldsProps): React.JSX.Element {
  const { getTransition, getDelay } = useAnimationConfig();
  const fieldVariant = motionVariants.exit.formField;

  return (
    <Stack spacing={2}>
      <AnimatePresence>
        {contactFieldConfigs.map(({ key, errorKey, ...fieldConfig }, index) => (
          <motion.div
            key={fieldConfig.controlId}
            {...fieldVariant}
            transition={getTransition('smooth', {
              delay: getDelay(index + 1),
            })}
            layout
          >
            <FormField
              {...fieldConfig}
              name={key}
              value={formData[key] ?? ''}
              error={errorKey ? errors[errorKey] : undefined}
              onChange={handleChange}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Stack>
  );
}

export default ContactFormFields;
