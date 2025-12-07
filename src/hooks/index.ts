// ============================================================================
// HOOKS BARREL EXPORT
// Organized by category for discoverability and maintainability
// ============================================================================

// ============================================================================
// CORE UTILITY HOOKS
// Fundamental hooks used across the application
// ============================================================================

export { useEventCallback } from './useEventCallback';
export { useToggle } from './useToggle';
export { useModal } from './useModal';

// ============================================================================
// UI STATE HOOKS
// Interaction and loading state management
// ============================================================================

export { useHover } from './useHover';
export { useImageLoading } from './useImageLoading';
export { useInitialLoading } from './useInitialLoading';
export { useCopyWithFeedback } from './useCopyToClipboard';
export * from './useCursorMagnet';

// ============================================================================
// CONTEXT HOOKS
// Accessing React Context providers
// ============================================================================

// Navigation (split for render optimization)
export { useNavigationState, useNavigationActions } from './useNavigation';

// Theme (split for render optimization)
export { useThemeModeState, useThemeModeActions } from './useTheme';

// Snackbar notifications (split for render optimization)
export { useSnackbar } from './useSnackbar';

// CV Modal (split for render optimization)
export { useCvModalActions } from './useCvModal';

// Connectivity status
export { useConnectivity } from './useOnlineStatus';

// ============================================================================
// SCROLL & NAVIGATION HOOKS
// Full-page scroll and scroll event handling
// ============================================================================

export { useFullPageScroll } from './useFullPageScroll';

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

// ============================================================================
// DATA FETCHING (TanStack Query)
// Query hooks and utilities
// ============================================================================

export {
  // GitHub queries
  prefetchRepoStats,
  // Contact mutations
  useContactFormMutation,
} from '@/utils/query/index';

export { ProfilerWrapper } from '@/components/ProfilerWrapper';

export {
  getProfilerMetrics,
  getAverageRenderTime,
  clearProfilerMetrics,
  getRenderCount,
  isExcessiveRerender,
} from '@/utils/profilerMetrics';
