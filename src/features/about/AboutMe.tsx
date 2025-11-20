import React from 'react';

import { HiMiniCheckBadge, HiUser } from 'react-icons/hi2';

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { AboutMeListProps } from '@/config/types';
import Credential from '@/features/education/Credential';
import { useToggle } from '@/hooks';
import aboutMeItems from '@/lib/data/aboutMeItems';
import aboutMeText from '@/lib/data/aboutMeText';

// Displaying the overview text
function AboutMeText(): React.JSX.Element {
  return (
    <Card title="Overview">
      <Typography
        sx={{
          lineHeight: 1.8,
          color: 'text.primary',
        }}
      >
        {aboutMeText}
      </Typography>
    </Card>
  );
}

// Displaying a list of highlights
function AboutMeList({
  items,
  onShowModal,
}: AboutMeListProps): React.JSX.Element {
  return (
    <Card title="Highlights">
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {items.map((item) => (
          <Box
            component="li"
            key={item.title}
            sx={{
              color: 'text.primary',
              mt: 2,
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
                mr: 1,
                color: 'text.primary',
              }}
            >
              {item.title}:
            </Typography>
            {item.description}
            {item.hasCredential && (
              <Box sx={{ pt: 3 }}>
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
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Card>
  );
}

// Main component for the About Me section
function AboutMe(): React.JSX.Element {
  const {
    value: showModal,
    setTrue: handleShowModal,
    setFalse: handleCloseModal,
  } = useToggle(false);

  return (
    <SectionContainer id="about-me" title="About Me" icon={HiUser}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ mb: 4 }}>
          <AboutMeText />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ mb: 4 }}>
          <AboutMeList items={aboutMeItems} onShowModal={handleShowModal} />
        </Grid>
      </Grid>
      <Credential show={showModal} handleClose={handleCloseModal} />
    </SectionContainer>
  );
}

export default AboutMe;
