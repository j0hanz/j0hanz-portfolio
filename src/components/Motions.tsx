import { FC, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { transition, motionVariants } from '@/utils/motionVariants';

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  sectionId: keyof typeof motionVariants;
}

// Wrapper component for applying motion animations to sections
const MotionWrapper: FC<MotionWrapperProps> = ({
  children,
  sectionId,
  ...props
}) => (
  <motion.div
    initial={motionVariants[sectionId].initial}
    whileInView={motionVariants[sectionId].whileInView}
    transition={transition}
    {...props}
  >
    {children}
  </motion.div>
);

interface SlideFromSideProps extends MotionProps {
  children: ReactNode;
  from: 'left' | 'right';
}

// Component for sliding animations from left or right
const SlideFromSide: FC<SlideFromSideProps> = ({
  children,
  from,
  ...props
}) => {
  const initialX = from === 'left' ? -100 : 100;
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { MotionWrapper, SlideFromSide };
