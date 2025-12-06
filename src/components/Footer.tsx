import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import EmailRounded from '@mui/icons-material/EmailRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  alpha,
  Box,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { AnimatedContent } from '@/components/animations';

import { CONTACT_CONFIG } from '@/config/constants';
import { GRID } from '@/config/responsive';
import { useCopyWithFeedback, useCvModalActions } from '@/hooks';
import { badgeItems } from '@/lib/data/badges';
import { SIZING } from '@/styles/shared';
import { getCopyMessages } from '@/utils/clipboard';

// ============================================================================
// CONSTANTS
// ============================================================================

const BADGE_SIZE = { xs: 70, sm: 95, md: 110, lg: 150 };

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/linus-johansson-software-dev/',
    icon: LinkedInIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/j0hanz',
    icon: GitHubIcon,
  },
] as const;

// ============================================================================
// SHARED STYLES
// ============================================================================

const iconButtonSx = {
  p: 1,
  color: 'text.secondary',
  bgcolor: (t: { palette: { action: { hover: string } } }) =>
    alpha(t.palette.action.hover, 0.04),
  backdropFilter: 'blur(8px)',
  border: '1px solid',
  borderColor: 'divider',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: 'primary.main',
    bgcolor: (t: { palette: { primary: { main: string } } }) =>
      alpha(t.palette.primary.main, 0.08),
    borderColor: 'primary.main',
    transform: 'translateY(-2px)',
  },
} as const;

const sectionLabelSx = {
  fontSize: '0.8rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: 'text.secondary',
} as const;

// ============================================================================
// COMPONENTS
// ============================================================================

function AwardBadge({
  href,
  imgSrc,
  date,
  index,
}: {
  href: string;
  imgSrc: string;
  date: string;
  index: number;
}) {
  return (
    <Grid size={GRID.third}>
      <AnimatedContent distance={30} delay={index * 0.1} once>
        <Stack alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'block',
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
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
                width: BADGE_SIZE,
                height: BADGE_SIZE,
                borderRadius: 2,
                display: 'block',
              }}
            />
          </Link>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              letterSpacing: 1.5,
              fontWeight: 500,
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
            }}
          >
            {date.toUpperCase()}
          </Typography>
        </Stack>
      </AnimatedContent>
    </Grid>
  );
}

function ContactSection() {
  const { copyWithFeedback } = useCopyWithFeedback();
  const { openCvModal } = useCvModalActions();

  const handleCopy = async () => {
    const msg = getCopyMessages('email');
    await copyWithFeedback(CONTACT_CONFIG.EMAIL, msg.success, msg.error);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'center', sm: 'flex-end' }}
      gap={{ xs: 3, sm: 2 }}
    >
      {/* Email */}
      <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography sx={sectionLabelSx}>Email</Typography>
        <Stack direction="row" alignItems="center" gap={2}>
          <Link
            href={`mailto:${CONTACT_CONFIG.EMAIL}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.secondary',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <EmailRounded sx={{ fontSize: SIZING.iconSm }} />
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
            >
              {CONTACT_CONFIG.EMAIL}
            </Typography>
          </Link>
          <Tooltip title="Copy email" arrow placement="top">
            <IconButton
              onClick={handleCopy}
              sx={{ ...iconButtonSx, p: 0.9 }}
              size="small"
              aria-label="Copy email address"
            >
              <ContentCopyRounded sx={{ fontSize: SIZING.iconXs }} />
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
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          © {new Date().getFullYear()} Linus Johansson
        </Typography>
      </Box>

      {/* Social Links */}
      <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
        <Typography sx={sectionLabelSx}>Connect</Typography>
        <Stack
          direction="row"
          gap={4}
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
        >
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <Tooltip key={label} title={label} arrow placement="top">
              <IconButton
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={iconButtonSx}
                aria-label={`Visit ${label} profile`}
              >
                <Icon />
              </IconButton>
            </Tooltip>
          ))}
          <Tooltip title="Download CV" arrow placement="top">
            <IconButton
              onClick={openCvModal}
              sx={iconButtonSx}
              aria-label="Download CV"
            >
              <Typography
                component="span"
                sx={{
                  fontSize: SIZING.iconXs,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                CV
              </Typography>
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Stack>
  );
}

// ============================================================================
// MAIN
// ============================================================================

function Footer() {
  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        px: { xs: 1, sm: 2, md: 3, lg: 0 },
        py: { xs: 4, sm: 5, md: 6 },
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
            gap: { xs: 2, sm: 3, md: 6 },
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
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            mt: { xs: 6, md: 0 },
            fontSize: '0.7rem',
          }}
        >
          © {new Date().getFullYear()} Linus Johansson
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
