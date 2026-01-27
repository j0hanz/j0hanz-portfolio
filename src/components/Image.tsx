import type { CSSProperties, JSX } from 'react';

import { Box, Skeleton } from '@mui/material';
import { motion } from 'motion/react';

import { ImageProps } from '@/config/types';
import { useAnimationConfig, useImageLoading } from '@/hooks';

// Border radius lookup map
const RADIUS_MAP = { circle: '50%', flat: 0, rounded: 1 } as const;

function Image({
  src,
  alt,
  width,
  height,
  className,
  style,
  sx,
  onClick,
  radius = 'rounded',
}: Readonly<ImageProps>): JSX.Element {
  const { isLoaded, handleLoad, handleError } = useImageLoading();
  const { getTransition } = useAnimationConfig();

  const borderRadius = RADIUS_MAP[radius];
  const defaultStyle: CSSProperties = {
    maxWidth: '100%',
    objectFit: 'cover',
    display: 'block',
  };
  const combinedStyle: CSSProperties = {
    ...defaultStyle,
    ...style,
    willChange: 'opacity',
  };

  return (
    <Box
      component="span"
      sx={{
        position: 'relative',
        display: 'inline-block',
        lineHeight: 0,
        ...sx,
      }}
    >
      {!isLoaded && (
        <Skeleton
          variant={radius === 'circle' ? 'circular' : 'rectangular'}
          width={width || '100%'}
          height={height || '100%'}
          animation="wave"
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius,
            bgcolor: 'action.hover',
          }}
        />
      )}
      <Box
        component={motion.img}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={combinedStyle}
        onClick={onClick}
        onLoad={handleLoad}
        onError={handleError}
        initial={false}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={getTransition('smooth')}
        loading="lazy"
        sx={{ borderRadius }}
      />
    </Box>
  );
}

export { Image };
