import {
  EMPTY_STATS,
  GITHUB_API_BASE_URL,
  QUERY_CONFIG,
} from '@/config/constants';
import type { RepoStats } from '@/config/types';

import { LONG_CACHE_OPTIONS, queryClient } from './client';
import { githubKeys } from './keys';

type GitHubRepoResponse = {
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
};

const isNumberOrUndefined = (value: unknown): value is number | undefined =>
  typeof value === 'number' || typeof value === 'undefined';

const isGitHubRepoResponse = (data: unknown): data is GitHubRepoResponse => {
  if (typeof data !== 'object' || data === null) return false;
  const record = data as Record<string, unknown>;
  return (
    isNumberOrUndefined(record.stargazers_count) &&
    isNumberOrUndefined(record.forks_count) &&
    isNumberOrUndefined(record.open_issues_count)
  );
};

// Fetches GitHub repo stats (stars, forks, issues) from 'owner/repo' path
export async function fetchRepoStats(
  repoPath: string,
  signal?: AbortSignal
): Promise<RepoStats> {
  if (!repoPath) {
    throw new Error('Repository path is required');
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

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

    const data: unknown = await response.json();

    // Validate response data
    if (!isGitHubRepoResponse(data)) {
      throw new Error('Invalid response from GitHub API');
    }

    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      issues: data.open_issues_count ?? 0,
    };
  } catch (error) {
    // Handle network errors - return cached data or empty stats
    // TypeError from fetch indicates network failure (offline, CORS, DNS, etc.)
    const isNetworkError =
      error instanceof TypeError ||
      (error instanceof DOMException && error.name === 'AbortError');

    if (isNetworkError) {
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
