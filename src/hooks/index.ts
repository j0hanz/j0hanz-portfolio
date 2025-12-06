// ============================================================================
// HOOKS BARREL EXPORT
// Organized by category for discoverability and maintainability
// ============================================================================

// ============================================================================
// CORE UTILITY HOOKS
// Fundamental hooks used across the application
// ============================================================================

export { useEventCallback } from './useEventCallback';
export { useEventListener } from './useEventListener';
export { useToggle } from './useToggle';
export { useModal } from './useModal';

export type { UseModalReturn, UseToggleReturn } from '@/config/types';

// ============================================================================
// UI STATE HOOKS
// Interaction and loading state management
// ============================================================================

export { useHover } from './useHover';
export { useImageLoading } from './useImageLoading';
export { useInitialLoading } from './useInitialLoading';
export { useCopyToClipboard, useCopyWithFeedback } from './useCopyToClipboard';
export * from './useCursorMagnet';

export type { UseImageLoadingReturn } from '@/config/types';

// ============================================================================
// CONTEXT HOOKS
// Accessing React Context providers
// ============================================================================

// Navigation (split for render optimization)
export { useNavigationState, useNavigationActions } from './useNavigation';

// Theme (split for render optimization)
export { useTheme, useThemeModeState, useThemeModeActions } from './useTheme';

// Snackbar notifications (split for render optimization)
export {
  useSnackbar,
  useSnackbarState,
  useSnackbarActions,
} from './useSnackbar';

// CV Modal (split for render optimization)
export { useCvModalState, useCvModalActions } from './useCvModal';

// Connectivity status
export { useConnectivity, useOnlineStatus } from './useOnlineStatus';

// ============================================================================
// SCROLL & NAVIGATION HOOKS
// Full-page scroll and scroll event handling
// ============================================================================

export { useFullPageScroll } from './useFullPageScroll';
export { useScrollEvents } from './useScrollEvents';

// ============================================================================
// MOTION & ANIMATION HOOKS
// Framer Motion utilities respecting reduced-motion preferences
// ============================================================================

// Core motion utilities
export {
  useReducedMotion,
  useAnimationConfig,
  useAnimationPriority,
  useMotionVariant,
  useContentMotion,
} from './useMotions';

// Gesture hooks
export { useCardHover, useButtonGesture } from './useMotions';

// Scroll-linked animations
export { useInView } from './useMotions';

// Animation sequencing
export { useBatchedDomUpdate } from './useMotions';

// Timeline-specific hooks (shared patterns for Education/WorkExperience)
export {
  useTimelineSectionController,
  useTimelineCardMotion,
} from './useMotions';

// Measurement & continuous motion
export { useCountUp, useVelocityTilt } from './useMotions';

// ============================================================================
// RESPONSIVE HOOKS
// Breakpoint detection and responsive utilities
// ============================================================================

export { useMobileBreakpoint } from './useBreakpoints';

// ============================================================================
// RESPONSIVE CONSTANTS (Re-exported for convenience)
// Import directly from @/config/responsive for full access
// ============================================================================

export {
  SPACING,
  GRID,
  CONTAINER_WIDTH,
  FONT_SIZE,
  SIZE,
} from '@/config/responsive';

export type { BreakpointKey, ResponsiveValue } from '@/config/responsive';

// ============================================================================
// DATA FETCHING (TanStack Query)
// Query hooks and utilities
// ============================================================================

export {
  // Query client
  queryClient,
  LONG_CACHE_OPTIONS,
  // Query keys
  githubKeys,
  contactKeys,
  buildQueryKey,
  // GitHub queries
  useRepoStatsQuery,
  fetchRepoStats,
  prefetchRepoStats,
  invalidateRepoStats,
  // Contact mutations
  useContactFormMutation,
  submitContactForm,
} from '@/utils/query/index';
