import {
  alpha,
  Box,
  Skeleton,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';

import { SIZE } from '@/config/responsive';
import type { BadgeItemProps, BadgesProps } from '@/config/types';
import { useAnimationConfig, useImageLoading } from '@/hooks';
import { badgeItems as defaultBadgeItems } from '@/lib/data/badges';
import { TRANSITION_STANDARD } from '@/styles/shared';

const wrapperSx: SxProps<Theme> = {
  width: 'auto',
};

const skeletonSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: 1,
  height: 1,
};

const imgSx: SxProps<Theme> = {
  width: SIZE.badge,
  objectFit: 'cover',
  boxShadow: (theme) =>
    `0 4px 12px ${alpha(theme.palette.common.black, 0.3)}, 0 6px 24px ${alpha(theme.palette.common.black, 0.3)}`,
  transition: TRANSITION_STANDARD,
  cursor: 'pointer',
  filter: 'contrast(0.9) brightness(0.9)',
};

const textSx: SxProps<Theme> = {
  color: 'text.secondary',
  opacity: 0.9,
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontSize: (theme) => theme.typography.caption.fontSize,
  mt: { xs: 0.75, sm: 0.875, md: 1, lg: 1.25 },
};

const stackSx: SxProps<Theme> = {
  textAlign: 'center',
  // Spacing units: 4*8=32px, 6*8=48px
  pt: { xs: 4, sm: 5, md: 6, lg: 7 },
  gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
  flexWrap: 'wrap',
};

// Component for individual badge items
function BadgeItem({ href, imgSrc, date }: BadgeItemProps): React.JSX.Element {
  const { isLoaded, handleLoad } = useImageLoading();
  const { getTransition } = useAnimationConfig();

  return (
    <Box sx={wrapperSx}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Box
          sx={{
            position: 'relative',
            width: SIZE.badge,
            height: SIZE.badge,
          }}
        >
          {!isLoaded && (
            <Skeleton variant="rectangular" animation="wave" sx={skeletonSx} />
          )}
          <Box
            component={motion.img}
            src={imgSrc}
            alt="badge"
            loading="lazy"
            decoding="async"
            width={140}
            height={140}
            onLoad={handleLoad}
            initial={false}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={getTransition('smooth')}
            sx={imgSx}
          />
        </Box>
      </a>
      <Typography component="div" sx={textSx}>
        <div>Awarded:</div>
        {date}
      </Typography>
    </Box>
  );
}

// Component for displaying a list of badges
function Badges({ items = defaultBadgeItems }: BadgesProps): React.JSX.Element {
  return (
    <Stack direction="row" justifyContent="center" sx={stackSx}>
      {items.map((badge) => (
        <BadgeItem key={badge.href} {...badge} />
      ))}
    </Stack>
  );
}

export default Badges;
