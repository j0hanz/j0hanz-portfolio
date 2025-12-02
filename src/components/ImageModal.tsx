import { useRef } from 'react';

import {
  Box,
  DialogTitle,
  Skeleton,
  type SxProps,
  type Theme,
} from '@mui/material';
import { motion, useMotionValue } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import BaseModal from '@/components/BaseModal';
import { ImageModalProps } from '@/config/types';
import { useAnimationConfig, useImageLoading, useVelocityTilt } from '@/hooks';
import { transparentModalContentSx, visuallyHiddenSx } from '@/styles/shared';

const containerSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-block',
};

const skeletonSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  borderRadius: 2.5, // 2.5 * 4px = 10px
  bgcolor: 'action.hover',
};

const imgStyle = {
  maxWidth: '90vw',
  maxHeight: '90vh',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  borderRadius: 10, // CSS pixels for inline style
  display: 'block',
} as const;

// Component for displaying an image
function ImageModal({ open, onClose }: ImageModalProps): React.JSX.Element {
  const { isLoaded, handleLoad } = useImageLoading();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  // Track drag position for velocity-based tilt
  const dragX = useMotionValue(0);
  const tiltAngle = useVelocityTilt(dragX, 12);

  // Conditional willChange for performance - only hint when animating
  const baseImgStyle = {
    ...imgStyle,
    willChange: prefersReducedMotion ? 'auto' : 'opacity, transform',
  } as const;

  const dragProps = prefersReducedMotion
    ? { drag: false as const, style: baseImgStyle }
    : {
        drag: true as const,
        dragConstraints: constraintsRef,
        dragElastic: 0.2,
        whileTap: { scale: 0.98 },
        style: { ...baseImgStyle, x: dragX, rotateY: tiltAngle },
      };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      contentSx={transparentModalContentSx}
      animationPreset="zoomOut"
      ariaLabelledBy="image-modal-title"
      transparentPaper
      maxWidth={false}
      fullWidth={false}
    >
      <DialogTitle id="image-modal-title" sx={visuallyHiddenSx}>
        Linus Johansson Profile Image
      </DialogTitle>
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
          {...dragProps}
        />
      </Box>
    </BaseModal>
  );
}

export default ImageModal;
