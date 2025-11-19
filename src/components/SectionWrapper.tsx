import React from 'react';

import { MotionWrapper } from '@/components/Motions';
import { SectionWrapperProps } from '@/config/types';

// Wrapper component for applying motion animations to sections
function SectionWrapper({
  sectionId,
  children,
}: SectionWrapperProps): React.JSX.Element {
  return <MotionWrapper sectionId={sectionId}>{children}</MotionWrapper>;
}

export default SectionWrapper;
