import React from 'react';

import { DnsTwoTone, GroupsTwoTone, PersonTwoTone } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { motion } from 'motion/react';

import { ProjectHeaderProps } from '@/config/types';
import { useAnimationConfig } from '@/hooks';

const ProjectHeader = ({ project }: ProjectHeaderProps): React.JSX.Element => {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontSize: '1.25rem',
          color: 'text.primary',
        }}
      >
        <Stack direction="row" alignItems="center" component="span">
          {project.api && <DnsTwoTone sx={{ mr: 0.75 }} />}
          {project.title}
          {project.isNew && (
            <Box
              component={motion.span}
              sx={{ ml: 1, display: 'inline-flex' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: 1,
                      scale: [1, 1.08, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? getTransition('smooth')
                  : {
                      duration: 1.6,
                      repeat: Infinity,
                      repeatType: 'mirror',
                    }
              }
            >
              <Chip
                label="New"
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  height: 21,
                  minWidth: 43,
                  border: 'none',
                  fontSize: '0.7rem',
                  borderRadius: 1,
                  transform: 'skew(-10deg)',
                }}
              />
            </Box>
          )}
        </Stack>
      </Typography>
      <Box>
        {project.collaborative ? (
          <GroupsTwoTone sx={{ fontSize: '1.3rem', color: 'inherit' }} />
        ) : (
          <PersonTwoTone sx={{ fontSize: '1.3rem', color: 'inherit' }} />
        )}
      </Box>
    </Stack>
  );
};

ProjectHeader.displayName = 'ProjectHeader';

export default ProjectHeader;
