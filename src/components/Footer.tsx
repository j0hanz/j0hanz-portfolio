import { FC } from 'react';

import { HiOutlineClipboardDocument, HiOutlineEnvelope } from 'react-icons/hi2';
import { SiCreativecommons } from 'react-icons/si';
import { toast } from 'react-toastify';

import {
  Box,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { SocialLinkList } from '@/components/NavBar';
import { SocialLinkRenderProps } from '@/config/types';
import { useAnimationConfig, useCopyToClipboard, useToggle } from '@/hooks';

import ModalCv from './ModalCv';

const CONTACT_EMAIL = 'l.johansson93@outlook.com';

const wrapFooterSocialLink = (
  id: string,
  node: React.JSX.Element
): React.JSX.Element => (
  <Grid size="auto" sx={{ mb: { xs: 2, sm: 0 } }} key={id}>
    {node}
  </Grid>
);

const EMAIL_TOAST_ID = 'contact-email-toast';

const Footer: FC = () => {
  const {
    value: showModal,
    setTrue: handleModalOpen,
    setFalse: handleModalClose,
  } = useToggle(false);
  const [copyEmail] = useCopyToClipboard();
  const { getTransition, prefersReducedMotion } = useAnimationConfig();

  const renderFooterSocialLink = ({
    href,
    onClick,
    tooltip,
    icon,
    index,
  }: SocialLinkRenderProps) => {
    const hasInteraction = Boolean(href || onClick);
    const staggerDelay = prefersReducedMotion ? 0 : index * 0.05;

    return (
      <Box
        component={motion.a}
        href={href}
        onClick={onClick}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        aria-label={tooltip}
        sx={{
          cursor: hasInteraction ? 'pointer' : 'default',
          color: 'inherit',
          textDecoration: 'none',
          display: 'inline-flex',
          '&:hover': {
            color: 'primary.light',
          },
        }}
        whileHover={
          prefersReducedMotion ? { scale: 1.05 } : { scale: 1.2, rotate: 5 }
        }
        whileTap={{ scale: 0.92 }}
        transition={getTransition('snappy', { delay: staggerDelay })}
      >
        {icon}
      </Box>
    );
  };

  const handleCopyEmail = async () => {
    const copied = await copyEmail(CONTACT_EMAIL);

    if (copied) {
      toast.success('Email copied to clipboard', { toastId: EMAIL_TOAST_ID });
      return;
    }

    toast.error('Unable to copy email', { toastId: EMAIL_TOAST_ID });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'neutral.dark',
        py: 2,
        pb: { xs: 0.25, sm: 2 },
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth={false}>
        <Grid container sx={{ mx: 'auto' }}>
          <Grid size={{ sm: 6 }}>
            <Typography
              sx={{
                pb: 3,
                fontSize: '1.1rem',
                color: 'inherit',
                opacity: 0.8,
              }}
            >
              Contact Details
            </Typography>
            <Stack direction="row" alignItems="center">
              <HiOutlineEnvelope
                style={{
                  color: 'inherit',
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  marginRight: '10px',
                  transition: 'all 0.3s ease',
                }}
              />
              <Box
                component="a"
                href={`mailto:${CONTACT_EMAIL}`}
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  opacity: 0.8,
                  '&:hover': {
                    color: 'primary.light',
                    opacity: 1,
                  },
                }}
              >
                {CONTACT_EMAIL}
              </Box>
              <Tooltip title="Copy email" placement="top">
                <IconButton
                  onClick={handleCopyEmail}
                  color="inherit"
                  aria-label="Copy email address"
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                    },
                  }}
                >
                  <HiOutlineClipboardDocument
                    style={{ fontSize: '1rem', opacity: 0.85 }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ textAlign: { sm: 'right' }, mt: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
              sx={{ pb: 3 }}
            >
              <SiCreativecommons
                style={{
                  color: 'inherit',
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  marginRight: '10px',
                  transition: 'all 0.3s ease',
                }}
              />
              <Box
                component="small"
                sx={{
                  transform: 'skew(-10deg)',
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  color: 'inherit',
                  opacity: 0.8,
                }}
              >
                Copyright 2025
              </Box>
            </Stack>
            <Box sx={{ mt: { xs: 4, sm: 0 } }}>
              <Grid
                container
                sx={{
                  justifyContent: { xs: 'space-between', sm: 'flex-end' },
                  fontSize: '0.9rem',
                }}
              >
                <SocialLinkList
                  openModal={handleModalOpen}
                  renderLink={renderFooterSocialLink}
                  wrapItem={wrapFooterSocialLink}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ModalCv show={showModal} handleClose={handleModalClose} />
    </Box>
  );
};

export default Footer;
