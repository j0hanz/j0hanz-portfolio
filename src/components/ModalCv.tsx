import type { JSX } from 'react';

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
import { useTheme } from '@mui/material/styles';
import { m, type MotionProps } from 'motion/react';

import Cv_en from '@/assets/Linus_Johansson_CV_en.pdf';
import Cv_se from '@/assets/Linus_Johansson_CV_sv.pdf';
import { ShinyText } from '@/components/animations';
import { modalVariants, staggerContainerNormal } from '@/config/motion';
import type { ModalCvProps } from '@/config/types';
import { useAnimationConfig, useSnackbar } from '@/hooks';

import 'flag-icons/css/flag-icons.min.css';

// ============================================================================
// MOTION COMPONENTS
// ============================================================================

const MotionDialogContent = m.create(DialogContent);
const MotionGrid = m.create(Grid);
const MotionButtonBase = m.create(ButtonBase);

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

const CV_OPTIONS: CvOption[] = [
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
];

// ============================================================================
// STYLES
// ============================================================================

const dialogPaperSx: SxProps<Theme> = {
  bgcolor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
  overflow: 'visible',
};

const backdropSx: SxProps<Theme> = {
  bgcolor: (theme) => alpha(theme.palette.common.black, 0.5),
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
};

const contentSx: SxProps<Theme> = {
  p: (theme) => theme.custom.spacing.card,
  overflow: 'visible',
  bgcolor: 'backdrop.glass',
  borderRadius: 2,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: 1,
  borderColor: (theme) => alpha(theme.palette.divider, 0.1),
};

const closeButtonSx: SxProps<Theme> = {
  position: 'absolute',
  top: 8,
  right: 8,
  color: 'text.secondary',
  bgcolor: (theme) => alpha(theme.palette.action.active, 0.04),
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.action.active, 0.12),
    color: 'text.primary',
  },
};

const cardSx: SxProps<Theme> = {
  width: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: { xs: 1.5, sm: 2, md: 2.5 },
  p: { xs: 2.5, sm: 3, md: 4, lg: 5 },
  borderRadius: 2.5,
  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
    transform: 'translateY(-4px)',
    boxShadow: (theme) =>
      `0 12px 24px -8px ${alpha(theme.palette.common.black, 0.15)}`,
    '& .flag-icon': { transform: 'scale(1.1)' },
    '& .download-icon': { opacity: 1 },
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: 2,
  },
};

const flagSx: SxProps<Theme> = {
  fontSize: (theme) => theme.custom.sizing.iconFlag,
  transition: 'transform 0.2s ease',
  borderRadius: 1,
  boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.12)}`,
};

const downloadIconSx: SxProps<Theme> = {
  position: 'absolute',
  bottom: -6,
  right: -6,
  fontSize: (theme) => theme.custom.sizing.iconSm,
  color: 'primary.main',
  bgcolor: 'background.paper',
  borderRadius: '50%',
  p: 0.5,
  opacity: 0,
  transition: 'opacity 0.2s ease',
  boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.common.black, 0.15)}`,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function ModalCv({ open, onClose }: Readonly<ModalCvProps>): JSX.Element {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  const handleDownload = (option: CvOption): void => {
    const link = document.createElement('a');
    link.href = option.file;
    link.download = option.fileName;
    link.click();
    showSnackbar(`Downloading ${option.language} CV...`, 'success');
    onClose();
  };

  // Motion props - simplified conditional
  const contentMotion: MotionProps = prefersReducedMotion
    ? {}
    : {
        ...modalVariants.slideDown,
        transition: getTransition('springSmooth'),
      };

  const containerMotion: MotionProps = prefersReducedMotion
    ? {}
    : {
        variants: staggerContainerNormal,
        initial: 'initial',
        animate: 'animate',
      };

  const itemMotion = (i: number): MotionProps =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { delay: i * 0.1 } },
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
        backdrop: { sx: backdropSx },
      }}
    >
      <MotionDialogContent sx={contentSx} {...contentMotion}>
        <IconButton
          onClick={onClose}
          aria-label="Close modal"
          size="small"
          sx={closeButtonSx}
        >
          <CloseRounded sx={{ fontSize: theme.custom.sizing.iconSm }} />
        </IconButton>

        {/* Header */}
        <Stack alignItems="center" spacing={0.5} mb={{ xs: 2.5, sm: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LanguageRounded
              sx={{
                fontSize: theme.custom.sizing.iconLg,
                color: 'primary.main',
              }}
            />
            <DialogTitle
              id="cv-modal-title"
              sx={{ p: 0, fontWeight: 500 }}
              component="h3"
            >
              <ShinyText
                text="Download CV"
                speed={5}
                disabled={prefersReducedMotion}
              />
            </DialogTitle>
          </Stack>
          <Typography
            id="cv-modal-description"
            variant="body2"
            color="text.secondary"
          >
            Select your preferred language
          </Typography>
        </Stack>

        {/* Language Options */}
        <Grid
          container
          spacing={theme.custom.spacing.grid}
          role="group"
          aria-label="CV language options"
          component={MotionGrid}
          {...containerMotion}
        >
          {CV_OPTIONS.map((option, index) => (
            <Grid key={option.id} size={theme.custom.grid.half}>
              <MotionButtonBase
                onClick={() => handleDownload(option)}
                aria-label={`Download CV in ${option.language}`}
                sx={cardSx}
                {...itemMotion(index)}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="span"
                    className={`fi ${option.flag} flag-icon`}
                    sx={flagSx}
                  />
                  <DownloadRounded
                    className="download-icon"
                    sx={downloadIconSx}
                  />
                </Box>
                <Stack spacing={0.25} alignItems="center">
                  <Typography variant="body1" fontWeight={600}>
                    {option.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.language}
                  </Typography>
                </Stack>
              </MotionButtonBase>
            </Grid>
          ))}
        </Grid>
      </MotionDialogContent>
    </Dialog>
  );
}

export { ModalCv };
