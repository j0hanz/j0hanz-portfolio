// TanStack Query - centralized exports
// Query Key Naming: Use hierarchical structure ['resource', 'scope', ...filters]
// Cache Invalidation: queryClient.invalidateQueries({ queryKey: githubKeys.all })
// Optimistic Updates: Use queryClient.setQueryData, invalidate in onSettled
// React 19 Suspense: useSuspenseQuery with throwOnError:true, wrap in <Suspense> and <ErrorBoundary>
// Mutations: Use useMutation with onSuccess/onError callbacks, validate before submission
// Prefetching: prefetchRepoStats(repoPath) on hover reduces perceived loading
// Background Refetching: Auto on focus/reconnect, add refetchInterval for real-time data
// Query Cancellation: All query functions accept AbortSignal, auto-canceled on unmount
// Global Loading: useIsFetching() shows count of active queries for global spinner

export { LONG_CACHE_OPTIONS, queryClient } from './client';
export { buildQueryKey, contactKeys, githubKeys } from './keys';
export {
  fetchRepoStats,
  invalidateRepoStats,
  prefetchRepoStats,
  useRepoStatsQuery,
} from './github';
export { submitContactForm, useContactFormMutation } from './contact';
export { classifyQueryError, handleQueryError } from './utils';
export type { QueryErrorInfo, QueryErrorType } from './utils';
