/**
 * Centralized exports for all reusable hooks. Import from this file to ensure
 * consistent usage across the app and enable tree-shaking of unused hooks.
 */

/** Array mutation helpers (push, insert, remove, etc.). */
export { useArray } from './useArray';
export type { UseArrayReturn } from '@/config/types';

/** Detects pointer interactions occurring outside of the provided ref. */
export { useClickOutside } from './useClickOutside';

/** Simple numeric state machine with increment/decrement helpers. */
export { useCounter } from './useCounter';
export type { UseCounterReturn } from '@/config/types';

/** Debounces rapidly changing values before propagating them downstream. */
export * from './useCursorMagnet';
export * from './useDebounce';

/** Creates stable callback references that always access the latest values. */
export { default as useEventCallback } from './useEventCallback';

/** Convenience wrappers for HTTP DELETE requests using fetch. */
export { useDelete } from './useFetch';

/** Generic data-fetching hook with abort, retry, and imperative execute. */
export { useFetch } from './useFetch';
export type {
  UseFetchOptions,
  UseFetchReturn,
  UseFetchState,
} from '@/config/types';

/** Convenience wrappers for HTTP GET requests using fetch. */
export { useGet } from './useFetch';

/** Lazily computes expensive values and exposes a manual refresh handle. */
export { useLazy } from './useLazy';
export type { UseLazyReturn } from '@/config/types';

/** Convenience wrappers for HTTP POST requests using fetch. */
export { usePost } from './useFetch';

/** Captures the value from the previous render for comparison logic. */
export { usePrevious } from './usePrevious';

/** Convenience wrappers for HTTP PUT requests using fetch. */
export { usePut } from './useFetch';

/**
 * Reactive wrapper around Web Storage APIs with JSON serialization and
 * graceful fallbacks for unsupported environments.
 */
export { useStorage } from './useStorage';
export type {
  StorageSource,
  UseStorageOptions,
  UseStorageReturn,
} from '@/config/types';

/** Boolean state helper with ergonomic toggle helpers. */
export { useToggle } from './useToggle';
export type { UseToggleReturn } from '@/config/types';

/** Manages contact form state, validation, and submission. */
export { default as useContactForm } from './useContactForm';

/** Accesses the NavigationContext. */
export { useNavigation } from './useNavigation';

/** Accesses the ThemeMode context with helpful error messaging. */
export { useTheme } from './useTheme';

/** Copies text to the clipboard and provides success/error feedback. */
export { default as useCopyToClipboard } from './useCopyToClipboard';

/** Detects if the mouse is hovering over a specific element. */
export { default as useHover } from './useHover';

/** Detects if the user is currently online or offline. */
export { default as useOnlineStatus } from './useOnlineStatus';

/** Accesses the SnackbarContext. */
export { default as useSnackbar } from './useSnackbar';

/** Runs an effect only once on mount (strict mode safe). */
export { default as useEffectOnce } from './useEffectOnce';

/** Attaches an event listener to a DOM element, window, or document. */
export { default as useEventListener } from './useEventListener';

/** Motion helpers respecting reduced-motion preferences. */
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
} from './useMotions';
