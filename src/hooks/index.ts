// Centralized exports for all reusable hooks

// Detects pointer interactions outside of the provided ref
// Note: For most cases, prefer MUI's ClickAwayListener component instead
export { useClickOutside } from './useClickOutside';

// Debounces rapidly changing values before propagating downstream
export * from './useCursorMagnet';
export * from './useDebounce';

// Creates stable callback references that always access latest values
export { default as useEventCallback } from './useEventCallback';

// Tracks image loading state with stable handlers
export { useImageLoading } from './useImageLoading';
export type { UseImageLoadingReturn } from './useImageLoading';

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
export type { UseModalReturn } from './useModal';

// Combines multiple refs into a single ref callback
export { default as useCombinedRefs } from './useCombinedRefs';

// Triggers an animation sequence when a section is scrolled into view
export { default as useScrollAnimation } from './useScrollAnimation';

// Full-page scroll navigation
export { useFullPageScroll } from './useFullPageScroll';

// Accesses the NavigationContext
// Split hooks: useNavigationState (full state), useNavigationActions (actions only)
export {
  useNavigation,
  useNavigationActions,
  useNavigationState,
} from './useNavigation';

// Accesses the ThemeMode context with helpful error messaging
// Split hooks for render optimization: useThemeModeState (read-only), useThemeModeActions (actions)
export { useTheme, useThemeModeActions, useThemeModeState } from './useTheme';

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
  // Timeline section setup hook
  useTimelineSectionRefs,
  useTimelineSectionController,
  // Card inView hook
  useCardInView,
  // Timeline card motion hook (shared for Education/WorkExperience)
  useTimelineCardMotion,
} from './useMotions';

// ============================================================================
// Responsive Breakpoint Hooks (consolidated)
// ============================================================================

export {
  // Core breakpoint detection hooks
  useMobileBreakpoint,
  useDesktopBreakpoint,
  useBreakpointBetween,
  useBreakpointOnly,
  useCurrentBreakpoint,
  useCurrentBreakpointSync,
  useResponsiveValue,
  // Viewport and device detection
  useViewportDimensions,
  useIsTouchDevice,
  usePrefersReducedMotion,
  usePrefersDarkMode,
  useHasHoverCapability,
  // Breakpoint comparison utilities
  getBreakpointIndex,
  isBreakpointSmaller,
  isBreakpointLargerOrEqual,
} from './useBreakpoints';

// ============================================================================
// Responsive Constants (re-exported from config for convenience)
// ============================================================================

export {
  RESPONSIVE_SPACING,
  CONTAINER_MAX_WIDTH,
  GRID_COLUMNS,
  RESPONSIVE_FONT_SIZE,
  RESPONSIVE_SIZE,
  RESPONSIVE_CARD_PADDING,
  RESPONSIVE_GAP,
  MASONRY_COLUMNS,
  sectionCenteredSx,
  containerPaddingSx,
  sectionHeaderSx,
  hideOnMobileSx,
  showOnMobileSx,
  hideOnMobileInlineSx,
  hideOnMobileFlexSx,
  textAlignResponsiveSx,
  justifyResponsiveSx,
  footerSocialLinkMarginSx,
  footerContainerMarginSx,
  gridItemFlexSx,
  fullWidthSx,
  createResponsiveMarginBottom,
  createDisplayToggle,
  createResponsiveDisplay,
  createVisibleBetween,
  resolveResponsiveValue,
  createResponsiveBreakpoint,
  isResponsiveValue,
  BREAKPOINT_KEYS,
  BREAKPOINT_VALUES,
} from '@/config/responsive';

export type { BreakpointKey, ResponsiveValue } from '@/config/responsive';

// ============================================================================
// TanStack Query Hooks and Utilities
// ============================================================================

export {
  githubKeys,
  contactKeys,
  queryClient,
  useRepoStatsQuery,
  useContactFormMutation,
  fetchRepoStats,
  submitContactForm,
  handleQueryError,
  buildQueryKey,
  prefetchRepoStats,
  invalidateRepoStats,
  LONG_CACHE_OPTIONS,
} from '@/utils/query/index';

export * from './useScrollEvents';
