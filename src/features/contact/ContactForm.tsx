import { useEffect, useRef } from 'react';

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
import { FORM_RESET_DELAY } from '@/config/constants';
import { formFieldVariants, viewportPresets } from '@/config/motion';
import type {
  ContactFormValues,
  ElementRef,
  FormActionsProps,
  SuccessIndicatorProps,
} from '@/config/types';
import {
  useAnimationConfig,
  useContactFormMutation,
  useInView,
  useMotionVariant,
  useSnackbar,
} from '@/hooks';
import { buttonMinWidthSx, iconSx } from '@/styles/shared';

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

// Creates ContactFormValues from FormData with null safety
function extractFormValues(formData: FormData): ContactFormValues {
  const getString = (key: string): string => {
    const value = formData.get(key);
    return typeof value === 'string' ? value : '';
  };

  const name = getString('name');
  const email = getString('email');
  const message = getString('message');

  // Validate required fields are present
  if (!name || !email || !message) {
    throw new Error('Required form fields are missing or invalid');
  }

  return {
    name,
    email,
    company: getString('company'),
    url: getString('url'),
    message,
  };
}

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
        Message sent!
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
        aria-label="Clear form"
        sx={buttonMinWidthSx}
      >
        <Box component="span" sx={clearTextSx}>
          Clear
        </Box>
      </Button>
      <Button
        variant="contained"
        type="submit"
        loading={isPending}
        disabled={isPending}
        startIcon={<SendRounded sx={iconSx} />}
        aria-label={isPending ? 'Sending message' : 'Send message'}
        sx={buttonMinWidthSx}
      >
        {!isPending && 'Send'}
      </Button>
    </Stack>
  );
}

function ContactFormContent(): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
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

  const handleReset = () => {
    formRef.current?.reset();
    reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any pending auto-reset on new submission
    reset();

    const values = extractFormValues(new FormData(e.currentTarget));

    mutate(values, {
      onSuccess: () => showSnackbar('Message sent successfully!', 'success'),
      onError: (error) => showSnackbar(error.message, 'error'),
    });
  };

  // Auto-reset form after successful submission
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      formRef.current?.reset();
      reset();
    }, FORM_RESET_DELAY);

    return () => clearTimeout(timer);
  }, [showSuccess, reset]);

  return (
    <Card title="" sx={formCardSx}>
      <Box ref={formContainerRef}>
        <Stack
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          spacing={2}
        >
          <motion.div custom={0} {...fieldMotion} layout>
            <ContactFormFields defaultValues={undefined} errors={{}} />
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
    <SectionContainer id="contact" title="Contact" icon={EmailRounded}>
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
