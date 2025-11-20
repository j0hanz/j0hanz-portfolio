import React from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';

import { ProjectListProps } from '@/config/types';
import { useProjectMeta } from '@/utils/project';

import ProjectBadges from './components/ProjectBadges';
import ProjectHeader from './components/ProjectHeader';
import ProjectLinks from './components/ProjectLinks';
import ProjectStats from './components/ProjectStats';
import ProjectTechStack from './components/ProjectTechStack';

import styles from './ProjectList.module.css';
import appStyles from '@/styles/App.module.css';

function ProjectList({ project }: ProjectListProps): React.JSX.Element {
  const { repoPath, badges, hasProjectBoard } = useProjectMeta(project);

  return (
    <Grid size={{ lg: 6 }} sx={{ mb: 4 }}>
      <Card className={`${appStyles.cardBgColor}`} sx={{ height: '100%' }}>
        <CardContent
          className={`${appStyles.cardBody} ${styles.badgePosition}`}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <ProjectHeader project={project} />
          <Typography className={appStyles.cardText} sx={{ mb: 2 }}>
            {project.description}
          </Typography>
          <ProjectTechStack technologies={project.technologies} />
          {repoPath && (
            <ProjectStats
              repoPath={repoPath}
              hasProjectBoard={hasProjectBoard}
            />
          )}
          <ProjectBadges badges={badges} />
          <ProjectLinks project={project} />
        </CardContent>
      </Card>
    </Grid>
  );
}

ProjectList.displayName = 'ProjectList';

export default ProjectList;
