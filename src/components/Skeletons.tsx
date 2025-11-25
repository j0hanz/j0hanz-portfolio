import { Box, Skeleton, Stack, type SxProps, type Theme } from '@mui/material';

// Card skeleton for project cards
const cardSkeletonSx: SxProps<Theme> = {
  borderRadius: 2,
  height: '100%',
  minHeight: 280,
};

const headerSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2,
};

const chipContainerSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0.5,
  mb: 2,
};

const actionsSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  mt: 'auto',
};

export function CardSkeleton(): React.JSX.Element {
  return (
    <Box sx={cardSkeletonSx}>
      <Box sx={headerSx}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="40%" height={20} />
        </Box>
      </Box>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" sx={{ mb: 2 }} />
      <Box sx={chipContainerSx}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="rounded" width={60} height={24} />
        ))}
      </Box>
      <Box sx={actionsSx}>
        <Skeleton variant="rounded" width={80} height={36} />
        <Skeleton variant="rounded" width={80} height={36} />
      </Box>
    </Box>
  );
}

// Section skeleton for loading entire sections
export function SectionSkeleton(): React.JSX.Element {
  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={200} height={40} />
      </Box>
      <Stack spacing={3}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" height={120} />
        ))}
      </Stack>
    </Box>
  );
}

// Timeline skeleton for education/experience sections
export function TimelineSkeleton(): React.JSX.Element {
  return (
    <Box sx={{ width: '100%' }}>
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton
              variant="rectangular"
              width={2}
              height={80}
              sx={{ my: 1 }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="50%" height={28} />
            <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

// Grid skeleton for skills section
export function SkillsGridSkeleton(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 2,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Box key={i} sx={{ textAlign: 'center' }}>
          <Skeleton
            variant="rounded"
            width={80}
            height={80}
            sx={{ mx: 'auto', mb: 1 }}
          />
          <Skeleton variant="text" width={60} sx={{ mx: 'auto' }} />
        </Box>
      ))}
    </Box>
  );
}

// Form skeleton for contact form
export function FormSkeleton(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width={60} height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="rounded" height={48} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width={60} height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="rounded" height={48} />
        </Box>
      </Box>
      <Box>
        <Skeleton variant="text" width={80} height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="rounded" height={120} />
      </Box>
      <Skeleton variant="rounded" width={120} height={42} />
    </Stack>
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

// Avatar skeleton for profile sections
export function AvatarSkeleton({
  size = 120,
}: {
  size?: number;
}): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Skeleton variant="circular" width={size} height={size} />
      <Skeleton variant="text" width={size * 1.2} height={32} />
      <Skeleton variant="text" width={size * 0.8} height={20} />
    </Box>
  );
}

// Image skeleton with aspect ratio
interface ImageSkeletonProps {
  aspectRatio?: number;
  width?: string | number;
}

export function ImageSkeleton({
  aspectRatio = 16 / 9,
  width = '100%',
}: ImageSkeletonProps): React.JSX.Element {
  return (
    <Skeleton
      variant="rounded"
      width={width}
      sx={{
        aspectRatio,
        height: 'auto',
      }}
    />
  );
}
