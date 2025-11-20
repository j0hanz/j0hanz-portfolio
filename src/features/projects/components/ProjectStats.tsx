import React from 'react';

import { Stack } from '@mui/material';

import { ProjectStatsProps, ShieldConfig } from '@/config/types';

const shieldBaseQuery = 'style=flat-square&labelColor=313131&color=313131';

const githubShields: ShieldConfig[] = [
  {
    key: 'last-commit',
    hrefPath: '/commits',
    imgPath: 'last-commit',
    query: `${shieldBaseQuery}&logo=github&logoColor=f2f2f2&label=Updated:`,
    alt: 'Last Commit',
  },
  {
    key: 'issues',
    hrefPath: '/issues',
    imgPath: 'issues',
    query: `${shieldBaseQuery}&logo=github&logoColor=f2f2f2&label=Issues:`,
    alt: 'Issues',
    shouldRender: (hasProjectBoard?: boolean) => Boolean(hasProjectBoard),
  },
];

const shieldVariants = githubShields.reduce(
  (acc, shield) => {
    if (!shield.shouldRender || shield.shouldRender(false)) {
      acc.withoutProjectBoard.push(shield);
    }
    if (!shield.shouldRender || shield.shouldRender(true)) {
      acc.withProjectBoard.push(shield);
    }
    return acc;
  },
  {
    withProjectBoard: [] as ShieldConfig[],
    withoutProjectBoard: [] as ShieldConfig[],
  }
);

const shieldImageStyle = { borderRadius: '6.5px', transform: 'skew(-10deg)' };

const ProjectStats = ({
  repoPath,
  hasProjectBoard,
}: ProjectStatsProps): React.JSX.Element => {
  const visibleShields = hasProjectBoard
    ? shieldVariants.withProjectBoard
    : shieldVariants.withoutProjectBoard;

  return (
    <Stack spacing={1} alignItems="flex-start" sx={{ mb: 3 }}>
      {visibleShields.map(
        ({ key, hrefPath, imgPath, query, alt, className }) => (
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
              height="20"
              width="140"
              loading="lazy"
              decoding="async"
              style={shieldImageStyle}
            />
          </a>
        )
      )}
    </Stack>
  );
};

ProjectStats.displayName = 'ProjectStats';

export default ProjectStats;
