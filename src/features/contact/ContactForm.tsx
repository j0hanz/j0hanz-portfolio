import { useEffect, useRef, useState } from 'react';

import DeleteRounded from '@mui/icons-material/DeleteRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import {
  Box,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import Badges from '@/components/Badges';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { AnimatedCheckmark } from '@/components/Motions';
import SectionContainer from '@/components/SectionContainer';
import { CONTACT_COPY, FORM_RESET_DELAY } from '@/config/constants';
import { formFieldVariants, viewportPresets } from '@/config/motion';
import type {
  ContactFieldErrorKey,
  ContactFieldKey,
  ContactFormErrors,
  ContactFormValues,
  ElementRef,
  FormActionsProps,
  SuccessIndicatorProps,
} from '@/config/types';
import {
  useAnimationConfig,
  useContactFormMutation,
  useEventCallback,
  useInView,
  useMotionVariant,
  useSnackbar,
} from '@/hooks';
import { buttonMinWidthSx, iconSx } from '@/styles/shared';
import { validateForm } from '@/utils/validation';

import ContactFormFields from './ContactFormFields';

const successStackSx: SxProps<Theme> = {
  mt: 2,
  px: 2,
};

const successTextSx: SxProps<Theme> = {
  fontWeight: 500,
};

const formCardSx: SxProps<Theme> = {
  height: 'auto',
};

const clearTextSx: SxProps<Theme> = {
  display: { xs: 'none', sm: 'inline' },
};

const createEmptyFormValues = (): ContactFormValues => ({
  name: '',
  email: '',
  company: '',
  url: '',
  message: '',
});

const normalizeFormValues = (values: ContactFormValues): ContactFormValues => ({
  name: values.name.trim(),
  email: values.email.trim(),
  company: values.company.trim(),
  url: values.url.trim(),
  message: values.message.trim(),
});

const getFirstErrorMessage = (errors: ContactFormErrors): string | undefined =>
  Object.values(errors).find(Boolean);

const isErrorField = (key: ContactFieldKey): key is ContactFieldErrorKey =>
  key === 'name' || key === 'email' || key === 'url' || key === 'message';

function SuccessIndicator({
  visible,
}: SuccessIndicatorProps): React.JSX.Element | null {
  const { getTransition } = useAnimationConfig();

  if (!visible) return null;

  return (
    <Stack
      component={motion.div}
      key="contact-success"
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1.5}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={getTransition('smooth')}
      sx={successStackSx}
    >
      <Box sx={{ color: 'success.main' }}>
        <AnimatedCheckmark />
      </Box>
      <Typography variant="body2" color="success.main" sx={successTextSx}>
        {CONTACT_COPY.successInline}
      </Typography>
    </Stack>
  );
}

function FormActions({
  onReset,
  isPending,
}: FormActionsProps): React.JSX.Element {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
    >
      <Button
        variant="text"
        color="inherit"
        type="button"
        onClick={onReset}
        disabled={isPending}
        startIcon={<DeleteRounded sx={iconSx} />}
        aria-label={CONTACT_COPY.clearAriaLabel}
        sx={buttonMinWidthSx}
      >
        <Box component="span" sx={clearTextSx}>
          {CONTACT_COPY.clearLabel}
        </Box>
      </Button>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        loading={isPending}
        disabled={isPending}
        startIcon={<SendRounded sx={iconSx} />}
        aria-label={
          isPending ? CONTACT_COPY.sendingAriaLabel : CONTACT_COPY.sendAriaLabel
        }
        sx={buttonMinWidthSx}
      >
        {!isPending && CONTACT_COPY.sendLabel}
      </Button>
    </Stack>
  );
}

function ContactFormContent(): React.JSX.Element {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormValues>(
    createEmptyFormValues
  );
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const { showSnackbar } = useSnackbar();
  // Destructure stable functions from mutation to avoid dependency issues
  const { mutate, reset, isSuccess, isPending } = useContactFormMutation();
  const isInView = useInView(
    formContainerRef as ElementRef,
    viewportPresets.list
  );

  const fieldMotion = useMotionVariant(formFieldVariants.field, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

  const actionMotion = useMotionVariant(formFieldVariants.action, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

  const showSuccess = isSuccess && !isPending;

  const handleChange = useEventCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      const fieldName = name as ContactFieldKey;

      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      setErrors((prev) => {
        if (!isErrorField(fieldName) || !prev[fieldName]) return prev;
        const nextErrors = { ...prev };
        delete nextErrors[fieldName];
        return nextErrors;
      });
    }
  );

  const handleReset = useEventCallback(() => {
    setFormData(createEmptyFormValues());
    setErrors({});
    reset();
  });

  const handleSubmit = useEventCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Clear any pending auto-reset on new submission
      reset();

      const normalizedValues = normalizeFormValues(formData);
      const validationErrors = validateForm(normalizedValues);

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        const firstError = getFirstErrorMessage(validationErrors);
        if (firstError) {
          showSnackbar(firstError, 'error');
        }
        return;
      }

      mutate(normalizedValues, {
        onSuccess: () => showSnackbar(CONTACT_COPY.successToast, 'success'),
        onError: (error) => showSnackbar(error.message, 'error'),
      });
    }
  );

  // Auto-reset form after successful submission
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      handleReset();
    }, FORM_RESET_DELAY);

    return () => clearTimeout(timer);
  }, [showSuccess, handleReset]);

  return (
    <Card title="" sx={formCardSx}>
      <Box ref={formContainerRef}>
        <Stack component="form" onSubmit={handleSubmit} noValidate spacing={2}>
          <motion.div custom={0} {...fieldMotion} layout>
            <ContactFormFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              disabled={isPending}
            />
          </motion.div>
          <SuccessIndicator visible={showSuccess} />
          <motion.div {...actionMotion} layout>
            <FormActions onReset={handleReset} isPending={isPending} />
          </motion.div>
        </Stack>
      </Box>
    </Card>
  );
}

// Rendering contact form section
function ContactForm(): React.JSX.Element {
  return (
    <SectionContainer
      id="contact"
      title={CONTACT_COPY.sectionTitle}
      icon={EmailRounded}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid size={12}>
          <ContactFormContent />
          <Badges />
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default ContactForm;
