import React from 'react';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { AnimatedCard } from '@/components/Card';
import { Project, ProjectListProps } from '@/config/types';
import { motionVariants } from '@/utils/motionVariants';
import { getProjectMeta } from '@/utils/project';

import ProjectBadges from './components/ProjectBadges';
import ProjectHeader from './components/ProjectHeader';
import ProjectLinks from './components/ProjectLinks';
import ProjectStats from './components/ProjectStats';
import ProjectTechStack from './components/ProjectTechStack';

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  const { repoPath, badges, hasProjectBoard } = getProjectMeta(project);

  return (
    <AnimatedCard
      title="" // Title is handled by ProjectHeader
      noContentPadding
      sx={{
        height: 1,
        borderRadius: 2,
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
      }}
    >
      <Box
        component="article"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 1,
          position: 'relative',
          p: 2,
        }}
      >
        <ProjectHeader project={project} />
        <Typography sx={{ mb: 2, lineHeight: 1.8, color: 'text.secondary' }}>
          {project.description}
        </Typography>
        <ProjectTechStack technologies={project.technologies} />
        {repoPath && (
          <ProjectStats repoPath={repoPath} hasProjectBoard={hasProjectBoard} />
        )}
        <ProjectBadges badges={badges} />
        <ProjectLinks project={project} />
      </Box>
    </AnimatedCard>
  );
}

function ProjectList({ project }: ProjectListProps): React.JSX.Element {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ mb: 4 }}>
      <motion.div
        variants={motionVariants.stagger.item}
        style={{ height: '100%', position: 'relative' }}
      >
        <ProjectCard project={project} />
      </motion.div>
    </Grid>
  );
}

ProjectList.displayName = 'ProjectList';

export default ProjectList;
