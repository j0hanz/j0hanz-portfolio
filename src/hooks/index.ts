// Centralized exports for all reusable hooks

// Detects pointer interactions outside of the provided ref
export { useClickOutside } from './useClickOutside';

// Simple numeric state machine with increment/decrement helpers
export { useCounter } from './useCounter';
export type { UseCounterReturn } from '@/config/types';

// Debounces rapidly changing values before propagating downstream
export * from './useCursorMagnet';
export * from './useDebounce';

// Creates stable callback references that always access latest values
export { default as useEventCallback } from './useEventCallback';

// Lazily computes expensive values and exposes a manual refresh handle
export { useLazy } from './useLazy';
export type { UseLazyReturn } from '@/config/types';

// Captures the value from the previous render for comparison logic
export { usePrevious } from './usePrevious';

// Reactive wrapper around Web Storage APIs with JSON serialization
export { useStorage } from './useStorage';
export type {
  StorageSource,
  UseStorageOptions,
  UseStorageReturn,
} from '@/config/types';

// Boolean state helper with ergonomic toggle helpers
export { useToggle } from './useToggle';
export type { UseToggleReturn } from '@/config/types';

// Modal state management with semantic naming
export { default as useModal } from './useModal';

// Combines multiple refs into a single ref callback
export { default as useCombinedRefs } from './useCombinedRefs';

// Triggers an animation sequence when a section is scrolled into view
export { default as useScrollAnimation } from './useScrollAnimation';

// Accesses the NavigationContext
export {
  useNavigation,
  useNavigationActions,
  useNavigationState,
} from './useNavigation';

// Accesses the ThemeMode context with helpful error messaging
export { useTheme } from './useTheme';

// Copies text to clipboard and provides success/error feedback
export { default as useCopyToClipboard } from './useCopyToClipboard';

// Detects if the mouse is hovering over a specific element
export { default as useHover } from './useHover';

// Detects if the user is currently online or offline
export { default as useConnectivity, useOnlineStatus } from './useOnlineStatus';

// Accesses the SnackbarContext
export { default as useSnackbar } from './useSnackbar';

// Runs an effect only once on mount (strict mode safe)
export { default as useEffectOnce } from './useEffectOnce';

// Attaches an event listener to a DOM element, window, or document
export { default as useEventListener } from './useEventListener';

// Motion helpers respecting reduced-motion preferences
export {
  useReducedMotion,
  useAnimationConfig,
  useCardHover,
  useButtonGesture,
  useScrollProgress,
  useInView,
  usePresence,
  useAnimationSequence,
  useMeasure,
  useAnimationPriority,
  useContentMotion,
  useSectionSequence,
} from './useMotions';

// ============================================================================
// TanStack Query Hooks and Utilities
// ============================================================================

// TanStack Query hooks for data fetching with Suspense (prefer over deprecated useFetch)
export {
  githubKeys,
  queryClient,
  useRepoStatsQuery,
  useContactFormMutation,
  fetchRepoStats,
  submitContactForm,
  handleQueryError,
  buildQueryKey,
  prefetchRepoStats,
} from '@/utils/query';
