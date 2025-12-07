// GitHub query key factory for type-safe cache management (TanStack Query v5)
export const githubKeys = {
  all: ['github'] as const,
  stats: () => [...githubKeys.all, 'stats'] as const,
  repoStats: (repoPath: string) =>
    [...githubKeys.stats(), 'repo', repoPath] as const,
} as const;
