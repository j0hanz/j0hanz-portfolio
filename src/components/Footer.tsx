import { FC } from 'react';

import { SiCreativecommons } from 'react-icons/si';

import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import {
  alpha,
  Box,
  Container,
  IconButton,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { SxProps } from '@mui/system';
import { motion } from 'motion/react';

import { SocialLinkList } from '@/components/SocialLinks';
import { CONTACT_EMAIL } from '@/config/constants';
import { SocialLinkRenderProps } from '@/config/types';
import { useAnimationConfig, useCopyWithFeedback, useModal } from '@/hooks';
import { SKEW_TRANSFORM } from '@/styles/shared';
import { getCopyMessages } from '@/utils/clipboard';

import ModalCv from './ModalCv';

const footerSx: SxProps<Theme> = {
  bgcolor: 'neutral.dark',
  py: 2,
  pb: { xs: 0.25, sm: 2 },
  color: 'primary.contrastText',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const contactLabelSx: SxProps<Theme> = {
  pb: 3,
  fontSize: '1.1rem',
  color: 'inherit',
  opacity: 0.8,
};

const emailIconSx: SxProps<Theme> = {
  color: 'inherit',
  opacity: 0.8,
  fontSize: '0.9rem',
  mr: 1.25,
  transition: 'all 0.3s ease',
};

const emailLinkSx: SxProps<Theme> = {
  textDecoration: 'none',
  fontSize: '0.9rem',
  color: 'inherit',
  transition: 'all 0.3s ease',
  opacity: 0.8,
  '&:hover': {
    color: 'primary.light',
    opacity: 1,
  },
};

const copyButtonSx: SxProps<Theme> = {
  ml: 1,
  bgcolor: (theme) => alpha(theme.palette.common.white, 0.08),
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.common.white, 0.15),
  },
};

const copyrightIconSx: SxProps<Theme> = {
  color: 'inherit',
  opacity: 0.8,
  fontSize: '0.9rem',
  mr: '10px',
  transition: 'all 0.3s ease',
};

const copyrightTextSx: SxProps<Theme> = {
  transform: SKEW_TRANSFORM,
  textTransform: 'uppercase',
  fontSize: '0.8rem',
  color: 'inherit',
  opacity: 0.8,
};

const wrapFooterSocialLink = (
  id: string,
  node: React.JSX.Element
): React.JSX.Element => (
  <Grid size="auto" sx={{ mb: { xs: 2, sm: 0 } }} key={id}>
    {node}
  </Grid>
);

const Footer: FC = () => {
  const cvModal = useModal(false);
  const { copyWithFeedback } = useCopyWithFeedback();
  const { getTransition, prefersReducedMotion } = useAnimationConfig();

  const renderFooterSocialLink = ({
    href,
    onClick,
    tooltip,
    icon,
    index,
  }: SocialLinkRenderProps): React.JSX.Element => {
    const hasInteraction = Boolean(href || onClick);
    const staggerDelay = prefersReducedMotion ? 0 : index * 0.05;
    const hoverAnimation = prefersReducedMotion
      ? { scale: 1.05 }
      : { scale: 1.2, rotate: 5 };

    const linkAttributes = href
      ? {
          target: '_blank' as const,
          rel: 'noopener noreferrer' as const,
        }
      : {};

    return (
      <Box
        component={motion.a}
        href={href}
        onClick={onClick}
        aria-label={tooltip}
        {...linkAttributes}
        sx={{
          cursor: hasInteraction ? 'pointer' : 'default',
          color: 'inherit',
          textDecoration: 'none',
          display: 'inline-flex',
        }}
        whileHover={hoverAnimation}
        whileTap={{ scale: 0.92 }}
        transition={getTransition('smooth', { delay: staggerDelay })}
      >
        {icon}
      </Box>
    );
  };

  const handleCopyEmail = async () => {
    const messages = getCopyMessages('email');
    await copyWithFeedback(CONTACT_EMAIL, messages.success, messages.error);
  };

  return (
    <Box component="footer" sx={footerSx}>
      <Container maxWidth={false}>
        <Grid container sx={{ mx: 'auto' }}>
          <Grid size={{ sm: 6 }}>
            <Typography sx={contactLabelSx}>Contact Details</Typography>
            <Stack direction="row" alignItems="center">
              <EmailRounded sx={emailIconSx} />
              <Box
                component="a"
                href={`mailto:${CONTACT_EMAIL}`}
                sx={emailLinkSx}
              >
                {CONTACT_EMAIL}
              </Box>
              <Tooltip title="Copy email" placement="top">
                <IconButton
                  onClick={handleCopyEmail}
                  color="inherit"
                  aria-label="Copy email address"
                  size="small"
                  sx={copyButtonSx}
                >
                  <ContentCopyRounded
                    sx={{ fontSize: '1rem', opacity: 0.85 }}
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
              <Box component={SiCreativecommons} sx={copyrightIconSx} />
              <Box component="small" sx={copyrightTextSx}>
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
                  openModal={cvModal.open}
                  renderLink={renderFooterSocialLink}
                  wrapItem={wrapFooterSocialLink}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <ModalCv show={cvModal.isOpen} handleClose={cvModal.close} />
    </Box>
  );
};

export default Footer;
