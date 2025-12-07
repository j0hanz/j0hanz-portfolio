// Query key factories for type-safe cache management (TanStack Query v5 pattern)

// GitHub query key factory with hierarchical structure for granular invalidation
// Structure: ['github'] -> ['github', 'stats'] -> ['github', 'stats', 'repo', 'owner/repo']
export const githubKeys = {
  all: ['github'] as const,
  stats: () => [...githubKeys.all, 'stats'] as const,
  repoStats: (repoPath: string) =>
    [...githubKeys.stats(), 'repo', repoPath] as const,
} as const;

// Contact form mutation keys
export const contactKeys = {
  all: ['contact'] as const,
  submit: () => [...contactKeys.all, 'submit'] as const,
} as const;
