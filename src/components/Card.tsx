import React from 'react';

import { CardContent, Card as MuiCard, Typography } from '@mui/material';

import { CardProps } from '@/config/types';

// Card component with title, subtitle, and children
function Card({
  title,
  subtitle,
  children,
  className = '',
}: CardProps): React.JSX.Element {
  return (
    <MuiCard
      className={className}
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        bgcolor: 'background.paper', // var(--card-bg)
        color: 'text.primary', // var(--text-color)
        borderRadius: '10px', // var(--border-radius)
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
        width: '100%',
        border: 'none',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent sx={{ padding: '0.9rem', border: 'none' }}>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        {subtitle ? (
          <Typography
            variant="body1"
            component="div"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        ) : null}
        {children}
      </CardContent>
    </MuiCard>
  );
}

export default Card;
