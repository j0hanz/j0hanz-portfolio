import React from 'react';

import { Box, Paper as MuiPaper, Typography } from '@mui/material';
import { motion } from 'motion/react';
import type { MotionProps } from 'motion/react';

import { CardProps } from '@/config/types';
import { useCardHover } from '@/hooks/useMotions';

const MotionPaper = motion.create(MuiPaper);

interface InternalCardProps extends CardProps {
  motionProps?: MotionProps;
}

const BaseCard = React.forwardRef<HTMLDivElement, InternalCardProps>(
  function Card(
    {
      title,
      subtitle,
      children,
      className = '',
      sx,
      noContentPadding = false,
      motionProps,
    },
    ref
  ): React.ReactElement {
    return (
      <MotionPaper
        ref={ref}
        className={className}
        elevation={0}
        sx={{
          height: 1,
          borderRadius: 2,
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          ...sx,
        }}
        {...(motionProps ?? {})}
      >
        {noContentPadding ? (
          children
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" component="div" gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" component="div" sx={{ mb: 1.5 }}>
                {subtitle}
              </Typography>
            )}
            {children}
          </Box>
        )}
      </MotionPaper>
    );
  }
);

BaseCard.displayName = 'Card';

function AnimatedCard(
  props: CardProps,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement {
  const hoverMotion = useCardHover();
  return <BaseCard ref={ref} motionProps={hoverMotion} {...props} />;
}

const ForwardAnimatedCard = React.forwardRef<HTMLDivElement, CardProps>(
  AnimatedCard
);

ForwardAnimatedCard.displayName = 'AnimatedCard';

export { ForwardAnimatedCard as AnimatedCard };
export default BaseCard;
