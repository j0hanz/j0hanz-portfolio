import React from 'react';

import {
  HiBriefcase,
  HiOutlineBuildingOffice,
  HiOutlineCalendar,
} from 'react-icons/hi2';

import { Grid } from '@mui/material';

import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import { ExperienceCardProps, IconBadgeMetaItem } from '@/config/types';
import experiences from '@/lib/data/experiences';

import styles from './WorkExperience.module.css';
import appStyles from '@/styles/App.module.css';

const createExperienceMeta = (
  experience: ExperienceCardProps['experience']
): IconBadgeMetaItem[] => [
  {
    id: 'workplace',
    icon: HiOutlineBuildingOffice,
    text: experience.workplace,
  },
  {
    id: 'duration',
    icon: HiOutlineCalendar,
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
    <Grid size={{ lg: 6 }} sx={{ mb: 4 }}>
      <Card
        title={experience.title}
        subtitle={
          <IconBadgeList items={metadata} keyPrefix={experience.title} />
        }
      >
        <ul className={`${styles.listItems} ${appStyles.cardText}`}>
          {experience.description.map((item, index) => (
            <li key={`${experience.title}-${index}`}>
              <small>{item}</small>
            </li>
          ))}
        </ul>
      </Card>
    </Grid>
  );
}

// Rendering work experience section
function WorkExperience(): React.JSX.Element {
  return (
    <SectionContainer
      id="work-experience"
      title="Experience"
      icon={HiBriefcase}
      className={appStyles.sectionPadding}
    >
      <Grid container spacing={4}>
        {experiences.map((experience) => (
          <ExperienceCard
            key={buildExperienceKey(experience)}
            experience={experience}
          />
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default WorkExperience;
