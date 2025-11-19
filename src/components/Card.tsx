import React from 'react';

import { CardContent, Card as MuiCard, Typography } from '@mui/material';

import { CardProps } from '@/config/types';

import styles from './Card.module.css';
import appStyles from '@/styles/App.module.css';

// Card component with title, subtitle, and children
function Card({
  title,
  subtitle,
  children,
  className = '',
}: CardProps): React.JSX.Element {
  return (
    <MuiCard
      className={`${styles.card} ${appStyles.cardBgColor} ${className}`}
      sx={{ height: '100%' }}
    >
      <CardContent className={appStyles.cardBody}>
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
