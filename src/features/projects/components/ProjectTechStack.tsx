import React from 'react';

import { Box, Chip } from '@mui/material';

import { ProjectTechStackProps } from '@/config/types';

const ProjectTechStack = ({
  technologies,
}: ProjectTechStackProps): React.JSX.Element => (
  <Box sx={{ mb: 1.5, transform: 'skew(-10deg)' }}>
    {technologies.map((tech, index) => (
      <Chip
        key={`${tech}-${index}`}
        label={tech}
        size="small"
        sx={{
          mr: 1,
          mb: 1,
          pt: 0.1,
          display: 'inline-flex',
          alignItems: 'center',
          color: 'text.primary',
          fontSize: '0.8rem',
          opacity: 0.9,
          transform: 'skew(-10deg)',
          '& .MuiChip-label': {
            color: 'text.primary',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          },
        }}
      />
    ))}
  </Box>
);

ProjectTechStack.displayName = 'ProjectTechStack';

export default ProjectTechStack;
