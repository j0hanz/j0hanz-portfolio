import React, { useState } from 'react';

import { Box, Skeleton } from '@mui/material';
import { motion } from 'motion/react';

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
  const { getTransition } = useAnimationConfig();

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
            bgcolor: 'rgba(255, 255, 255, 0.1)',
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
