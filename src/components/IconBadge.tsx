import React from 'react';

import { Box, Typography } from '@mui/material';

import { IconBadgeListProps, IconBadgeProps } from '@/config/types';

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
        gap: 0.5,
      }}
    >
      <Icon />
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
