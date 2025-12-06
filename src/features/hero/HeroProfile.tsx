import { useRef } from 'react';

import { Box } from '@mui/material';
import { motion } from 'motion/react';

import ProfileImage from '@/assets/image_me.webp';
import ImageModal from '@/components/ImageModal';
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

import { overlaySx, profileImgSx, profileWrapperSx } from './Hero.styles';

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
  const opacity = isLoaded ? (isHovered ? 0.8 : 1) : 0;

  return (
    <>
      <Parallax offset={30}>
        <Box
          component={motion.div}
          {...profileMotion}
          transition={getTransition('easeOut')}
          sx={profileWrapperSx}
        >
          {!isLoaded && <ProfileSkeleton />}
          <Box
            component={motion.img}
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
            component={motion.div}
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

export default HeroProfile;
