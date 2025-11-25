import React from 'react';

import { SchoolTwoTone, VerifiedTwoTone } from '@mui/icons-material';
import { Box, type SxProps, type Theme } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import Button from '@/components/Button';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import { TimelineList } from '@/components/TimelineList';
import {
  buttonPopVariants,
  timelineDescriptionVariants,
  viewportPresets,
} from '@/config/motion';
import type { EducationCardProps } from '@/config/types';
import {
  useCardInView,
  useModal,
  useMotionVariant,
  useTimelineSectionController,
} from '@/hooks';
import education from '@/lib/data/education';
import { credentialButtonSx, descriptionTextSx } from '@/styles/shared';
import { createDurationMeta, createSchoolMeta } from '@/utils/metadata';

import Credential from './Credential';

// Constants
const descriptionWrapperSx: SxProps<Theme> = {
  mb: 2,
};

function EducationCard({
  education,
  onShowModal,
  showDuration = true,
}: EducationCardProps & { showDuration?: boolean }): React.JSX.Element {
  const { cardRef, isInView } = useCardInView(viewportPresets.cardLarge);

  const metadata = [createSchoolMeta(education.school)];
  if (showDuration) {
    metadata.push(createDurationMeta(education.duration));
  }

  const descriptionMotion = useMotionVariant(timelineDescriptionVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
  });

  const buttonMotion = useMotionVariant(buttonPopVariants, {
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
  const { combinedRef, cardMotion } = useTimelineSectionController({
    viewportPreset: viewportPresets.section,
    selectors: {
      cards: '[data-edu-card]',
      description: '[data-edu-description]',
      cta: '[data-edu-cta]',
    },
  });

  return (
    <SectionContainer
      id="education"
      title={<TextReveal text="Education" as="span" />}
      icon={SchoolTwoTone}
    >
      <Box ref={combinedRef}>
        <TimelineList
          items={education}
          Icon={SchoolTwoTone}
          cardMotion={cardMotion}
          renderItem={(edu, _index, isMobile) => (
            <EducationCard
              education={edu}
              onShowModal={credentialModal.open}
              showDuration={isMobile}
            />
          )}
        />
      </Box>

      <Credential
        show={credentialModal.isOpen}
        handleClose={credentialModal.close}
      />
    </SectionContainer>
  );
}

export default Education;
