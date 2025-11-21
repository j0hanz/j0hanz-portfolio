import { FolderTwoTone } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { createStaggerContainer } from '@/config/motion';
import { useAnimationConfig } from '@/hooks';
import projects from '@/lib/data/projects';

import ProjectList from './ProjectList';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  const { prefersReducedMotion, motionViewport } = useAnimationConfig();

  return (
    <SectionContainer
      id="portfolio"
      title={<TextReveal text="Projects" as="span" />}
      icon={FolderTwoTone}
    >
      <motion.div
        variants={createStaggerContainer(0.1, 0.15)}
        initial={prefersReducedMotion ? 'animate' : 'initial'}
        whileInView="animate"
        viewport={motionViewport}
        style={{ width: '100%' }}
      >
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {projects.map((project) => (
            <ProjectList key={project.github} project={project} />
          ))}
        </Grid>
      </motion.div>
    </SectionContainer>
  );
}

export default Portfolio;
