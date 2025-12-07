import gitpodLogo from '@/assets/gitpod.webp';
import hackathonBadge2 from '@/assets/hackathonBadge2.webp';
import hackathonBadge from '@/assets/hackathonBadge.webp';
import hackathonBadge3 from '@/assets/hackathonBadgeThirdPlace.webp';
import { BadgeConfig, Project, ProjectMeta } from '@/config/types';

// Badge image dimensions (fixed for image assets)
const BADGE_SIZE = {
  hackathon: { width: 112, height: 112 },
  gitpod: { width: 56, height: 56 },
} as const;

const hackathonBadgeBase = {
  alt: 'Hackathon Badge',
  style: {
    position: 'absolute',
    bottom: 48, // 3rem = 48px
    right: 8, // 0.5rem = 8px
    width: 112, // 7rem = 112px
    filter: 'contrast(0.9)',
  },
  ...BADGE_SIZE.hackathon,
} as const;

const badgeConfig = [
  {
    flag: 'december-2024',
    src: hackathonBadge,
    ...hackathonBadgeBase,
  },
  {
    flag: 'september-2024',
    src: hackathonBadge,
    ...hackathonBadgeBase,
  },
  {
    flag: 'march-2025',
    src: hackathonBadge2,
    ...hackathonBadgeBase,
  },
  {
    flag: 'november-2024',
    src: hackathonBadge3,
    ...hackathonBadgeBase,
  },
  {
    flag: 'isGitpodTemplate',
    src: gitpodLogo,
    alt: 'Gitpod Template',
    style: {
      position: 'absolute',
      bottom: 64, // 4rem = 64px
      right: 16, // 1rem = 16px
      width: 56, // 3.5rem = 56px
      filter: 'contrast(0.9)',
    },
    ...BADGE_SIZE.gitpod,
  },
] satisfies BadgeConfig[];

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

export const getProjectMeta = (project: Project): ProjectMeta => {
  const {
    github,
    projectBoard = false,
    hackathonType,
    isGitpodTemplate = false,
  } = project;

  const repoPath = extractRepoPath(github);

  const badges = badgeConfig.filter((config) => {
    if (config.flag === 'isGitpodTemplate') return isGitpodTemplate;
    return config.flag === hackathonType;
  });

  return {
    repoPath,
    badges,
    hasProjectBoard: projectBoard,
  };
};

// Extract all valid repo paths from a list of projects for batch prefetching
export const getProjectRepoPaths = (projectList: Project[]): string[] =>
  projectList
    .map((p) => extractRepoPath(p.github))
    .filter((path): path is string => path !== null && path.length > 0);
