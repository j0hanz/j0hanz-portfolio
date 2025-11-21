import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { AnimatedCard } from '@/components/Card';
import { Project, ProjectListProps } from '@/config/types';
import { staggerItemVariant } from '@/utils/motionVariants';
import { getProjectMeta } from '@/utils/project';

import ProjectHeader from './components/ProjectHeader';
import ProjectLinks from './components/ProjectLinks';
import ProjectStats from './components/ProjectStats';
import ProjectTechStack from './components/ProjectTechStack';

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  const { repoPath, hasProjectBoard } = getProjectMeta(project);

  return (
    <AnimatedCard
      title="" // Title is handled by ProjectHeader
      noContentPadding
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'backdrop.glass',
      }}
    >
      <Stack
        component="article"
        sx={{
          height: 1,
          p: { xs: 1.5, sm: 2, md: 2.5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
          <ProjectHeader project={project} />
          <Typography
            sx={{
              color: 'text.secondary',
              flexShrink: 0,
            }}
          >
            {project.description}
          </Typography>
          <ProjectTechStack technologies={project.technologies} />
          {repoPath && (
            <ProjectStats
              repoPath={repoPath}
              hasProjectBoard={hasProjectBoard}
            />
          )}
          {/*  <ProjectBadges badges={badges} /> */}
        </Stack>
        <ProjectLinks project={project} />
      </Stack>
    </AnimatedCard>
  );
}

function ProjectList({ project }: ProjectListProps): React.JSX.Element {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} sx={{ display: 'flex' }}>
      <motion.div
        variants={staggerItemVariant}
        style={{ height: '100%', width: '100%', display: 'flex' }}
      >
        <ProjectCard project={project} />
      </motion.div>
    </Grid>
  );
}

ProjectList.displayName = 'ProjectList';

export default ProjectList;
