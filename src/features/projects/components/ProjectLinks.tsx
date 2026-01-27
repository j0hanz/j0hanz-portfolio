import type { JSX, ReactNode } from 'react';

import { SiNpm } from 'react-icons/si';

import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Box, Stack, type SxProps, type Theme, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';

import { Button } from '@/components/Button';
import type { ActionButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyWithFeedback } from '@/hooks';
import { iconBody2Sx, SIZING, tooltipWrapperSx } from '@/styles/shared';
import { COPY_MESSAGES } from '@/utils/clipboard';

const actionButtonSx: SxProps<Theme> = {
  height: SIZING.buttonHeightSmall,
  fontSize: { xs: '0.8rem', sm: '0.9rem' },
};

const gridSx: SxProps<Theme> = {
  pt: { xs: 3, md: 6 },
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
}: Readonly<ActionButtonProps & { tooltip: ReactNode }>): JSX.Element {
  return (
    <Tooltip title={tooltip} placement="bottom">
      <Box component="span" sx={tooltipWrapperSx}>
        <Button {...props} text={label} startIcon={icon} sx={actionButtonSx} />
      </Box>
    </Tooltip>
  );
}

function ProjectLinks({ project }: Readonly<ProjectLinksProps>): JSX.Element {
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
          icon={<GitHubIcon sx={iconBody2Sx} />}
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
        {project.npm ? (
          <TooltipActionButton
            tooltip="View on npm"
            href={project.npm}
            target="_blank"
            variant="text"
            color="inherit"
            rel="noopener noreferrer"
            icon={<SiNpm />}
            label="Install"
          />
        ) : (
          <TooltipActionButton
            tooltip={project.demo ? 'View live demo' : 'Coming soon!'}
            href={project.demo || undefined}
            target={project.demo ? '_blank' : undefined}
            rel={project.demo ? 'noopener noreferrer' : undefined}
            disabled={!project.demo}
            icon={<PlayArrowRounded sx={iconBody2Sx} />}
            variant="text"
            color="inherit"
            label="Demo"
          />
        )}
      </Stack>
    </Grid>
  );
}

ProjectLinks.displayName = 'ProjectLinks';

export { ProjectLinks };
