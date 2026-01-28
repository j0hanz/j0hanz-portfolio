import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import {
  alpha,
  Box,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

import { FadeContent, ShinyText } from '@/components/animations';
import { SocialLinkButton, SocialLinkList } from '@/components/SocialLinks';
import { CONTACT_CONFIG } from '@/config/constants';
import {
  useAnimationConfig,
  useCopyWithFeedback,
  useCvModalActions,
} from '@/hooks';
import { badgeItems } from '@/lib/data/badges';

// Computed once at module level
const CURRENT_YEAR = new Date().getFullYear();
const copyButtonSx: SxProps<Theme> = (theme) => ({
  p: 0.9,
  color: 'text.secondary',
  bgcolor: alpha(theme.palette.action.hover, 0.04),
  backdropFilter: theme.custom.motion.backdropBlur.soft,
  WebkitBackdropFilter: theme.custom.motion.backdropBlur.soft,
  border: '1px solid',
  borderColor: 'divider',
  transition: theme.custom.motion.transitionFast,
  '&:hover': {
    color: 'primary.main',
    bgcolor: alpha(theme.palette.primary.main, 0.08),
    borderColor: 'primary.main',
    transform: 'translateY(-2px)',
  },
});
const COPYRIGHT_TEXT = `© ${CURRENT_YEAR} Linus Johansson`;

// ============================================================================
// COMPONENTS
// ============================================================================

type AwardBadgeProps = Readonly<{
  href: string;
  imgSrc: string;
  date: string;
  index?: number;
}>;

function AwardBadge({ href, imgSrc, date, index = 0 }: AwardBadgeProps) {
  const theme = useTheme();
  const badgeSize = theme.custom.sizing.awardBadge;

  return (
    <Grid size={theme.custom.grid.third}>
      <FadeContent blur duration={800} delay={index * 150} threshold={0.2}>
        <Stack alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'block',
              borderRadius: 2,
              overflow: 'hidden',
              transition: theme.custom.motion.transitionStandard,
              '&:hover': {
                transform: 'scale(1.05)',
                filter: 'brightness(1.1)',
              },
            }}
          >
            <Box
              component="img"
              src={imgSrc}
              alt={`Hackathon Award - ${date}`}
              loading="lazy"
              sx={{
                width: badgeSize,
                height: badgeSize,
                borderRadius: 2,
                display: 'block',
              }}
            />
          </Link>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              letterSpacing: (theme) =>
                theme.custom.typography.letterSpacing.wide,
              fontSize: (theme) => theme.custom.typography.fontSize.badgeDate,
            }}
          >
            {date.toUpperCase()}
          </Typography>
        </Stack>
      </FadeContent>
    </Grid>
  );
}

function ContactSection() {
  const { copyWithFeedback } = useCopyWithFeedback();
  const { openCvModal } = useCvModalActions();
  const { prefersReducedMotion } = useAnimationConfig();
  const handleCopy = async () => {
    await copyWithFeedback(
      CONTACT_CONFIG.EMAIL,
      'Email copied!',
      'Failed to copy'
    );
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'center', sm: 'flex-end' }}
      gap={{ xs: 4, sm: 2 }}
    >
      {/* Email */}
      <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Link
            href={`mailto:${CONTACT_CONFIG.EMAIL}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mr: 1,
              color: 'text.secondary',
              textDecoration: 'none',
              transition: (theme) => theme.custom.motion.transitionColor,
              '&:hover': { color: 'primary.main' },
            }}
          >
            <EmailRounded
              sx={{ fontSize: (theme) => theme.custom.sizing.iconSm }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: (theme) =>
                  theme.custom.typography.fontSize.footerContact,
              }}
            >
              {CONTACT_CONFIG.EMAIL}
            </Typography>
          </Link>
          <Tooltip title="Copy email" arrow placement="top">
            <IconButton
              onClick={handleCopy}
              sx={copyButtonSx}
              size="small"
              aria-label="Copy email address"
            >
              <ContentCopyRounded
                sx={{ fontSize: (theme) => theme.custom.sizing.iconXs }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Copyright - centered */}
      <Box
        sx={{
          textAlign: 'center',
          display: { xs: 'none', sm: 'block' },
          order: { sm: 0 },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            letterSpacing: (theme) =>
              theme.custom.typography.letterSpacing.tight,
            fontSize: (theme) =>
              theme.custom.typography.fontSize.footerCopyright,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ShinyText
            text={COPYRIGHT_TEXT}
            speed={3}
            disabled={prefersReducedMotion}
          />
        </Typography>
      </Box>

      {/* Social Links */}
      <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
        <Stack
          direction="row"
          gap={2}
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
        >
          <SocialLinkList
            openModal={openCvModal}
            renderLink={(props) => <SocialLinkButton {...props} />}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

// ============================================================================
// MAIN
// ============================================================================

function Footer() {
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <Box
      component="footer"
      id="footer"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="stretch"
      minHeight="100vh"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Awards Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Badges Grid */}
        <Grid
          container
          sx={{
            gap: { xs: 2, sm: 3, md: 4, lg: 5 },
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {badgeItems.map((badge, index) => (
            <AwardBadge key={badge.href} {...badge} index={index} />
          ))}
        </Grid>
      </Box>
      {/* Contact & Copyright */}
      <Box>
        <ContactSection />

        {/* Mobile copyright - only shows on xs */}
        <Typography
          variant="caption"
          sx={{
            display: { xs: 'flex', sm: 'none' },
            letterSpacing: (theme) =>
              theme.custom.typography.letterSpacing.tight,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            mt: { xs: 6, md: 0 },
            fontSize: (theme) =>
              theme.custom.typography.fontSize.footerCopyright,
          }}
        >
          <ShinyText
            text={COPYRIGHT_TEXT}
            speed={3}
            disabled={prefersReducedMotion}
          />
        </Typography>
      </Box>
    </Box>
  );
}

export { Footer };
