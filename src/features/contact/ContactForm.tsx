import React from 'react';

import { useFormStatus } from 'react-dom';

import {
  HiEnvelope,
  HiOutlinePaperAirplane,
  HiOutlineTrash,
} from 'react-icons/hi2';

import { Card, CardContent, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AnimatePresence, motion } from 'motion/react';

import Badges from '@/components/Badges';
import Button from '@/components/Button';
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
      startIcon={<HiOutlinePaperAirplane style={{ fontSize: '0.9rem' }} />}
      aria-label={pending ? 'Sending message' : 'Send message'}
      sx={{
        minWidth: 0,
        flexGrow: { xs: 1, sm: 0 },
        px: 3,
        py: 0.75,
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
    <Card
      sx={{
        height: 1,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Stack component="form" noValidate action={submitAction}>
          <ContactFormFields
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
          <SuccessIndicator visible={showSuccess} />
          <Stack
            direction="row"
            justifyContent={{ xs: 'center', sm: 'space-between' }}
            flexWrap="wrap"
            gap={2}
            sx={{
              mt: 3,
              px: 2,
              pb: 2,
            }}
          >
            <Button
              variant="contained"
              color="neutral"
              type="button"
              onClick={handleReset}
              disabled={isSending}
              startIcon={
                <HiOutlineTrash
                  style={{
                    color: '#ffc800',
                    fontSize: '0.9rem',
                  }}
                />
              }
              aria-label="Clear form"
              sx={{
                minWidth: 0,
                px: 1.5,
                py: 0.75,
              }}
            />
            <ContactSubmitButton />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Rendering contact form section
function ContactForm(): React.JSX.Element {
  return (
    <SectionContainer id="contact" title="Contact" icon={HiEnvelope}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 3, md: 4 }}
      >
        <Grid size={{ xs: 12, md: 10 }}>
          <ContactFormContent />
          <Badges />
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default ContactForm;
