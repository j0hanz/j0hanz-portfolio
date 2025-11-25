import gitpodLogo from '@/assets/gitpod.webp';
import hackathonBadge2 from '@/assets/hackathonBadge2.webp';
import hackathonBadge from '@/assets/hackathonBadge.webp';
import hackathonBadge3 from '@/assets/hackathonBadgeThirdPlace.webp';
import { BadgeConfig, Project, ProjectMeta } from '@/config/types';

const hackathonBadgeBase = {
  alt: 'Hackathon Badge',
  style: {
    position: 'absolute',
    bottom: '3rem',
    right: '0.5rem',
    width: '7rem',
    filter: 'contrast(0.9)',
  },
  width: 112,
  height: 112,
} as const;

export const badgeConfig = [
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
      bottom: '4rem',
      right: '1rem',
      width: '3.5rem',
      filter: 'contrast(0.9)',
    },
    width: 56,
    height: 56,
  },
] satisfies BadgeConfig[];

const repoPathCache = new Map<string, string | null>();
const projectMetaCache = new WeakMap<Project, ProjectMeta>();

export const extractRepoPath = (githubUrl: string): string | null => {
  const cached = repoPathCache.get(githubUrl);
  if (cached !== undefined) {
    return cached;
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
    hackathonType,
    isGitpodTemplate = false,
  } = project;

  const repoPath = extractRepoPath(github);

  const badges = badgeConfig.filter((config) => {
    if (config.flag === 'isGitpodTemplate') return isGitpodTemplate;
    return config.flag === hackathonType;
  });

  const meta: ProjectMeta = {
    repoPath,
    badges,
    hasProjectBoard: projectBoard,
  };
  projectMetaCache.set(project, meta);
  return meta;
};
