import React, { type RefObject, useRef } from 'react';

import { WorkOutlineTwoTone } from '@mui/icons-material';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import TimelineSection from '@/components/TimelineSection';
import type { ExperienceCardProps } from '@/config/types';
import {
  useAnimationConfig,
  useAnimationSequence,
  useCombinedRefs,
  useInView,
  useSectionSequence,
} from '@/hooks';
import experiences from '@/lib/data/experiences';
import { listContainerSx, sectionSpacingSx } from '@/styles/shared';
import {
  buildItemKey,
  createDurationMeta,
  createWorkplaceMeta,
} from '@/utils/metadata';

// Progressive reveal animation for cards
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// Description list items stagger
const descriptionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

function ExperienceCard({
  experience,
  showDuration = true,
}: Omit<ExperienceCardProps, 'align'> & {
  showDuration?: boolean;
}): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef as RefObject<Element>, {
    once: true,
    amount: 0.25,
  });
  const { prefersReducedMotion } = useAnimationConfig();

  const metadata = [createWorkplaceMeta(experience.workplace)];
  if (showDuration) {
    metadata.push(createDurationMeta(experience.duration));
  }

  return (
    <Box ref={cardRef} sx={{ position: 'relative', zIndex: 1 }}>
      <TimelineCard
        title={experience.title}
        metadata={metadata}
        dataAttributes={{ 'data-exp-card': 'true' }}
        metaDataAttribute="data-exp-meta"
      >
        <Box component="ul" data-exp-description sx={listContainerSx}>
          {experience.description.map((item, index) => (
            <motion.li
              key={`${experience.title}-${index}`}
              custom={index}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate={isInView ? 'visible' : 'hidden'}
              variants={descriptionVariants}
            >
              <Typography variant="body2" component="small">
                {item}
              </Typography>
            </motion.li>
          ))}
        </Box>
      </TimelineCard>
    </Box>
  );
}

// Rendering work experience section
function WorkExperience(): React.JSX.Element {
  const { scopeRef } = useAnimationSequence();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(sectionRef, scopeRef, containerRef);
  const isInView = useInView(containerRef as RefObject<Element>, {
    once: true,
    amount: 0.1,
  });
  const { prefersReducedMotion } = useAnimationConfig();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useSectionSequence(
    sectionRef,
    {
      cards: '[data-exp-card]',
      description: '[data-exp-description]',
    },
    {
      offset: ['start 0.9', 'end 0.25'],
      threshold: 0.15,
    }
  );

  return (
    <SectionContainer
      id="workExperience"
      title={<TextReveal text="Experience" as="span" />}
      icon={WorkOutlineTwoTone}
      sx={sectionSpacingSx}
    >
      <Box ref={combinedRef}>
        <TimelineSection position={isMobile ? 'right' : 'alternate'}>
          {experiences.map((experience, index) => {
            const isLastItem = index === experiences.length - 1;
            const isLeftAligned = !isMobile && index % 2 === 1;
            return (
              <TimelineItem
                key={buildItemKey(experience.title, experience.duration)}
                sx={{ minHeight: 'auto' }}
              >
                <TimelineOppositeContent
                  sx={{
                    justifyContent: isLeftAligned ? 'flex-start' : 'flex-end',
                  }}
                  color="text.secondary"
                >
                  <Typography
                    variant="subtitle2"
                    component="span"
                    color="primary.contrastText"
                  >
                    {experience.duration}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined">
                    <WorkOutlineTwoTone fontSize="small" />
                  </TimelineDot>
                  {!isLastItem && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent
                  sx={{
                    display: 'flex',
                    justifyContent: isLeftAligned ? 'flex-end' : 'flex-start',
                  }}
                >
                  <motion.div
                    custom={index}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                    variants={cardVariants}
                    style={{ width: '100%' }}
                  >
                    <ExperienceCard
                      experience={experience}
                      showDuration={isMobile}
                    />
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </TimelineSection>
      </Box>
    </SectionContainer>
  );
}

export default WorkExperience;
