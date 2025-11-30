import { Box, Skeleton, Stack, type SxProps, type Theme } from '@mui/material';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="status"
      aria-label="Loading content"
    />
  );
}

// Project card skeleton matching full card layout
const projectCardSx: SxProps<Theme> = {
  height: 1,
  display: 'flex',
  flexDirection: 'column',
  ...baseSx.rounded,
  p: { xs: 1.5, sm: 2, md: 2.5 },
};

export function ProjectCardSkeleton(): React.JSX.Element {
  return (
    <Box component="article" sx={projectCardSx}>
      <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextLine width="70%" height={32} />
          <Circle size={24} />
        </Stack>

        {/* Description */}
        <Box>
          <TextLine width="100%" />
          <TextLine width="90%" />
          <TextLine width="60%" />
        </Box>

        {/* Tech stack */}
        <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
          {[70, 80, 90, 100].map((w, i) => (
            <Chip key={i} width={w} />
          ))}
        </Stack>

        {/* Stats */}
        <Stack spacing={1.5} alignItems="flex-start">
          {[0, 1, 2].map((i) => (
            <StatRow key={i} />
          ))}
        </Stack>
      </Stack>

      {/* Actions */}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        {[0, 1, 2].map((i) => (
          <ActionButton key={i} />
        ))}
      </Stack>
    </Box>
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
