import React from 'react';

import {
  HiBriefcase,
  HiOutlineBuildingOffice,
  HiOutlineCalendar,
} from 'react-icons/hi2';

import { Grid } from '@mui/material';

import Card from '@/components/Card';
import IconBadge from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import { ExperienceCardProps } from '@/config/types';
import experiences from '@/lib/data/experiences';

import styles from './WorkExperience.module.css';
import appStyles from '@/styles/App.module.css';

function ExperienceCard({
  experience,
}: ExperienceCardProps): React.JSX.Element {
  return (
    <Grid size={{ lg: 6 }} sx={{ mb: 4 }}>
      <Card
        title={experience.title}
        subtitle={
          <>
            <IconBadge
              icon={HiOutlineBuildingOffice}
              text={experience.workplace}
            />
            <IconBadge icon={HiOutlineCalendar} text={experience.duration} />
          </>
        }
      >
        <ul className={`${styles.listItems} ${appStyles.cardText}`}>
          {experience.description.map((item, i) => (
            <li key={i}>
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
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default WorkExperience;
