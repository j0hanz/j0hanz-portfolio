import type { JSX, ReactNode } from 'react';

import { SiGithub } from 'react-icons/si';

import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Box, Stack, type SxProps, type Theme, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';

import { Button } from '@/components/Button';
import { ActionButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyWithFeedback } from '@/hooks';
import { iconBody2Sx, SIZING, tooltipWrapperSx } from '@/styles/shared';
import { COPY_MESSAGES } from '@/utils/clipboard';

const actionButtonSx: SxProps<Theme> = {
  height: SIZING.buttonHeightSmall,
  fontSize: { xs: '0.8rem', sm: '0.9rem' },
};

const gridSx: SxProps<Theme> = {
  mt: { xs: 1, md: 1.5 },
};

const buttonStackSx: SxProps<Theme> = {
  flexWrap: 'nowrap',
};

// Extracted pattern: Tooltip + wrapper + ActionButton (DRY - was repeated 4 times)
function TooltipActionButton({
  tooltip,
  label,
  icon,
  ...props
}: ActionButtonProps & { tooltip: ReactNode }): JSX.Element {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <Box component="span" sx={tooltipWrapperSx}>
        <Button {...props} text={label} startIcon={icon} sx={actionButtonSx} />
      </Box>
    </Tooltip>
  );
}

function ProjectLinks({ project }: ProjectLinksProps): JSX.Element {
  const { copyWithFeedback } = useCopyWithFeedback();

  const handleCopyRepo = async () => {
    const messages = COPY_MESSAGES.repository;
    await copyWithFeedback(project.github, messages.success, messages.error);
  };

  return (
    <Grid sx={gridSx}>
      <Stack direction="row" justifyContent="space-between" sx={buttonStackSx}>
        <TooltipActionButton
          tooltip="View source code"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="text"
          color="inherit"
          icon={<SiGithub />}
          label="GitHub"
        />
        <TooltipActionButton
          tooltip="Copy repository URL"
          type="button"
          onClick={handleCopyRepo}
          color="inherit"
          variant="text"
          icon={<ContentCopyRounded sx={iconBody2Sx} />}
          label="Copy"
        />
        <TooltipActionButton
          tooltip={project.demo ? 'View live demo' : 'Coming soon!'}
          href={project.demo || undefined}
          target={project.demo ? '_blank' : undefined}
          rel={project.demo ? 'noopener noreferrer' : undefined}
          disabled={!project.demo}
          icon={<PlayArrowRounded sx={iconBody2Sx} />}
          label="Demo"
        />
      </Stack>
    </Grid>
  );
}

ProjectLinks.displayName = 'ProjectLinks';

export { ProjectLinks };
