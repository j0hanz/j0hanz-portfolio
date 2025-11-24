import React, { type RefObject, useRef } from 'react';

import { SchoolTwoTone, VerifiedTwoTone } from '@mui/icons-material';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {
  Box,
  type SxProps,
  type Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import Button from '@/components/Button';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import TimelineSection from '@/components/TimelineSection';
import { timelineCardVariants } from '@/config/motion';
import type { EducationCardProps } from '@/config/types';
import {
  useAnimationSequence,
  useCombinedRefs,
  useInView,
  useModal,
  useMotionVariant,
  useSectionSequence,
} from '@/hooks';
import education from '@/lib/data/education';
import { credentialButtonSx, descriptionTextSx } from '@/styles/shared';
import {
  buildItemKey,
  createDurationMeta,
  createSchoolMeta,
} from '@/utils/metadata';
import {
  getTimelineContentSx,
  getTimelineOppositeContentSx,
  isTimelineItemLeftAligned,
} from '@/utils/timeline';

import Credential from './Credential';

// Constants
const descriptionWrapperSx: SxProps<Theme> = {
  mb: 2,
};

// Button pop-in animation
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      type: 'spring' as const,
      stiffness: 320,
      damping: 18,
    },
  },
};

function EducationCard({
  education,
  onShowModal,
  showDuration = true,
}: EducationCardProps & { showDuration?: boolean }): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef as RefObject<Element>, {
    once: true,
    amount: 0.3,
  });

  const metadata = [createSchoolMeta(education.school)];
  if (showDuration) {
    metadata.push(createDurationMeta(education.duration));
  }

  const descriptionVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.06,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  const descriptionMotion = useMotionVariant(descriptionVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

  const buttonMotion = useMotionVariant(buttonVariants, {
    initial: 'hidden',
    animate: 'visible',
  });

  return (
    <Box ref={cardRef}>
      <TimelineCard
        title={education.title}
        metadata={metadata}
        dataAttributes={{ 'data-edu-card': 'true' }}
      >
        {education.description && (
          <Box sx={descriptionWrapperSx}>
            {education.description.map((desc, index) => (
              <Box
                component={motion.p}
                key={`${education.title}-${index}`}
                custom={index}
                {...descriptionMotion}
                data-edu-description
                sx={descriptionTextSx}
              >
                {desc}
              </Box>
            ))}
          </Box>
        )}
        <AnimatePresence mode="wait">
          {education.hasCredential && isInView && (
            <motion.div {...buttonMotion} exit="hidden">
              <Button
                onClick={onShowModal}
                variant="contained"
                startIcon={<VerifiedTwoTone />}
                data-edu-cta
                sx={credentialButtonSx}
              >
                Credential
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </TimelineCard>
    </Box>
  );
}

// Rendering education section
function Education(): React.JSX.Element {
  const credentialModal = useModal(false);
  const { scopeRef } = useAnimationSequence();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(sectionRef, scopeRef, containerRef);
  const isInView = useInView(containerRef as RefObject<Element>, {
    once: true,
    amount: 0.1,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cardMotion = useMotionVariant(timelineCardVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: { y: -5 },
  });

  useSectionSequence(sectionRef, {
    cards: '[data-edu-card]',
    description: '[data-edu-description]',
    cta: '[data-edu-cta]',
  });

  return (
    <SectionContainer
      id="education"
      title={<TextReveal text="Education" as="span" />}
      icon={SchoolTwoTone}
    >
      <Box ref={combinedRef}>
        <TimelineSection position={isMobile ? 'right' : 'alternate'}>
          {education.map((edu, index) => {
            const isLastItem = index === education.length - 1;
            const isLeftAligned = isTimelineItemLeftAligned(index, isMobile);
            return (
              <TimelineItem
                key={buildItemKey(edu.title, edu.duration)}
                sx={{ minHeight: 'auto' }}
              >
                <TimelineOppositeContent
                  sx={getTimelineOppositeContentSx(isLeftAligned)}
                  color="text.secondary"
                >
                  <Typography
                    variant="subtitle2"
                    component="span"
                    color="primary.contrastText"
                  >
                    {edu.duration}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined">
                    <SchoolTwoTone fontSize="small" />
                  </TimelineDot>
                  {!isLastItem && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={getTimelineContentSx(isLeftAligned)}>
                  <motion.div
                    custom={index}
                    {...cardMotion}
                    style={{ width: '100%' }}
                  >
                    <EducationCard
                      education={edu}
                      onShowModal={credentialModal.open}
                      showDuration={isMobile}
                    />
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </TimelineSection>
      </Box>

      <Credential
        show={credentialModal.isOpen}
        handleClose={credentialModal.close}
      />
    </SectionContainer>
  );
}

export default Education;
