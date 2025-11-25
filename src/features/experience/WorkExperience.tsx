import React from 'react';

import { WorkOutlineTwoTone } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';

import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import { TimelineList } from '@/components/TimelineList';
import { timelineDescriptionVariants, viewportPresets } from '@/config/motion';
import type { ExperienceCardProps } from '@/config/types';
import {
  useCardInView,
  useMotionVariant,
  useTimelineSectionController,
} from '@/hooks';
import experiences from '@/lib/data/experiences';
import { listContainerSx, sectionSpacingSx } from '@/styles/shared';
import { createDurationMeta, createWorkplaceMeta } from '@/utils/metadata';

function ExperienceCard({
  experience,
  showDuration = true,
}: Omit<ExperienceCardProps, 'align'> & {
  showDuration?: boolean;
}): React.JSX.Element {
  const { cardRef, isInView } = useCardInView(viewportPresets.card);

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
  const { combinedRef, cardMotion } = useTimelineSectionController({
    viewportPreset: viewportPresets.section,
    selectors: {
      cards: '[data-exp-card]',
      description: '[data-exp-description]',
    },
    sequenceOptions: {
      offset: ['start 0.9', 'end 0.25'],
      threshold: 0.15,
    },
  });

  return (
    <SectionContainer
      id="workExperience"
      title={<TextReveal text="Experience" as="span" />}
      icon={WorkOutlineTwoTone}
      sx={sectionSpacingSx}
    >
      <Box ref={combinedRef}>
        <TimelineList
          items={experiences}
          Icon={WorkOutlineTwoTone}
          cardMotion={cardMotion}
          renderItem={(experience, _index, isMobile) => (
            <ExperienceCard experience={experience} showDuration={isMobile} />
          )}
        />
      </Box>
    </SectionContainer>
  );
}

export default WorkExperience;
