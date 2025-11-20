import React, { useState } from 'react';

import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import { ImageProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

// Image component
function Image({
  src,
  alt,
  width,
  height,
  className,
  style,
  onClick,
  radius = 'rounded',
}: ImageProps): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  const borderRadius =
    radius === 'circle' ? '50%' : radius === 'flat' ? '0px' : '7.5px';
  const defaultStyle: React.CSSProperties = {
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius,
    display: 'block',
  };
  const combinedStyle: React.CSSProperties = {
    ...defaultStyle,
    ...style,
  };

  const handleMediaLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      component="span"
      sx={{ position: 'relative', display: 'inline-block', lineHeight: 0 }}
    >
      <AnimatePresence>
        {!isLoaded && (
          <Box
            component={motion.span}
            key="image-skeleton"
            aria-hidden
            initial={{ opacity: 0.25 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.45 }
                : { opacity: 0.6, backgroundPositionX: ['0%', '200%'] }
            }
            exit={{ opacity: 0 }}
            transition={
              prefersReducedMotion
                ? getTransition('smooth')
                : { duration: 1.4, repeat: Infinity, ease: 'linear' }
            }
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius,
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.04) 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        )}
      </AnimatePresence>
      <Box
        component={motion.img}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={combinedStyle}
        onClick={onClick}
        onLoad={handleMediaLoaded}
        onError={handleMediaLoaded}
        initial={false}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={getTransition('smooth')}
      />
    </Box>
  );
}

export default Image;
