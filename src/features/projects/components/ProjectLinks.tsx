import React from 'react';

import { SiGithub } from 'react-icons/si';

import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { Box, Stack, type SxProps, type Theme, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';

import Button from '@/components/Button';
import { ActionButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyToClipboard, useSnackbar } from '@/hooks';

const iconStyle = {
  fontSize: '0.9rem',
} as const;

const actionButtonSx = { minWidth: 104, height: 30 } as const;

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
  const [copyToClipboard] = useCopyToClipboard();
  const { showSnackbar } = useSnackbar();

  const handleCopyRepo = async () => {
    const success = await copyToClipboard(project.github);

    if (success) {
      showSnackbar('Repository URL copied', 'success');
      return;
    }

    showSnackbar('Unable to copy repository URL', 'error');
  };

  const renderDemoButton = () => {
    if (project.demo) {
      return (
        <ActionButton
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          icon={<PlayArrowRounded sx={iconStyle} />}
          label="Demo"
        />
      );
    }

    return (
      <Tooltip title="Coming soon!" placement="bottom">
        <Box component="span" sx={tooltipWrapperSx}>
          <ActionButton
            disabled
            icon={<PlayArrowRounded sx={iconStyle} />}
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
          icon={<SiGithub style={iconStyle} />}
          label="GitHub"
        />
        <ActionButton
          type="button"
          onClick={handleCopyRepo}
          color="inherit"
          variant="text"
          icon={<ContentCopyRounded sx={iconStyle} />}
          label="Copy"
        />
        {renderDemoButton()}
      </Stack>
    </Grid>
  );
};

ProjectLinks.displayName = 'ProjectLinks';

export default ProjectLinks;
