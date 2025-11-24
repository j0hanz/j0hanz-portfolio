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
import { AnimatePresence, motion } from 'motion/react';

import Badges from '@/components/Badges';
import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { successIndicatorVariants } from '@/config/motion';
import type { ContactFormValues, SuccessIndicatorProps } from '@/config/types';
import {
  useAnimationConfig,
  useContactFormMutation,
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

function SuccessIndicator({
  visible,
}: SuccessIndicatorProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const { container, checkmarkCircle, checkmarkPath } =
    successIndicatorVariants;

  return (
    <AnimatePresence initial={false} mode="wait">
      {visible && (
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
              initial={prefersReducedMotion ? { strokeDashoffset: 0 } : checkmarkCircle.initial}
              animate={checkmarkCircle.animate}
              transition={getTransition('smooth', { duration: 0.6 })}
            />
            <motion.path
              d="M7.5 12.5l3 3.2 6-6.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReducedMotion ? { pathLength: 1 } : checkmarkPath.initial}
              animate={checkmarkPath.animate}
              transition={getTransition('smooth', {
                duration: 0.45,
                delay: 0.15,
              })}
            />
          </motion.svg>
          <Typography variant="body2" color="success.main" sx={successTextSx}>
            Message sent!
          </Typography>
        </Stack>
      )}
    </AnimatePresence>
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
  const { showSnackbar } = useSnackbar();
  const mutation = useContactFormMutation();

  const showSuccess = mutation.isSuccess && !mutation.isPending;

  const handleReset = () => {
    formRef.current?.reset();
    mutation.reset(); // Reset mutation state
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values: ContactFormValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: (formData.get('company') as string) || '',
      url: (formData.get('url') as string) || '',
      message: formData.get('message') as string,
    };

    mutation.mutate(values, {
      onSuccess: () => {
        showSnackbar('Message sent successfully!', 'success');
      },
      onError: (error) => {
        showSnackbar(error.message, 'error');
      },
    });
  };

  // Auto-reset form 3 seconds after successful submission
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      formRef.current?.reset();
      mutation.reset();
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccess, mutation]);

  return (
    <Card title="" sx={formCardSx}>
      <Stack
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        spacing={2}
      >
        <ContactFormFields defaultValues={undefined} errors={{}} />
        <SuccessIndicator visible={showSuccess} />
        <FormActions onReset={handleReset} isPending={mutation.isPending} />
      </Stack>
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
