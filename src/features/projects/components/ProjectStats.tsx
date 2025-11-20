import React from 'react';

import { Box } from '@mui/material';

import { ProjectStatsProps, ShieldConfig } from '@/config/types';

import styles from '../ProjectList.module.css';

const shieldBaseQuery = 'style=flat-square&labelColor=313131&color=313131';

const githubShields: ShieldConfig[] = [
  {
    key: 'last-commit',
    hrefPath: '/commits',
    imgPath: 'last-commit',
    query: `${shieldBaseQuery}&logo=github&logoColor=f2f2f2&label=Updated:`,
    alt: 'Last Commit',
    style: { margin: '0.25rem 0' },
  },
  {
    key: 'issues',
    hrefPath: '/issues',
    imgPath: 'issues',
    query: `${shieldBaseQuery}&logo=github&logoColor=f2f2f2&label=Issues:`,
    alt: 'Issues',
    style: { margin: '0.25rem 0' },
    shouldRender: (hasProjectBoard?: boolean) => Boolean(hasProjectBoard),
  },
];

const ProjectStats = ({
  repoPath,
  hasProjectBoard,
}: ProjectStatsProps): React.JSX.Element => {
  const visibleShields = githubShields.filter((shield) =>
    shield.shouldRender ? shield.shouldRender(hasProjectBoard) : true
  );

  return (
    <Box className={styles.githubStats} sx={{ mb: 3 }}>
      {visibleShields.map(
        ({ key, hrefPath, imgPath, query, alt, className, style }) => (
          <a
            key={key}
            href={`https://github.com/${repoPath}${hrefPath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`https://img.shields.io/github/${imgPath}/${repoPath}?${query}`}
              alt={alt}
              className={className}
              style={style}
              height="20"
              width="140"
              loading="lazy"
              decoding="async"
            />
          </a>
        )
      )}
    </Box>
  );
};

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;
