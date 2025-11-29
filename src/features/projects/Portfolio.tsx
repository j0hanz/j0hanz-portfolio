import FolderTwoTone from '@mui/icons-material/FolderTwoTone';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { createStaggerContainer } from '@/config/motion';
import { MASONRY_COLUMNS, RESPONSIVE_SPACING } from '@/config/responsive';
import { useMobileBreakpoint, useMotionVariant } from '@/hooks';
import projects from '@/lib/data/projects';

import ProjectGridItem from './ProjectGridItem';
import ProjectMasonryItem from './ProjectMasonryItem';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  const isMobile = useMobileBreakpoint('sm');
  // Use animate instead of whileInView for full-page scroll sections
  // whileInView can fail to trigger on mobile due to viewport detection issues
  const motionProps = useMotionVariant(createStaggerContainer(0.1, 0.15), {
    initial: 'initial',
    animate: 'animate',
  });

  // Use Masonry on desktop, Grid on mobile for better UX
  if (isMobile) {
    return (
      <SectionContainer
        id="portfolio"
        title={<TextReveal text="Projects" as="span" />}
        icon={FolderTwoTone}
      >
        <Box component={motion.div} {...motionProps} sx={{ width: '100%' }}>
          <Grid container spacing={RESPONSIVE_SPACING.grid}>
            {projects.map((project) => (
              <ProjectGridItem key={project.github} project={project} />
            ))}
          </Grid>
        </Box>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      id="portfolio"
      title={<TextReveal text="Projects" as="span" />}
      icon={FolderTwoTone}
    >
      <Box component={motion.div} {...motionProps} sx={{ width: '100%' }}>
        <Masonry
          columns={MASONRY_COLUMNS.projects}
          spacing={RESPONSIVE_SPACING.masonry}
        >
          {projects.map((project) => (
            <ProjectMasonryItem key={project.github} project={project} />
          ))}
        </Masonry>
      </Box>
    </SectionContainer>
  );
}

export default Portfolio;
