import React from 'react';

import { Box } from '@mui/material';

import ProfileImage from '@/assets/image_me.webp';
import BaseModal from '@/components/BaseModal';
import Image from '@/components/Image';
import { ImageModalProps } from '@/config/types';
import useLoading from '@/hooks/useLoading';

import Spinner from './Spinner';

import styles from './ImageModal.module.css';

// Component for displaying an image
function ImageModal({ show, handleClose }: ImageModalProps): React.JSX.Element {
  const loading: boolean = useLoading();

  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      bodyClassName={styles.imageModalBody}
    >
      <Box sx={{ p: 0, textAlign: 'center' }}>
        {loading ? (
          <Spinner />
        ) : (
          <Image
            src={ProfileImage}
            alt="Linus Johansson"
            className={styles.fullScreenImage}
          />
        )}
      </Box>
    </BaseModal>
  );
}

export default ImageModal;
