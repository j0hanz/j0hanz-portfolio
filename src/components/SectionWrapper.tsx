import { FC, ReactNode } from 'react';
import { MotionWrapper, motionVariants } from '@/components/Motions';

interface SectionWrapperProps {
  sectionId: keyof typeof motionVariants;
  children: ReactNode;
}

// Wrapper component for applying motion animations to sections
const SectionWrapper: FC<SectionWrapperProps> = ({ sectionId, children }) => (
  <MotionWrapper sectionId={sectionId}>{children}</MotionWrapper>
);

export default SectionWrapper;
