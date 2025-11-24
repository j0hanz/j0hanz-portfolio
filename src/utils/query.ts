// TanStack Query configuration and custom hooks for data fetching with React 19 Suspense
import {
  QueryClient,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query';

import type { ContactFormValues, RepoStats } from '@/config/types';
import { sendEmail } from '@/lib/emailJs';
import { validateForm } from '@/utils/validation';

// ============================================================================
// Query Client Configuration
// ============================================================================

// QueryClient configured for React 19 Suspense with 1min staleTime, 5min gcTime, and error throwing
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      gcTime: 300000, // 5 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      // throwOnError is required for Suspense to work with error boundaries
      throwOnError: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// ============================================================================
// Query Key Factories
// ============================================================================

// Query key factory for GitHub queries: ['github', 'repo-stats', 'owner/repo']
export const githubKeys = {
  all: ['github'] as const,
  repoStats: (repoPath: string) => ['github', 'repo-stats', repoPath] as const,
};

// ============================================================================
// GitHub API Queries
// ============================================================================

// Fetches GitHub repo stats (stars, forks, issues) from 'owner/repo' path
export async function fetchRepoStats(
  repoPath: string,
  signal?: AbortSignal
): Promise<RepoStats> {
  const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    signal,
  });

  if (!response.ok) {
    // Log warning for rate limits or not found, but don't throw
    console.warn(`Failed to fetch stats for ${repoPath}: ${response.status}`);
    // Return empty stats instead of throwing to prevent Error Boundary
    return { stars: 0, forks: 0, issues: 0 };
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
    staleTime: 600000, // 10 minutes
    gcTime: 1800000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: true,
  });
}

// Prefetches GitHub stats (useful for hover/navigation to reduce loading time)
export function prefetchRepoStats(repoPath: string): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: githubKeys.repoStats(repoPath),
    queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
    staleTime: 600000, // 10 minutes
    gcTime: 1800000, // 30 minutes
  });
}

// ============================================================================
// Contact Form Mutations
// ============================================================================

// Submits contact form via EmailJS (validates and returns success/failure)
export async function submitContactForm(
  data: ContactFormValues
): Promise<boolean> {
  // Validate form data before submission
  const errors = validateForm(data);
  if (Object.keys(errors).length > 0) {
    // Throw first error message for mutation to catch
    const firstError = Object.values(errors)[0];
    throw new Error(firstError);
  }

  // Send email via EmailJS
  const success = await sendEmail(data);

  if (!success) {
    throw new Error('Failed to send message. Please try again.');
  }

  return success;
}

// Mutation hook for contact form (1 retry, with isPending/isSuccess/isError states)
export function useContactFormMutation() {
  return useMutation<boolean, Error, ContactFormValues>({
    mutationFn: submitContactForm,
    retry: 1,
    // Note: onSuccess and onError can be provided when calling mutate()
    // to integrate with component-specific logic like showing snackbars
  });
}

// ============================================================================
// Utility Functions
// ============================================================================

// Handles query errors by returning user-friendly error message
export function handleQueryError(error: Error): string {
  if (error.message.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  if (error.message.includes('rate limit')) {
    return 'GitHub API rate limit exceeded. Please try again later.';
  }
  return error.message || 'An unexpected error occurred.';
}

// Builds type-safe query key from parts: buildQueryKey('users', id, filters)
export function buildQueryKey(...parts: unknown[]): readonly unknown[] {
  return parts;
}

// ============================================================================
// Best Practices & Patterns
// ============================================================================

// Query Key Naming: Use hierarchical structure ['resource', id, ...filters]
// Cache Invalidation: queryClient.invalidateQueries({ queryKey: githubKeys.all })
// Optimistic Updates: Use queryClient.setQueryData, invalidate in onSettled
// React 19 Suspense: useSuspenseQuery with throwOnError:true, wrap in <Suspense> and <ErrorBoundary>
// Mutations: Use useMutation with onSuccess/onError callbacks, validate before submission
// Prefetching: prefetchRepoStats(repoPath) on hover/intent reduces perceived loading
// Placeholder Data: placeholderData: keepPreviousData prevents loading flashes
// Background Refetching: Auto on focus/reconnect, add refetchInterval for real-time data
// Query Cancellation: All query functions accept AbortSignal, auto-canceled on unmount
// Global Loading: useIsFetching() shows count of active queries for global spinner
