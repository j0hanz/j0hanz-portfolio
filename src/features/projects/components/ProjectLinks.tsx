import React from 'react';

import { SiGithub } from 'react-icons/si';

import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Box, Stack, type SxProps, type Theme, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';

import Button from '@/components/Button';
import { ActionButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyWithFeedback } from '@/hooks';
import { BUTTON_HEIGHT_STANDARD, iconBody2Sx } from '@/styles/shared';
import { getCopyMessages } from '@/utils/clipboard';

const ACTION_BUTTON_MIN_WIDTH = 104;
const actionButtonSx = {
  minWidth: ACTION_BUTTON_MIN_WIDTH,
  height: BUTTON_HEIGHT_STANDARD,
} as const;

const gridSx: SxProps<Theme> = {
  mt: 2,
};

const tooltipWrapperSx: SxProps<Theme> = {
  display: 'inline-block',
};

const ActionButton = ({
  label,
  icon,
  sx,
  ...props
}: ActionButtonProps): React.JSX.Element => (
  <Button
    {...props}
    text={label}
    startIcon={icon}
    sx={{ ...actionButtonSx, ...sx }}
  />
);

const ProjectLinks = ({ project }: ProjectLinksProps): React.JSX.Element => {
  const { copyWithFeedback } = useCopyWithFeedback();

  const handleCopyRepo = async () => {
    const messages = getCopyMessages('repository');
    await copyWithFeedback(project.github, messages.success, messages.error);
  };

  const renderDemoButton = () => {
    if (project.demo) {
      return (
        <ActionButton
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          icon={<PlayArrowRounded sx={iconBody2Sx} />}
          label="Demo"
        />
      );
    }

    return (
      <Tooltip title="Coming soon!" placement="bottom">
        <Box component="span" sx={tooltipWrapperSx}>
          <ActionButton
            disabled
            icon={<PlayArrowRounded sx={iconBody2Sx} />}
            label="Demo"
          />
        </Box>
      </Tooltip>
    );
  };

  return (
    <Grid sx={gridSx}>
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <ActionButton
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          icon={<SiGithub />}
          label="GitHub"
        />
        <ActionButton
          type="button"
          onClick={handleCopyRepo}
          color="inherit"
          variant="text"
          icon={<ContentCopyRounded sx={iconBody2Sx} />}
          label="Copy"
        />
        {renderDemoButton()}
      </Stack>
    </Grid>
  );
};

ProjectLinks.displayName = 'ProjectLinks';

export default ProjectLinks;
