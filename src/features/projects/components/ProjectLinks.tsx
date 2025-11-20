import React from 'react';

import { HiMiniPlay } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

import { Box, Tooltip } from '@mui/material';

import Button from '@/components/Button';
import { ProjectLinksProps } from '@/config/types';

import styles from '../ProjectList.module.css';

const ProjectLinks = ({ project }: ProjectLinksProps): React.JSX.Element => (
  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
    <Button
      href={project.github}
      target="_blank"
      className={styles.githubButton}
      icon={<SiGithub className={styles.buttonIcon} />}
      text="GitHub"
    />
    {project.demo ? (
      <Button
        href={project.demo}
        target="_blank"
        className={styles.demoButton}
        icon={<HiMiniPlay className={styles.buttonIcon} />}
        text="Demo"
      />
    ) : (
      <Tooltip title="Coming soon!" placement="bottom">
        <Box component="span" sx={{ display: 'inline-block' }}>
          <Button
            disabled
            className={styles.demoButton}
            icon={<HiMiniPlay className={styles.buttonIcon} />}
            text="Demo"
          />
        </Box>
      </Tooltip>
    )}
  </Box>
);

ProjectLinks.displayName = 'ProjectLinks';

export default ProjectLinks;
