import React from 'react';

import { HiFolder } from 'react-icons/hi2';

import Grid from '@mui/material/Grid';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { useAnimationConfig } from '@/hooks/useMotions';
import projects from '@/lib/data/projects';
import { motionVariants } from '@/utils/motionVariants';

import ProjectList from './ProjectList';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <SectionContainer id="portfolio" title="Projects" icon={HiFolder}>
      <motion.div
        variants={motionVariants.stagger.container}
        initial={prefersReducedMotion ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        style={{ width: '100%' }}
      >
        <Grid container spacing={4}>
          {projects.map((project) => (
            <ProjectList key={project.title} project={project} />
          ))}
        </Grid>
      </motion.div>
    </SectionContainer>
  );
}

export default Portfolio;
