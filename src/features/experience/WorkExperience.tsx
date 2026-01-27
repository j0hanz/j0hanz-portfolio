import type { JSX } from 'react';

import {
  SchoolTwoTone,
  VerifiedTwoTone,
  WorkOutlineTwoTone,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, m } from 'motion/react';

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

const DATA_ATTR = {
  card: { 'data-exp-card': 'true' },
  description: { 'data-exp-description': 'true' },
  cta: { 'data-exp-cta': 'true' },
} as const;

const SELECTORS = {
  cards: '[data-exp-card]',
  description: '[data-exp-description]',
  cta: '[data-exp-cta]',
} as const;

const SEQUENCE_OPTS = {
  offset: ['start 0.9', 'end 0.25'] as ['start 0.9', 'end 0.25'],
  threshold: 0.15,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const buildMetadata = (
  exp: Experience,
  showDuration: boolean
): IconBadgeMetaItem[] =>
  compactMetadata([
    createMeta(
      exp.type === 'education' ? 'school' : 'workplace',
      exp.type === 'education' ? exp.school : exp.workplace
    ),
    showDuration ? createMeta('duration', exp.duration) : null,
  ]);

const getIcon = (item: Experience) =>
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
}: Readonly<TimelineCardWrapperProps>): JSX.Element {
  return (
    <Box ref={cardRef} sx={timelineCardWrapperSx}>
      <TimelineCard
        title={experience.title}
        metadata={buildMetadata(experience, showDuration)}
        dataAttributes={DATA_ATTR.card}
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
}: Readonly<BaseCardProps>): JSX.Element {
  const { cardRef, itemMotion } = useTimelineCardMotion(
    viewportPresets.cardReplay
  );

  return (
    <TimelineCardWrapper
      experience={experience}
      showDuration={showDuration}
      cardRef={cardRef}
    >
      <Box component="ul" {...DATA_ATTR.description} sx={listContainerSx}>
        {experience.description.map((item, index) => (
          <m.li
            key={buildItemKey(experience.title, item, index)}
            custom={index}
            {...itemMotion}
          >
            <Typography variant="body2" component="small">
              {item}
            </Typography>
          </m.li>
        ))}
      </Box>
    </TimelineCardWrapper>
  );
}

function EducationCard({
  experience,
  onShowModal,
  showDuration = true,
}: Readonly<EducationCardProps>): JSX.Element {
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
              component={m.p}
              key={buildItemKey(experience.title, desc, index)}
              custom={index}
              {...descriptionMotion}
              {...DATA_ATTR.description}
              sx={descriptionTextSx}
            >
              {desc}
            </Box>
          ))}
        </Box>
      )}
      <AnimatePresence mode="wait">
        {showCredential && (
          <m.div {...buttonMotion} exit="hidden">
            <Button
              onClick={onShowModal}
              variant="text"
              color="inherit"
              startIcon={<VerifiedTwoTone />}
              {...DATA_ATTR.cta}
              sx={credentialButtonSx}
            >
              Credential
            </Button>
          </m.div>
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
}: Readonly<WorkExperienceCardProps>): JSX.Element {
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
    selectors: SELECTORS,
    sequenceOptions: SEQUENCE_OPTS,
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
          getItemIcon={getIcon}
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
