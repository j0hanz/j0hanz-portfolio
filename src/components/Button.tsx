import React from 'react';

import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'motion/react';

import { CustomButtonProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks/useMotions';
import { motionVariants } from '@/utils/motionVariants';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'uppercase',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    lineHeight: 0,
    display: 'flex',
    alignItems: 'center',
  },
}));

const MotionButton = motion.create(StyledButton);

// Button component with optional icon and text, supports MUI v7 best practices
const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  function Button(
    {
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
      ...props
    },
    ref
  ): React.ReactElement {
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
    const { prefersReducedMotion, getTransition } = useAnimationConfig();
    const gesture = motionVariants.gesture.buttonTap;
    const restState = 'rest';
    const hoverState =
      motionWhileHover ?? (prefersReducedMotion ? restState : 'hover');
    const tapState =
      motionWhileTap ?? (prefersReducedMotion ? restState : 'tap');
    const focusState =
      motionWhileFocus ?? (prefersReducedMotion ? restState : 'focus');

    return (
      <MotionButton
        ref={ref}
        {...(restProps as Record<string, unknown>)}
        variant={variant}
        startIcon={startIcon}
        endIcon={endIcon}
        className={className}
        sx={sx}
        variants={gesture}
        initial={restState}
        animate={restState}
        whileHover={hoverState}
        whileTap={tapState}
        whileFocus={focusState}
        transition={getTransition('snappy')}
      >
        {text || children}
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
