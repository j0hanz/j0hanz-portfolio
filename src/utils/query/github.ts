// GitHub API queries with TanStack Query
import { useSuspenseQuery } from '@tanstack/react-query';

import { EMPTY_STATS, GITHUB_API_BASE_URL } from '@/config/constants';
import type { RepoStats } from '@/config/types';

import { LONG_CACHE_OPTIONS, queryClient } from './client';
import { githubKeys } from './keys';

// Fetches GitHub repo stats (stars, forks, issues) from 'owner/repo' path
export async function fetchRepoStats(
  repoPath: string,
  signal?: AbortSignal
): Promise<RepoStats> {
  if (!repoPath) {
    throw new Error('Repository path is required');
  }

  // Build headers with optional authentication
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Add GitHub token if available (increases rate limit from 60 to 5000/hour)
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  try {
    // Add artificial delay to make skeleton loading visible
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Don't remove!

    const response = await fetch(`${GITHUB_API_BASE_URL}/${repoPath}`, {
      headers,
      signal,
    });

    // Handle rate limiting
    if (response.status === 403 || response.status === 429) {
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');

      if (import.meta.env.DEV) {
        console.warn(
          `GitHub rate limited for ${repoPath}. Remaining: ${rateLimitRemaining}, Reset: ${rateLimitReset ? new Date(Number(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown'}`
        );
      }

      // Return cached data if available
      const cached = queryClient.getQueryData<RepoStats>(
        githubKeys.repoStats(repoPath)
      );
      if (cached) return cached;

      // Return empty stats as fallback
      return EMPTY_STATS;
    }

    // Handle not found
    if (response.status === 404) {
      if (import.meta.env.DEV) {
        console.warn(`Repository not found: ${repoPath}`);
      }
      return EMPTY_STATS;
    }

    // Handle other errors
    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Validate response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response from GitHub API');
    }

    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      issues: data.open_issues_count ?? 0,
    };
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      if (import.meta.env.DEV) {
        console.error('Network error fetching GitHub stats:', error);
      }
      // Return cached data or empty stats
      const cached = queryClient.getQueryData<RepoStats>(
        githubKeys.repoStats(repoPath)
      );
      return cached ?? EMPTY_STATS;
    }

    // Re-throw other errors
    throw error;
  }
}

// Suspense hook for GitHub stats with long cache (10min stale, 30min gc)
export function useRepoStatsQuery(repoPath: string) {
  return useSuspenseQuery({
    queryKey: githubKeys.repoStats(repoPath),
    queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
    ...LONG_CACHE_OPTIONS,
    retry: 2,
    refetchOnWindowFocus: true,
  });
}

// Prefetches GitHub stats on hover/navigation to reduce perceived loading
export function prefetchRepoStats(repoPath: string): Promise<void> {
  if (!repoPath) {
    if (import.meta.env.DEV) {
      console.warn('Cannot prefetch: empty repository path');
    }
    return Promise.resolve();
  }

  return queryClient
    .prefetchQuery({
      queryKey: githubKeys.repoStats(repoPath),
      queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
      ...LONG_CACHE_OPTIONS,
    })
    .catch((error) => {
      if (import.meta.env.DEV) {
        console.error(`Failed to prefetch stats for ${repoPath}:`, error);
      }
      // Silently fail - prefetch is optional
    });
}

// Invalidates GitHub repo stats cache (all or specific repo)
export function invalidateRepoStats(repoPath?: string): Promise<void> {
  return queryClient.invalidateQueries({
    queryKey: repoPath ? githubKeys.repoStats(repoPath) : githubKeys.all,
  });
}
