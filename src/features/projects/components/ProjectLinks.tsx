import React from 'react';

import { HiMiniPlay } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

import { Box, Stack, Tooltip } from '@mui/material';

import Button from '@/components/Button';
import { ProjectLinksProps } from '@/config/types';

const ProjectLinks = ({ project }: ProjectLinksProps): React.JSX.Element => (
  <Stack direction="row" justifyContent="space-between" sx={{ mt: 'auto' }}>
    <Button
      href={project.github}
      target="_blank"
      color="neutral"
      sx={{
        minWidth: 104,
        height: 30,
      }}
      startIcon={
        <SiGithub
          style={{
            marginRight: '10px',
            fontSize: '0.9rem',
            color: 'inherit',
          }}
        />
      }
      text="GitHub"
    />
    {project.demo ? (
      <Button
        href={project.demo}
        target="_blank"
        sx={{
          minWidth: 104,
          height: 30,
        }}
        startIcon={
          <HiMiniPlay
            style={{
              marginRight: '10px',
              fontSize: '0.9rem',
              color: 'inherit',
            }}
          />
        }
        text="Demo"
      />
    ) : (
      <Tooltip title="Coming soon!" placement="bottom">
        <Box component="span" sx={{ display: 'inline-block' }}>
          <Button
            disabled
            sx={{
              minWidth: 104,
              height: 30,
            }}
            startIcon={
              <HiMiniPlay
                style={{
                  marginRight: '10px',
                  fontSize: '0.9rem',
                  color: 'inherit',
                }}
              />
            }
            text="Demo"
          />
        </Box>
      </Tooltip>
    )}
  </Stack>
);

ProjectLinks.displayName = 'ProjectLinks';

export default ProjectLinks;
