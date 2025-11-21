import { useRef } from 'react';

import { Box } from '@mui/material';
import { motion } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import BaseModal from '@/components/BaseModal';
import { ImageModalProps } from '@/config/types';
import { useAnimationConfig, useLoading } from '@/hooks';

import Spinner from './Spinner';

// Component for displaying an image
function ImageModal({ show, handleClose }: ImageModalProps): React.JSX.Element {
  const loading: boolean = useLoading();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const dragProps = prefersReducedMotion
    ? { drag: false as const }
    : {
        drag: true as const,
        dragConstraints: constraintsRef,
        dragElastic: 0.2,
        whileTap: { scale: 0.98 },
      };

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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={getTransition('springy', { duration: 0.6 })}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
            {...dragProps}
          />
        )}
      </Box>
    </BaseModal>
  );
}

export default ImageModal;
