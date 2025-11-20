import React from 'react';

import { CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Card from '@/components/Card';
import { Project, ProjectListProps } from '@/config/types';
import { getProjectMeta } from '@/utils/project';

import ProjectBadges from './components/ProjectBadges';
import ProjectHeader from './components/ProjectHeader';
import ProjectLinks from './components/ProjectLinks';
import ProjectStats from './components/ProjectStats';
import ProjectTechStack from './components/ProjectTechStack';

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  const { repoPath, badges, hasProjectBoard } = getProjectMeta(project);

  return (
    <Card
      title="" // Title is handled by ProjectHeader
      noContentPadding
      sx={{
        height: 1,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardContent
        component="article"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 1,
          position: 'relative',
          p: 2,
        }}
      >
        <ProjectHeader project={project} />
        <Typography sx={{ mb: 2, lineHeight: 1.8, color: 'text.secondary' }}>
          {project.description}
        </Typography>
        <ProjectTechStack technologies={project.technologies} />
        {repoPath && (
          <ProjectStats repoPath={repoPath} hasProjectBoard={hasProjectBoard} />
        )}
        <ProjectBadges badges={badges} />
        <ProjectLinks project={project} />
      </CardContent>
    </Card>
  );
}

function ProjectList({ project }: ProjectListProps): React.JSX.Element {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ mb: 4 }}>
      <ProjectCard project={project} />
    </Grid>
  );
}

ProjectList.displayName = 'ProjectList';

export default ProjectList;
