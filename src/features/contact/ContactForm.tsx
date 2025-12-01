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
import { hideOnMobileInlineSx, RESPONSIVE_SPACING } from '@/config/responsive';
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

// Style constants
const SUCCESS_STACK_SX: SxProps<Theme> = { mt: 2, px: 2 };
const SUCCESS_TEXT_SX: SxProps<Theme> = { fontWeight: 500 };
const FORM_CARD_SX: SxProps<Theme> = { height: 'auto' };

// Form state helpers
const createEmptyForm = (): ContactFormValues => ({
  name: '',
  email: '',
  company: '',
  url: '',
  message: '',
});

const normalizeForm = (values: ContactFormValues): ContactFormValues => ({
  name: values.name.trim(),
  email: values.email.trim(),
  company: values.company.trim(),
  url: values.url.trim(),
  message: values.message.trim(),
});

const isErrorField = (key: ContactFieldKey): key is ContactFieldErrorKey =>
  key === 'name' || key === 'email' || key === 'url' || key === 'message';

function SuccessIndicator({ visible }: SuccessIndicatorProps) {
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
      sx={SUCCESS_STACK_SX}
    >
      <Box sx={{ color: 'success.main' }}>
        <AnimatedCheckmark />
      </Box>
      <Typography variant="body2" color="success.main" sx={SUCCESS_TEXT_SX}>
        {CONTACT_COPY.successInline}
      </Typography>
    </Stack>
  );
}

function FormActions({ onReset, isPending }: FormActionsProps) {
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
        <Box component="span" sx={hideOnMobileInlineSx}>
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

function ContactFormContent() {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormValues>(createEmptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const { showSnackbar } = useSnackbar();
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

      // Clear field error if present
      if (isErrorField(fieldName)) {
        setErrors((prev) => {
          if (!prev[fieldName]) return prev;
          const next = { ...prev };
          delete next[fieldName];
          return next;
        });
      }
    }
  );

  const handleReset = useEventCallback(() => {
    setFormData(createEmptyForm());
    setErrors({});
    reset();
  });

  const handleSubmit = useEventCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      reset();

      const normalized = normalizeForm(formData);
      const validationErrors = validateForm(normalized);
      setErrors(validationErrors);

      const firstError = Object.values(validationErrors).find(Boolean);
      if (firstError) {
        showSnackbar(firstError, 'error');
        return;
      }

      mutate(normalized, {
        onSuccess: () => showSnackbar(CONTACT_COPY.successToast, 'success'),
        onError: (error) => showSnackbar(error.message, 'error'),
      });
    }
  );

  // Auto-reset form after successful submission
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(handleReset, FORM_RESET_DELAY);
    return () => clearTimeout(timer);
  }, [showSuccess, handleReset]);

  return (
    <Card title="" sx={FORM_CARD_SX}>
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
function ContactForm() {
  return (
    <SectionContainer
      id="contact"
      title={CONTACT_COPY.sectionTitle}
      icon={EmailRounded}
    >
      <Grid container spacing={RESPONSIVE_SPACING.grid}>
        <Grid size={12}>
          <ContactFormContent />
          <Badges />
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default ContactForm;
