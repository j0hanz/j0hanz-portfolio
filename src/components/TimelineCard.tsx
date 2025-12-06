import type { JSX, ReactNode } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import { AnimatedContent } from '@/components/animations';
import { BlurText } from '@/components/animations';
import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import type { TimelineCardProps } from '@/config/types';

const metaWrapperSx: SxProps<Theme> = {
  mb: 0,
};

const cardWrapperSx: SxProps<Theme> = {
  width: 1, // = 100%
  // Responsive maxWidth: 1 = 100% at xs, fixed widths at larger breakpoints
  maxWidth: 1,
  textAlign: 'left',
};

const contentWrapperSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 1.5, md: 2 },
};

// Content slot for timeline card body
function Content({ children }: { children: ReactNode }): JSX.Element {
  return <Box sx={contentWrapperSx}>{children}</Box>;
}

// Actions slot for timeline card footer (buttons, links)
function Actions({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return <Box sx={sx}>{children}</Box>;
}

function TimelineCardRoot({
  title,
  metadata,
  children,
  dataAttributes,
  metaDataAttribute,
}: TimelineCardProps): JSX.Element {
  // Animated title using BlurText
  const animatedTitle = (
    <BlurText
      text={title}
      animateBy="words"
      direction="bottom"
      stepDuration={0.15}
      className="timeline-card-title"
    />
  );

  return (
    <Box sx={cardWrapperSx}>
      <AnimatedContent distance={50}>
        <Box {...dataAttributes}>
          <Card
            title={animatedTitle}
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
      </AnimatedContent>
    </Box>
  );
}

// Compound component pattern with attached sub-components
const TimelineCard = Object.assign(TimelineCardRoot, {
  Content,
  Actions,
});

export default TimelineCard;
