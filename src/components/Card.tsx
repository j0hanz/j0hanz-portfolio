import {
  Box,
  Paper as MuiPaper,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';

import { CardProps, InternalCardProps } from '@/config/types';
import { useCardHover } from '@/hooks';
import { cardBaseSx } from '@/styles/shared';

const MotionPaper = motion.create(MuiPaper);

const contentSx: SxProps<Theme> = {
  p: 2.5,
};

const subtitleSx: SxProps<Theme> = {
  mb: 1.5,
};

const BaseCard = function Card({
  title,
  subtitle,
  children,
  className = '',
  sx,
  noContentPadding = false,
  motionProps,
  ref,
  ...rest
}: InternalCardProps & {
  ref?: React.Ref<HTMLDivElement>;
}): React.ReactElement {
  return (
    <MotionPaper
      ref={ref}
      className={className}
      elevation={0}
      sx={[
        cardBaseSx,
        (theme) => theme.mixins.glass,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...(motionProps ?? {})}
      {...rest}
    >
      {noContentPadding ? (
        children
      ) : (
        <Box sx={contentSx}>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" component="div" sx={subtitleSx}>
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>
      )}
    </MotionPaper>
  );
};

BaseCard.displayName = 'Card';

function AnimatedCard({
  ref,
  ...props
}: CardProps & { ref?: React.Ref<HTMLDivElement> }): React.ReactElement {
  const hoverMotion = useCardHover();
  return <BaseCard ref={ref} motionProps={hoverMotion} {...props} />;
}

export { AnimatedCard };
export default BaseCard;
