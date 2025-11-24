import { useActionState, useEffect, useRef } from 'react';

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
import type { SuccessIndicatorProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import { sendEmailAction } from '@/lib/actions';

import ContactFormFields from './ContactFormFields';

const successStackSx: SxProps<Theme> = {
  mt: 2,
  px: 2,
};

const successTextSx: SxProps<Theme> = {
  fontWeight: 500,
};

const submitButtonSx: SxProps<Theme> = {
  minWidth: 120,
};

const cardSx: SxProps<Theme> = {
  height: 'auto',
};

const clearButtonSx: SxProps<Theme> = {
  minWidth: 120,
};

const clearTextSx: SxProps<Theme> = {
  display: { xs: 'none', sm: 'inline' },
};

const iconSx: SxProps<Theme> = {
  fontSize: '1rem',
};

function SuccessIndicator({
  visible,
}: SuccessIndicatorProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const { container, checkmarkCircle, checkmarkPath } =
    successIndicatorVariants;

  const circleInitial = prefersReducedMotion
    ? { strokeDashoffset: 0 }
    : checkmarkCircle.initial;
  const pathInitial = prefersReducedMotion
    ? { pathLength: 1 }
    : checkmarkPath.initial;

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
              initial={circleInitial}
              animate={checkmarkCircle.animate}
              transition={getTransition('smooth', { duration: 0.6 })}
            />
            <motion.path
              d="M7.5 12.5l3 3.2 6-6.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={pathInitial}
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

function ContactFormContent(): React.JSX.Element {
  const [state, formAction, isPending] = useActionState(sendEmailAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  const showSuccess = !!state?.success;
  const errors = state?.errors || {};

  // Auto-reset form on success
  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        formRef.current?.reset();
        // We can't easily "reset" the action state to null, but the success indicator will hide if we had a way to clear it.
        // For now, the success indicator stays until next submission or manual clear.
        // To hide it, we'd need local state or a wrapper.
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state?.success, state?.timestamp]);

  const handleReset = () => {
    formRef.current?.reset();
  };

  return (
    <Card title="" sx={cardSx}>
      <Stack
        component="form"
        ref={formRef}
        action={formAction}
        noValidate
        spacing={2}
      >
        <ContactFormFields
          defaultValues={state?.values}
          errors={errors}
          disabled={isPending}
        />
        <SuccessIndicator visible={showSuccess} />
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
            onClick={handleReset}
            disabled={isPending}
            startIcon={<DeleteRounded sx={iconSx} />}
            aria-label="Clear form"
            sx={clearButtonSx}
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
            sx={submitButtonSx}
          >
            {!isPending && 'Send'}
          </Button>
        </Stack>
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
