import React from 'react';

import {
  ApartmentTwoTone,
  CalendarTodayTwoTone,
  WorkOutlineTwoTone,
} from '@mui/icons-material';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { ExperienceCardProps, IconBadgeMetaItem } from '@/config/types';
import {
  useAnimationSequence,
  useCombinedRefs,
  useSectionSequence,
} from '@/hooks';
import experiences from '@/lib/data/experiences';

const gridItemSx: SxProps<Theme> = {
  mb: 4,
};

const listSx: SxProps<Theme> = {
  pl: 2.5,
  m: 0,
  lineHeight: 1.8,
  color: 'text.secondary',
};

const sectionSx: SxProps<Theme> = {
  px: 0,
  pb: 5,
};

const wrapperSx: SxProps<Theme> = {
  position: 'relative',
};

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
    <Grid size={{ lg: 6 }} sx={gridItemSx} data-exp-card>
      <Card
        title={experience.title}
        subtitle={
          <Box data-exp-meta>
            <IconBadgeList items={metadata} keyPrefix={experience.title} />
          </Box>
        }
      >
        <Box component="ul" data-exp-description sx={listSx}>
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
  const { innerRef: sectionRef, attachRefs } =
    useCombinedRefs<HTMLDivElement>();

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
      sx={sectionSx}
    >
      <Box ref={attachRefs(scopeRef)} sx={wrapperSx}>
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
