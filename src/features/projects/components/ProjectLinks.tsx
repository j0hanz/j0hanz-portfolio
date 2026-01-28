import type { JSX, ReactNode } from 'react';

import { SiNpm } from 'react-icons/si';

import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import {
  Stack,
  SvgIcon,
  type SxProps,
  type Theme,
  Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Button } from '@/components/Button';
import type { ActionButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyWithFeedback } from '@/hooks';
import { COPY_MESSAGES } from '@/utils/clipboard';

const iconBody2Sx: SxProps<Theme> = {
  width: (theme) => theme.custom.sizing.iconXs,
};

const tooltipWrapperSx: SxProps<Theme> = {
  display: 'inline-block',
};

const actionButtonSx: SxProps<Theme> = {
  height: (theme) => theme.custom.sizing.buttonHeightSmall,
  fontSize: { xs: '0.7rem', md: '0.85rem', lg: '0.9rem' },
  minWidth: (theme) => theme.custom.sizing.buttonMinWidth,
};

const gridSx: SxProps<Theme> = {
  pt: { xs: 4, md: 6 },
};

const buttonStackSx: SxProps<Theme> = {
  flexWrap: 'nowrap',
  minWidth: 0,
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
          variant="contained"
          color="secondary"
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
            variant="contained"
            color="secondary"
            rel="noopener noreferrer"
            icon={<SvgIcon component={SiNpm} inheritViewBox sx={iconBody2Sx} />}
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
            variant="contained"
            color="secondary"
            label="Demo"
          />
        )}
      </Stack>
    </Grid>
  );
}

ProjectLinks.displayName = 'ProjectLinks';

export { ProjectLinks };
