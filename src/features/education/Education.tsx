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
import type { EducationCardProps } from '@/config/types';
import {
  useAnimationConfig,
  useAnimationSequence,
  useCombinedRefs,
  useInView,
  useModal,
  useSectionSequence,
} from '@/hooks';
import education from '@/lib/data/education';
import { credentialButtonSx, descriptionTextSx } from '@/styles/shared';
import {
  buildItemKey,
  createDurationMeta,
  createSchoolMeta,
} from '@/utils/metadata';

import Credential from './Credential';

// Constants
const descriptionWrapperSx: SxProps<Theme> = {
  mb: 2,
};

// Card entrance with scale and fade
const educationCardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
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
  const { prefersReducedMotion } = useAnimationConfig();

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
                initial={prefersReducedMotion ? false : 'hidden'}
                animate={isInView ? 'visible' : 'hidden'}
                variants={descriptionVariants}
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
            <motion.div
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              exit="hidden"
              variants={buttonVariants}
            >
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
  const { prefersReducedMotion } = useAnimationConfig();
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
            const isLeftAligned = !isMobile && index % 2 === 1;
            return (
              <TimelineItem
                key={buildItemKey(edu.title, edu.duration)}
                sx={{ minHeight: 'auto' }}
              >
                <TimelineOppositeContent
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    py: 0,
                    px: 2,
                    textAlign: isLeftAligned ? 'left' : 'right',
                    justifyContent: isLeftAligned ? 'flex-start' : 'flex-end',
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  <Typography
                    variant="subtitle2"
                    component="span"
                    color="primary"
                  >
                    {edu.duration}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined">
                    <SchoolTwoTone fontSize="small" />
                  </TimelineDot>
                  {!isLastItem && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent
                  sx={{
                    py: 0,
                    pb: 4,
                    px: { xs: 0, md: 3 },
                    display: 'flex',
                    justifyContent: isLeftAligned ? 'flex-end' : 'flex-start',
                  }}
                >
                  <motion.div
                    custom={index}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                    variants={educationCardVariants}
                    style={{ width: '100%', maxWidth: 520 }}
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
