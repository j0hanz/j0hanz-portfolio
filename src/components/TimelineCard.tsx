import type { JSX } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import type { TimelineCardProps } from '@/config/types';

const metaWrapperSx: SxProps<Theme> = {
  mb: 0,
};

const cardWrapperSx: SxProps<Theme> = {
  width: 1,
  maxWidth: { lg: 520 },
  textAlign: 'left',
};

function TimelineCard({
  title,
  metadata,
  children,
  dataAttributes,
  metaDataAttribute,
}: TimelineCardProps): JSX.Element {
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
