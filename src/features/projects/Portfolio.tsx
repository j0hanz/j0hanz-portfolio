import FolderTwoTone from '@mui/icons-material/FolderTwoTone';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { createStaggerContainer } from '@/config/motion';
import { SPACING } from '@/config/responsive';
import { useMobileBreakpoint, useMotionVariant } from '@/hooks';
import projects from '@/lib/data/projects';

import ProjectGridItem from './ProjectGridItem';
import ProjectMasonryItem from './ProjectMasonryItem';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  // Use grid on mobile (< md), masonry on desktop (>= md)
  const useGridLayout = useMobileBreakpoint('md');
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
      title={<TextReveal text="Projects" as="span" />}
      icon={FolderTwoTone}
    >
      <Box component={motion.div} {...motionProps} sx={{ width: 1 }}>
        {useGridLayout ? (
          <Grid container spacing={SPACING.grid}>
            {projects.map((project) => (
              <ProjectGridItem key={project.github} project={project} />
            ))}
          </Grid>
        ) : (
          <Masonry
            columns={{ sm: 2, md: 2, lg: 2, xl: 3 }}
            spacing={SPACING.masonry}
          >
            {projects.map((project) => (
              <ProjectMasonryItem key={project.github} project={project} />
            ))}
          </Masonry>
        )}
      </Box>
    </SectionContainer>
  );
}

export default Portfolio;
