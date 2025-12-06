import { type JSX, useEffect, useState } from 'react';

import CloseRounded from '@mui/icons-material/CloseRounded';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import LanguageRounded from '@mui/icons-material/LanguageRounded';
import {
  alpha,
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import Cv_en from '@/assets/Linus_Johansson_CV_en.pdf';
import Cv_se from '@/assets/Linus_Johansson_CV_sv.pdf';
import {
  modalVariants,
  staggerContainerNormal,
  staggerItemVariant,
} from '@/config/motion';
import { GRID, SPACING } from '@/config/responsive';
import type { ModalCvProps } from '@/config/types';
import { useAnimationConfig, useMobileBreakpoint, useSnackbar } from '@/hooks';
import { SIZING, TRANSITION_STANDARD } from '@/styles/shared';

// ============================================================================
// MOTION COMPONENTS
// ============================================================================

const MotionDialogContent = motion.create(DialogContent);
const MotionBox = motion.create(Box);
const MotionButtonBase = motion.create(ButtonBase);

// ============================================================================
// CV LANGUAGE OPTIONS
// ============================================================================

interface CvOption {
  id: string;
  flag: string;
  label: string;
  language: string;
  file: string;
  fileName: string;
}

const CV_OPTIONS: readonly CvOption[] = [
  {
    id: 'sv',
    flag: 'fi-se',
    label: 'Svenska',
    language: 'Swedish',
    file: Cv_se,
    fileName: 'Linus_Johansson_CV_sv.pdf',
  },
  {
    id: 'en',
    flag: 'fi-gb',
    label: 'English',
    language: 'English',
    file: Cv_en,
    fileName: 'Linus_Johansson_CV_en.pdf',
  },
] as const;

// ============================================================================
// STYLE CONSTANTS
// ============================================================================

const dialogPaperSx: SxProps<Theme> = {
  bgcolor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
  overflow: 'visible',
};

const contentSx: SxProps<Theme> = {
  p: 0,
  overflow: 'visible',
  bgcolor: 'backdrop.glass',
  borderRadius: 2,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: 1,
  borderColor: (theme) => alpha(theme.palette.divider, 0.1),
};

const headerSx: SxProps<Theme> = {
  pt: SPACING.card,
  px: SPACING.card,
  pb: 0,
  textAlign: 'center',
};

const titleStackSx: SxProps<Theme> = {
  mb: { xs: 0.5, sm: 0.75, md: 1 },
};

const titleIconSx: SxProps<Theme> = {
  fontSize: SIZING.iconLg,
  color: 'primary.main',
};

const titleTextSx: SxProps<Theme> = {
  fontWeight: 500,
};

const subtitleSx: SxProps<Theme> = {
  color: 'text.secondary',
  mb: { xs: 2, sm: 2.5, md: 3 },
};

const closeButtonSx: SxProps<Theme> = {
  position: 'absolute',
  top: { xs: 8, sm: 10, md: 12 },
  right: { xs: 8, sm: 10, md: 12 },
  color: 'text.secondary',
  bgcolor: (theme) => alpha(theme.palette.action.active, 0.04),
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.action.active, 0.12),
    color: 'text.primary',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: 2,
  },
};

const gridContainerSx: SxProps<Theme> = {
  px: SPACING.card,
  pb: SPACING.card,
};

const cardBaseSx: SxProps<Theme> = {
  width: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: { xs: 1.5, sm: 2, md: 2.5 },
  p: { xs: 2.5, sm: 3, md: 4 },
  borderRadius: 2.5,
  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
  transition: TRANSITION_STANDARD,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  // Focus styles
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: 2,
  },
  // Hover styles
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
    transform: 'translateY(-4px)',
    boxShadow: (theme) =>
      `0 12px 24px -8px ${alpha(theme.palette.common.black, 0.15)}`,
    '& .flag-icon': {
      transform: 'scale(1.1)',
    },
    '& .download-icon': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  // Active styles
  '&:active': {
    transform: 'translateY(-2px) scale(0.98)',
  },
};

const flagContainerSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const flagIconBaseSx: SxProps<Theme> = {
  fontSize: SIZING.iconFlag,
  transition: TRANSITION_STANDARD,
  borderRadius: 1,
  boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.12)}`,
};

const downloadIconSx: SxProps<Theme> = {
  position: 'absolute',
  bottom: { xs: -6, sm: -8 },
  right: { xs: -6, sm: -8 },
  fontSize: SIZING.iconSm,
  color: 'primary.main',
  bgcolor: 'background.paper',
  borderRadius: '50%',
  p: 0.5,
  opacity: 0,
  transform: 'translateY(4px)',
  transition: TRANSITION_STANDARD,
  boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.common.black, 0.15)}`,
};

