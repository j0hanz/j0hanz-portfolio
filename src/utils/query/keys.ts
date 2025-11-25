// Query key factories for type-safe cache management

// Query key factory for GitHub queries: ['github', 'repo-stats', 'owner/repo']
export const githubKeys = {
  all: ['github'] as const,
  repoStats: (repoPath: string) => ['github', 'repo-stats', repoPath] as const,
};

// Query key factory for contact form mutations
export const contactKeys = {
  all: ['contact'] as const,
  submission: () => [...contactKeys.all, 'submission'] as const,
};

// Builds type-safe query key from parts with generic type preservation
export function buildQueryKey<
  T extends readonly (string | number | boolean | object)[],
>(...parts: T): readonly [...T] {
  return parts as readonly [...T];
}
