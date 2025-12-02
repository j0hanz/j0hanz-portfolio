import type { ReactNode } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { staggerItemVariant } from '@/config/motion';
import { GRID } from '@/config/responsive';
import { ProjectListProps } from '@/config/types';

import { ProjectCard } from './components/ProjectCard';

const wrapperSx: SxProps<Theme> = {
  width: 1,
  display: 'flex',
};

export function ProjectCardMotionWrapper({
  children,
  fullHeight = true,
}: {
  children: ReactNode;
  fullHeight?: boolean;
}): React.JSX.Element {
  return (
    <Box
      component={motion.div}
      variants={staggerItemVariant}
      sx={{ ...wrapperSx, ...(fullHeight ? { height: 1 } : {}) }}
    >
      {children}
    </Box>
  );
}

function ProjectGridItem({ project }: ProjectListProps): React.JSX.Element {
  return (
    <Grid size={GRID.projectCard} sx={{ display: 'flex' }}>
      <ProjectCardMotionWrapper>
        <ProjectCard project={project} />
      </ProjectCardMotionWrapper>
    </Grid>
  );
}

ProjectGridItem.displayName = 'ProjectGridItem';

export default ProjectGridItem;
