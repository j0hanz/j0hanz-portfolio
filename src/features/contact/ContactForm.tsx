import React from 'react';

import {
  HiEnvelope,
  HiOutlinePaperAirplane,
  HiOutlineTrash,
} from 'react-icons/hi2';

import { Box, Card, CardContent, CircularProgress, Grid } from '@mui/material';

import Badges from '@/components/Badges';
import Button from '@/components/Button';
import SectionContainer from '@/components/SectionContainer';
import { useContactForm } from '@/hooks';

import FormContact from './ContactFormFields';

import styles from './ContactForm.module.css';
import appStyles from '@/styles/App.module.css';

// Rendering contact form section
function ContactForm(): React.JSX.Element {
  const {
    isSending,
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
  } = useContactForm();

  return (
    <SectionContainer id="contact" title="Contact" icon={HiEnvelope}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid size={{ md: 10 }}>
          <Card className={`${appStyles.cardBgColor}`} sx={{ height: '100%' }}>
            <CardContent className={appStyles.formBody}>
              <Box component="form" noValidate onSubmit={handleSubmit}>
                <FormContact
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                    p: 2,
                  }}
                >
                  <Button
                    className={styles.clearButton}
                    type="button"
                    onClick={handleReset}
                    disabled={isSending}
                    icon={<HiOutlineTrash className={styles.buttonIconClear} />}
                  />
                  <Button
                    className={styles.submitButton}
                    type="submit"
                    disabled={isSending}
                    aria-label={isSending ? 'Sending message' : 'Send message'}
                    icon={
                      isSending ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <HiOutlinePaperAirplane className={styles.buttonIcon} />
                      )
                    }
                    text={isSending ? '' : 'Send'}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Badges />
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default ContactForm;
