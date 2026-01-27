import type { JSX } from 'react';

import Timeline from '@mui/lab/Timeline';
import { Box } from '@mui/material';

import type { TimelineSectionProps } from '@/config/types';

function TimelineSection({
  children,
  position = 'alternate',
}: Readonly<TimelineSectionProps>): JSX.Element {
  return (
    <Box>
      <Timeline position={position}>{children}</Timeline>
    </Box>
  );
}

export { TimelineSection };
