import React, { useRef } from 'react';

import {
  ApartmentTwoTone,
  CalendarTodayTwoTone,
  WorkOutlineTwoTone,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { stagger, useMotionValueEvent, useScroll } from 'motion/react';

import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import { ExperienceCardProps, IconBadgeMetaItem } from '@/config/types';
import {
  useAnimationConfig,
  useAnimationSequence,
  useEventCallback,
} from '@/hooks';
import experiences from '@/lib/data/experiences';

const createExperienceMeta = (
  experience: ExperienceCardProps['experience']
): IconBadgeMetaItem[] => [
  {
    id: 'workplace',
    icon: ApartmentTwoTone,
    text: experience.workplace,
  },
  {
    id: 'duration',
    icon: CalendarTodayTwoTone,
    text: experience.duration,
  },
];

const buildExperienceKey = (experience: ExperienceCardProps['experience']) =>
  `${experience.title}-${experience.duration}`;

function ExperienceCard({
  experience,
}: ExperienceCardProps): React.JSX.Element {
  const metadata = createExperienceMeta(experience);

  return (
    <Grid size={{ lg: 6 }} sx={{ mb: 4 }} data-exp-card>
      <Card
        title={experience.title}
        subtitle={
          <Box data-exp-meta>
            <IconBadgeList items={metadata} keyPrefix={experience.title} />
          </Box>
        }
      >
        <Box
          component="ul"
          data-exp-description
          sx={{
            pl: 2.5,
            m: 0,
            lineHeight: 1.8,
            color: 'text.secondary',
          }}
        >
          {experience.description.map((item, index) => (
            <li key={`${experience.title}-${index}`}>
              <Typography variant="body2" component="small">
                {item}
              </Typography>
            </li>
          ))}
        </Box>
      </Card>
    </Grid>
  );
}

// Rendering work experience section
function WorkExperience(): React.JSX.Element {
  const { prefersReducedMotion } = useAnimationConfig();
  const { scopeRef, runSequence } = useAnimationSequence();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasPlayed = useRef(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.25'],
  });

  const attachRefs = useEventCallback((node: HTMLDivElement | null) => {
    if (!node) {
      sectionRef.current = null;
      scopeRef(null);
      return;
    }

    sectionRef.current = node;
    scopeRef(node);
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (prefersReducedMotion || hasPlayed.current || value <= 0.15) {
      return;
    }

    hasPlayed.current = true;
    runSequence(async (animate) => {
      await animate(
        '[data-exp-card]',
        { opacity: [0, 1], y: [32, 0] },
        {
          duration: 0.5,
          delay: stagger(0.12),
        }
      );
      await animate(
        '[data-exp-meta]',
        { opacity: [0, 1], y: [16, 0] },
        {
          duration: 0.35,
          delay: stagger(0.1),
        }
      );
      await animate(
        '[data-exp-description]',
        { opacity: [0, 1], x: [-12, 0] },
        {
          duration: 0.4,
        }
      );
    });
  });

  return (
    <SectionContainer
      id="work-experience"
      title="Experience"
      icon={WorkOutlineTwoTone}
      sx={{
        px: 0,
        pb: 5,
      }}
    >
      <Box ref={attachRefs} sx={{ position: 'relative' }}>
        <Grid container spacing={4}>
          {experiences.map((experience) => (
            <ExperienceCard
              key={buildExperienceKey(experience)}
              experience={experience}
            />
          ))}
        </Grid>
      </Box>
    </SectionContainer>
  );
}

export default WorkExperience;
