import React, { useRef } from 'react';

import { SchoolTwoTone, VerifiedTwoTone } from '@mui/icons-material';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'motion/react';

import Button from '@/components/Button';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import type { EducationCardProps } from '@/config/types';
import {
  useAnimationConfig,
  useAnimationSequence,
  useCombinedRefs,
  useMeasure,
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
const TIMELINE_MIN_OPACITY = 0.08;
const TIMELINE_MAX_OPACITY = 0.2;
const TIMELINE_HEIGHT_DIVISOR = 1600;

const descriptionWrapperSx: SxProps<Theme> = {
  mb: 2,
};

const wrapperSx: SxProps<Theme> = {
  position: 'relative',
  py: { xs: 1, md: 2 },
};

const timelineBaseSx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 'calc(50% - 1px)',
  width: '2px',
  bgcolor: 'primary.main',
  display: { xs: 'none', md: 'block' },
  transformOrigin: 'top',
};

function EducationCard({
  education,
  onShowModal,
}: EducationCardProps): React.JSX.Element {
  const metadata = [
    createSchoolMeta(education.school),
    createDurationMeta(education.duration),
  ];

  return (
    <TimelineCard
      title={education.title}
      metadata={metadata}
      dataAttributes={{ 'data-edu-card': 'true' }}
    >
      {education.description && (
        <Box sx={descriptionWrapperSx}>
          {education.description.map((desc, index) => (
            <Typography
              key={`${education.title}-${index}`}
              data-edu-description
              sx={descriptionTextSx}
            >
              {desc}
            </Typography>
          ))}
        </Box>
      )}
      {education.hasCredential && (
        <Button
          onClick={onShowModal}
          variant="contained"
          startIcon={<VerifiedTwoTone />}
          data-edu-cta
          sx={credentialButtonSx}
        >
          Credential
        </Button>
      )}
    </TimelineCard>
  );
}

// Rendering education section
function Education(): React.JSX.Element {
  const credentialModal = useModal(false);
  const { prefersReducedMotion } = useAnimationConfig();
  const { scopeRef } = useAnimationSequence();
  const { ref: measureRef, bounds } = useMeasure<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(sectionRef, scopeRef, measureRef);

  useSectionSequence(sectionRef, {
    cards: '[data-edu-card]',
    description: '[data-edu-description]',
    cta: '[data-edu-cta]',
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.2'],
  });

  const timelineScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const timelineOpacity = calculateTimelineOpacity(bounds.height);

  return (
    <SectionContainer
      id="education"
      title={<TextReveal text="Education" as="span" />}
      icon={SchoolTwoTone}
    >
      <Box ref={combinedRef} sx={wrapperSx}>
        <Box
          component={motion.div}
          aria-hidden="true"
          sx={{
            ...timelineBaseSx,
            opacity: { xs: 0.05, md: timelineOpacity },
          }}
          style={{ scaleY: prefersReducedMotion ? undefined : timelineScale }}
        />
        <Grid container spacing={4}>
          {education.map((edu) => (
            <EducationCard
              key={buildItemKey(edu.title, edu.duration)}
              education={edu}
              onShowModal={credentialModal.open}
            />
          ))}
        </Grid>
      </Box>
      <Credential
        show={credentialModal.isOpen}
        handleClose={credentialModal.close}
      />
    </SectionContainer>
  );
}

// Calculate timeline opacity based on container height
function calculateTimelineOpacity(height: number): number {
  if (height === 0) return TIMELINE_MIN_OPACITY;
  return Math.max(
    Math.min(height / TIMELINE_HEIGHT_DIVISOR, TIMELINE_MAX_OPACITY),
    TIMELINE_MIN_OPACITY
  );
}

export default Education;
