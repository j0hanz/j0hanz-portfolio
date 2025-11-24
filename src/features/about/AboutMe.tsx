import PersonOutlined from '@mui/icons-material/PersonOutlined';
import VerifiedTwoTone from '@mui/icons-material/VerifiedTwoTone';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { AboutMeListProps } from '@/config/types';
import Credential from '@/features/education/Credential';
import { useToggle } from '@/hooks';
import aboutMeItems from '@/lib/data/aboutMeItems';
import aboutMeText from '@/lib/data/aboutMeText';
import { credentialButtonSx, sectionGridItemSx } from '@/styles/shared';

const overviewTextSx: SxProps<Theme> = {
  lineHeight: 1.8,
  color: 'text.primary',
};

const listSx: SxProps<Theme> = {
  listStyle: 'none',
  p: 0,
  m: 0,
};

const listItemSx: SxProps<Theme> = {
  color: 'text.primary',
  mt: 2,
};

const listTitleSx: SxProps<Theme> = {
  fontWeight: 500,
  mr: 1,
  color: 'text.primary',
};

const buttonWrapperSx: SxProps<Theme> = {
  pt: 3,
};

// Displaying the overview text
function AboutMeText(): React.JSX.Element {
  return (
    <Card title="Overview">
      <Typography sx={overviewTextSx}>{aboutMeText}</Typography>
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
      <Box component="ul" sx={listSx}>
        {items.map((item) => (
          <Box component="li" key={item.title} sx={listItemSx}>
            <Typography component="span" sx={listTitleSx}>
              {item.title}:
            </Typography>
            {item.description}
            {item.hasCredential && (
              <Box sx={buttonWrapperSx}>
                <Button
                  onClick={onShowModal}
                  variant="contained"
                  startIcon={<VerifiedTwoTone />}
                  sx={credentialButtonSx}
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
    <SectionContainer
      id="about-me"
      title={<TextReveal text="About Me" as="span" />}
      icon={PersonOutlined}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={sectionGridItemSx}>
          <AboutMeText />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={sectionGridItemSx}>
          <AboutMeList items={aboutMeItems} onShowModal={handleShowModal} />
        </Grid>
      </Grid>
      <Credential show={showModal} handleClose={handleCloseModal} />
    </SectionContainer>
  );
}

export default AboutMe;
