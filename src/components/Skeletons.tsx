import { Box, Skeleton, Stack, type SxProps, type Theme } from '@mui/material';

import {
  CLIP_ROUNDED,
  PROJECT_CARD_ARTICLE_SX,
  PROJECT_CARD_CONTENT_SX,
  SIZING,
  SKEW_TRANSFORM,
} from '@/styles/shared';

// Section skeleton for loading entire sections - minimal to prevent flash
export function SectionSkeleton(): React.JSX.Element {
  return (
    <Box
      sx={{
        width: 1,
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
      role="status"
      aria-label="Loading content"
    />
  );
}

// Chip skeleton sx matching ProjectTechStack chipSx exactly
const chipSx: SxProps<Theme> = {
  mr: { xs: 0.75, sm: 0.875, md: 1 },
  mb: { xs: 0.75, sm: 0.875, md: 1 },
  borderRadius: 2,
  transform: SKEW_TRANSFORM,
  display: 'inline-block',
};

// Container matching ProjectTechStack containerSx exactly
const chipContainerSx: SxProps<Theme> = {
  transform: SKEW_TRANSFORM,
  flex: 'none',
};

// Button skeleton matching actionButtonSx height from ProjectLinks
const buttonSx: SxProps<Theme> = {
  height: SIZING.buttonHeightStandard,
  borderRadius: 1,
};

// Stat row skeleton - matches ProjectStats AnimatedStat layout
function StatRow({ width = 44 }: { width?: number }): React.JSX.Element {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Skeleton
        variant="circular"
        sx={{ width: SIZING.iconMd, height: SIZING.iconMd, flex: 'none' }}
      />
      <Skeleton
        variant="text"
        width={width}
        sx={{ fontSize: 'body2.fontSize' }}
      />
      <Skeleton variant="text" width={18} sx={{ fontSize: 'body1.fontSize' }} />
    </Stack>
  );
}

// Project card skeleton matching actual CardContent layout
export function ProjectCardSkeleton(): React.JSX.Element {
  return (
    <Stack
      component="article"
      sx={PROJECT_CARD_ARTICLE_SX}
      role="status"
      aria-label="Loading project"
    >
      <Stack spacing={2} sx={PROJECT_CARD_CONTENT_SX}>
        {/* Header - matches ProjectHeader: title + icon */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton
            variant="text"
            width="60%"
            sx={{ fontSize: (theme) => theme.typography.h6.fontSize }}
          />
          <Skeleton
            variant="circular"
            sx={{
              width: (theme) => theme.typography.h6.fontSize,
              height: (theme) => theme.typography.h6.fontSize,
              flex: 'none',
            }}
          />
        </Stack>

        {/* Description - matches Typography descriptionSx */}
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="85%" />

        {/* Tech stack - inline chips matching ProjectTechStack */}
        <Box sx={chipContainerSx}>
          {[52, 68, 44, 76, 58, 48].map((w, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={w}
              height={24}
              sx={chipSx}
            />
          ))}
        </Box>

        {/* Stats - 2 rows (Stars, Forks) matching ProjectStats */}
        <Stack spacing={1.5} alignItems="flex-start" sx={{ flex: 'none' }}>
          <StatRow width={40} />
          <StatRow width={38} />
        </Stack>
      </Stack>

      {/* Actions - matches ProjectLinks gridSx + buttonStackSx */}
      <Box sx={{ mt: { xs: 1, md: 1.5 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: 'nowrap' }}
        >
          <Skeleton variant="rounded" width={68} sx={buttonSx} />
          <Skeleton variant="rounded" width={52} sx={buttonSx} />
          <Skeleton variant="rounded" width={58} sx={buttonSx} />
        </Stack>
      </Box>
    </Stack>
  );
}

// Profile image skeleton - fills sized parent wrapper from Hero.styles profileWrapperSx
const profileSkeletonSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: 1,
  height: 1,
  clipPath: CLIP_ROUNDED,
};

export function ProfileSkeleton(): React.JSX.Element {
  return (
    <Skeleton variant="rectangular" animation="wave" sx={profileSkeletonSx} />
  );
}
