import { useActionState, useEffect, useRef, useState } from 'react';

import { useFormStatus } from 'react-dom';

import DeleteRounded from '@mui/icons-material/DeleteRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import {
  AnimatedContent,
  FadeContent,
  SplitText,
} from '@/components/animations';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { AnimatedCheckmark } from '@/components/Motions';
import { SectionContainer } from '@/components/SectionContainer';
import { CONTACT_CONFIG, CONTACT_COPY } from '@/config/constants';
import { formFieldVariants, viewportPresets } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import type {
  ContactFormErrors,
  ContactFormValues,
  ElementRef,
  FormActionsProps,
  SuccessIndicatorProps,
} from '@/config/types';
import {
  useContactFormMutation,
  useEventCallback,
  useInView,
  useMotionVariant,
  useSnackbar,
} from '@/hooks';
import { buttonMinWidthSx, iconSx } from '@/styles/shared';
import { validateForm } from '@/utils/validation';

import { ContactFormFields } from './ContactFormFields';

type FormActionState = { errors: ContactFormErrors; status: 'idle' | 'sent' };

function SuccessIndicator({ visible }: Readonly<SuccessIndicatorProps>) {
  if (!visible) return null;

  return (
    <FadeContent delay={0.1} threshold={0.2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
        sx={{
          mt: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
          px: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
        }}
      >
        <Box sx={{ color: 'success.main' }}>
          <AnimatedCheckmark />
        </Box>
        <Typography
          variant="body2"
          color="success.main"
          sx={{ fontWeight: 500 }}
        >
          {CONTACT_COPY.successInline}
        </Typography>
      </Stack>
    </FadeContent>
  );
}

function FormActions({ onReset, isPending }: Readonly<FormActionsProps>) {
  const { pending } = useFormStatus();
  const isDisabled = isPending || pending;
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
        disabled={isDisabled}
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
        loading={isDisabled}
        disabled={isDisabled}
        startIcon={<SendRounded sx={iconSx} />}
        aria-label={
          isDisabled
            ? CONTACT_COPY.sendingAriaLabel
            : CONTACT_COPY.sendAriaLabel
        }
        sx={buttonMinWidthSx}
      >
        {!isDisabled && CONTACT_COPY.sendLabel}
      </Button>
    </Stack>
  );
}

function ContactFormContent() {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { showSnackbar } = useSnackbar();
  const { mutateAsync, reset, isPending } = useContactFormMutation();
  const isInView = useInView(
    formContainerRef as ElementRef,
    viewportPresets.list
  );
  const animateState = isInView ? 'visible' : 'hidden';
  const fieldMotion = useMotionVariant(formFieldVariants.field, {
    initial: 'hidden',
    animate: animateState,
  });
  const actionMotion = useMotionVariant(formFieldVariants.action, {
    initial: 'hidden',
    animate: animateState,
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});

  const [actionState, formAction, isFormPending] = useActionState<
    FormActionState,
    FormData
  >(
    async (_prevState, formData) => {
      reset();

      const normalized: ContactFormValues = {
        name: String(formData.get('name') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        company: String(formData.get('company') ?? '').trim(),
        url: String(formData.get('url') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
      };

      const validationErrors = validateForm(normalized);
      const firstError = Object.values(validationErrors).find(Boolean);
      if (firstError) {
        showSnackbar(firstError, 'error');
        setErrors(validationErrors);
        return { errors: validationErrors, status: 'idle' };
      }

      setErrors({});
      try {
        await mutateAsync(normalized);
        showSnackbar(CONTACT_COPY.successToast, 'success');
        return { errors: {}, status: 'sent' };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : CONTACT_CONFIG.SEND_ERROR_MESSAGE;
        showSnackbar(message, 'error');
        return { errors: {}, status: 'idle' };
      }
    },
    { errors: {}, status: 'idle' }
  );

  const showSuccess = actionState.status === 'sent';
  const isSending = isPending || isFormPending;

  const handleReset = useEventCallback(() => {
    formRef.current?.reset();
    setErrors({});
    reset();
  });

  // Auto-reset form after successful submission
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(handleReset, CONTACT_CONFIG.FORM_RESET_DELAY);
    return () => clearTimeout(timer);
  }, [showSuccess, handleReset]);

  return (
    <Card title="">
      <Box ref={formContainerRef}>
        <Stack
          component="form"
          action={formAction}
          ref={formRef}
          noValidate
          spacing={3}
        >
          <motion.div custom={0} {...fieldMotion}>
            <ContactFormFields errors={errors} disabled={isSending} />
          </motion.div>
          <SuccessIndicator visible={showSuccess} />
          <motion.div {...actionMotion}>
            <FormActions onReset={handleReset} isPending={isSending} />
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
          splitType="chars"
          delay={50}
          duration={0.5}
          ease="power3.out"
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
