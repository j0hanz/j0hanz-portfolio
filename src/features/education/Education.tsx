import React from 'react';

import {
  ApartmentTwoTone,
  CalendarTodayTwoTone,
  SchoolTwoTone,
  VerifiedTwoTone,
} from '@mui/icons-material';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'motion/react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import {
  EducationCardProps,
  EducationItem,
  IconBadgeMetaItem,
} from '@/config/types';
import {
  useAnimationConfig,
  useAnimationSequence,
  useCombinedRefs,
  useMeasure,
  useSectionSequence,
  useToggle,
} from '@/hooks';
import education from '@/lib/data/education';

import Credential from './Credential';

// Constants
const TIMELINE_MIN_OPACITY = 0.08;
const TIMELINE_MAX_OPACITY = 0.2;
const TIMELINE_HEIGHT_DIVISOR = 1600;

const gridItemSx: SxProps<Theme> = {
  mb: 4,
};

const descriptionWrapperSx: SxProps<Theme> = {
  mb: 2,
};

const descriptionSx: SxProps<Theme> = {
  lineHeight: 1.8,
  color: 'text.secondary',
};

const buttonSx: SxProps<Theme> = {
  minWidth: 145,
  height: 30,
  bgcolor: 'neutral.main',
  '&:hover': {
    bgcolor: 'neutral.dark',
  },
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

const createEducationMeta = (education: EducationItem): IconBadgeMetaItem[] => [
  {
    id: 'school',
    icon: ApartmentTwoTone,
    text: education.school,
  },
  {
    id: 'duration',
    icon: CalendarTodayTwoTone,
    text: education.duration,
  },
];

const buildEducationKey = (education: EducationItem) =>
  `${education.title}-${education.duration}`;

function EducationCard({
  education,
  onShowModal,
}: EducationCardProps): React.JSX.Element {
  const metadata = createEducationMeta(education);

  return (
    <Grid size={{ lg: 6 }} sx={gridItemSx} data-edu-card>
      <Card
        title={education.title}
        subtitle={
          <IconBadgeList items={metadata} keyPrefix={education.title} />
        }
      >
        {education.description && (
          <Box sx={descriptionWrapperSx}>
            {education.description.map((desc, index) => (
              <Typography
                key={`${education.title}-${index}`}
                data-edu-description
                sx={descriptionSx}
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
            sx={buttonSx}
          >
            Credential
          </Button>
        )}
      </Card>
    </Grid>
  );
}

// Rendering education section
function Education(): React.JSX.Element {
  const {
    value: showModal,
    setTrue: handleShowModal,
    setFalse: handleCloseModal,
  } = useToggle(false);
  const { prefersReducedMotion } = useAnimationConfig();
  const { scopeRef } = useAnimationSequence();
  const { ref: measureRef, bounds } = useMeasure<HTMLDivElement>();
  const { innerRef: sectionRef, attachRefs } =
    useCombinedRefs<HTMLDivElement>();

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
      <Box ref={attachRefs(scopeRef, measureRef)} sx={wrapperSx}>
        <Box
          component={motion.div}
          aria-hidden
          sx={{
            ...timelineBaseSx,
            opacity: { xs: 0.05, md: timelineOpacity },
          }}
          style={{ scaleY: prefersReducedMotion ? undefined : timelineScale }}
        />
        <Grid container spacing={4}>
          {education.map((edu) => (
            <EducationCard
              key={buildEducationKey(edu)}
              education={edu}
              onShowModal={handleShowModal}
            />
          ))}
        </Grid>
      </Box>
      <Credential show={showModal} handleClose={handleCloseModal} />
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
