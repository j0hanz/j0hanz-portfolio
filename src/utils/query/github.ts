import {
  EMPTY_STATS,
  GITHUB_API_BASE_URL,
  QUERY_CONFIG,
} from '@/config/constants';
import type { RepoStats } from '@/config/types';

import { LONG_CACHE_OPTIONS, queryClient } from './client';
import { githubKeys } from './keys';

// Fetches GitHub repo stats (stars, forks, issues) from 'owner/repo' path
async function fetchRepoStats(
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
    // Add artificial delay in development to make skeleton loading visible
    if (import.meta.env.DEV) {
      await new Promise((resolve) =>
        setTimeout(resolve, QUERY_CONFIG.DEV_DELAY_MS)
      );
    }

    const response = await fetch(`${GITHUB_API_BASE_URL}/${repoPath}`, {
      headers,
      signal,
    });

    // Handle rate limiting - return cached data or empty stats
    if (response.status === 403 || response.status === 429) {
      const cached = queryClient.getQueryData<RepoStats>(
        githubKeys.repoStats(repoPath)
      );
      return cached ?? EMPTY_STATS;
    }

    // Handle not found - return empty stats
    if (response.status === 404) {
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
    // Handle network errors - return cached data or empty stats
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const cached = queryClient.getQueryData<RepoStats>(
        githubKeys.repoStats(repoPath)
      );
      return cached ?? EMPTY_STATS;
    }

    // Re-throw other errors
    throw error;
  }
}

// Prefetches GitHub stats on hover/navigation to reduce perceived loading
export function prefetchRepoStats(repoPath: string): Promise<void> {
  if (!repoPath) return Promise.resolve();

  return queryClient
    .prefetchQuery({
      queryKey: githubKeys.repoStats(repoPath),
      queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
      ...LONG_CACHE_OPTIONS,
    })
    .catch(() => {
      // Silently fail - prefetch is optional enhancement
    });
}
