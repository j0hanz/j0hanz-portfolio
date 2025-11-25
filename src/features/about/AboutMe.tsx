import { useRef } from 'react';

import PersonOutlined from '@mui/icons-material/PersonOutlined';
import VerifiedTwoTone from '@mui/icons-material/VerifiedTwoTone';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'motion/react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import {
  CARD_HOVER_LIFT,
  cardEntranceVariants,
  listItemStaggerVariants,
  viewportPresets,
} from '@/config/motion';
import type {
  AboutMeListProps,
  CardItemProps,
  ElementRef,
} from '@/config/types';
import Credential from '@/features/education/Credential';
import {
  useAnimationConfig,
  useInView,
  useMotionVariant,
  useToggle,
} from '@/hooks';
import aboutMeItems from '@/lib/data/aboutMeItems';
import aboutMeText from '@/lib/data/aboutMeText';
import {
  credentialButtonSx,
  sectionGridItemSx,
  TEXT_LINE_HEIGHT,
} from '@/styles/shared';

const overviewTextSx: SxProps<Theme> = {
  lineHeight: TEXT_LINE_HEIGHT,
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
  const listRef = useRef<HTMLUListElement>(null);
  const isInView = useInView(listRef as ElementRef, viewportPresets.list);

  const listMotion = useMotionVariant(listItemStaggerVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: { x: 6 },
  });

  return (
    <Card title="Highlights">
      <Box component="ul" ref={listRef} sx={listSx}>
        {items.map((item, index) => (
          <Box key={item.title} sx={listItemSx}>
            <motion.div custom={index} {...listMotion}>
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
            </motion.div>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

// Card item wrapper with animation
function CardItem({
  index,
  yTransform,
  isInView,
  children,
}: CardItemProps): React.JSX.Element {
  const { prefersReducedMotion } = useAnimationConfig();
  const cardMotion = useMotionVariant(cardEntranceVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: CARD_HOVER_LIFT,
  });

  return (
    <motion.div
      custom={index}
      {...cardMotion}
      style={{ y: prefersReducedMotion ? 0 : yTransform }}
    >
      {children}
    </motion.div>
  );
}

// Main component for the About Me section
function AboutMe(): React.JSX.Element {
  const {
    value: showModal,
    setTrue: handleShowModal,
    setFalse: handleCloseModal,
  } = useToggle(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(
    containerRef as ElementRef,
    viewportPresets.listCompact
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <SectionContainer
      id="about-me"
      title={<TextReveal text="About Me" as="span" />}
      icon={PersonOutlined}
    >
      <Box ref={containerRef}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={sectionGridItemSx}>
            <CardItem index={0} yTransform={y1} isInView={isInView}>
              <AboutMeText />
            </CardItem>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={sectionGridItemSx}>
            <CardItem index={1} yTransform={y2} isInView={isInView}>
              <AboutMeList items={aboutMeItems} onShowModal={handleShowModal} />
            </CardItem>
          </Grid>
        </Grid>
      </Box>
      <Credential show={showModal} handleClose={handleCloseModal} />
    </SectionContainer>
  );
}

export default AboutMe;
