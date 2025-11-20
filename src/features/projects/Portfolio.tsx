import React from 'react';

import { HiFolder } from 'react-icons/hi2';

import Grid from '@mui/material/Grid';

import SectionContainer from '@/components/SectionContainer';
import projects from '@/lib/data/projects';

import ProjectList from './ProjectList';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  return (
    <SectionContainer id="portfolio" title="Projects" icon={HiFolder}>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <ProjectList key={project.title} project={project} />
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default Portfolio;
