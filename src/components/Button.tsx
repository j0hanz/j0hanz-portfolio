import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'motion/react';

import { CustomButtonProps } from '@/config/types';
import { useButtonGesture } from '@/hooks';

const StyledButton = styled(MuiButton)(({ theme: _theme }) => ({
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
}));

const MotionButton = motion(StyledButton);

// Button component with optional icon and text, supports MUI v7 best practices
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
}: CustomButtonProps & {
  ref?: React.Ref<HTMLButtonElement>;
}): React.ReactElement {
  const {
    onDrag: _deprecatedDrag,
    onDragStart: _deprecatedDragStart,
    onDragEnd: _deprecatedDragEnd,
    onDragOver: _deprecatedDragOver,
    onDragEnter: _deprecatedDragEnter,
    onDragLeave: _deprecatedDragLeave,
    onDrop: _deprecatedDrop,
    onAnimationStart: _deprecatedAnimationStart,
    onAnimationEnd: _deprecatedAnimationEnd,
    onAnimationIteration: _deprecatedAnimationIteration,
    ...restProps
  } = props;

  const gestureMotion = useButtonGesture();

  // Allow custom overrides if provided
  const finalMotionProps = {
    ...gestureMotion,
    ...(motionWhileTap && { whileTap: motionWhileTap }),
    ...(motionWhileHover && { whileHover: motionWhileHover }),
    ...(motionWhileFocus && { whileFocus: motionWhileFocus }),
  };

  return (
    <MotionButton
      ref={ref}
      {...(restProps as Record<string, unknown>)}
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
