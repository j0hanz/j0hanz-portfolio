import React from 'react';

import { Chip } from '@mui/material';

import { ProjectTechStackProps } from '@/config/types';

import styles from '../ProjectList.module.css';
import appStyles from '@/styles/App.module.css';

const ProjectTechStack = ({
  technologies,
}: ProjectTechStackProps): React.JSX.Element => (
  <div className={styles.technologies}>
    {technologies.map((tech, index) => (
      <Chip
        key={`${tech}-${index}`}
        label={tech}
        className={appStyles.customBadge}
        size="small"
        sx={{ mr: 1, mb: 1 }}
      />
    ))}
  </div>
);

ProjectTechStack.displayName = 'ProjectTechStack';

export default ProjectTechStack;
