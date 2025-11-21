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

import { ProjectHeaderProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

const titleSx: SxProps<Theme> = {
  fontSize: '1.25rem',
  color: 'text.primary',
};

const apiIconSx: SxProps<Theme> = {
  mr: 0.75,
};

const newBadgeWrapperSx: SxProps<Theme> = {
  ml: 1,
  display: 'inline-flex',
};

const newBadgeSx: SxProps<Theme> = {
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  height: 21,
  minWidth: 45,
  border: 'none',
  fontSize: '0.8rem',
  borderRadius: 1,
  transform: 'skew(-5deg)',
};

const iconSx: SxProps<Theme> = {
  fontSize: '1.3rem',
  color: 'inherit',
};

const ProjectHeader = ({ project }: ProjectHeaderProps): React.JSX.Element => {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" component="h3" sx={titleSx}>
        <Stack direction="row" alignItems="center" component="span">
          {project.api && <DnsTwoTone sx={apiIconSx} />}
          {project.title}
          {project.isNew && (
            <Box
              component={motion.span}
              sx={newBadgeWrapperSx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: [1, 1.1, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? getTransition('smooth')
                  : {
                      duration: 1.6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }
              }
            >
              <Chip label="New" size="small" sx={newBadgeSx} />
            </Box>
          )}
        </Stack>
      </Typography>
      <Box>
        {project.collaborative ? (
          <GroupsTwoTone sx={iconSx} />
        ) : (
          <PersonTwoTone sx={iconSx} />
        )}
      </Box>
    </Stack>
  );
};

ProjectHeader.displayName = 'ProjectHeader';

export default ProjectHeader;
