import type { JSX } from 'react';

import {
  SchoolTwoTone,
  VerifiedTwoTone,
  WorkOutlineTwoTone,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import { SplitText } from '@/components/animations';
import { Button } from '@/components/Button';
import { SectionContainer } from '@/components/SectionContainer';
import { TimelineCard } from '@/components/TimelineCard';
import { TimelineList } from '@/components/TimelineList';
import { buttonPopVariants, viewportPresets } from '@/config/motion';
import type {
  BaseCardProps,
  EducationCardProps,
  Experience,
  IconBadgeMetaItem,
  TimelineCardWrapperProps,
  WorkExperienceCardProps,
} from '@/config/types';
import {
  useModal,
  useMotionVariant,
  useTimelineCardMotion,
  useTimelineSectionController,
} from '@/hooks';
import { experiences } from '@/lib/data/experiences';
import {
  credentialButtonSx,
  descriptionTextSx,
  listContainerSx,
  timelineCardWrapperSx,
  timelineDescriptionWrapperSx,
} from '@/styles/shared';
import { buildItemKey, compactMetadata, createMeta } from '@/utils/metadata';

import { Credential } from './Credential';

// ============================================================================
// CONSTANTS
// ============================================================================

const DATA_ATTRIBUTES = {
  card: { 'data-exp-card': 'true' },
  description: { 'data-exp-description': 'true' },
  cta: { 'data-exp-cta': 'true' },
} as const;

const TIMELINE_SELECTORS = {
  cards: '[data-exp-card]',
  description: '[data-exp-description]',
  cta: '[data-exp-cta]',
} as const;

const SEQUENCE_OPTIONS: {
  offset: ['start 0.9', 'end 0.25'];
  threshold: number;
} = {
  offset: ['start 0.9', 'end 0.25'],
  threshold: 0.15,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const buildExperienceMetadata = (
  experience: Experience,
  includeDuration: boolean
): IconBadgeMetaItem[] => {
  const baseMeta =
    experience.type === 'education'
      ? createMeta('school', experience.school)
      : createMeta('workplace', experience.workplace);

  const durationMeta = includeDuration
    ? createMeta('duration', experience.duration)
    : null;

  return compactMetadata([baseMeta, durationMeta]);
};

const getExperienceIcon = (item: Experience) =>
  item.type === 'education' ? SchoolTwoTone : WorkOutlineTwoTone;

// ============================================================================
// SHARED CARD WRAPPER
// DRY pattern for timeline card structure
// ============================================================================

function TimelineCardWrapper({
  experience,
  showDuration,
  children,
  cardRef,
}: TimelineCardWrapperProps): JSX.Element {
  const metadata = buildExperienceMetadata(experience, showDuration);

  return (
    <Box ref={cardRef} sx={timelineCardWrapperSx}>
      <TimelineCard
        title={experience.title}
        metadata={metadata}
        dataAttributes={DATA_ATTRIBUTES.card}
        metaDataAttribute="data-exp-meta"
      >
        {children}
      </TimelineCard>
    </Box>
  );
}

// ============================================================================
// CARD VARIANTS
// ============================================================================

function WorkCard({
  experience,
  showDuration = true,
}: BaseCardProps): JSX.Element {
  const { cardRef, itemMotion } = useTimelineCardMotion(
    viewportPresets.cardReplay
  );

  return (
    <TimelineCardWrapper
      experience={experience}
      showDuration={showDuration}
      cardRef={cardRef}
    >
      <Box component="ul" {...DATA_ATTRIBUTES.description} sx={listContainerSx}>
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
    </TimelineCardWrapper>
  );
}

function EducationCard({
  experience,
  onShowModal,
  showDuration = true,
}: EducationCardProps): JSX.Element {
  const {
    cardRef,
    isInView,
    itemMotion: descriptionMotion,
  } = useTimelineCardMotion(viewportPresets.cardReplay);

  const buttonMotion = useMotionVariant(buttonPopVariants, {
    initial: 'hidden',
    animate: 'visible',
  });

  const hasDescription = experience.description.length > 0;
  const showCredential = experience.hasCredential && isInView;

  return (
    <TimelineCardWrapper
      experience={experience}
      showDuration={showDuration}
      cardRef={cardRef}
    >
      {hasDescription && (
        <Box sx={timelineDescriptionWrapperSx}>
          {experience.description.map((desc, index) => (
            <Box
              component={motion.p}
              key={buildItemKey(experience.title, desc, index)}
              custom={index}
              {...descriptionMotion}
              {...DATA_ATTRIBUTES.description}
              sx={descriptionTextSx}
            >
              {desc}
            </Box>
          ))}
        </Box>
      )}
      <AnimatePresence mode="wait">
        {showCredential && (
          <motion.div {...buttonMotion} exit="hidden">
            <Button
              onClick={onShowModal}
              variant="text"
              color="inherit"
              startIcon={<VerifiedTwoTone />}
              {...DATA_ATTRIBUTES.cta}
              sx={credentialButtonSx}
            >
              Credential
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </TimelineCardWrapper>
  );
}

// ============================================================================
// CARD DISPATCHER
// ============================================================================

function ExperienceCard({
  experience,
  onShowModal,
  showDuration = true,
}: WorkExperienceCardProps): JSX.Element {
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function WorkExperience(): JSX.Element {
  const credentialModal = useModal(false);

  const { combinedRef, cardMotion } = useTimelineSectionController({
    viewportPreset: viewportPresets.sectionReplay,
    selectors: TIMELINE_SELECTORS,
    sequenceOptions: SEQUENCE_OPTIONS,
  });

  return (
    <SectionContainer
      id="workExperience"
      title={
        <SplitText
          text="Experience"
          splitType="chars"
          delay={50}
          duration={0.5}
          ease="power3.out"
        />
      }
      icon={WorkOutlineTwoTone}
    >
      <Box ref={combinedRef}>
        <TimelineList
          items={experiences}
          Icon={WorkOutlineTwoTone}
          getItemIcon={getExperienceIcon}
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

export { WorkExperience };
