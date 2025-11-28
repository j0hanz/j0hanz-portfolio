// TanStack QueryClient configuration for React 19 Suspense
import { QueryClient } from '@tanstack/react-query';

import { QUERY_CONFIG } from '@/config/constants';

// Default query options with React 19 Suspense support
const DEFAULT_QUERY_OPTIONS = {
  staleTime: QUERY_CONFIG.STALE_TIME_SHORT,
  gcTime: QUERY_CONFIG.GC_TIME_SHORT,
  retry: 1,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  // throwOnError required for Suspense with error boundaries
  throwOnError: true,
} as const;

// Long-lived cache options for GitHub stats (10min stale, 30min gc)
export const LONG_CACHE_OPTIONS = {
  staleTime: QUERY_CONFIG.STALE_TIME_LONG,
  gcTime: QUERY_CONFIG.GC_TIME_LONG,
} as const;

// QueryClient with React 19 Suspense defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTIONS,
    mutations: {
      retry: 1,
    },
  },
});
