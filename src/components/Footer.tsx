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
import {
  footerContainerMarginSx,
  footerSocialLinkMarginSx,
  GRID_COLUMNS,
  justifyResponsiveSx,
  textAlignResponsiveSx,
} from '@/config/responsive';
import { useCopyWithFeedback, useCvModalActions } from '@/hooks';
import {
  ICON_SIZE,
  ICON_SIZE_SMALL,
  SKEW_TRANSFORM,
  TRANSITION_STANDARD,
} from '@/styles/shared';
import { getCopyMessages } from '@/utils/clipboard';

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
  fontSize: ICON_SIZE_SMALL,
  mr: 1.25,
  transition: TRANSITION_STANDARD,
};

const emailLinkSx: SxProps<Theme> = {
  textDecoration: 'none',
  fontSize: ICON_SIZE_SMALL,
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
  fontSize: ICON_SIZE_SMALL,
  mr: '10px',
  transition: TRANSITION_STANDARD,
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
  <Grid size="auto" sx={footerSocialLinkMarginSx} key={id}>
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
        <Grid container sx={{ mx: 'auto' }}>
          <Grid size={GRID_COLUMNS.footerLeft}>
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
                    sx={{ fontSize: ICON_SIZE, opacity: 0.85 }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid
            size={GRID_COLUMNS.footerRight}
            sx={{ ...textAlignResponsiveSx, mt: 1 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{ ...justifyResponsiveSx, pb: 3 }}
            >
              <Box component={SiCreativecommons} sx={copyrightIconSx} />
              <Box component="small" sx={copyrightTextSx}>
                Copyright 2025
              </Box>
            </Stack>
            <Box sx={footerContainerMarginSx}>
              <Grid
                container
                sx={{
                  ...justifyResponsiveSx,
                  fontSize: '0.9rem',
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
