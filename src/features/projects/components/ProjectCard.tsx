import { Suspense, useEffect, useRef } from 'react';

import {
  Box,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { AnimatePresence, m } from 'motion/react';

import { Card } from '@/components/Card';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProjectCardSkeleton } from '@/components/Skeletons';
import {
  CARD_HOVER_LIFT,
  cardEntranceVariants,
  viewportPresets,
} from '@/config/motion';
import type { ElementRef, Project } from '@/config/types';
import {
  prefetchRepoStats,
  useAnimationConfig,
  useInView,
  useMotionVariant,
} from '@/hooks';
import {
  PROJECT_CARD_ARTICLE_SX,
  PROJECT_CARD_CONTENT_SX,
} from '@/styles/shared';
import { getProjectMeta } from '@/utils/project';

import { ProjectHeader } from './ProjectHeader';
import { ProjectLinks } from './ProjectLinks';
import { ProjectStats } from './ProjectStats';
import { ProjectTechStack } from './ProjectTechStack';

const descriptionSx: SxProps<Theme> = {
  color: 'text.secondary',
  flex: 'none',
};

// Content fade variants for smooth skeleton-to-content transition
const contentFadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Card content that triggers Suspense when stats are loading
function CardContent({
  project,
}: Readonly<{ project: Project }>): React.JSX.Element {
  const { repoPath, hasProjectBoard } = getProjectMeta(project);
  const { getTransition } = useAnimationConfig();

  return (
    <Stack
      component={m.article}
      variants={contentFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={getTransition('smooth', { duration: 0.25 })}
      sx={PROJECT_CARD_ARTICLE_SX}
    >
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
}: Readonly<{ project: Project }>): React.JSX.Element {
  const { repoPath } = getProjectMeta(project);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasPrefetchedRef = useRef(false);
  // Use cardReplay preset for full-page scroll sections
  const isInView = useInView(cardRef as ElementRef, viewportPresets.cardReplay);

  useEffect(() => {
    if (!repoPath || hasPrefetchedRef.current || !isInView) return;
    hasPrefetchedRef.current = true;
    prefetchRepoStats(repoPath);
  }, [isInView, repoPath]);

  const handleMouseEnter = () => {
    // Only prefetch if we have a valid repo path
    if (repoPath && repoPath.length > 0 && !hasPrefetchedRef.current) {
      hasPrefetchedRef.current = true;
      prefetchRepoStats(repoPath);
    }
  };

  // Use same pattern as AboutMe CardItem - variants with hover effect
  const cardMotion = useMotionVariant(cardEntranceVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: CARD_HOVER_LIFT,
  });

  return (
    <Box
      ref={cardRef}
      component={m.div}
      {...cardMotion}
      onMouseEnter={handleMouseEnter}
    >
      <Card title="" noContentPadding>
        <ErrorBoundary fallback={<ProjectCardSkeleton />}>
          <Suspense fallback={<ProjectCardSkeleton />}>
            <AnimatePresence mode="wait">
              <CardContent key={project.title} project={project} />
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </Card>
    </Box>
  );
}
