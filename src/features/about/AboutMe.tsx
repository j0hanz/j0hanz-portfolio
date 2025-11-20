import React from 'react';

import { HiMiniCheckBadge, HiUser } from 'react-icons/hi2';

import { Box, Grid, Typography } from '@mui/material';

import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { COLORS } from '@/config/constants';
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
              marginTop: '1rem',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
                marginRight: '0.5rem',
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
                  sx={{
                    width: '145px',
                    height: '30px',
                    bgcolor: COLORS.BTN_BG_DARK,
                    '&:hover': {
                      bgcolor: COLORS.BTN_BG_DARK_HOVER,
                    },
                    '&:active': {
                      bgcolor: COLORS.BTN_BG_DARK_HOVER,
                    },
                  }}
                  icon={
                    <HiMiniCheckBadge
                      style={{
                        marginRight: '5px',
                        fontSize: '0.9rem',
                        color: COLORS.TEXT_LIGHT,
                      }}
                    />
                  }
                  text="Credential"
                />
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
      <Grid container spacing={4}>
        <Grid size={{ lg: 6 }} sx={{ mb: 4 }}>
          <AboutMeText />
        </Grid>
        <Grid size={{ lg: 6 }} sx={{ mb: 4 }}>
          <AboutMeList items={aboutMeItems} onShowModal={handleShowModal} />
        </Grid>
      </Grid>
      <Credential show={showModal} handleClose={handleCloseModal} />
    </SectionContainer>
  );
}

export default AboutMe;
