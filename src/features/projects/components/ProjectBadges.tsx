import { Box, Skeleton } from '@mui/material';
import { motion } from 'motion/react';

import type { BadgeImageProps, ProjectBadgesProps } from '@/config/types';
import { useAnimationConfig, useImageLoading } from '@/hooks';

function BadgeImage({
  src,
  alt,
  style,
  width = 24,
  height = 24,
}: BadgeImageProps): React.JSX.Element {
  const { isLoaded, handleLoad } = useImageLoading();
  const { getTransition } = useAnimationConfig();

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', width, height }}>
      {!isLoaded && (
        <Skeleton
          variant="rounded"
          animation="wave"
          width={width}
          height={height}
          sx={{ position: 'absolute', inset: 0 }}
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        style={style}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        onLoad={handleLoad}
        initial={false}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={getTransition('smooth')}
      />
    </Box>
  );
}

const ProjectBadges = ({ badges }: ProjectBadgesProps): React.JSX.Element => (
  <>
    {badges.map(({ flag, src, alt, style, width, height }) => (
      <BadgeImage
        key={flag}
        src={src}
        alt={alt}
        style={style}
        width={width}
        height={height}
      />
    ))}
  </>
);

ProjectBadges.displayName = 'ProjectBadges';

export default ProjectBadges;
