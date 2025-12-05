import { useRef } from 'react';

import PersonOutlined from '@mui/icons-material/PersonOutlined';
import VerifiedTwoTone from '@mui/icons-material/VerifiedTwoTone';
import {
  Box,
  type SxProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  type Theme,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useScroll, useTransform } from 'motion/react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionContainer from '@/components/SectionContainer';
import { TextReveal } from '@/components/TextReveal';
import {
  CARD_HOVER_LIFT,
  cardEntranceVariants,
  cardEntranceVariantsMobile,
  listItemStaggerVariants,
  viewportPresets,
} from '@/config/motion';
import { GRID, SPACING } from '@/config/responsive';
import type {
  AboutMeListProps,
  CardItemProps,
  ElementRef,
} from '@/config/types';
import Credential from '@/features/experience/Credential';
import {
  useAnimationConfig,
  useInView,
  useMobileBreakpoint,
  useMotionVariant,
  useToggle,
} from '@/hooks';
import aboutMeItems from '@/lib/data/aboutMeItems';
import aboutMeText from '@/lib/data/aboutMeText';
import { credentialButtonSx, TEXT_LINE_HEIGHT } from '@/styles/shared';

// Card content styles
const overviewTextSx: SxProps<Theme> = {
  lineHeight: TEXT_LINE_HEIGHT,
  color: 'text.primary',
  fontSize: (theme) => theme.typography.body1.fontSize,
};

// Table styles
const tableSx: SxProps<Theme> = {
  '& .MuiTableCell-root': {
    borderBottom: 1,
    borderColor: 'divider',
    px: 0,
    py: { xs: 1.25, sm: 1.375, md: 1.5, lg: 1.75 },
  },
  '& .MuiTableRow-root:last-child .MuiTableCell-root': {
    borderBottom: 0,
  },
};

const titleCellSx: SxProps<Theme> = {
  fontWeight: 600,
  color: 'primary.main',
  whiteSpace: 'nowrap',
  pr: 2,
  width: 'auto',
};

const descCellSx: SxProps<Theme> = {
  color: 'text.secondary',
};

// Overview card with description
function AboutMeText(): React.JSX.Element {
  return (
    <Card title="Overview">
      <Typography sx={overviewTextSx}>{aboutMeText}</Typography>
    </Card>
  );
}

// Highlights table with credential button
function AboutMeList({
  items,
  onShowModal,
}: AboutMeListProps): React.JSX.Element {
  const tableRef = useRef<HTMLTableElement>(null);
  // Use listReplay preset for full-page scroll sections to replay animations on remount
  const isInView = useInView(
    tableRef as ElementRef,
    viewportPresets.listReplay
  );

  const rowMotion = useMotionVariant(listItemStaggerVariants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: { x: 6 },
  });

  return (
    <Card title="Highlights">
      <Table ref={tableRef} size="small" sx={tableSx} aria-label="highlights">
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={item.title}
              component={motion.tr}
              custom={index}
              {...rowMotion}
            >
              <TableCell component="th" scope="row" sx={titleCellSx}>
                {item.title}
              </TableCell>
              <TableCell sx={descCellSx}>{item.description}</TableCell>
            </TableRow>
          ))}
          <TableRow component={motion.tr} custom={items.length} {...rowMotion}>
            <TableCell colSpan={2} sx={{ pt: 2 }}>
              <Button
                onClick={onShowModal}
                variant="text"
                color="inherit"
                startIcon={<VerifiedTwoTone />}
                sx={credentialButtonSx}
              >
                Credential
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

// Card wrapper with parallax and entrance animation
function CardItem({
  index,
  yTransform,
  isInView,
  children,
}: CardItemProps): React.JSX.Element {
  const { prefersReducedMotion } = useAnimationConfig();
  const isMobile = useMobileBreakpoint('md');
  // Use mobile-optimized variant without blur on mobile devices
  const variants = isMobile ? cardEntranceVariantsMobile : cardEntranceVariants;
  const cardMotion = useMotionVariant(variants, {
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    whileHover: CARD_HOVER_LIFT,
  });

  return (
    <Box
      component={motion.div}
      custom={index}
      {...cardMotion}
      style={{
        // Disable parallax transforms on mobile to prevent scroll conflicts
        y: prefersReducedMotion || isMobile ? 0 : yTransform,
      }}
      sx={{
        height: 1, // = 100%
        width: 1, // = 100%
      }}
    >
      {children}
    </Box>
  );
}

// Main About Me section
function AboutMe(): React.JSX.Element {
  const {
    value: showModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useToggle(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Use listReplay preset for full-page scroll sections to replay animations on remount
  const isInView = useInView(
    containerRef as ElementRef,
    viewportPresets.listReplay
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <SectionContainer
      id="aboutMe"
      title={<TextReveal text="About Me" as="span" />}
      icon={PersonOutlined}
    >
      {/* Cards Grid */}
      <Box ref={containerRef}>
        <Grid container spacing={SPACING.grid} alignItems="stretch">
          <Grid size={GRID.half} sx={{ display: 'flex' }}>
            <CardItem index={0} yTransform={y1} isInView={isInView}>
              <AboutMeText />
            </CardItem>
          </Grid>
          <Grid size={GRID.half} sx={{ display: 'flex' }}>
            <CardItem index={1} yTransform={y2} isInView={isInView}>
              <AboutMeList items={aboutMeItems} onShowModal={openModal} />
            </CardItem>
          </Grid>
        </Grid>
      </Box>
      <Credential open={showModal} onClose={closeModal} />
    </SectionContainer>
  );
}

export default AboutMe;
