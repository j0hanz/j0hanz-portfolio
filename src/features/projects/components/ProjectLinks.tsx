import React from 'react';

import { SiGithub } from 'react-icons/si';
import { toast } from 'react-toastify';

import { ContentCopyRounded, PlayArrowRounded } from '@mui/icons-material';
import { Box, Stack, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';

import Button from '@/components/Button';
import { CustomButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyToClipboard } from '@/hooks';

type ActionButtonProps = Omit<CustomButtonProps, 'startIcon' | 'text'> & {
  label: string;
  icon: React.ReactNode;
};

const iconStyle = {
  fontSize: '0.9rem',
} as const;

const actionButtonSx = { minWidth: 104, height: 30 } as const;

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
  const repoToastId = `repo-copy-${project.github}`;

  const handleCopyRepo = async () => {
    const success = await copyToClipboard(project.github);

    if (success) {
      toast.success('Repository URL copied', { toastId: repoToastId });
      return;
    }

    toast.error('Unable to copy repository URL', { toastId: repoToastId });
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
        <Box component="span" sx={{ display: 'inline-block' }}>
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
    <Grid sx={{ mt: 2 }}>
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
