import React from 'react';

import { CardContent, Card as MuiCard, Typography } from '@mui/material';
import { motion } from 'motion/react';
import type { MotionProps } from 'motion/react';

import { CardProps } from '@/config/types';
import { useCardHover } from '@/hooks/useMotions';

const MotionCard = motion.create(MuiCard);

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
      <MotionCard
        ref={ref}
        className={className}
        sx={{
          height: 1,
          boxShadow: 3,
          ...sx,
        }}
        {...(motionProps ?? {})}
      >
        {noContentPadding ? (
          children
        ) : (
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h5" component="div" gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body1"
                component="div"
                sx={{ mb: 1.5 }}
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
            {children}
          </CardContent>
        )}
      </MotionCard>
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
