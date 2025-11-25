import FolderTwoTone from '@mui/icons-material/FolderTwoTone';
import Masonry from '@mui/lab/Masonry';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { createStaggerContainer } from '@/config/motion';
import { useMotionVariant } from '@/hooks';
import projects from '@/lib/data/projects';

import ProjectGridItem from './ProjectGridItem';
import ProjectMasonryItem from './ProjectMasonryItem';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const motionProps = useMotionVariant(createStaggerContainer(0.1, 0.15), {
    initial: 'initial',
    whileInView: 'animate',
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
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
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
        <Masonry columns={{ sm: 2, md: 2, lg: 3 }} spacing={{ sm: 3, md: 4 }}>
          {projects.map((project) => (
            <ProjectMasonryItem key={project.github} project={project} />
          ))}
        </Masonry>
      </Box>
    </SectionContainer>
  );
}

export default Portfolio;
