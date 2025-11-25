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

import type { BadgeItemProps, BadgesProps } from '@/config/types';
import { useAnimationConfig, useImageLoading } from '@/hooks';
import { badgeItems as defaultBadgeItems } from '@/lib/data/badges';
import { TRANSITION_STANDARD } from '@/styles/shared';

const wrapperSx: SxProps<Theme> = {
  width: 'auto',
};

const imgSx: SxProps<Theme> = {
  width: { xs: '85px', sm: '105px', md: '115px', lg: '140px' },
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
  fontSize: '0.7rem',
  mt: 1,
};

const stackSx: SxProps<Theme> = {
  textAlign: 'center',
  pt: '3rem',
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
            width: { xs: 85, sm: 105, md: 115, lg: 140 },
            height: { xs: 85, sm: 105, md: 115, lg: 140 },
          }}
        >
          {!isLoaded && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            />
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
    <Stack direction="row" justifyContent="space-between" sx={stackSx}>
      {items.map((badge) => (
        <BadgeItem key={badge.href} {...badge} />
      ))}
    </Stack>
  );
}

export default Badges;
