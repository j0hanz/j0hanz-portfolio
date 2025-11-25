import type { SxProps, Theme } from '@mui/material';

// Timeline component utilities for Education and WorkExperience sections

// Timeline alignment type for clearer code
export type TimelineAlignment = 'left' | 'right';

// Calculate if timeline item should be left-aligned in alternating layout
export function isTimelineItemLeftAligned(
  index: number,
  isMobile: boolean
): boolean {
  // Mobile always right-aligned; desktop alternates based on index
  return !isMobile && index % 2 === 1;
}

// Get alignment type for timeline item
export function getTimelineItemAlignment(
  index: number,
  isMobile: boolean
): TimelineAlignment {
  return isTimelineItemLeftAligned(index, isMobile) ? 'left' : 'right';
}

// Timeline opposite content sx props factory
export function getTimelineOppositeContentSx(
  isLeftAligned: boolean
): SxProps<Theme> {
  return {
    display: { xs: 'none', md: 'flex' },
    py: 0,
    px: 2,
    textAlign: isLeftAligned ? 'left' : 'right',
    justifyContent: isLeftAligned ? 'flex-start' : 'flex-end',
  };
}

// Timeline content sx props factory
export function getTimelineContentSx(isLeftAligned: boolean): SxProps<Theme> {
  return {
    display: 'flex',
    justifyContent: isLeftAligned ? 'flex-end' : 'flex-start',
  };
}
