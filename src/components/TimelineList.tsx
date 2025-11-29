import React from 'react';

import type { SvgIconComponent } from '@mui/icons-material';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Typography } from '@mui/material';
import { motion, type MotionProps } from 'motion/react';

import TimelineSection from '@/components/TimelineSection';
import { useMobileBreakpoint } from '@/hooks';
import { buildItemKey } from '@/utils/metadata';
import {
  getTimelineContentSx,
  getTimelineOppositeContentSx,
  isTimelineItemLeftAligned,
} from '@/utils/timeline';

export interface TimelineItemData {
  title: string;
  duration: string;
}

interface TimelineListProps<T extends TimelineItemData> {
  items: T[];
  renderItem: (item: T, index: number, isMobile: boolean) => React.ReactNode;
  Icon: SvgIconComponent;
  cardMotion: MotionProps;
  getItemIcon?: (item: T) => SvgIconComponent;
}

export function TimelineList<T extends TimelineItemData>({
  items,
  renderItem,
  Icon,
  cardMotion,
  getItemIcon,
}: TimelineListProps<T>): React.JSX.Element {
  const isMobile = useMobileBreakpoint('md');

  return (
    <TimelineSection position={isMobile ? 'right' : 'alternate'}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const isLeftAligned = isTimelineItemLeftAligned(index, isMobile);
        const ItemIcon = getItemIcon?.(item) ?? Icon;
        const itemKey = buildItemKey(item.title, item.duration, index);

        return (
          <TimelineItem key={itemKey} sx={{ minHeight: 'auto' }}>
            <TimelineOppositeContent
              sx={getTimelineOppositeContentSx(isLeftAligned)}
              color="text.secondary"
            >
              <Typography
                variant="subtitle2"
                component="span"
                color="primary.contrastText"
              >
                {item.duration}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined">
                <ItemIcon fontSize="small" />
              </TimelineDot>
              {!isLastItem && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={getTimelineContentSx(isLeftAligned)}>
              <motion.div custom={index} {...cardMotion}>
                {renderItem(item, index, isMobile)}
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </TimelineSection>
  );
}
