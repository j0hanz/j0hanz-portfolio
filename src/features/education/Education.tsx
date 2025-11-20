import React, { useRef } from 'react';

import {
  HiAcademicCap,
  HiMiniCheckBadge,
  HiOutlineBuildingLibrary,
  HiOutlineCalendar,
} from 'react-icons/hi2';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  motion,
  stagger,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import {
  EducationCardProps,
  EducationItem,
  IconBadgeMetaItem,
} from '@/config/types';
import {
  useAnimationConfig,
  useAnimationSequence,
  useMeasure,
  useToggle,
} from '@/hooks';
import education from '@/lib/data/education';

import Credential from './Credential';

const createEducationMeta = (education: EducationItem): IconBadgeMetaItem[] => [
  {
    id: 'school',
    icon: HiOutlineBuildingLibrary,
    text: education.school,
  },
  {
    id: 'duration',
    icon: HiOutlineCalendar,
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
    <Grid size={{ lg: 6 }} sx={{ mb: 4 }} data-edu-card>
      <Card
        title={education.title}
        subtitle={
          <IconBadgeList items={metadata} keyPrefix={education.title} />
        }
      >
        {education.description && (
          <Box sx={{ mb: 2 }}>
            {education.description.map((desc, index) => (
              <Typography
                key={`${education.title}-${index}`}
                data-edu-description
                sx={{
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
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
            startIcon={<HiMiniCheckBadge />}
            data-edu-cta
            sx={{
              minWidth: 145,
              height: 30,
              bgcolor: 'neutral.main',
              '&:hover': {
                bgcolor: 'neutral.dark',
              },
            }}
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
  const { scopeRef, runSequence } = useAnimationSequence();
  const sectionNodeRef = useRef<HTMLDivElement | null>(null);
  const hasPlayed = useRef(false);
  const { ref: measureRef, bounds } = useMeasure<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: sectionNodeRef,
    offset: ['start 0.85', 'end 0.2'],
  });
  const timelineScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const timelineOpacity =
    bounds.height === 0
      ? 0.12
      : Math.max(Math.min(bounds.height / 1600, 0.2), 0.08);

  const attachRefs = (node: HTMLDivElement | null) => {
    sectionNodeRef.current = node;
    scopeRef(node);
    measureRef(node);
  };

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (prefersReducedMotion || hasPlayed.current || value <= 0.2) {
      return;
    }

    hasPlayed.current = true;
    runSequence(async (animate) => {
      await animate(
        '[data-edu-card]',
        { opacity: [0, 1], y: [24, 0] },
        {
          duration: 0.45,
          delay: (i: number) => 0.05 + i * 0.12,
          ease: [0.42, 0, 0.58, 1],
        }
      );
      await animate(
        '[data-edu-description]',
        { opacity: [0, 1], y: [16, 0] },
        {
          duration: 0.35,
          delay: stagger(0.05),
        }
      );
      await animate(
        '[data-edu-cta]',
        { opacity: [0, 1], scale: [0.95, 1] },
        {
          duration: 0.3,
        }
      );
    });
  });

  return (
    <SectionContainer id="education" title="Education" icon={HiAcademicCap}>
      <Box
        ref={attachRefs}
        sx={{ position: 'relative', py: { xs: 1, md: 2 } }}
      >
        <Box
          component={motion.div}
          aria-hidden
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 'calc(50% - 1px)',
            width: '2px',
            bgcolor: 'primary.main',
            opacity: { xs: 0.05, md: timelineOpacity },
            display: { xs: 'none', md: 'block' },
            transformOrigin: 'top',
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

export default Education;
