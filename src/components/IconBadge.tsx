import type { JSX } from 'react';

import { Box, type SxProps, type Theme, Typography } from '@mui/material';

import { IconBadgeListProps, IconBadgeProps } from '@/config/types';
import { SIZING, SKEW_TRANSFORM } from '@/styles/shared';

const containerSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'text.secondary',
  // Responsive margin using spacing units (8px base)
  mr: { xs: 2, sm: 2.5, md: 3, lg: 4 },
  transform: SKEW_TRANSFORM,
  gap: { xs: 0.5, sm: 0.625, md: 0.75, lg: 1 },
};

const iconSx: SxProps<Theme> = {
  fontSize: SIZING.iconSm,
  color: 'text.secondary',
};

const textSx: SxProps<Theme> = {
  color: 'text.secondary',
  textTransform: 'uppercase',
  fontSize: (theme) => theme.typography.caption.fontSize,
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
