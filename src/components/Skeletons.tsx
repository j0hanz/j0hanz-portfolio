import { Box, Skeleton, Stack, type SxProps, type Theme } from '@mui/material';
import { m } from 'motion/react';

import { useAnimationConfig } from '@/hooks';

// Section skeleton for loading entire sections - minimal to prevent flash
export function SectionSkeleton(): React.JSX.Element {
  return (
    <Box
      sx={(theme) => ({
        width: 1,
        height: '100vh',
        ...theme.custom.layout.centeredGrid,
      })}
      role="status"
      aria-label="Loading content"
    />
  );
}

// Title sx matching ProjectHeader titleSx
const titleSx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.h6.fontSize,
};

// Description sx matching CardContent descriptionSx
const descriptionSx: SxProps<Theme> = {
  flex: 'none',
};

// Container matching ProjectTechStack containerSx exactly
const chipContainerSx: SxProps<Theme> = (theme) =>
  theme.custom.layout.projectTechStack.container;

// Chip skeleton sx matching ProjectTechStack chipSx exactly
const chipSx: SxProps<Theme> = (theme) => ({
  ...theme.custom.layout.projectTechStack.chip,
  borderRadius: 2,
  display: 'inline-block',
});

// Stats container matching ProjectStats containerSx
const statsContainerSx: SxProps<Theme> = (theme) =>
  theme.custom.layout.projectStats.container;

// Button skeleton matching actionButtonSx from ProjectLinks
const buttonSx: SxProps<Theme> = (theme) => ({
  ...theme.custom.layout.projectLinks.actionButton,
  borderRadius: 1,
});

// Grid sx matching ProjectLinks gridSx
const actionGridSx: SxProps<Theme> = {
  mt: { xs: 1, md: 1.5 },
};

// Stat row skeleton - matches ProjectStats AnimatedStat layout exactly
function StatRow({
  width = 44,
}: Readonly<{ width?: number }>): React.JSX.Element {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Skeleton
        variant="circular"
        sx={{
          width: (theme) => theme.custom.sizing.iconMd,
          height: (theme) => theme.custom.sizing.iconMd,
          flex: 'none',
        }}
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

// Project card skeleton matching actual ProjectCard/CardContent layout exactly
export function ProjectCardSkeleton(): React.JSX.Element {
  const { getTransition } = useAnimationConfig();

  return (
    <Stack
      component={m.article}
      key="project-skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={getTransition('smooth', { duration: 0.2 })}
      sx={(theme) => theme.custom.layout.projectCard.article}
      role="status"
      aria-label="Loading project"
    >
      <Stack
        spacing={2}
        sx={(theme) => theme.custom.layout.projectCard.content}
      >
        {/* Header - matches ProjectHeader: title row with icon */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="text" width="60%" sx={titleSx} />
          <Skeleton
            variant="circular"
            sx={{
              width: (theme) => theme.typography.h6.fontSize,
              height: (theme) => theme.typography.h6.fontSize,
              flex: 'none',
            }}
          />
        </Stack>

        {/* Description - matches Typography with descriptionSx */}
        <Box sx={descriptionSx}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="85%" />
        </Box>

        {/* Tech stack - matches ProjectTechStack with chips */}
        <Box sx={chipContainerSx}>
          {[52, 68, 44, 76, 58, 48].map((w) => (
            <Skeleton
              key={w}
              variant="rounded"
              width={w}
              height={24}
              sx={chipSx}
            />
          ))}
        </Box>

        {/* Stats - matches ProjectStats (Stars, Forks rows) */}
        <Stack spacing={1.5} alignItems="flex-start" sx={statsContainerSx}>
          <StatRow width={40} />
          <StatRow width={38} />
        </Stack>
      </Stack>

      {/* Actions - matches ProjectLinks gridSx + buttonStackSx */}
      <Box sx={actionGridSx}>
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

// Profile image skeleton - fills sized parent wrapper from HeroProfile
const profileSkeletonSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: 1,
  height: 1,
  clipPath: (theme) => theme.custom.motion.clipRounded,
};

export function ProfileSkeleton(): React.JSX.Element {
  return (
    <Skeleton variant="rectangular" animation="wave" sx={profileSkeletonSx} />
  );
}
