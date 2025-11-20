import React from 'react';

import { CardContent, Card as MuiCard, Typography } from '@mui/material';

import { CardProps } from '@/config/types';

// Card component with title, subtitle, and children
function Card({
  title,
  subtitle,
  children,
  className = '',
  sx,
  noContentPadding = false,
}: CardProps): React.JSX.Element {
  return (
    <MuiCard
      className={className}
      sx={{
        height: 1,
        boxShadow: 3,
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
        ...sx,
      }}
    >
      {noContentPadding ? (
        children
      ) : (
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              component="div"
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </CardContent>
      )}
    </MuiCard>
  );
}

export default Card;
