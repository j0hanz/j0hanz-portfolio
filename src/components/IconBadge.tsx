import React from 'react';

import { Box, Typography } from '@mui/material';

import { IconBadgeProps } from '@/config/types';

function IconBadge({ icon: Icon, text }: IconBadgeProps): React.JSX.Element {
  return (
    <Box
      sx={{
        paddingTop: '0.1rem',
        display: 'inline-flex',
        alignItems: 'center',
        color: 'text.primary',
        marginRight: '1.5rem',
        fontSize: '0.8rem',
        opacity: 0.9,
        transform: 'skew(-10deg)',
      }}
    >
      <Icon className="me-1" />
      <Typography
        component="span"
        sx={{
          color: 'text.primary',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default IconBadge;
