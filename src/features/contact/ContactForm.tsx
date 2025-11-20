import React from 'react';

import { useFormStatus } from 'react-dom';

import { DeleteRounded, EmailRounded, SendRounded } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AnimatePresence, motion } from 'motion/react';

import Badges from '@/components/Badges';
import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { useAnimationConfig, useContactForm } from '@/hooks';

import ContactFormFields from './ContactFormFields';

interface SuccessIndicatorProps {
  visible: boolean;
}

function SuccessIndicator({
  visible,
}: SuccessIndicatorProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={getTransition('smooth')}
          sx={{ mt: 2, px: 2 }}
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
              initial={{
                strokeDasharray: 56.5,
                strokeDashoffset: prefersReducedMotion ? 0 : 56.5,
              }}
              animate={{ strokeDashoffset: 0 }}
              transition={getTransition('smooth', { duration: 0.6 })}
            />
            <motion.path
              d="M7.5 12.5l3 3.2 6-6.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={getTransition('smooth', {
                duration: 0.45,
                delay: 0.15,
              })}
            />
          </motion.svg>
          <Typography
            variant="body2"
            color="success.main"
            sx={{ fontWeight: 600 }}
          >
            Message sent!
          </Typography>
        </Stack>
      )}
    </AnimatePresence>
  );
}

function ContactSubmitButton(): React.JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      type="submit"
      loading={pending}
      disabled={pending}
      startIcon={<SendRounded sx={{ fontSize: '1rem' }} />}
      aria-label={pending ? 'Sending message' : 'Send message'}
      sx={{
        minWidth: 120,
      }}
    >
      {!pending && 'Send'}
    </Button>
  );
}

function ContactFormContent(): React.JSX.Element {
  const {
    isSending,
    submissionState,
    formData,
    errors,
    handleChange,
    submitAction,
    handleReset,
  } = useContactForm();
  const showSuccess = submissionState === 'success';

  return (
    <Card title="" sx={{ height: 'auto' }}>
      <Stack component="form" noValidate action={submitAction} spacing={2}>
        <ContactFormFields
          formData={formData}
          errors={errors}
          handleChange={handleChange}
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
            disabled={isSending}
            startIcon={
              <DeleteRounded
                sx={{
                  fontSize: '1rem',
                }}
              />
            }
            aria-label="Clear form"
            sx={{
              minWidth: 120,
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: 'none', sm: 'inline' } }}
            >
              Clear
            </Box>
          </Button>
          <ContactSubmitButton />
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
