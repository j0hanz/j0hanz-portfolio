import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { staggerItemVariant } from '@/config/motion';
import { ProjectListProps } from '@/config/types';

import { ProjectCard } from './components/ProjectCard';

function ProjectMasonryItem({ project }: ProjectListProps): React.JSX.Element {
  return (
    <Box
      component={motion.div}
      variants={staggerItemVariant}
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <ProjectCard project={project} />
    </Box>
  );
}

ProjectMasonryItem.displayName = 'ProjectMasonryItem';

export default ProjectMasonryItem;
