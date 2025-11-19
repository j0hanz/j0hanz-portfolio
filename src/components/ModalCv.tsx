import React from 'react';

import { HiOutlineGlobeAlt } from 'react-icons/hi2';

import { Box } from '@mui/material';

import Cv_en from '@/assets/Linus_Johansson_CV_en.pdf';
import Cv_se from '@/assets/Linus_Johansson_CV_sv.pdf';
import BaseModal from '@/components/BaseModal';
import { ModalCvProps } from '@/config/types';

import styles from './ModalCv.module.css';

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
      className={styles.modalCv}
      bodyClassName={styles.modalCvBody}
    >
      <Box
        className={styles.modalCvTitle}
        sx={{
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HiOutlineGlobeAlt className={styles.globeIcon} />
        Choose Language
      </Box>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        Select a language to download the CV.
      </Box>
      <Box
        className={styles.flagContainer}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span
          className={`fi fi-se ${styles.flagIcon}`}
          onClick={() => handleDownload(Cv_se, 'Linus_Johansson_CV_sv.pdf')}
          title="Swedish"
        />
        <span
          className={`fi fi-gb ${styles.flagIcon}`}
          onClick={() => handleDownload(Cv_en, 'Linus_Johansson_CV_en.pdf')}
          title="English"
        />
      </Box>
    </BaseModal>
  );
}

export default ModalCv;
