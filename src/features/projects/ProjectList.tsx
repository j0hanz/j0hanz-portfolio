import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { AnimatedCard } from '@/components/Card';
import { staggerItemVariant } from '@/config/motion';
import { Project, ProjectListProps } from '@/config/types';
import { getProjectMeta } from '@/utils/project';

import ProjectHeader from './components/ProjectHeader';
import ProjectLinks from './components/ProjectLinks';
import ProjectStats from './components/ProjectStats';
import ProjectTechStack from './components/ProjectTechStack';

const cardSx: SxProps<Theme> = {
  height: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 2,
  backgroundColor: 'backdrop.glass',
  ...(theme: Theme) => theme.mixins.glass,
};

const articleSx: SxProps<Theme> = {
  height: 1,
  p: { xs: 1.5, sm: 2, md: 2.5 },
  display: 'flex',
  flexDirection: 'column',
};

const contentSx: SxProps<Theme> = {
  flex: '1 1 auto',
};

const descriptionSx: SxProps<Theme> = {
  color: 'text.secondary',
  flexShrink: 0,
};

const gridSx: SxProps<Theme> = {
  display: 'flex',
};

const motionStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
};

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  const { repoPath, hasProjectBoard } = getProjectMeta(project);

  return (
    <AnimatedCard
      title="" // Title is handled by ProjectHeader
      noContentPadding
      sx={cardSx}
    >
      <Stack component="article" sx={articleSx}>
        <Stack spacing={2} sx={contentSx}>
          <ProjectHeader project={project} />
          <Typography sx={descriptionSx}>{project.description}</Typography>
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
    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} sx={gridSx}>
      <motion.div variants={staggerItemVariant} style={motionStyle}>
        <ProjectCard project={project} />
      </motion.div>
    </Grid>
  );
}

ProjectList.displayName = 'ProjectList';

export default ProjectList;
