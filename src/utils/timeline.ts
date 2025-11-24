// Timeline component utilities for Education and WorkExperience sections

// Calculate if timeline item should be left-aligned in alternating layout
export function isTimelineItemLeftAligned(
  index: number,
  isMobile: boolean
): boolean {
  return !isMobile && index % 2 === 1;
}

// Timeline opposite content sx props factory
export function getTimelineOppositeContentSx(isLeftAligned: boolean) {
  return {
    display: { xs: 'none', md: 'flex' },
    py: 0,
    px: 2,
    textAlign: isLeftAligned ? 'left' : 'right',
    justifyContent: isLeftAligned ? 'flex-start' : 'flex-end',
  } as const;
}

// Timeline content sx props factory
export function getTimelineContentSx(isLeftAligned: boolean) {
  return {
    display: 'flex',
    justifyContent: isLeftAligned ? 'flex-end' : 'flex-start',
  } as const;
}
