import { Suspense } from 'react';

import { Stack, type SxProps, type Theme, Typography } from '@mui/material';
import { LayoutGroup, motion } from 'motion/react';

import { AnimatedCard } from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ProjectCardSkeleton } from '@/components/Skeletons';
import { CARD_MOTION_VARIANTS } from '@/config/motion';
import { RESPONSIVE_CARD_PADDING } from '@/config/responsive';
import { Project } from '@/config/types';
import { prefetchRepoStats, useInViewMotion } from '@/hooks';
import { getProjectMeta } from '@/utils/project';

import ProjectHeader from './ProjectHeader';
import ProjectLinks from './ProjectLinks';
import ProjectStats from './ProjectStats';
import ProjectTechStack from './ProjectTechStack';

const articleSx: SxProps<Theme> = {
  height: 1,
  p: RESPONSIVE_CARD_PADDING.projectCard,
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
          <ProjectStats repoPath={repoPath} hasProjectBoard={hasProjectBoard} />
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

  const motionProps = useInViewMotion(CARD_MOTION_VARIANTS);

  // Generate unique layoutId from project github URL
  const layoutId = `project-card-${project.github.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <LayoutGroup id={layoutId}>
      <motion.div
        {...motionProps}
        layoutId={`${layoutId}-container`}
        layoutDependency={project.github}
      >
        <AnimatedCard title="" noContentPadding onMouseEnter={handleMouseEnter}>
          <ErrorBoundary fallback={<ProjectCardSkeleton />}>
            <Suspense fallback={<ProjectCardSkeleton />}>
              <CardContent project={project} />
            </Suspense>
          </ErrorBoundary>
        </AnimatedCard>
      </motion.div>
    </LayoutGroup>
  );
}
