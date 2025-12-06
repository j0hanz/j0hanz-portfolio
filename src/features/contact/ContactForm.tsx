import { useEffect, useRef, useState } from 'react';

import DeleteRounded from '@mui/icons-material/DeleteRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { AnimatedContent } from '@/components/animations';
import { SplitText } from '@/components/animations';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { AnimatedCheckmark } from '@/components/Motions';
import SectionContainer from '@/components/SectionContainer';
import { CONTACT_CONFIG, CONTACT_COPY } from '@/config/constants';
import { formFieldVariants, viewportPresets } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import type {
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

import { ContactFormFields } from './ContactFormFields';

// Form state helpers
const EMPTY_FORM: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  url: '',
  message: '',
};

const ERROR_FIELDS = new Set(['name', 'email', 'url', 'message'] as const);

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
      sx={{
        mt: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
        px: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
      }}
    >
      <Box sx={{ color: 'success.main' }}>
        <AnimatedCheckmark />
      </Box>
      <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
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
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
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
  const [formData, setFormData] = useState<ContactFormValues>(EMPTY_FORM);
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
      if (ERROR_FIELDS.has(fieldName as keyof ContactFormErrors)) {
        setErrors((prev) => {
          const key = fieldName as keyof ContactFormErrors;
          if (!prev[key]) return prev;
          const { [key]: _, ...rest } = prev;
          return rest;
        });
      }
    }
  );

  const handleReset = useEventCallback(() => {
    setFormData(EMPTY_FORM);
    setErrors({});
    reset();
  });

  const handleSubmit = useEventCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      reset();

      // Normalize and validate form data
      const normalized: ContactFormValues = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        url: formData.url.trim(),
        message: formData.message.trim(),
      };
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
    const timer = setTimeout(handleReset, CONTACT_CONFIG.FORM_RESET_DELAY);
    return () => clearTimeout(timer);
  }, [showSuccess, handleReset]);

  return (
    <Card title="" sx={{ height: 'auto' }}>
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

export function ContactForm() {
  return (
    <SectionContainer
      id="contact"
      title={
        <SplitText
          text={CONTACT_COPY.sectionTitle}
          tag="span"
          splitType="chars"
          delay={25}
        />
      }
      icon={EmailRounded}
    >
      <Grid container spacing={SPACING.grid}>
        <Grid size={12}>
          <AnimatedContent distance={80} delay={0.1}>
            <ContactFormContent />
          </AnimatedContent>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
