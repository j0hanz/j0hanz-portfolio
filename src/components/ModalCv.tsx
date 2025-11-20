import React from 'react';

import { HiOutlineGlobeAlt } from 'react-icons/hi2';

import { Box, Stack, Typography } from '@mui/material';

import Cv_en from '@/assets/Linus_Johansson_CV_en.pdf';
import Cv_se from '@/assets/Linus_Johansson_CV_sv.pdf';
import BaseModal from '@/components/BaseModal';
import { ModalCvProps } from '@/config/types';

const flagIconStyles = {
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
} as const;

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
      contentSx={{
        bgcolor: '#181818f5',
        borderRadius: '10px',
        p: 3,
        color: '#f5f4f4',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          mb: 4,
          fontSize: { xs: '1.2rem', sm: '1.4rem' },
        }}
      >
        <HiOutlineGlobeAlt size="1.2rem" style={{ marginRight: '0.4rem' }} />
        Choose Language
      </Stack>
      <Typography sx={{ textAlign: 'center', mb: 2 }}>
        Select a language to download the CV.
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          mt: 4,
          px: 4,
        }}
      >
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
