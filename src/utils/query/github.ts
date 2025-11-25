// GitHub API queries with TanStack Query
import { useSuspenseQuery } from '@tanstack/react-query';

import { GITHUB_API_BASE_URL, QUERY_CONFIG } from '@/config/constants';
import type { RepoStats } from '@/config/types';

import { queryClient } from './client';
import { githubKeys } from './keys';

// Fetches GitHub repo stats (stars, forks, issues) from 'owner/repo' path
export async function fetchRepoStats(
  repoPath: string,
  signal?: AbortSignal
): Promise<RepoStats> {
  const response = await fetch(`${GITHUB_API_BASE_URL}/${repoPath}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    signal,
  });

  if (!response.ok) {
    // Rate limit (403/429) - return cached data or empty stats gracefully
    if (response.status === 403 || response.status === 429) {
      if (import.meta.env.DEV) {
        console.warn(`GitHub rate limited for ${repoPath}`);
      }
      const cached = queryClient.getQueryData<RepoStats>(
        githubKeys.repoStats(repoPath)
      );
      return cached ?? { stars: 0, forks: 0, issues: 0 };
    }

    // Not found - return empty stats (repo may be private/deleted)
    if (response.status === 404) {
      return { stars: 0, forks: 0, issues: 0 };
    }

    // Other errors - throw to trigger ErrorBoundary retry
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
    issues: data.open_issues_count ?? 0,
  };
}

// Suspense hook for GitHub stats (10min staleTime, 30min gcTime) - wrap in <Suspense>
export function useRepoStatsQuery(repoPath: string) {
  return useSuspenseQuery({
    queryKey: githubKeys.repoStats(repoPath),
    queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
    staleTime: QUERY_CONFIG.STALE_TIME_LONG,
    gcTime: QUERY_CONFIG.GC_TIME_LONG,
    retry: 2,
    refetchOnWindowFocus: true,
  });
}

// Prefetches GitHub stats (useful for hover/navigation to reduce loading time)
export function prefetchRepoStats(repoPath: string): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: githubKeys.repoStats(repoPath),
    queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
    staleTime: QUERY_CONFIG.STALE_TIME_LONG,
    gcTime: QUERY_CONFIG.GC_TIME_LONG,
  });
}

// Invalidates GitHub repo stats cache (all or specific repo)
export function invalidateRepoStats(repoPath?: string): Promise<void> {
  return queryClient.invalidateQueries({
    queryKey: repoPath ? githubKeys.repoStats(repoPath) : githubKeys.all,
  });
}
