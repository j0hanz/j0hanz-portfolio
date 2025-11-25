import type { JSX } from 'react';

import { SiGithub } from 'react-icons/si';

import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Box, Stack, type SxProps, type Theme, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';

import Button from '@/components/Button';
import { ActionButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyWithFeedback } from '@/hooks';
import {
  BUTTON_HEIGHT_STANDARD,
  iconBody2Sx,
  tooltipWrapperSx,
} from '@/styles/shared';
import { getCopyMessages } from '@/utils/clipboard';

const ACTION_BUTTON_MIN_WIDTH = 104;
const actionButtonSx = {
  minWidth: ACTION_BUTTON_MIN_WIDTH,
  height: BUTTON_HEIGHT_STANDARD,
} as const;

const gridSx: SxProps<Theme> = {
  mt: 2,
};

function ActionButton({
  label,
  icon,
  sx,
  ...props
}: ActionButtonProps): JSX.Element {
  return (
    <Button
      {...props}
      text={label}
      startIcon={icon}
      sx={{ ...actionButtonSx, ...sx }}
    />
  );
}

function ProjectLinks({ project }: ProjectLinksProps): JSX.Element {
  const { copyWithFeedback } = useCopyWithFeedback();

  const handleCopyRepo = async () => {
    const messages = getCopyMessages('repository');
    await copyWithFeedback(project.github, messages.success, messages.error);
  };

  const renderDemoButton = () => {
    if (project.demo) {
      return (
        <Tooltip title="View live demo" placement="bottom">
          <Box component="span" sx={tooltipWrapperSx}>
            <ActionButton
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              icon={<PlayArrowRounded sx={iconBody2Sx} />}
              label="Demo"
            />
          </Box>
        </Tooltip>
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
        <Tooltip title="View source code" placement="bottom">
          <Box component="span" sx={tooltipWrapperSx}>
            <ActionButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              color="neutral"
              icon={<SiGithub />}
              label="GitHub"
            />
          </Box>
        </Tooltip>
        <Tooltip title="Copy repository URL" placement="bottom">
          <Box component="span" sx={tooltipWrapperSx}>
            <ActionButton
              type="button"
              onClick={handleCopyRepo}
              color="inherit"
              variant="text"
              icon={<ContentCopyRounded sx={iconBody2Sx} />}
              label="Copy"
            />
          </Box>
        </Tooltip>
        {renderDemoButton()}
      </Stack>
    </Grid>
  );
}

ProjectLinks.displayName = 'ProjectLinks';

export default ProjectLinks;
