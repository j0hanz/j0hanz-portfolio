import React from 'react';

import { Box } from '@mui/material';

import ProfileImage from '@/assets/image_me.webp';
import BaseModal from '@/components/BaseModal';
import { ImageModalProps } from '@/config/types';
import useLoading from '@/hooks/useLoading';

import Spinner from './Spinner';

// Component for displaying an image
function ImageModal({ show, handleClose }: ImageModalProps): React.JSX.Element {
  const loading: boolean = useLoading();

  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      contentSx={{ bgcolor: 'transparent', border: 'none', p: 0 }}
    >
      <Box sx={{ p: 0, textAlign: 'center' }}>
        {loading ? (
          <Spinner />
        ) : (
          <Box
            component="img"
            src={ProfileImage}
            alt="Linus Johansson"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        )}
      </Box>
    </BaseModal>
  );
}

export default ImageModal;
