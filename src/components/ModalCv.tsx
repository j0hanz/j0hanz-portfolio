import React from 'react';

import LanguageRounded from '@mui/icons-material/LanguageRounded';
import {
  alpha,
  Box,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';

import Cv_en from '@/assets/Linus_Johansson_CV_en.pdf';
import Cv_se from '@/assets/Linus_Johansson_CV_sv.pdf';
import BaseModal from '@/components/BaseModal';
import { ModalCvProps } from '@/config/types';

const flagIconStyles: SxProps<Theme> = {
  fontSize: '3.5rem',
  cursor: 'pointer',
  opacity: 0.7,
  transition: 'all 0.3s ease',
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.15)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};

const contentSx: SxProps<Theme> = {
  bgcolor: 'background.paper',
  borderRadius: '10px',
  p: 3,
  color: 'text.primary',
  boxShadow: (theme) => `0 4px 8px ${alpha(theme.palette.common.black, 0.1)}`,
};

const headerStackSx: SxProps<Theme> = {
  mb: 4,
  fontSize: { xs: '1.2rem', sm: '1.4rem' },
};

const iconSx: SxProps<Theme> = {
  fontSize: '1.2rem',
  mr: 0.5,
};

const textSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: 2,
};

const flagsStackSx: SxProps<Theme> = {
  mt: 4,
  px: 4,
};

// Component for selecting and downloading CVs
function ModalCv({ show, handleClose }: ModalCvProps): React.JSX.Element {
  const handleDownload = (cv: string, fileName: string): void => {
    try {
      const link = document.createElement('a');
      link.href = cv;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      handleClose();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      contentSx={contentSx}
      animationPreset="slideDown"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={headerStackSx}
      >
        <LanguageRounded sx={iconSx} />
        Choose Language
      </Stack>
      <Typography sx={textSx}>Select a language to download the CV.</Typography>
      <Stack direction="row" justifyContent="space-between" sx={flagsStackSx}>
        <Box
          component="span"
          className="fi fi-se"
          onClick={() => handleDownload(Cv_se, 'Linus_Johansson_CV_sv.pdf')}
          title="Swedish"
          sx={flagIconStyles}
        />
        <Box
          component="span"
          className="fi fi-gb"
          onClick={() => handleDownload(Cv_en, 'Linus_Johansson_CV_en.pdf')}
          title="English"
          sx={flagIconStyles}
        />
      </Stack>
    </BaseModal>
  );
}

export default ModalCv;
