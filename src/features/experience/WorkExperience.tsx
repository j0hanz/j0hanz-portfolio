import React, { useRef } from 'react';

import { WorkOutlineTwoTone } from '@mui/icons-material';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import TimelineCard from '@/components/TimelineCard';
import type { ExperienceCardProps } from '@/config/types';
import {
  useAnimationSequence,
  useCombinedRefs,
  useSectionSequence,
} from '@/hooks';
import experiences from '@/lib/data/experiences';
import { listContainerSx, sectionSpacingSx } from '@/styles/shared';
import {
  buildItemKey,
  createDurationMeta,
  createWorkplaceMeta,
} from '@/utils/metadata';

const wrapperSx: SxProps<Theme> = {
  position: 'relative',
};

function ExperienceCard({
  experience,
}: ExperienceCardProps): React.JSX.Element {
  const metadata = [
    createWorkplaceMeta(experience.workplace),
    createDurationMeta(experience.duration),
  ];

  return (
    <TimelineCard
      title={experience.title}
      metadata={metadata}
      dataAttributes={{ 'data-exp-card': 'true' }}
      metaDataAttribute="data-exp-meta"
    >
      <Box component="ul" data-exp-description sx={listContainerSx}>
        {experience.description.map((item, index) => (
          <li key={`${experience.title}-${index}`}>
            <Typography variant="body2" component="small">
              {item}
            </Typography>
          </li>
        ))}
      </Box>
    </TimelineCard>
  );
}

// Rendering work experience section
function WorkExperience(): React.JSX.Element {
  const { scopeRef } = useAnimationSequence();
  const sectionRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(sectionRef, scopeRef);

  useSectionSequence(
    sectionRef,
    {
      cards: '[data-exp-card]',
      description: '[data-exp-description]',
    },
    {
      offset: ['start 0.9', 'end 0.25'],
      threshold: 0.15,
    }
  );

  return (
    <SectionContainer
      id="workExperience"
      title={<TextReveal text="Experience" as="span" />}
      icon={WorkOutlineTwoTone}
      sx={sectionSpacingSx}
    >
      <Box ref={combinedRef} sx={wrapperSx}>
        <Grid container spacing={4}>
          {experiences.map((experience) => (
            <ExperienceCard
              key={buildItemKey(experience.title, experience.duration)}
              experience={experience}
            />
          ))}
        </Grid>
      </Box>
    </SectionContainer>
  );
}

export default WorkExperience;
