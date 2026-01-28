import { useRef } from 'react';

import { alpha, Box, type SxProps, type Theme } from '@mui/material';
import { m } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import { ImageModal } from '@/components/ImageModal';
import { Parallax } from '@/components/Parallax';
import { ProfileSkeleton } from '@/components/Skeletons';
import { fadeVariants } from '@/config/motion';
import {
  useAnimationConfig,
  useHover,
  useImageLoading,
  useModal,
  useMotionVariant,
} from '@/hooks';

const profileWrapperSx: SxProps<Theme> = (theme) => ({
  position: 'relative',
  display: { xs: 'inline-flex', lg: 'block' },
  width: {
    xs: theme.custom.sizing.profileImage.xs,
    sm: theme.custom.sizing.profileImage.sm,
    md: theme.custom.sizing.profileImage.md,
    lg: 'auto',
  },
  height: {
    xs: theme.custom.sizing.profileImage.xs,
    sm: theme.custom.sizing.profileImage.sm,
    md: theme.custom.sizing.profileImage.md,
    lg: '100%',
  },
  minWidth: { lg: 280, xl: 320 },
  minHeight: { lg: 380, xl: 420 },
  maxWidth: { lg: 400, xl: 480 },
  mb: { xs: 3, sm: 2.5, md: 0 },
  transition: theme.custom.motion.transitionStandard,
});

const profileImgSx: SxProps<Theme> = {
  width: 1,
  height: 1,
  aspectRatio: { xs: '1 / 1' },
  clipPath: (theme) => theme.custom.motion.clipRounded,
  objectFit: 'cover',
  cursor: 'pointer',
  willChange: 'opacity, transform',
};

const overlaySx: SxProps<Theme> = (theme) => ({
  ...theme.custom.layout.centeredGrid,
  position: 'absolute',
  inset: 0,
  clipPath: theme.custom.motion.clipRounded,
  bgcolor: alpha(
    theme.palette.mode === 'dark'
      ? theme.palette.common.black
      : theme.palette.grey[800],
    0.5
  ),
  color: 'grey.100',
  letterSpacing: theme.custom.typography.letterSpacing.normal,
  fontSize: theme.typography.caption.fontSize,
  pointerEvents: 'none',
  textTransform: 'uppercase',
});

function HeroProfile(): React.JSX.Element {
  const imageModal = useModal(false);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const isHovered = useHover(profileImageRef);
  const { isLoaded, handleLoad } = useImageLoading();
  const { getTransition } = useAnimationConfig();
  const profileMotion = useMotionVariant(fadeVariants.up);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      imageModal.open();
    }
  };

  // Inline opacity calculation (was getProfileOpacity helper)
  let opacity = 0;
  if (isLoaded) {
    opacity = isHovered ? 0.8 : 1;
  }

  return (
    <>
      <Parallax offset={30}>
        <Box
          component={m.div}
          {...profileMotion}
          transition={getTransition('easeOut')}
          sx={profileWrapperSx}
        >
          {!isLoaded && <ProfileSkeleton />}
          <Box
            component={m.img}
            ref={profileImageRef}
            src={ProfileImage}
            alt="Linus Johansson"
            role="button"
            tabIndex={0}
            aria-label="View enlarged profile photo"
            onClick={imageModal.open}
            onKeyDown={handleKeyDown}
            onLoad={handleLoad}
            animate={{ opacity, scale: isHovered ? 1.02 : 1 }}
            transition={getTransition('smooth')}
            sx={{ ...profileImgSx, cursor: 'pointer' }}
          />
          <Box
            component={m.div}
            aria-hidden="true"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={getTransition('springSmooth')}
            sx={overlaySx}
          >
            Click to enlarge
          </Box>
        </Box>
      </Parallax>
      {imageModal.isOpen && (
        <ImageModal open={imageModal.isOpen} onClose={imageModal.close} />
      )}
    </>
  );
}

export { HeroProfile };
