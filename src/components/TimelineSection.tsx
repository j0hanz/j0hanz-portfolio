import React from 'react';

import Timeline from '@mui/lab/Timeline';
import { Box } from '@mui/material';

import type { TimelineSectionProps } from '@/config/types';

function TimelineSection({
  children,
  position = 'alternate',
}: TimelineSectionProps): React.JSX.Element {
  return (
    <Box>
      <Timeline position={position}>{children}</Timeline>
    </Box>
  );
}

export default TimelineSection;
