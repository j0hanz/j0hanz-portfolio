import React from 'react';

import { SchoolTwoTone, VerifiedTwoTone } from '@mui/icons-material';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import Button from '@/components/Button';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import { TimelineList } from '@/components/TimelineList';
import { buttonPopVariants, viewportPresets } from '@/config/motion';
import type { EducationCardProps } from '@/config/types';
import {
  useModal,
  useMotionVariant,
  useTimelineCardMotion,
  useTimelineSectionController,
} from '@/hooks';
import education from '@/lib/data/education';
import {
  credentialButtonSx,
  descriptionTextSx,
  timelineDescriptionWrapperSx,
} from '@/styles/shared';
import { createDurationMeta, createSchoolMeta } from '@/utils/metadata';

import Credential from './Credential';

// Constants moved to shared styles

function EducationCard({
  education,
  onShowModal,
  showDuration = true,
}: EducationCardProps & { showDuration?: boolean }): React.JSX.Element {
  const {
    cardRef,
    isInView,
    itemMotion: descriptionMotion,
  } = useTimelineCardMotion(viewportPresets.cardLarge);

  const metadata = [createSchoolMeta(education.school)];
  if (showDuration) {
    metadata.push(createDurationMeta(education.duration));
  }

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
          <Box sx={timelineDescriptionWrapperSx}>
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
        open={credentialModal.isOpen}
        onClose={credentialModal.close}
      />
    </SectionContainer>
  );
}

export default Education;
