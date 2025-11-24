import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import { motion } from 'motion/react';

import { AnimatedCard } from '@/components/Card';
import { Project } from '@/config/types';
import { prefetchRepoStats, useInViewMotion } from '@/hooks';
import { getProjectMeta } from '@/utils/project';

import ProjectHeader from './ProjectHeader';
import ProjectLinks from './ProjectLinks';
import ProjectStats from './ProjectStats';
import ProjectTechStack from './ProjectTechStack';

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

export function ProjectCard({
  project,
}: {
  project: Project;
}): React.JSX.Element {
  const { repoPath, hasProjectBoard } = getProjectMeta(project);

  const handleMouseEnter = () => {
    if (repoPath) {
      prefetchRepoStats(repoPath);
    }
  };

  const motionProps = useInViewMotion({
    hidden: { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
    visible: { opacity: 1, transform: 'translateY(0px) scale(1)' },
  });

  return (
    <motion.div {...motionProps}>
      <AnimatedCard
        title="" // Title is handled by ProjectHeader
        noContentPadding
        onMouseEnter={handleMouseEnter}
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
          </Stack>
          <ProjectLinks project={project} />
        </Stack>
      </AnimatedCard>
    </motion.div>
  );
}
