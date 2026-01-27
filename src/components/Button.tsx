import { Button as MuiButton, type SxProps, type Theme } from '@mui/material';
import { motion } from 'motion/react';

import type { CustomButtonProps } from '@/config/types';
import { useButtonGesture } from '@/hooks';
import { filterMotionConflicts } from '@/utils/motionProps';

const baseButtonSx: SxProps<Theme> = {
  textTransform: 'uppercase',
  maxWidth: 1,
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    lineHeight: 0,
    display: 'flex',
    alignItems: 'center',
  },
};

const MotionButton = motion.create(MuiButton);

// Button component with optional icon and text, supports MUI v7 best practices
// React 19: ref is a native prop, no need for forwardRef
const Button = function Button({
  text = '',
  className = '',
  children,
  sx,
  variant = 'contained',
  startIcon,
  endIcon,
  motionWhileTap,
  motionWhileHover,
  motionWhileFocus,
  ref,
  ...props
}: CustomButtonProps): React.ReactElement {
  const gestureMotion = useButtonGesture();

  // Allow custom overrides if provided
  const finalMotionProps = {
    ...gestureMotion,
    ...(motionWhileTap && { whileTap: motionWhileTap }),
    ...(motionWhileHover && { whileHover: motionWhileHover }),
    ...(motionWhileFocus && { whileFocus: motionWhileFocus }),
  };

  // Filter out HTML drag/animation events that conflict with Motion's system
  const safeProps = filterMotionConflicts(props);

  // Merge base styles with custom sx prop
  const mergedSx = [baseButtonSx, ...(Array.isArray(sx) ? sx : [sx])];

  return (
    <MotionButton
      ref={ref}
      {...safeProps}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      sx={mergedSx}
      {...finalMotionProps}
    >
      {text || children}
    </MotionButton>
  );
};

Button.displayName = 'Button';

export { Button };
