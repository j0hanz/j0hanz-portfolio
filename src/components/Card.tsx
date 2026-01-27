import type { JSX, ReactNode } from 'react';

import {
  Box,
  Paper as MuiPaper,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import type { SystemStyleObject } from '@mui/system';
import { m, type MotionProps } from 'motion/react';

import { BlurText } from '@/components/animations';
import { SPACING } from '@/config/responsive';
import type { CardComponentProps } from '@/config/types';
import { useCardHover } from '@/hooks';
import { cardBaseSx, mergeSxEntries, normalizeSx } from '@/styles/shared';

// ============================================================================
// CONSTANTS
// ============================================================================

const MotionPaper = m.create(MuiPaper);

// Responsive card content padding
const CARD_CONTENT_SX: SxProps<Theme> = { p: SPACING.card };
const CARD_SUBTITLE_SX: SxProps<Theme> = { mb: 1 };

// ============================================================================
// CARD SLOTS (Compound Component Pattern)
// ============================================================================

type CardSlotProps = Readonly<{
  children: ReactNode;
  sx?: SxProps<Theme>;
}>;

// Header slot for custom card headers
function CardHeader({ children, sx }: CardSlotProps): JSX.Element {
  return <Box sx={sx}>{children}</Box>;
}

// Content slot for card body
function CardContent({ children, sx }: CardSlotProps): JSX.Element {
  return (
    <Box
      sx={[CARD_CONTENT_SX, ...(Array.isArray(sx) ? sx : [sx])]}
      data-card-content="true"
    >
      {children}
    </Box>
  );
}

// Footer slot for card actions
function CardFooter({ children, sx }: CardSlotProps): JSX.Element {
  return <Box sx={sx}>{children}</Box>;
}

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

function CardBase({
  title,
  subtitle,
  children,
  className = '',
  sx,
  noContentPadding = false,
  motionProps,
  animated = false,
  ref,
  ...rest
}: Readonly<CardComponentProps>): JSX.Element {
  const hoverMotion = useCardHover();
  const resolvedMotionProps: MotionProps = animated
    ? hoverMotion
    : (motionProps ?? {});
  const resolvedSx = normalizeSx(sx);
  const paperSx = (theme: Theme): SystemStyleObject<Theme> =>
    mergeSxEntries(theme, [
      cardBaseSx as SystemStyleObject<Theme>,
      theme.mixins.glass as SystemStyleObject<Theme>,
      ...resolvedSx,
    ]);

  return (
    <MotionPaper
      ref={ref}
      className={className}
      elevation={0}
      sx={paperSx}
      {...resolvedMotionProps}
      {...rest}
    >
      {noContentPadding ? (
        children
      ) : (
        <Box sx={CARD_CONTENT_SX} data-card-content="true">
          <Typography variant="h5" component="h3" gutterBottom>
            {typeof title === 'string' && title ? (
              <BlurText
                text={title}
                animateBy="words"
                direction="bottom"
                stepDuration={0.3}
              />
            ) : (
              title
            )}
          </Typography>
          {subtitle && (
            <Typography variant="body1" component="div" sx={CARD_SUBTITLE_SX}>
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>
      )}
    </MotionPaper>
  );
}

// ============================================================================
// COMPOUND COMPONENT EXPORTS
// ============================================================================

// Main Card with attached slot components
const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});

export { Card };
