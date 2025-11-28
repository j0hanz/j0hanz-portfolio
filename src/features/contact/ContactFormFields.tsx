import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import WorkOutline from '@mui/icons-material/WorkOutline';
import type { SxProps, Theme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

import type {
  ContactFieldConfig,
  FormFieldProps,
  FormFieldsProps,
} from '@/config/types';
import { ICON_SIZE } from '@/styles/shared';

const CONTACT_FIELD_CONFIGS: ContactFieldConfig[] = [
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
    minRows: 3,
    maxRows: 8,
    errorKey: 'message',
    gridProps: { xs: 12 },
  },
];

const labelSx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.body2.fontSize,
};

const iconSx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.h6.fontSize,
  color: 'action.active',
};

const errorIconSx: SxProps<Theme> = {
  fontSize: ICON_SIZE,
};

const inputSx: SxProps<Theme> = {
  marginTop: 2, // Add margin top to account for the label
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
  '&:after': {
    borderBottomColor: 'primary.main',
  },
};

function FormField({
  controlId,
  icon: Icon,
  type = 'text',
  name,
  label,
  placeholder,
  value,
  defaultValue,
  error,
  required = false,
  minRows,
  maxRows,
  onChange,
  disabled,
}: FormFieldProps): React.JSX.Element {
  const isTextarea = type === 'textarea';

  return (
    <FormControl
      variant="standard"
      fullWidth
      required={required}
      error={!!error}
      disabled={disabled}
    >
      <InputLabel htmlFor={controlId} shrink sx={labelSx}>
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
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{
              alignSelf: isTextarea ? 'flex-start' : 'center',
              mt: isTextarea ? 1.5 : 0,
              mr: 1,
            }}
          >
            <Icon sx={iconSx} />
          </InputAdornment>
        }
        aria-describedby={error ? `${controlId}-error` : undefined}
        sx={inputSx}
      />
      {error && (
        <FormHelperText id={`${controlId}-error`}>
          <Stack component="span" direction="row" alignItems="center" gap={0.5}>
            <ErrorOutline sx={errorIconSx} />
            {error}
          </Stack>
        </FormHelperText>
      )}
    </FormControl>
  );
}

// Rendering contact form fields
function ContactFormFields({
  formData,
  errors,
  handleChange,
  disabled = false,
}: FormFieldsProps): React.JSX.Element {
  return (
    <Grid container spacing={1.25}>
      {CONTACT_FIELD_CONFIGS.map((config) => {
        const { key, ...fieldProps } = config;
        const value = formData[key] ?? '';
        const error = config.errorKey ? errors[config.errorKey] : undefined;

        return (
          <Grid key={key} size={config.gridProps}>
            <FormField
              {...fieldProps}
              name={key}
              value={value}
              error={error}
              onChange={handleChange}
              disabled={disabled}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ContactFormFields;
