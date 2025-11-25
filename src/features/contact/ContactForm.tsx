import { type RefObject, useEffect, useRef } from 'react';

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
import SectionContainer from '@/components/SectionContainer';
import { FORM_RESET_DELAY } from '@/config/constants';
import { successIndicatorVariants } from '@/config/motion';
import type { ContactFormValues, SuccessIndicatorProps } from '@/config/types';
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

// Animation variants - consolidated
const contactAnimations = {
  field: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  },
  action: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  },
} satisfies Record<string, Record<string, unknown>>;

// Creates ContactFormValues from FormData
function extractFormValues(formData: FormData): ContactFormValues {
  return {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: (formData.get('company') as string) || '',
    url: (formData.get('url') as string) || '',
    message: formData.get('message') as string,
  };
}

function SuccessIndicator({
  visible,
}: SuccessIndicatorProps): React.JSX.Element | null {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const { container, checkmarkCircle, checkmarkPath } =
    successIndicatorVariants;

  if (!visible) return null;

  const circleInitial = prefersReducedMotion
    ? { strokeDashoffset: 0 }
    : checkmarkCircle.initial;
  const pathInitial = prefersReducedMotion
    ? { pathLength: 1 }
    : checkmarkPath.initial;

  return (
    <Stack
      component={motion.div}
      key="contact-success"
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1.5}
      initial={container.initial}
      animate={container.animate}
      exit={container.exit}
      transition={getTransition('smooth')}
      sx={successStackSx}
    >
      <motion.svg
        width="38"
        height="38"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        color="success.main"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          initial={circleInitial}
          animate={checkmarkCircle.animate}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.6,
          }}
        />
        <motion.path
          d="M7.5 12.5l3 3.2 6-6.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={pathInitial}
          animate={checkmarkPath.animate}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.15,
            duration: 0.45,
          }}
        />
      </motion.svg>
      <Typography variant="body2" color="success.main" sx={successTextSx}>
        Message sent!
      </Typography>
    </Stack>
  );
}

interface FormActionsProps {
  onReset: () => void;
  isPending: boolean;
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
  const mutation = useContactFormMutation();
  const isInView = useInView(formContainerRef as RefObject<Element>, {
    once: true,
    amount: 0.2,
  });

  const fieldMotion = useMotionVariant(contactAnimations.field, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

  const actionMotion = useMotionVariant(contactAnimations.action, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

  const showSuccess = mutation.isSuccess && !mutation.isPending;
  // Extract stable reference to avoid effect re-subscription
  const resetMutation = mutation.reset;

  const handleReset = () => {
    formRef.current?.reset();
    resetMutation();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = extractFormValues(new FormData(e.currentTarget));

    mutation.mutate(values, {
      onSuccess: () => showSnackbar('Message sent successfully!', 'success'),
      onError: (error) => showSnackbar(error.message, 'error'),
    });
  };

  // Auto-reset form after successful submission
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      formRef.current?.reset();
      resetMutation();
    }, FORM_RESET_DELAY);

    return () => clearTimeout(timer);
  }, [showSuccess, resetMutation]);

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
            <FormActions onReset={handleReset} isPending={mutation.isPending} />
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
