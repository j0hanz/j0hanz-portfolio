import { Suspense } from 'react';

import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import { motion } from 'motion/react';

import { AnimatedCard } from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ProjectCardSkeleton } from '@/components/Skeletons';
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

// Card content that triggers Suspense when stats are loading
function CardContent({ project }: { project: Project }): React.JSX.Element {
  const { repoPath, hasProjectBoard } = getProjectMeta(project);

  return (
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
  );
}

export function ProjectCard({
  project,
}: {
  project: Project;
}): React.JSX.Element {
  const { repoPath } = getProjectMeta(project);

  const handleMouseEnter = () => {
    // Only prefetch if we have a valid repo path
    if (repoPath && repoPath.length > 0) {
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
        title=""
        noContentPadding
        onMouseEnter={handleMouseEnter}
      >
        <ErrorBoundary fallback={<ProjectCardSkeleton />}>
          <Suspense fallback={<ProjectCardSkeleton />}>
            <CardContent project={project} />
          </Suspense>
        </ErrorBoundary>
      </AnimatedCard>
    </motion.div>
  );
}
