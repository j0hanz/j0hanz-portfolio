import React from 'react';

import { HiMiniServer, HiMiniUser, HiMiniUserGroup } from 'react-icons/hi2';

import { Box, Chip } from '@mui/material';

import { ProjectHeaderProps } from '@/config/types';

import styles from '../ProjectList.module.css';

const ProjectHeader = ({ project }: ProjectHeaderProps): React.JSX.Element => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.25rem',
        color: 'text.primary',
      }}
    >
      {project.api && <HiMiniServer style={{ marginRight: '0.5rem' }} />}
      {project.title}
      {project.isNew && (
        <Chip
          label="New"
          size="small"
          className={styles.newBadge}
          sx={{ ml: 1 }}
        />
      )}
    </Box>
    <Box>
      {project.collaborative ? (
        <HiMiniUserGroup className={styles.userIcon} />
      ) : (
        <HiMiniUser className={styles.userIcon} />
      )}
    </Box>
  </Box>
);

ProjectHeader.displayName = 'ProjectHeader';

export default ProjectHeader;
