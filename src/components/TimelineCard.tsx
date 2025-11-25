import React from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import type { TimelineCardProps } from '@/config/types';

const metaWrapperSx: SxProps<Theme> = {
  mb: 0,
};

const cardWrapperSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: { lg: 520 },
  textAlign: 'left',
};

// Reusable timeline card component for Education and Experience sections
// Works with MUI Timeline components for consistent timeline layouts
function TimelineCard({
  title,
  metadata,
  children,
  dataAttributes,
  metaDataAttribute,
}: TimelineCardProps): React.JSX.Element {
  return (
    <Box sx={cardWrapperSx} {...dataAttributes}>
      <Card
        title={title}
        subtitle={
          <Box
            sx={metaWrapperSx}
            {...(metaDataAttribute ? { [metaDataAttribute]: true } : {})}
          >
            <IconBadgeList items={metadata} keyPrefix={title} />
          </Box>
        }
      >
        {children}
      </Card>
    </Box>
  );
}

export default TimelineCard;
