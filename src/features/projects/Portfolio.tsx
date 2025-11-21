import { FolderTwoTone } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { useAnimationConfig } from '@/hooks';
import projects from '@/lib/data/projects';
import { motionVariants } from '@/utils/motionVariants';

import ProjectList from './ProjectList';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  const { prefersReducedMotion, motionViewport } = useAnimationConfig();

  return (
    <SectionContainer id="portfolio" title="Projects" icon={FolderTwoTone}>
      <motion.div
        variants={motionVariants.stagger.container}
        initial={prefersReducedMotion ? 'show' : 'hidden'}
        whileInView="show"
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
