import React from 'react';

import { Box } from '@mui/material';
import { motion } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import BaseModal from '@/components/BaseModal';
import { ImageModalProps } from '@/config/types';
import useLoading from '@/hooks/useLoading';

import Spinner from './Spinner';

// Component for displaying an image
function ImageModal({ show, handleClose }: ImageModalProps): React.JSX.Element {
  const loading: boolean = useLoading();
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      contentSx={{ bgcolor: 'transparent', border: 'none', p: 0 }}
      animationPreset="zoomOut"
    >
      <Box sx={{ p: 0, textAlign: 'center' }} ref={constraintsRef}>
        {loading ? (
          <Spinner />
        ) : (
          <motion.img
            src={ProfileImage}
            alt="Linus Johansson"
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileTap={{ scale: 0.98 }}
            style={{
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
