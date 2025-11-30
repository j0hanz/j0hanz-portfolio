import React from 'react';

import {
  SchoolTwoTone,
  VerifiedTwoTone,
  WorkOutlineTwoTone,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import Button from '@/components/Button';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import { TimelineList } from '@/components/TimelineList';
import { buttonPopVariants, viewportPresets } from '@/config/motion';
import type {
  Experience,
  ExperienceCardProps,
  IconBadgeMetaItem,
} from '@/config/types';
import {
  useModal,
  useMotionVariant,
  useTimelineCardMotion,
  useTimelineSectionController,
} from '@/hooks';
import experiences from '@/lib/data/experiences';
import {
  credentialButtonSx,
  descriptionTextSx,
  listContainerSx,
  sectionSpacingSx,
  timelineCardWrapperSx,
  timelineDescriptionWrapperSx,
} from '@/styles/shared';
import {
  buildItemKey,
  compactMetadata,
  createDurationMeta,
  createSchoolMeta,
  createWorkplaceMeta,
} from '@/utils/metadata';

import Credential from './Credential';

const EXPERIENCE_CARD_ATTRIBUTES = { 'data-exp-card': 'true' } as const;
const DESCRIPTION_DATA_ATTRIBUTE = { 'data-exp-description': 'true' } as const;
const CTA_DATA_ATTRIBUTE = { 'data-exp-cta': 'true' } as const;

const buildExperienceMetadata = (
  experience: Experience,
  includeDuration: boolean
): IconBadgeMetaItem[] => {
  const baseMeta =
    experience.type === 'education'
      ? createSchoolMeta(experience.school)
      : createWorkplaceMeta(experience.workplace);

  const durationMeta = includeDuration
    ? createDurationMeta(experience.duration)
    : null;

  return compactMetadata([baseMeta, durationMeta]);
};

function WorkCard({
  experience,
  showDuration = true,
}: {
  experience: Experience;
  showDuration?: boolean;
}) {
  // Use fullPageCard preset for full-page scroll sections to replay animations on remount
  const { cardRef, itemMotion } = useTimelineCardMotion(
    viewportPresets.fullPageCard
  );

  const metadata = buildExperienceMetadata(experience, showDuration);

  return (
    <Box ref={cardRef} sx={timelineCardWrapperSx}>
      <TimelineCard
        title={experience.title}
        metadata={metadata}
        dataAttributes={EXPERIENCE_CARD_ATTRIBUTES}
        metaDataAttribute="data-exp-meta"
      >
        <Box
          component="ul"
          {...DESCRIPTION_DATA_ATTRIBUTE}
          sx={listContainerSx}
        >
          {experience.description.map((item, index) => (
            <motion.li
              key={buildItemKey(experience.title, item, index)}
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

function EducationCard({
  experience,
  onShowModal,
  showDuration = true,
}: {
  experience: Experience;
  onShowModal: () => void;
  showDuration?: boolean;
}) {
  // Use fullPageCard preset for full-page scroll sections to replay animations on remount
  const {
    cardRef,
    isInView,
    itemMotion: descriptionMotion,
  } = useTimelineCardMotion(viewportPresets.fullPageCard);

  const metadata = buildExperienceMetadata(experience, showDuration);

  const buttonMotion = useMotionVariant(buttonPopVariants, {
    initial: 'hidden',
    animate: 'visible',
  });

  return (
    <Box ref={cardRef} sx={timelineCardWrapperSx}>
      <TimelineCard
        title={experience.title}
        metadata={metadata}
        dataAttributes={EXPERIENCE_CARD_ATTRIBUTES}
        metaDataAttribute="data-exp-meta"
      >
        {experience.description.length > 0 && (
          <Box sx={timelineDescriptionWrapperSx}>
            {experience.description.map((desc, index) => (
              <Box
                component={motion.p}
                key={buildItemKey(experience.title, desc, index)}
                custom={index}
                {...descriptionMotion}
                {...DESCRIPTION_DATA_ATTRIBUTE}
                sx={descriptionTextSx}
              >
                {desc}
              </Box>
            ))}
          </Box>
        )}
        <AnimatePresence mode="wait">
          {experience.hasCredential && isInView && (
            <motion.div {...buttonMotion} exit="hidden">
              <Button
                onClick={onShowModal}
                variant="text"
                color="inherit"
                startIcon={<VerifiedTwoTone />}
                {...CTA_DATA_ATTRIBUTE}
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

function ExperienceCard({
  experience,
  onShowModal,
  showDuration = true,
}: Omit<ExperienceCardProps, 'align'> & {
  onShowModal: () => void;
  showDuration?: boolean;
}) {
  if (experience.type === 'education') {
    return (
      <EducationCard
        experience={experience}
        onShowModal={onShowModal}
        showDuration={showDuration}
      />
    );
  }

  return <WorkCard experience={experience} showDuration={showDuration} />;
}

// Rendering unified experience section (work + education timeline)
function WorkExperience(): React.JSX.Element {
  const credentialModal = useModal(false);
  // Use fullPageSection preset for full-page scroll sections to replay animations on remount
  const { combinedRef, cardMotion } = useTimelineSectionController({
    viewportPreset: viewportPresets.fullPageSection,
    selectors: {
      cards: '[data-exp-card]',
      description: '[data-exp-description]',
      cta: '[data-exp-cta]',
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
          getItemIcon={(item) =>
            item.type === 'education' ? SchoolTwoTone : WorkOutlineTwoTone
          }
          cardMotion={cardMotion}
          renderItem={(experience, _index, isMobile) => (
            <ExperienceCard
              experience={experience}
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

export default WorkExperience;
