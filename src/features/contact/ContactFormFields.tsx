import { useId } from 'react';

import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import WorkOutline from '@mui/icons-material/WorkOutline';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import type {
  ContactFieldConfig,
  FormFieldProps,
  FormFieldsProps,
} from '@/config/types';

function FormField({
  controlId,
  icon: Icon,
  type = 'text',
  name,
  label,
  placeholder,
  defaultValue,
  error,
  required = false,
  minRows,
  maxRows,
  onChange,
  disabled,
}: Readonly<FormFieldProps>): React.JSX.Element {
  const isTextarea = type === 'textarea';

  return (
    <FormControl
      variant="standard"
      fullWidth
      required={required}
      error={!!error}
      disabled={disabled}
    >
      <InputLabel
        htmlFor={controlId}
        shrink
        sx={{ fontSize: 'body2.fontSize' }}
      >
        {label}
      </InputLabel>
      <Input
        id={controlId}
        name={name}
        type={isTextarea ? undefined : type}
        multiline={isTextarea}
        minRows={isTextarea ? (minRows ?? 3) : undefined}
        maxRows={isTextarea ? (maxRows ?? 8) : undefined}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{
              alignSelf: isTextarea ? 'flex-start' : 'center',
              pt: isTextarea ? 0.25 : 0,
              pr: 0.5,
            }}
          >
            <Icon sx={{ fontSize: 'medium', color: 'action.active' }} />
          </InputAdornment>
        }
        aria-describedby={error ? `${controlId}-error` : undefined}
        sx={{
          mt: { xs: 1.5, sm: 1.75, md: 2, lg: 2.25 },
          '&:before': {
            borderBottom: isTextarea ? 'none' : '2px solid',
            borderBottomColor: 'divider',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: isTextarea ? 'none' : '2px solid',
            borderBottomColor: 'divider',
          },
          '&.Mui-error:before': { borderBottomColor: 'error.main' },
          '&:after': {
            borderBottomColor: 'primary.main',
            borderBottom: isTextarea ? 'none' : undefined,
          },
        }}
      />
      {error && (
        <FormHelperText id={`${controlId}-error`}>
          <Stack component="span" direction="row" alignItems="center" gap={0.5}>
            <ErrorOutline
              sx={{ fontSize: (theme) => theme.custom.sizing.icon }}
            />
            {error}
          </Stack>
        </FormHelperText>
      )}
    </FormControl>
  );
}

export function ContactFormFields({
  errors,
  disabled = false,
}: Readonly<FormFieldsProps>): React.JSX.Element {
  const theme = useTheme();

  const fieldConfigs: ContactFieldConfig[] = [
    {
      key: 'name',
      controlId: 'formName',
      icon: PersonOutline,
      label: 'Name',
      placeholder: 'enter your name...',
      required: true,
      errorKey: 'name',
      gridProps: theme.custom.grid.formField,
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
      gridProps: theme.custom.grid.formField,
    },
    {
      key: 'company',
      controlId: 'formCompany',
      icon: WorkOutline,
      label: 'Company',
      placeholder: 'company... (optional)',
      gridProps: theme.custom.grid.formField,
    },
    {
      key: 'url',
      controlId: 'formUrl',
      icon: LanguageOutlined,
      type: 'url',
      label: 'Website',
      placeholder: 'website url... (optional)',
      errorKey: 'url',
      gridProps: theme.custom.grid.formField,
    },
    {
      key: 'message',
      controlId: 'formMessage',
      icon: ChatBubbleOutline,
      type: 'textarea',
      label: 'Message',
      placeholder: 'enter your message...',
      required: true,
      minRows: 3,
      maxRows: 8,
      errorKey: 'message',
      gridProps: theme.custom.grid.full,
    },
  ];

  // Generate unique IDs for form fields (React 19 accessibility)
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const urlId = useId();
  const messageId = useId();

  const fieldIds: Record<string, string> = {
    name: nameId,
    email: emailId,
    company: companyId,
    url: urlId,
    message: messageId,
  };

  return (
    <Grid container spacing={theme.custom.spacing.formField}>
      {fieldConfigs.map(({ key, errorKey, ...fieldProps }) => (
        <Grid key={key} size={fieldProps.gridProps}>
          <FormField
            {...fieldProps}
            controlId={fieldIds[key] || fieldProps.controlId}
            name={key}
            error={errorKey ? errors[errorKey] : undefined}
            disabled={disabled}
          />
        </Grid>
      ))}
    </Grid>
  );
}
