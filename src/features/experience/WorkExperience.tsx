import React, { useRef } from 'react';

import { WorkOutlineTwoTone } from '@mui/icons-material';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import type { ExperienceCardProps } from '@/config/types';
import {
  useAnimationSequence,
  useCombinedRefs,
  useSectionSequence,
} from '@/hooks';
import experiences from '@/lib/data/experiences';
import {
  listContainerSx,
  sectionGridItemSx,
  sectionSpacingSx,
} from '@/styles/shared';
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
    <Grid size={{ lg: 6 }} sx={sectionGridItemSx} data-exp-card>
      <Card
        title={experience.title}
        subtitle={
          <Box data-exp-meta>
            <IconBadgeList items={metadata} keyPrefix={experience.title} />
          </Box>
        }
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
      </Card>
    </Grid>
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
