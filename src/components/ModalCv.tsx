import { type JSX, useEffect, useState } from 'react';

import LanguageRounded from '@mui/icons-material/LanguageRounded';
import {
  Box,
  DialogTitle,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';

import Cv_en from '@/assets/Linus_Johansson_CV_en.pdf';
import Cv_se from '@/assets/Linus_Johansson_CV_sv.pdf';
import BaseModal from '@/components/BaseModal';
import { ModalCvProps } from '@/config/types';
import { useSnackbar } from '@/hooks';
import { SIZING, TRANSITION_STANDARD } from '@/styles/shared';

const flagIconStyles: SxProps<Theme> = {
  fontSize: SIZING.iconFlag,
  cursor: 'pointer',
  opacity: 0.7,
  transition: TRANSITION_STANDARD,
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.15)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};

const contentSx: SxProps<Theme> = {
  bgcolor: 'backdrop.glass',
  borderRadius: 2.5, // 2.5 * 4px = 10px
  p: { xs: 2.5, sm: 3, md: 3.5 },
  color: 'text.primary',
  overflow: 'hidden',
};

const headerStackSx: SxProps<Theme> = {
  mb: 4,
  fontSize: SIZING.iconMd, // Reuses medium icon scale for header text
};

const iconSx: SxProps<Theme> = {
  fontSize: SIZING.iconSm,
  mr: { xs: 0.5, sm: 0.625, md: 0.75 },
};

const textSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: { xs: 1.5, sm: 2, md: 2.5 },
};

const flagsStackSx: SxProps<Theme> = {
  mt: { xs: 3, sm: 3.5, md: 4, lg: 5 },
  px: { xs: 2, sm: 3, md: 4, lg: 5 },
};

const flagButtonBaseSx: SxProps<Theme> = {
  ...flagIconStyles,
  border: 'none',
  background: 'transparent',
  p: 0,
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: 2,
    borderRadius: (theme) => theme.spacing(0.5),
  },
};

function ModalCv({ open, onClose }: ModalCvProps): JSX.Element {
  const { showSnackbar } = useSnackbar();
  const [flagIconsLoaded, setFlagIconsLoaded] = useState(false);

  // Lazy-load flag-icons CSS only when modal opens
  useEffect(() => {
    if (open && !flagIconsLoaded) {
      import('flag-icons/css/flag-icons.min.css').then(() => {
        setFlagIconsLoaded(true);
      });
    }
  }, [open, flagIconsLoaded]);

  const handleDownload = (cv: string, fileName: string): void => {
    try {
      const link = document.createElement('a');
      link.href = cv;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    } catch (error) {
      showSnackbar('Failed to download CV. Please try again.', 'error');
      if (import.meta.env.DEV) console.error('Download failed:', error);
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      contentSx={contentSx}
      animationPreset="slideDown"
      ariaLabelledBy="cv-language-selection-title"
      ariaDescribedBy="cv-language-selection-description"
    >
      <DialogTitle
        id="cv-language-selection-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...headerStackSx,
        }}
      >
        <LanguageRounded sx={iconSx} />
        Choose Language
      </DialogTitle>
      <Typography id="cv-language-selection-description" sx={textSx}>
        Select a language to download the CV.
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={flagsStackSx}
        role="group"
        aria-label="CV language options"
      >
        <Box
          component="button"
          className="fi fi-se"
          onClick={() => handleDownload(Cv_se, 'Linus_Johansson_CV_sv.pdf')}
          aria-label="Download Swedish CV"
          sx={flagButtonBaseSx}
        />
        <Box
          component="button"
          className="fi fi-gb"
          onClick={() => handleDownload(Cv_en, 'Linus_Johansson_CV_en.pdf')}
          aria-label="Download English CV"
          sx={flagButtonBaseSx}
        />
      </Stack>
    </BaseModal>
  );
}

export default ModalCv;
