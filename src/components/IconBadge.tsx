import type { JSX } from 'react';

import { Box, type SxProps, type Theme, Typography } from '@mui/material';

import { FONT_SIZE } from '@/config/responsive';
import { IconBadgeListProps, IconBadgeProps } from '@/config/types';
import { SKEW_TRANSFORM } from '@/styles/shared';

const containerSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'text.primary',
  // Responsive margin using spacing units (8px base)
  mr: { xs: 2, sm: 3, md: 4 },
  transform: SKEW_TRANSFORM,
  gap: { xs: 0.5, sm: 0.75 },
};

const iconSx: SxProps<Theme> = {
  // Responsive icon size
  fontSize: { xs: 15, sm: 17 },
};

const textSx: SxProps<Theme> = {
  color: 'text.primary',
  textTransform: 'uppercase',
  fontSize: FONT_SIZE.small,
};

function IconBadge({ icon: Icon, text }: IconBadgeProps): JSX.Element {
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
}: IconBadgeListProps): JSX.Element | null {
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
