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
import {
  timelineCardVariants,
  timelineDescriptionVariants,
} from '@/config/motion';
import type { ExperienceCardProps } from '@/config/types';
import {
  useAnimationSequence,
  useCombinedRefs,
  useInView,
  useMotionVariant,
  useSectionSequence,
} from '@/hooks';
import experiences from '@/lib/data/experiences';
import { listContainerSx, sectionSpacingSx } from '@/styles/shared';
import {
  buildItemKey,
  createDurationMeta,
  createWorkplaceMeta,
} from '@/utils/metadata';
import {
  getTimelineContentSx,
  getTimelineOppositeContentSx,
  isTimelineItemLeftAligned,
} from '@/utils/timeline';

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

  const itemMotion = useMotionVariant(timelineDescriptionVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

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
              {...itemMotion}
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cardMotion = useMotionVariant(timelineCardVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: { y: -5 },
  });

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
            const isLeftAligned = isTimelineItemLeftAligned(index, isMobile);
            return (
              <TimelineItem
                key={buildItemKey(experience.title, experience.duration)}
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
                    {experience.duration}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined">
                    <WorkOutlineTwoTone fontSize="small" />
                  </TimelineDot>
                  {!isLastItem && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={getTimelineContentSx(isLeftAligned)}>
                  <motion.div custom={index} {...cardMotion}>
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
