import type { ReactNode } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { m } from 'motion/react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProjectCardSkeleton } from '@/components/Skeletons';
import { staggerItemVariant, staggerItemVariantMobile } from '@/config/motion';
import { GRID } from '@/config/responsive';
import type { ProjectListProps } from '@/config/types';
import { useMobileBreakpoint } from '@/hooks';

import { ProjectCard } from './components/ProjectCard';

const wrapperSx: SxProps<Theme> = {
  width: 1,
  display: 'flex',
};

export function ProjectCardMotionWrapper({
  children,
  fullHeight = true,
}: Readonly<{ children: ReactNode; fullHeight?: boolean }>): React.JSX.Element {
  const isMobile = useMobileBreakpoint('md');
  const variant = isMobile ? staggerItemVariantMobile : staggerItemVariant;

  return (
    <Box
      component={m.div}
      variants={variant}
      sx={{ ...wrapperSx, ...(fullHeight ? { height: 1 } : {}) }}
    >
      {children}
    </Box>
  );
}

function ProjectGridItem({
  project,
}: Readonly<ProjectListProps>): React.JSX.Element {
  return (
    <Grid size={GRID.third} sx={{ display: 'flex' }}>
      <ProjectCardMotionWrapper>
        <ErrorBoundary fallback={<ProjectCardSkeleton />}>
          <ProjectCard project={project} />
        </ErrorBoundary>
      </ProjectCardMotionWrapper>
    </Grid>
  );
}

ProjectGridItem.displayName = 'ProjectGridItem';

export { ProjectGridItem };
