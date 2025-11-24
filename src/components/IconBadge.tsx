import React from 'react';

import { Box, type SxProps, type Theme, Typography } from '@mui/material';

import { IconBadgeListProps, IconBadgeProps } from '@/config/types';
import { SKEW_TRANSFORM } from '@/styles/shared';

const containerSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'text.primary',
  marginRight: '2rem',
  transform: SKEW_TRANSFORM,
  gap: 0.75,
};

const iconSx: SxProps<Theme> = {
  fontSize: 17,
};

const textSx: SxProps<Theme> = {
  color: 'text.primary',
  textTransform: 'uppercase',
  fontSize: '0.9rem',
};

function IconBadge({ icon: Icon, text }: IconBadgeProps): React.JSX.Element {
  return (
    <Box sx={containerSx}>
      <Icon sx={iconSx} />
      <Typography component="span" sx={textSx}>
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
