// TanStack Query - centralized exports
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

export { queryClient } from './client';
export { buildQueryKey, contactKeys, githubKeys } from './keys';
export {
  fetchRepoStats,
  invalidateRepoStats,
  prefetchRepoStats,
  useRepoStatsQuery,
} from './github';
export { submitContactForm, useContactFormMutation } from './contact';
export { handleQueryError } from './utils';
