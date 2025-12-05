import { Box, Skeleton, Stack, type SxProps, type Theme } from '@mui/material';

import {
  PROJECT_CARD_ARTICLE_SX,
  PROJECT_CARD_CONTENT_SX,
} from '@/styles/shared';

// Shared styles for consistent skeleton appearance
const baseSx = {
  rounded: { borderRadius: 2 } as const,
  chip: { borderRadius: 2 } as const,
  button: { borderRadius: 1 } as const,
} as const;

// Reusable skeleton primitives with consistent animation
function TextLine({
  width,
  height = 20,
}: {
  width: number | string;
  height?: number;
}): React.JSX.Element {
  return <Skeleton variant="text" width={width} height={height} />;
}

function Circle({ size = 18 }: { size?: number }): React.JSX.Element {
  return <Skeleton variant="circular" width={size} height={size} />;
}

function Chip({ width }: { width: number }): React.JSX.Element {
  return (
    <Skeleton variant="rounded" width={width} height={24} sx={baseSx.chip} />
  );
}

function ActionButton({ width = 104 }: { width?: number }): React.JSX.Element {
  return (
    <Skeleton variant="rounded" width={width} height={36} sx={baseSx.button} />
  );
}

// Stat row skeleton - icon + label + value pattern
function StatRow(): React.JSX.Element {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Circle />
      <TextLine width={50} />
      <TextLine width={30} />
    </Stack>
  );
}

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

// Project card skeleton matching full card layout
export function ProjectCardSkeleton(): React.JSX.Element {
  return (
    <Stack
      component="article"
      sx={PROJECT_CARD_ARTICLE_SX}
      role="status"
      aria-label="Loading project"
    >
      <Stack spacing={2} sx={PROJECT_CARD_CONTENT_SX}>
        {/* Header - title + icon */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="text" width="65%" height={28} />
          <Circle size={22} />
        </Stack>

        {/* Description - 2-3 lines */}
        <Stack spacing={0.5}>
          <Skeleton variant="text" width="100%" height={18} />
          <Skeleton variant="text" width="95%" height={18} />
          <Skeleton variant="text" width="70%" height={18} />
        </Stack>

        {/* Tech stack chips */}
        <Stack direction="row" flexWrap="wrap" sx={{ gap: 0.75 }}>
          {[65, 55, 70, 60, 50].map((w, i) => (
            <Chip key={`chip-${i}`} width={w} />
          ))}
        </Stack>

        {/* Stats - 2 rows (stars, forks) */}
        <Stack spacing={1} alignItems="flex-start">
          <StatRow />
          <StatRow />
        </Stack>
      </Stack>

      {/* Action buttons */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 'auto', pt: 2 }}
      >
        <Stack direction="row" spacing={1}>
          <ActionButton width={90} />
          <ActionButton width={70} />
        </Stack>
        <ActionButton width={85} />
      </Stack>
    </Stack>
  );
}

// Profile image skeleton for Hero section - fills parent container
const profileSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: 1,
  height: 1,
};

export function ProfileSkeleton(): React.JSX.Element {
  return <Skeleton variant="circular" animation="wave" sx={profileSx} />;
}
