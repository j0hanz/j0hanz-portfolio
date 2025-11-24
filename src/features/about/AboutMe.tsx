import { type RefObject, useRef } from 'react';

import PersonOutlined from '@mui/icons-material/PersonOutlined';
import VerifiedTwoTone from '@mui/icons-material/VerifiedTwoTone';
import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'motion/react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import { AboutMeListProps } from '@/config/types';
import Credential from '@/features/education/Credential';
import { useAnimationConfig, useInView, useToggle } from '@/hooks';
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

// Stagger animation for list items
const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
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
  const isInView = useInView(listRef as RefObject<Element>, {
    once: true,
    amount: 0.2,
  });
  const { prefersReducedMotion } = useAnimationConfig();

  return (
    <Card title="Highlights">
      <Box component="ul" ref={listRef} sx={listSx}>
        {items.map((item, index) => (
          <Box key={item.title} sx={listItemSx}>
            <motion.div
              custom={index}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={prefersReducedMotion ? undefined : { x: 6 }}
              variants={listItemVariants}
            >
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

// Main component for the About Me section
function AboutMe(): React.JSX.Element {
  const {
    value: showModal,
    setTrue: handleShowModal,
    setFalse: handleCloseModal,
  } = useToggle(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as RefObject<Element>, {
    once: true,
    amount: 0.15,
  });
  const { prefersReducedMotion } = useAnimationConfig();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <SectionContainer
      id="about-me"
      title={<TextReveal text="About Me" as="span" />}
      icon={PersonOutlined}
    >
      <Box ref={containerRef}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={sectionGridItemSx}>
            <motion.div
              custom={0}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate={isInView ? 'visible' : 'hidden'}
              style={{ y: prefersReducedMotion ? 0 : y1 }}
              whileHover={prefersReducedMotion ? undefined : { y: -5 }}
              variants={cardVariants}
            >
              <AboutMeText />
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={sectionGridItemSx}>
            <motion.div
              custom={1}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate={isInView ? 'visible' : 'hidden'}
              style={{ y: prefersReducedMotion ? 0 : y2 }}
              whileHover={prefersReducedMotion ? undefined : { y: -5 }}
              variants={cardVariants}
            >
              <AboutMeList items={aboutMeItems} onShowModal={handleShowModal} />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
      <Credential show={showModal} handleClose={handleCloseModal} />
    </SectionContainer>
  );
}

export default AboutMe;
