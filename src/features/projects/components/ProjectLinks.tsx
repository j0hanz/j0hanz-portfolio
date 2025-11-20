import React from 'react';

import { HiMiniPlay, HiOutlineClipboardDocument } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import { toast } from 'react-toastify';

import { Box, Stack, Tooltip } from '@mui/material';

import Button from '@/components/Button';
import { CustomButtonProps, ProjectLinksProps } from '@/config/types';
import { useCopyToClipboard } from '@/hooks';

type ActionButtonProps = Omit<CustomButtonProps, 'startIcon' | 'text'> & {
  label: string;
  icon: React.ReactNode;
};

const iconStyle = {
  marginRight: '10px',
  fontSize: '0.9rem',
  color: 'inherit',
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
          icon={<HiMiniPlay style={iconStyle} />}
          label="Demo"
        />
      );
    }

    return (
      <Tooltip title="Coming soon!" placement="bottom">
        <Box component="span" sx={{ display: 'inline-block' }}>
          <ActionButton
            disabled
            icon={<HiMiniPlay style={iconStyle} />}
            label="Demo"
          />
        </Box>
      </Tooltip>
    );
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'stretch', sm: 'center' }}
      gap={1}
      flexWrap="wrap"
      sx={{ mt: 'auto' }}
    >
      <Stack direction="row" flexWrap="wrap" gap={1}>
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
          color="secondary"
          variant="outlined"
          icon={<HiOutlineClipboardDocument style={iconStyle} />}
          label="Copy"
          sx={{ minWidth: 96 }}
        />
      </Stack>
      {renderDemoButton()}
    </Stack>
  );
};

ProjectLinks.displayName = 'ProjectLinks';

export default ProjectLinks;
