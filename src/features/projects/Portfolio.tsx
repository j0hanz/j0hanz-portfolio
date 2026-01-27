import { useEffect, useRef } from 'react';

import FolderTwoTone from '@mui/icons-material/FolderTwoTone';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import { SplitText } from '@/components/animations';
import { SectionContainer } from '@/components/SectionContainer';
import { createStaggerContainer, viewportPresets } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import type { ElementRef } from '@/config/types';
import {
  prefetchRepoStats,
  useInView,
  useMobileBreakpoint,
  useMotionVariant,
} from '@/hooks';
import { projects } from '@/lib/data/projects';
import { getProjectRepoPaths } from '@/utils/project';

import { ProjectGridItem } from './ProjectGridItem';
import { ProjectMasonryItem } from './ProjectMasonryItem';

// Pre-compute repo paths for batch prefetching (static data, computed once)
const PROJECT_REPO_PATHS = getProjectRepoPaths(projects);

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasPrefetched = useRef(false);

  // Use grid on mobile (< md), masonry on desktop (>= md)
  const useGridLayout = useMobileBreakpoint('md');

  // Detect when section enters viewport for prefetching
  const isInView = useInView(sectionRef as ElementRef, viewportPresets.section);

  // Prefetch all project stats when section becomes visible
  useEffect(() => {
    if (isInView && !hasPrefetched.current) {
      hasPrefetched.current = true;
      // Stagger prefetch requests to avoid rate limiting
      const timers = PROJECT_REPO_PATHS.map((repoPath, index) =>
        window.setTimeout(() => prefetchRepoStats(repoPath), index * 100)
      );
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
  }, [isInView]);

  // Use animate with proper viewport config for full-page scroll sections
  // Using once:false ensures animations replay when section remounts on navigation
  const motionProps = useMotionVariant(createStaggerContainer(0.1, 0.15), {
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: false, amount: 0.1 },
  });

  return (
    <SectionContainer
      id="portfolio"
      title={
        <SplitText
          text="Projects"
          splitType="chars"
          delay={50}
          duration={0.5}
          ease="power3.out"
        />
      }
      icon={FolderTwoTone}
      maxWidth={false}
    >
      <Box
        ref={sectionRef}
        component={motion.div}
        {...motionProps}
        sx={{ width: 1, overflow: 'hidden' }}
      >
        {useGridLayout ? (
          <Grid container spacing={SPACING.grid}>
            {projects.map((project) => (
              <ProjectGridItem key={project.github} project={project} />
            ))}
          </Grid>
        ) : (
          <Masonry columns={{ sm: 1, md: 2, lg: 3 }} spacing={SPACING.masonry}>
            {projects.map((project) => (
              <ProjectMasonryItem key={project.github} project={project} />
            ))}
          </Masonry>
        )}
      </Box>
    </SectionContainer>
  );
}

export { Portfolio };
