import { Box, type SxProps, type Theme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { staggerItemVariant } from '@/config/motion';
import { ProjectListProps } from '@/config/types';

import { ProjectCard } from './components/ProjectCard';

const gridSx: SxProps<Theme> = {
  display: 'flex',
};

function ProjectGridItem({ project }: ProjectListProps): React.JSX.Element {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} sx={gridSx}>
      <Box
        component={motion.div}
        variants={staggerItemVariant}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
        }}
      >
        <ProjectCard project={project} />
      </Box>
    </Grid>
  );
}

ProjectGridItem.displayName = 'ProjectGridItem';

export default ProjectGridItem;
