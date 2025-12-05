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

const repoPathCache = new Map<string, string | null>();
const projectMetaCache = new WeakMap<Project, ProjectMeta>();

const extractRepoPath = (githubUrl: string): string | null => {
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
