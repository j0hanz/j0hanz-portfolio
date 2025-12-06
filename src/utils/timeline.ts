import type { SxProps, Theme } from '@mui/material';

// Timeline component utilities for Education and WorkExperience sections

// Calculate if timeline item should be left-aligned in alternating layout
export function isTimelineItemLeftAligned(
  index: number,
  isMobile: boolean
): boolean {
  // Mobile always right-aligned; desktop alternates based on index
  return !isMobile && index % 2 === 1;
}

// Timeline opposite content sx props factory
export function getTimelineOppositeContentSx(
  isLeftAligned: boolean
): SxProps<Theme> {
  return {
    display: { xs: 'none', md: 'flex' },
    textAlign: isLeftAligned ? 'left' : 'right',
    justifyContent: isLeftAligned ? 'flex-start' : 'flex-end',
    paddingTop: 2,
  };
}

// Timeline content sx props factory
export function getTimelineContentSx(isLeftAligned: boolean): SxProps<Theme> {
  return {
    display: 'flex',
    justifyContent: isLeftAligned ? 'flex-end' : 'flex-start',
  };
}
