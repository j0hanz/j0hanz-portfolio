import React from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';
import Grid from '@mui/material/Grid';

import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import type { IconBadgeMetaItem } from '@/config/types';
import { sectionGridItemSx } from '@/styles/shared';

interface TimelineCardProps {
  title: string;
  metadata: IconBadgeMetaItem[];
  children?: React.ReactNode;
  dataAttributes?: Record<string, string>;
  metaDataAttribute?: string;
}

const metaWrapperSx: SxProps<Theme> = {
  mb: 0,
};

// Reusable timeline card component for Education and Experience sections
function TimelineCard({
  title,
  metadata,
  children,
  dataAttributes,
  metaDataAttribute,
}: TimelineCardProps): React.JSX.Element {
  return (
    <Grid size={{ lg: 6 }} sx={sectionGridItemSx} {...dataAttributes}>
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
    </Grid>
  );
}

export default TimelineCard;
