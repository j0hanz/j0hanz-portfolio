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

// Snackbar notifications
export { useSnackbar } from './useSnackbar';

// CV Modal (split for render optimization)
export { useCvModalActions } from './useCvModal';

// Menu (split for render optimization)
export { useMenuState, useMenuActions } from './useMenuContext';

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

export {
  useAnimationConfig,
  useAnimationPriority,
  useBatchedDomUpdate,
  useButtonGesture,
  useCardHover,
  useContentMotion,
  useCountUp,
  useInView,
  useMotionVariant,
  useReducedMotion,
  useTimelineCardMotion,
  useTimelineSectionController,
  useVelocityTilt,
} from './useMotions';

// ============================================================================
// RESPONSIVE HOOKS
// Breakpoint detection and responsive utilities
// ============================================================================

export { useMobileBreakpoint } from './useBreakpoints';

// ============================================================================
// DATA FETCHING (TanStack Query)
// ============================================================================

export { useGitHubApi } from './useGitHubApi';
export { prefetchRepoStats, useContactFormMutation } from '@/utils/query/index';
