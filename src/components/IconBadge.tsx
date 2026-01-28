import type { JSX } from 'react';

import { Box, type SxProps, type Theme, Typography } from '@mui/material';

import type { IconBadgeListProps, IconBadgeProps } from '@/config/types';

const containerSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'text.secondary',
  // Responsive margin using spacing units (8px base)
  mr: { xs: 2, sm: 2.5, md: 3, lg: 4 },
  transform: (theme) => theme.custom.motion.skew,
  gap: { xs: 0.5, sm: 0.625, md: 0.75, lg: 1 },
};

const iconSx: SxProps<Theme> = {
  fontSize: (theme) => theme.custom.sizing.iconSm,
  color: 'text.secondary',
};

const textSx: SxProps<Theme> = {
  color: 'text.secondary',
  textTransform: 'uppercase',
  fontSize: (theme) => theme.typography.caption.fontSize,
};

function IconBadge({
  icon: Icon,
  text,
}: Readonly<IconBadgeProps>): JSX.Element {
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
}: Readonly<IconBadgeListProps>): JSX.Element | null {
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
