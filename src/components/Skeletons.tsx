import { Box, Skeleton, type SxProps, type Theme } from '@mui/material';

// Section skeleton for loading entire sections - minimal to prevent flash
export function SectionSkeleton(): React.JSX.Element {
  return (
    <Box
      sx={{
        width: '100%',
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

// Stats skeleton for project stats
export function StatsSkeleton(): React.JSX.Element {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ textAlign: 'center' }}>
          <Skeleton variant="text" width={40} height={24} sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width={50} height={16} sx={{ mx: 'auto' }} />
        </Box>
      ))}
    </Box>
  );
}

// Profile image skeleton for Hero section
const profileSkeletonSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

export function ProfileSkeleton(): React.JSX.Element {
  return (
    <Skeleton variant="circular" animation="wave" sx={profileSkeletonSx} />
  );
}

// Card skeleton for generic card loading states
const cardSkeletonSx: SxProps<Theme> = {
  borderRadius: 2,
};

export function CardSkeleton({
  height = 200,
}: {
  height?: number | string;
}): React.JSX.Element {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      height={height}
      sx={cardSkeletonSx}
    />
  );
}

// Timeline card skeleton for education/experience sections
export function TimelineCardSkeleton(): React.JSX.Element {
  return (
    <Box sx={{ width: '100%', maxWidth: 520 }}>
      <Skeleton
        variant="rounded"
        animation="wave"
        height={180}
        sx={cardSkeletonSx}
      />
    </Box>
  );
}
