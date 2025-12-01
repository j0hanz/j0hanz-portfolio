import type { JSX, ReactNode, Ref } from 'react';

import {
  Box,
  Paper as MuiPaper,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { motion, type MotionProps } from 'motion/react';

import type { CardProps, InternalCardProps } from '@/config/types';
import { useCardHover } from '@/hooks';
import { cardBaseSx } from '@/styles/shared';

// ============================================================================
// CONSTANTS
// ============================================================================

const MotionPaper = motion.create(MuiPaper);

const CARD_CONTENT_SX: SxProps<Theme> = { p: 2 };
const CARD_SUBTITLE_SX: SxProps<Theme> = { mb: 1 };

// ============================================================================
// CARD SLOTS (Compound Component Pattern)
// ============================================================================

// Header slot for custom card headers
function CardHeader({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return <Box sx={sx}>{children}</Box>;
}

// Content slot for card body
function CardContent({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element {
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
function CardFooter({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return <Box sx={sx}>{children}</Box>;
}

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

interface CardComponentProps extends InternalCardProps {
  ref?: Ref<HTMLDivElement>;
  animated?: boolean;
}

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
}: CardComponentProps): JSX.Element {
  const hoverMotion = useCardHover();
  const resolvedMotionProps: MotionProps = animated
    ? hoverMotion
    : (motionProps ?? {});

  return (
    <MotionPaper
      ref={ref}
      className={className}
      elevation={0}
      sx={[
        cardBaseSx,
        (theme) => theme.mixins.glass,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...resolvedMotionProps}
      {...rest}
    >
      {noContentPadding ? (
        children
      ) : (
        <Box sx={CARD_CONTENT_SX} data-card-content="true">
          <Typography variant="h5" component="h3" gutterBottom>
            {title}
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

// Convenience export for animated variant (uses animated prop internally)
function AnimatedCard({
  ref,
  ...props
}: CardProps & { ref?: Ref<HTMLDivElement> }): JSX.Element {
  return <Card ref={ref} animated {...props} />;
}

AnimatedCard.displayName = 'AnimatedCard';

export { AnimatedCard };
export default Card;