const languageLabelSx: SxProps<Theme> = {
  fontWeight: 600,
  color: 'text.primary',
  letterSpacing: 0.5,
};

const languageSubtextSx: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: 'caption.fontSize',
};

// ============================================================================
// CV LANGUAGE CARD COMPONENT
// ============================================================================

interface CvLanguageCardProps {
  option: CvOption;
  onClick: () => void;
  index: number;
}

function CvLanguageCard({
  option,
  onClick,
  index,
}: CvLanguageCardProps): JSX.Element {
  const { prefersReducedMotion } = useAnimationConfig();

  const cardMotion = prefersReducedMotion
    ? {}
    : {
        variants: staggerItemVariant,
        custom: index,
      };

  return (
    <MotionButtonBase
      onClick={onClick}
      aria-label={`Download CV in ${option.language}`}
      sx={cardBaseSx}
      {...cardMotion}
    >
      <Box sx={flagContainerSx}>
        <Box
          component="span"
          className={`fi ${option.flag} flag-icon`}
          sx={flagIconBaseSx}
        />
        <DownloadRounded className="download-icon" sx={downloadIconSx} />
      </Box>
      <Stack spacing={0.25} alignItems="center">
        <Typography variant="body1" sx={languageLabelSx}>
          {option.label}
        </Typography>
        <Typography variant="caption" sx={languageSubtextSx}>
          {option.language}
        </Typography>
      </Stack>
    </MotionButtonBase>
  );
}

// ============================================================================
// MAIN MODAL COMPONENT
// ============================================================================

function ModalCv({ open, onClose }: ModalCvProps): JSX.Element {
  const { showSnackbar } = useSnackbar();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const isMobile = useMobileBreakpoint('sm');
  const [flagIconsLoaded, setFlagIconsLoaded] = useState(false);

  // Lazy-load flag-icons CSS only when modal opens
  useEffect(() => {
    if (open && !flagIconsLoaded) {
      import('flag-icons/css/flag-icons.min.css').then(() => {
        setFlagIconsLoaded(true);
      });
    }
  }, [open, flagIconsLoaded]);

  const handleDownload = (option: CvOption): void => {
    try {
      const link = document.createElement('a');
      link.href = option.file;
      link.download = option.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSnackbar(`Downloading ${option.language} CV...`, 'success');
      onClose();
    } catch (error) {
      showSnackbar('Failed to download CV. Please try again.', 'error');
      if (import.meta.env.DEV) console.error('Download failed:', error);
    }
  };

  // Animation configuration
  const contentMotion = prefersReducedMotion
    ? {}
    : {
        ...modalVariants.slideDown,
        transition: getTransition('springSmooth', { duration: 0.5 }),
      };

  const containerMotion = prefersReducedMotion
    ? {}
    : {
        variants: staggerContainerNormal,
        initial: 'initial',
        animate: 'animate',
      };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="cv-modal-title"
      aria-describedby="cv-modal-description"
      slotProps={{
        paper: { sx: dialogPaperSx },
        backdrop: {
          sx: {
            bgcolor: (theme: Theme) => alpha(theme.palette.common.black, 0.5),
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          },
        },
      }}
    >
      <MotionDialogContent sx={contentSx} {...contentMotion}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          aria-label="Close modal"
          size={isMobile ? 'medium' : 'small'}
          sx={closeButtonSx}
        >
          <CloseRounded sx={{ fontSize: SIZING.iconSm }} />
        </IconButton>

        {/* Header */}
        <Box sx={headerSx}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={titleStackSx}
          >
            <LanguageRounded sx={titleIconSx} />
            <DialogTitle
              id="cv-modal-title"
              sx={{ p: 0, ...titleTextSx }}
              component="h2"
            >
              Download CV
            </DialogTitle>
          </Stack>
          <Typography id="cv-modal-description" variant="body2" sx={subtitleSx}>
            Select your preferred language
          </Typography>
        </Box>

        {/* Language Options Grid */}
        <MotionBox sx={gridContainerSx} {...containerMotion}>
          <Grid
            container
            spacing={SPACING.grid}
            role="group"
            aria-label="CV language options"
          >
            {CV_OPTIONS.map((option, index) => (
              <Grid key={option.id} size={GRID.half}>
                <CvLanguageCard
                  option={option}
                  onClick={() => handleDownload(option)}
                  index={index}
                />
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </MotionDialogContent>
    </Dialog>
  );
}

export default ModalCv;
