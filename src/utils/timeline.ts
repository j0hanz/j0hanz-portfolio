import type { Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';

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
): SystemStyleObject<Theme> {
  let textAlign: 'left' | 'right' = 'right';
  let justifyContent: 'flex-start' | 'flex-end' = 'flex-end';
  if (isLeftAligned) {
    textAlign = 'left';
    justifyContent = 'flex-start';
  }

  return {
    display: { xs: 'none', md: 'flex' },
    textAlign,
    justifyContent,
    paddingTop: 2,
  };
}

// Timeline content sx props factory
export function getTimelineContentSx(
  isLeftAligned: boolean
): SystemStyleObject<Theme> {
  let justifyContent: 'flex-start' | 'flex-end' = 'flex-start';
  if (isLeftAligned) {
    justifyContent = 'flex-end';
  }

  return {
    display: 'flex',
    justifyContent,
  };
}
