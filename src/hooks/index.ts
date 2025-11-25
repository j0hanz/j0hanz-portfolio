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

// Tracks image loading state with stable handlers
export { useImageLoading } from './useImageLoading';

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
export {
  default as useCopyToClipboard,
  useCopyWithFeedback,
} from './useCopyToClipboard';

// Detects if the mouse is hovering over a specific element
export { default as useHover } from './useHover';

// Detects if the user is currently online or offline
export { default as useConnectivity, useOnlineStatus } from './useOnlineStatus';

// Accesses the SnackbarContext
export { default as useSnackbar } from './useSnackbar';

// Attaches an event listener to a DOM element, window, or document
export { default as useEventListener } from './useEventListener';

// Motion helpers respecting reduced-motion preferences
export {
  useReducedMotion,
  useAnimationConfig,
  useCardHover,
  useButtonGesture,
  useScrollProgress,
  useSmoothScrollProgress,
  useScrollDirection,
  useContinuousMotion,
  useParallaxTransform,
  useInView,
  usePresence,
  useAnimationSequence,
  useMeasure,
  useAnimationPriority,
  useContentMotion,
  useSectionSequence,
  useMotionVariant,
  useInViewMotion,
  useCountUp,
  // Motion v12 enhanced hooks
  useMotionVelocity,
  useTimeBasedAnimation,
  useCursorFollow,
  useCursorGradient,
  useVelocityTilt,
  useTimelineSequence,
  useEnhancedScrollProgress,
  useContinuousFrame,
  useBatchedDomUpdate,
  usePulse,
  useSvgPathDraw,
} from './useMotions';

// ============================================================================
// TanStack Query Hooks and Utilities
// ============================================================================

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
  invalidateRepoStats,
} from '@/utils/query/index';

export * from './useScrollEvents';
