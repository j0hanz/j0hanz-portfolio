import { type JSX, type ReactNode, useId } from 'react';

import { Box, type SxProps, type Theme } from '@mui/material';

import { useReducedMotion } from '@/hooks';

interface GradientTextProps {
  /** Content to apply gradient to */
  children: ReactNode;
  /** Gradient colors array */
  colors?: readonly string[] | string[];
  /** Animation speed in seconds */
  animationSpeed?: number;
  /** Show animated border */
  showBorder?: boolean;
  /** MUI sx prop */
  sx?: SxProps<Theme>;
  /** Additional className */
  className?: string;
}

/**
 * GradientText - Animated gradient text effect
 *
 * Ported from ReactBits GradientText component.
 * CSS-based animated gradient with MUI integration.
 *
 * @example
 * <GradientText>Hello World</GradientText>
 * <GradientText colors={['#ff0000', '#00ff00', '#0000ff']}>Custom</GradientText>
 */
export function GradientText({
  children,
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 8,
  showBorder = false,
  sx,
  className,
}: GradientTextProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const uniqueId = useId();
  const keyframeName = `gradient-flow-${uniqueId.replace(/:/g, '')}`;

  // Build keyframes dynamically
  const keyframesCss = `
    @keyframes ${keyframeName} {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: prefersReducedMotion ? '0s' : `${animationSpeed}s`,
    animationName: keyframeName,
  };

  const containerSx: SxProps<Theme> = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...sx,
  };

  const textContentSx: SxProps<Theme> = {
    display: 'inline-block',
    position: 'relative',
    zIndex: 2,
    backgroundSize: '300% 100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  };

  const borderOverlaySx: SxProps<Theme> = {
    position: 'absolute',
    inset: 0,
    backgroundSize: '300% 100%',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    borderRadius: 'inherit',
    zIndex: 0,
    pointerEvents: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '1px',
      borderRadius: 'inherit',
      bgcolor: 'background.paper',
      zIndex: -1,
    },
  };

  return (
    <>
      {/* Inject keyframes with unique ID */}
      <style>{keyframesCss}</style>

      <Box className={className} sx={containerSx}>
        {showBorder && <Box sx={borderOverlaySx} style={gradientStyle} />}
        <Box sx={textContentSx} style={gradientStyle}>
          {children}
        </Box>
      </Box>
    </>
  );
}
