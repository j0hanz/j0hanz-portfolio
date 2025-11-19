import React, { memo, useMemo } from 'react';

import {
  HiMiniPlay,
  HiMiniServer,
  HiMiniUser,
  HiMiniUserGroup,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';

import gitpodLogo from '@/assets/gitpod.webp';
import hackathonBadge2 from '@/assets/hackathonBadge2.webp';
import hackathonBadge from '@/assets/hackathonBadge.webp';
import hackathonBadge3 from '@/assets/hackathonBadgeThirdPlace.webp';
import Button from '@/components/Button';
import {
  BadgeConfig,
  Project,
  ProjectBadgesProps,
  ProjectHeaderProps,
  ProjectLinksProps,
  ProjectListProps,
  ProjectMeta,
  ProjectStatsProps,
  ProjectTechStackProps,
  ShieldConfig,
} from '@/config/types';

import styles from './ProjectList.module.css';
import appStyles from '@/styles/App.module.css';

const badgeConfig: BadgeConfig[] = [
  {
    flag: 'isHackathon',
    src: hackathonBadge,
    alt: 'Hackathon Badge',
    className: styles.hackathonBadge,
  },
  {
    flag: 'isHackathon_2',
    src: hackathonBadge2,
    alt: 'Hackathon Badge',
    className: styles.hackathonBadge,
  },
  {
    flag: 'isHackathon_3',
    src: hackathonBadge3,
    alt: 'Hackathon Badge',
    className: styles.hackathonBadge,
  },
  {
    flag: 'gitpod_template',
    src: gitpodLogo,
    alt: 'Gitpod Template',
    className: styles.gitpodLogo,
  },
];

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

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'item';

const extractRepoPath = (githubUrl: string): string | null => {
  try {
    const parsedUrl = new URL(githubUrl);
    if (parsedUrl.hostname !== 'github.com') {
      return null;
    }

    return parsedUrl.pathname.replace(/^\/+/, '');
  } catch {
    return null;
  }
};

const ProjectHeader = memo(
  ({ project }: ProjectHeaderProps): React.JSX.Element => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.25rem',
            color: 'text.primary',
          }}
        >
          {Boolean(project.api) && (
            <HiMiniServer style={{ marginRight: '0.5rem' }} />
          )}
          {project.title}
          {Boolean(project.isNew) && (
            <Chip
              label="New"
              size="small"
              className={styles.newBadge}
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        <Box>
          {project.collaborative ? (
            <HiMiniUserGroup className={styles.userIcon} />
          ) : (
            <HiMiniUser className={styles.userIcon} />
          )}
        </Box>
      </Box>
    );
  }
);

ProjectHeader.displayName = 'ProjectHeader';

const ProjectTechStack = memo(
  ({ technologies }: ProjectTechStackProps): React.JSX.Element => {
    return (
      <div className={styles.technologies}>
        {technologies.map((tech, index) => (
          <Chip
            key={`${tech}-${index}`}
            label={tech}
            className={appStyles.customBadge}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </div>
    );
  }
);

ProjectTechStack.displayName = 'ProjectTechStack';

const ProjectStats = memo(
  ({ repoPath, hasProjectBoard }: ProjectStatsProps): React.JSX.Element => {
    const visibleShields = useMemo(
      () =>
        githubShields.filter((shield) =>
          shield.shouldRender ? shield.shouldRender(hasProjectBoard) : true
        ),
      [hasProjectBoard]
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
              />
            </a>
          )
        )}
      </Box>
    );
  }
);

ProjectStats.displayName = 'ProjectStats';

const ProjectBadges = memo(
  ({ badges }: ProjectBadgesProps): React.JSX.Element => (
    <>
      {badges.map(({ flag, src, alt, className }) => (
        <img key={flag} src={src} alt={alt} className={className} />
      ))}
    </>
  )
);

ProjectBadges.displayName = 'ProjectBadges';

const ProjectLinks = memo(
  ({ project }: ProjectLinksProps): React.JSX.Element => {
    return (
      <Box
        sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}
      >
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
  }
);

ProjectLinks.displayName = 'ProjectLinks';

const useProjectMeta = (project: Project): ProjectMeta => {
  const {
    github,
    title,
    projectBoard,
    isHackathon,
    isHackathon_2,
    isHackathon_3,
    gitpod_template,
  } = project;

  return useMemo(() => {
    const repoPath = extractRepoPath(github);
    const badges = badgeConfig.filter(({ flag }) => {
      switch (flag) {
        case 'isHackathon':
          return Boolean(isHackathon);
        case 'isHackathon_2':
          return Boolean(isHackathon_2);
        case 'isHackathon_3':
          return Boolean(isHackathon_3);
        case 'gitpod_template':
          return Boolean(gitpod_template);
        default:
          return false;
      }
    });
    return {
      repoPath,
      tooltipId: `tooltip-no-demo-${slugify(title)}`,
      badges,
      hasProjectBoard: Boolean(projectBoard),
    };
  }, [
    github,
    gitpod_template,
    isHackathon,
    isHackathon_2,
    isHackathon_3,
    projectBoard,
    title,
  ]);
};

// Component for displaying a list of projects
function ProjectListComponent({
  project,
}: ProjectListProps): React.JSX.Element {
  const { repoPath, tooltipId, badges, hasProjectBoard } =
    useProjectMeta(project);

  return (
    <Grid size={{ lg: 6 }} sx={{ mb: 4 }}>
      <Card className={`${appStyles.cardBgColor}`} sx={{ height: '100%' }}>
        <CardContent
          className={`${appStyles.cardBody} ${styles.badgePosition}`}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <ProjectHeader project={project} />
          <Typography className={appStyles.cardText} sx={{ mb: 2 }}>
            {project.description}
          </Typography>
          <ProjectTechStack technologies={project.technologies} />
          {repoPath ? (
            <ProjectStats
              repoPath={repoPath}
              hasProjectBoard={hasProjectBoard}
            />
          ) : null}
          <ProjectBadges badges={badges} />
          <ProjectLinks project={project} tooltipId={tooltipId} />
        </CardContent>
      </Card>
    </Grid>
  );
}

const ProjectList = memo(ProjectListComponent);
ProjectList.displayName = 'ProjectList';

export default ProjectList;
