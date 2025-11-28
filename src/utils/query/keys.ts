// Query key factories for type-safe cache management (TanStack Query v5 pattern)

// GitHub query key factory with hierarchical structure for granular invalidation
// Structure: ['github'] -> ['github', 'stats'] -> ['github', 'stats', 'repo', 'owner/repo']
export const githubKeys = {
  all: ['github'] as const,
  stats: () => [...githubKeys.all, 'stats'] as const,
  repoStats: (repoPath: string) =>
    [...githubKeys.stats(), 'repo', repoPath] as const,
} as const;

// Contact query key factory for mutations
export const contactKeys = {
  all: ['contact'] as const,
  submission: () => [...contactKeys.all, 'submission'] as const,
} as const;

// Type-safe query key builder with generic type preservation
export function buildQueryKey<
  T extends readonly (string | number | boolean | object)[],
>(...parts: T): readonly [...T] {
  return parts as readonly [...T];
}
