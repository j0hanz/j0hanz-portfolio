import { useRef, useState } from 'react';

import { Box, Skeleton, type SxProps, type Theme } from '@mui/material';
import { motion } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import BaseModal from '@/components/BaseModal';
import { ImageModalProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

const modalContentSx: SxProps<Theme> = {
  bgcolor: 'transparent',
  border: 'none',
  p: 0,
};

const containerSx: SxProps<Theme> = {
  p: 0,
  textAlign: 'center',
};

const skeletonSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  borderRadius: '10px',
  bgcolor: 'action.hover',
  minHeight: 300, // Approximate height
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
  display: 'block',
} as const;

// Component for displaying an image
function ImageModal({ show, handleClose }: ImageModalProps): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
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

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      contentSx={modalContentSx}
      animationPreset="zoomOut"
    >
      <Box sx={containerSx} ref={constraintsRef}>
        {!isLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={skeletonSx}
          />
        )}
        <motion.img
          src={ProfileImage}
          alt="Linus Johansson"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.96 }}
          transition={getTransition('spring', { duration: 0.6 })}
          onLoad={handleLoad}
          style={imgStyle}
          {...dragProps}
        />
      </Box>
    </BaseModal>
  );
}

export default ImageModal;
