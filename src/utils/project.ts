import gitpodLogo from '@/assets/gitpod.webp';
import hackathonBadge2 from '@/assets/hackathonBadge2.webp';
import hackathonBadge from '@/assets/hackathonBadge.webp';
import hackathonBadge3 from '@/assets/hackathonBadgeThirdPlace.webp';
import { BadgeConfig, BadgeFlag, Project, ProjectMeta } from '@/config/types';

const commonBadgeStyle = {
  position: 'absolute',
  bottom: '3rem',
  right: '0.5rem',
  width: '7rem',
  filter: 'contrast(0.9)',
} as const;

const hackathonBadgeBase = {
  alt: 'Hackathon Badge',
  style: commonBadgeStyle,
  width: 112,
  height: 112,
} as const;

export const badgeConfig: BadgeConfig[] = [
  {
    flag: 'isHackathon',
    src: hackathonBadge,
    ...hackathonBadgeBase,
  },
  {
    flag: 'isHackathon_2',
    src: hackathonBadge2,
    ...hackathonBadgeBase,
  },
  {
    flag: 'isHackathon_3',
    src: hackathonBadge3,
    ...hackathonBadgeBase,
  },
  {
    flag: 'gitpod_template',
    src: gitpodLogo,
    alt: 'Gitpod Template',
    style: {
      position: 'absolute',
      bottom: '4rem',
      right: '1rem',
      width: '3.5rem',
      filter: 'contrast(0.9)',
    },
    width: 56,
    height: 56,
  },
];

const repoPathCache = new Map<string, string | null>();
const projectMetaCache = new WeakMap<Project, ProjectMeta>();

export const extractRepoPath = (githubUrl: string): string | null => {
  if (repoPathCache.has(githubUrl)) {
    return repoPathCache.get(githubUrl) ?? null;
  }

  try {
    const parsedUrl = new URL(githubUrl);
    if (parsedUrl.hostname !== 'github.com') {
      repoPathCache.set(githubUrl, null);
      return null;
    }

    const repoPath = parsedUrl.pathname.replace(/^\/+/, '');
    repoPathCache.set(githubUrl, repoPath);
    return repoPath;
  } catch {
    repoPathCache.set(githubUrl, null);
    return null;
  }
};

export const getProjectMeta = (project: Project): ProjectMeta => {
  const cachedMeta = projectMetaCache.get(project);
  if (cachedMeta) return cachedMeta;

  const {
    github,
    projectBoard = false,
    isHackathon = false,
    isHackathon_2 = false,
    isHackathon_3 = false,
    gitpod_template = false,
  } = project;

  const repoPath = extractRepoPath(github);
  const badgeFlags: Record<BadgeFlag, boolean> = {
    isHackathon,
    isHackathon_2,
    isHackathon_3,
    gitpod_template,
  };
  const badges = badgeConfig.filter((config) => badgeFlags[config.flag]);

  const meta: ProjectMeta = {
    repoPath,
    badges,
    hasProjectBoard: projectBoard,
  };
  projectMetaCache.set(project, meta);
  return meta;
};
