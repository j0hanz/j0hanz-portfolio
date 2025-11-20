import React from 'react';

import { Box, Typography } from '@mui/material';

import { IconBadgeListProps, IconBadgeProps } from '@/config/types';

function IconBadge({ icon: Icon, text }: IconBadgeProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        color: 'text.primary',
        marginRight: '2rem',
        transform: 'skew(-5deg)',
        gap: 0.75,
      }}
    >
      <Icon sx={{ fontSize: 17 }} />
      <Typography
        component="span"
        sx={{
          color: 'text.primary',
          textTransform: 'uppercase',
          fontSize: '0.9rem',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default IconBadge;

export function IconBadgeList({
  items,
  keyPrefix,
}: IconBadgeListProps): React.JSX.Element | null {
  if (!items.length) {
    return null;
  }

  return (
    <>
      {items.map(({ id, icon, text }) => (
        <IconBadge key={`${keyPrefix}-${id}`} icon={icon} text={text} />
      ))}
    </>
  );
}
