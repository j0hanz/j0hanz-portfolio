import React from 'react';

import {
  HiAcademicCap,
  HiMiniCheckBadge,
  HiOutlineBuildingLibrary,
  HiOutlineCalendar,
} from 'react-icons/hi2';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { IconBadgeList } from '@/components/IconBadge';
import SectionContainer from '@/components/SectionContainer';
import {
  EducationCardProps,
  EducationItem,
  IconBadgeMetaItem,
} from '@/config/types';
import { useToggle } from '@/hooks';
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
    <Grid size={{ lg: 6 }} sx={{ mb: 4 }}>
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

  return (
    <SectionContainer id="education" title="Education" icon={HiAcademicCap}>
      <Grid container spacing={4}>
        {education.map((edu) => (
          <EducationCard
            key={buildEducationKey(edu)}
            education={edu}
            onShowModal={handleShowModal}
          />
        ))}
      </Grid>
      <Credential show={showModal} handleClose={handleCloseModal} />
    </SectionContainer>
  );
}

export default Education;
