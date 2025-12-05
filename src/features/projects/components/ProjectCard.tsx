import { Suspense, useRef } from 'react';

import {
  Box,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { LayoutGroup, motion } from 'motion/react';

import Card from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ProjectCardSkeleton } from '@/components/Skeletons';
import {
  CARD_HOVER_LIFT,
  cardEntranceVariants,
  viewportPresets,
} from '@/config/motion';
import type { ElementRef, Project } from '@/config/types';
import { prefetchRepoStats, useInView, useMotionVariant } from '@/hooks';
import {
  PROJECT_CARD_ARTICLE_SX,
  PROJECT_CARD_CONTENT_SX,
} from '@/styles/shared';
import { getProjectMeta } from '@/utils/project';

import ProjectHeader from './ProjectHeader';
import ProjectLinks from './ProjectLinks';
import ProjectStats from './ProjectStats';
import ProjectTechStack from './ProjectTechStack';

const descriptionSx: SxProps<Theme> = {
  color: 'text.secondary',
  flexShrink: 0,
};

// Card content that triggers Suspense when stats are loading
function CardContent({ project }: { project: Project }): React.JSX.Element {
  const { repoPath, hasProjectBoard } = getProjectMeta(project);

  return (
    <Stack component="article" sx={PROJECT_CARD_ARTICLE_SX}>
      <Stack spacing={2} sx={PROJECT_CARD_CONTENT_SX}>
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
  const cardRef = useRef<HTMLDivElement>(null);
  // Use cardReplay preset for full-page scroll sections
  const isInView = useInView(cardRef as ElementRef, viewportPresets.cardReplay);

  const handleMouseEnter = () => {
    // Only prefetch if we have a valid repo path
    if (repoPath && repoPath.length > 0) {
      prefetchRepoStats(repoPath);
    }
  };

  // Use same pattern as AboutMe CardItem - variants with hover effect
  const cardMotion = useMotionVariant(cardEntranceVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: CARD_HOVER_LIFT,
  });

  // Generate unique layoutId from project github URL
  const layoutId = `project-card-${project.github.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <LayoutGroup id={layoutId}>
      <Box
        ref={cardRef}
        component={motion.div}
        {...cardMotion}
        layoutId={`${layoutId}-container`}
        onMouseEnter={handleMouseEnter}
      >
        <Card title="" noContentPadding>
          <ErrorBoundary fallback={<ProjectCardSkeleton />}>
            <Suspense fallback={<ProjectCardSkeleton />}>
              <CardContent project={project} />
            </Suspense>
          </ErrorBoundary>
        </Card>
      </Box>
    </LayoutGroup>
  );
}
