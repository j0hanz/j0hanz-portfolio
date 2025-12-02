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

import { defaultSocialLinkRenderer } from '@/components/socialLinkRenderer';
import { SocialLinkList } from '@/components/SocialLinks';
import { CONTACT_CONFIG } from '@/config/constants';
import { SPACING } from '@/config/responsive';
import { useCopyWithFeedback, useCvModalActions } from '@/hooks';
import { SIZING, SKEW_TRANSFORM, TRANSITION_STANDARD } from '@/styles/shared';
import { getCopyMessages } from '@/utils/clipboard';

const footerSx: SxProps<Theme> = {
  bgcolor: 'neutral.dark',
  py: { xs: 1.5, md: 2 },
  pb: { xs: 0.25, sm: 2 },
  color: 'primary.contrastText',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const contactLabelSx: SxProps<Theme> = {
  pb: { xs: 2, sm: 3 },
  // Responsive font size for better mobile readability
  fontSize: { xs: '1rem', sm: '1.1rem' },
  color: 'inherit',
  opacity: 0.8,
};

const emailIconSx: SxProps<Theme> = {
  color: 'inherit',
  opacity: 0.8,
  fontSize: SIZING.iconSmall,
  mr: { xs: 1, sm: 1.25 },
  transition: TRANSITION_STANDARD,
};

const emailLinkSx: SxProps<Theme> = {
  textDecoration: 'none',
  fontSize: SIZING.iconSmall,
  color: 'inherit',
  transition: TRANSITION_STANDARD,
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
  fontSize: SIZING.iconSmall,
  mr: { xs: '8px', sm: '10px' },
  transition: TRANSITION_STANDARD,
};

const copyrightTextSx: SxProps<Theme> = {
  transform: SKEW_TRANSFORM,
  textTransform: 'uppercase',
  // Responsive copyright text size
  fontSize: { xs: '0.75rem', sm: '0.8rem' },
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

function Footer(): React.JSX.Element {
  const { openCvModal } = useCvModalActions();
  const { copyWithFeedback } = useCopyWithFeedback();

  const handleCopyEmail = async () => {
    const messages = getCopyMessages('email');
    await copyWithFeedback(
      CONTACT_CONFIG.EMAIL,
      messages.success,
      messages.error
    );
  };

  return (
    <Box component="footer" id="footer" sx={footerSx}>
      <Container maxWidth={false}>
        <Grid container spacing={SPACING.grid} sx={{ mx: 'auto' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={contactLabelSx}>Contact Details</Typography>
            <Stack direction="row" alignItems="center">
              <EmailRounded sx={emailIconSx} />
              <Box
                component="a"
                href={`mailto:${CONTACT_CONFIG.EMAIL}`}
                sx={emailLinkSx}
              >
                {CONTACT_CONFIG.EMAIL}
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
                    sx={{ fontSize: SIZING.icon, opacity: 0.85 }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: 1 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                pb: 3,
              }}
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
                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                <SocialLinkList
                  openModal={openCvModal}
                  renderLink={defaultSocialLinkRenderer}
                  wrapItem={wrapFooterSocialLink}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
