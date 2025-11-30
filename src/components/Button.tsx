import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'motion/react';

import { CustomButtonProps } from '@/config/types';
import { useButtonGesture } from '@/hooks';
import { filterMotionConflicts } from '@/utils/motionProps';

const StyledButton = styled(MuiButton)({
  textTransform: 'uppercase',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    lineHeight: 0,
    display: 'flex',
    alignItems: 'center',
  },
});

const MotionButton = motion.create(StyledButton);

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

  return (
    <MotionButton
      ref={ref}
      {...safeProps}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      sx={sx}
      {...finalMotionProps}
    >
      {text || children}
    </MotionButton>
  );
};

Button.displayName = 'Button';

export default Button;
