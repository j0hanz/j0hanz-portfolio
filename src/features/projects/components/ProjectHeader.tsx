import DnsTwoTone from '@mui/icons-material/DnsTwoTone';
import GroupsTwoTone from '@mui/icons-material/GroupsTwoTone';
import PersonTwoTone from '@mui/icons-material/PersonTwoTone';
import {
  Box,
  Chip,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';

import { BlurText } from '@/components/animations';
import { ProjectHeaderProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';
import {
  BADGE_HEIGHT,
  BADGE_MIN_WIDTH,
  SKEW_TRANSFORM,
  textEllipsisSx,
} from '@/styles/shared';

const titleSx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.h6.fontSize,
  color: 'text.primary',
  ...textEllipsisSx,
  flex: 1,
};

const titleInnerSx: SxProps<Theme> = textEllipsisSx;

const apiIconSx: SxProps<Theme> = {
  mr: 0.75,
};

const newBadgeSx: SxProps<Theme> = {
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  height: BADGE_HEIGHT,
  minWidth: BADGE_MIN_WIDTH,
  border: 'none',
  fontSize: (theme) => theme.typography.caption.fontSize,
  borderRadius: (theme) => theme.spacing(0.5),
  transform: SKEW_TRANSFORM,
};

const iconSx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.h6.fontSize,
  color: 'inherit',
};

function ProjectHeader({ project }: ProjectHeaderProps): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" component="h3" sx={titleSx}>
        <Stack
          direction="row"
          alignItems="center"
          component="span"
          sx={titleInnerSx}
        >
          {project.api && <DnsTwoTone sx={apiIconSx} />}
          <BlurText
            text={project.title}
            as="span"
            animateBy="letters"
            direction="bottom"
            duration={0.2}
            sx={titleInnerSx}
          />
          {project.isNew && (
            <Box
              component={motion.span}
              sx={{ ml: 3, display: 'inline-flex' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: [1, 1.1, 1] }
              }
              transition={
                prefersReducedMotion
                  ? getTransition('smooth')
                  : { duration: 1.6, repeat: Infinity, repeatType: 'reverse' }
              }
            >
              <Chip label="New" size="small" sx={newBadgeSx} />
            </Box>
          )}
        </Stack>
      </Typography>
      <Box sx={{ flex: 'none' }}>
        {project.collaborative ? (
          <GroupsTwoTone sx={iconSx} />
        ) : (
          <PersonTwoTone sx={iconSx} />
        )}
      </Box>
    </Stack>
  );
}

ProjectHeader.displayName = 'ProjectHeader';

export default ProjectHeader;
