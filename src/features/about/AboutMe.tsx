import React from 'react';

import { HiMiniCheckBadge, HiUser } from 'react-icons/hi2';

import { Box } from '@mui/material';
import { Grid } from '@mui/material';

import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { AboutMeListProps } from '@/config/types';
import Credential from '@/features/education/Credential';
import { useToggle } from '@/hooks';
import aboutMeItems from '@/lib/data/aboutMeItems';
import aboutMeText from '@/lib/data/aboutMeText';

import styles from './AboutMe.module.css';
import appStyles from '@/styles/App.module.css';

// Displaying the overview text
function AboutMeText(): React.JSX.Element {
  return (
    <Card title="Overview">
      <div className={appStyles.cardText}>{aboutMeText}</div>
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
          <li key={item.title} className={styles.listItem}>
            <span className={styles.listTitle}>{item.title}:</span>
            {item.description}
            {item.hasCredential ? (
              <Box sx={{ pt: 3 }}>
                <Button
                  onClick={onShowModal}
                  className={styles.credentialButton}
                  icon={<HiMiniCheckBadge className={styles.buttonIcon} />}
                  text="Credential"
                />
              </Box>
            ) : null}
          </li>
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
