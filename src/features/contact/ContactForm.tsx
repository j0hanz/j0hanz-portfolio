import React from 'react';

import {
  HiEnvelope,
  HiOutlinePaperAirplane,
  HiOutlineTrash,
} from 'react-icons/hi2';

import { Card, CardContent, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

import Badges from '@/components/Badges';
import Button from '@/components/Button';
import SectionContainer from '@/components/SectionContainer';
import { useContactForm } from '@/hooks';

import ContactFormFields from './ContactFormFields';

function ContactFormContent(): React.JSX.Element {
  const {
    isSending,
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
  } = useContactForm();

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
        <Stack component="form" noValidate onSubmit={handleSubmit}>
          <ContactFormFields
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
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
            <Button
              variant="contained"
              type="submit"
              loading={isSending}
              disabled={isSending}
              startIcon={
                <HiOutlinePaperAirplane style={{ fontSize: '0.9rem' }} />
              }
              aria-label={isSending ? 'Sending message' : 'Send message'}
              sx={{
                minWidth: 0,
                flexGrow: { xs: 1, sm: 0 },
                px: 3,
                py: 0.75,
              }}
            >
              {!isSending && 'Send'}
            </Button>
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
