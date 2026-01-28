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
import type { CardComponentProps } from '@/config/types';
import { useCardHover } from '@/hooks';

// ============================================================================
// CONSTANTS
// ============================================================================

const MotionPaper = m.create(MuiPaper);

// Responsive card content padding
const CARD_CONTENT_SX: SxProps<Theme> = {
  p: (theme) => theme.custom.spacing.card,
};
const CARD_SUBTITLE_SX: SxProps<Theme> = { mb: 1 };
const CARD_BASE_SX: SxProps<Theme> = {
  height: 1,
  display: 'flex',
  flexFlow: 'column nowrap',
  borderRadius: 2,
  bgcolor: 'backdrop.glass',
};

const resolveSx = (
  theme: Theme,
  sxProp?: SxProps<Theme>
): SystemStyleObject<Theme> => {
  if (!sxProp) return {};
  const entries = (Array.isArray(sxProp) ? sxProp : [sxProp]) as Array<
    | SystemStyleObject<Theme>
    | ((theme: Theme) => SystemStyleObject<Theme>)
    | boolean
    | null
    | undefined
  >;

  return entries.reduce<SystemStyleObject<Theme>>((acc, entry) => {
    if (!entry || entry === true) return acc;
    const next = typeof entry === 'function' ? entry(theme) : entry;
    return { ...acc, ...next };
  }, {});
};

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
  const paperSx = (theme: Theme): SystemStyleObject<Theme> => ({
    ...(CARD_BASE_SX as SystemStyleObject<Theme>),
    ...(theme.mixins.glass as SystemStyleObject<Theme>),
    ...resolveSx(theme, sx),
  });

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
