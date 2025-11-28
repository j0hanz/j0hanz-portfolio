import { Box, Skeleton, Stack, type SxProps, type Theme } from '@mui/material';

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

// Stats skeleton for project stats - matches horizontal layout
export function StatsSkeleton(): React.JSX.Element {
  return (
    <Stack spacing={1.5} alignItems="flex-start">
      {[1, 2, 3].map((i) => (
        <Stack key={i} direction="row" alignItems="center" spacing={1.5}>
          <Skeleton variant="circular" width={18} height={18} />
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={30} height={20} />
        </Stack>
      ))}
    </Stack>
  );
}

// Project card skeleton matching full card layout
export function ProjectCardSkeleton(): React.JSX.Element {
  return (
    <Box
      sx={(theme) => ({
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        backgroundColor: 'backdrop.glass',
        ...theme.mixins.glass,
        p: { xs: 1.5, sm: 2, md: 2.5 },
      })}
    >
      <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
        {/* Header: Title and icon */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="text" width="70%" height={32} />
          <Skeleton variant="circular" width={24} height={24} />
        </Stack>

        {/* Description */}
        <Box>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
        </Box>

        {/* Tech stack chips */}
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={60 + i * 10}
              height={24}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>

        {/* Stats */}
        <Stack spacing={1.5} alignItems="flex-start">
          {[1, 2, 3].map((i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={1.5}>
              <Skeleton variant="circular" width={18} height={18} />
              <Skeleton variant="text" width={50} height={20} />
              <Skeleton variant="text" width={30} height={20} />
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Action buttons */}
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={1}
        sx={{ mt: 2 }}
      >
        <Skeleton
          variant="rounded"
          width={104}
          height={36}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="rounded"
          width={104}
          height={36}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="rounded"
          width={104}
          height={36}
          sx={{ borderRadius: 1 }}
        />
      </Stack>
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
