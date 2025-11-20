import React from 'react';

import { HiMiniServer, HiMiniUser, HiMiniUserGroup } from 'react-icons/hi2';

import { Box, Chip, Stack, Typography } from '@mui/material';

import { ProjectHeaderProps } from '@/config/types';

const ProjectHeader = ({ project }: ProjectHeaderProps): React.JSX.Element => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ mb: 3 }}
  >
    <Typography
      variant="h6"
      component="h3"
      sx={{
        fontSize: '1.25rem',
        color: 'text.primary',
      }}
    >
      <Stack direction="row" alignItems="center" component="span">
        {project.api && <HiMiniServer style={{ marginRight: '0.5rem' }} />}
        {project.title}
        {project.isNew && (
          <Chip
            label="New"
            size="small"
            sx={{
              ml: 1,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              height: 21,
              minWidth: 43,
              border: 'none',
              fontSize: '0.7rem',
              borderRadius: 1,
              transform: 'skew(-10deg)',
            }}
          />
        )}
      </Stack>
    </Typography>
    <Box>
      {project.collaborative ? (
        <HiMiniUserGroup
          style={{ fontSize: '1.3rem', color: 'inherit' }} // Inherits text.primary
        />
      ) : (
        <HiMiniUser
          style={{ fontSize: '1.3rem', color: 'inherit' }} // Inherits text.primary
        />
      )}
    </Box>
  </Stack>
);

ProjectHeader.displayName = 'ProjectHeader';

export default ProjectHeader;
