import gitpodLogo from '@/assets/gitpod.webp';
import hackathonBadge2 from '@/assets/hackathonBadge2.webp';
import hackathonBadge from '@/assets/hackathonBadge.webp';
import hackathonBadge3 from '@/assets/hackathonBadgeThirdPlace.webp';
import { BadgeConfig, BadgeFlag, Project, ProjectMeta } from '@/config/types';

import styles from '@/features/projects/ProjectList.module.css';

export const badgeConfig: BadgeConfig[] = [
  {
    flag: 'isHackathon',
    src: hackathonBadge,
    alt: 'Hackathon Badge',
    className: styles.hackathonBadge,
    width: 112,
    height: 112,
  },
  {
    flag: 'isHackathon_2',
    src: hackathonBadge2,
    alt: 'Hackathon Badge',
    className: styles.hackathonBadge,
    width: 112,
    height: 112,
  },
  {
    flag: 'isHackathon_3',
    src: hackathonBadge3,
    alt: 'Hackathon Badge',
    className: styles.hackathonBadge,
    width: 112,
    height: 112,
  },
  {
    flag: 'gitpod_template',
    src: gitpodLogo,
    alt: 'Gitpod Template',
    className: styles.gitpodLogo,
    width: 56,
    height: 56,
  },
];

export const extractRepoPath = (githubUrl: string): string | null => {
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

export const useProjectMeta = (project: Project): ProjectMeta => {
  const {
    github,
    projectBoard,
    isHackathon,
    isHackathon_2,
    isHackathon_3,
    gitpod_template,
  } = project;

  const repoPath = extractRepoPath(github);
  const badgeFlags: Record<BadgeFlag, boolean> = {
    isHackathon: isHackathon ?? false,
    isHackathon_2: isHackathon_2 ?? false,
    isHackathon_3: isHackathon_3 ?? false,
    gitpod_template: gitpod_template ?? false,
  };
  const badges = badgeConfig.filter(({ flag }) => badgeFlags[flag]);

  return {
    repoPath,
    badges,
    hasProjectBoard: projectBoard ?? false,
  };
};
