import { Context, use } from 'react';

// ============================================================================
// CONTEXT UTILITY - DRY Factory for Context Hooks
// ============================================================================

/**
 * Creates a type-safe context hook with automatic null check and error message.
 * Eliminates boilerplate in context consumer hooks.
 *
 * @example
 * // Before (repeated in every context hook file):
 * export function useSnackbarState(): SnackbarState {
 *   const context = use(SnackbarStateContext);
 *   if (!context) {
 *     throw new Error('useSnackbarState must be used within SnackbarProvider');
 *   }
 *   return context;
 * }
 *
 * // After (single line):
 * export const useSnackbarState = createContextHook(
 *   SnackbarStateContext,
 *   'useSnackbarState',
 *   'SnackbarProvider'
 * );
 */
export function createContextHook<T>(
  context: Context<T | null>,
  hookName: string,
  providerName: string
): () => T {
  return function useContextHook(): T {
    const value = use(context);
    if (value === null) {
      throw new Error(`${hookName} must be used within ${providerName}`);
    }
    return value;
  };
}

/**
 * Creates a pair of state and actions hooks for split contexts.
 * Common pattern for render-optimized context providers.
 *
 * @example
 * const [useSnackbarState, useSnackbarActions] = createSplitContextHooks(
 *   { state: SnackbarStateContext, actions: SnackbarActionsContext },
 *   'Snackbar',
 *   'SnackbarProvider'
 * );
 */
export function createSplitContextHooks<TState, TActions>(
  contexts: {
    state: Context<TState | null>;
    actions: Context<TActions | null>;
  },
  name: string,
  providerName: string
): [() => TState, () => TActions] {
  const useStateHook = createContextHook(
    contexts.state,
    `use${name}State`,
    providerName
  );
  const useActionsHook = createContextHook(
    contexts.actions,
    `use${name}Actions`,
    providerName
  );
  return [useStateHook, useActionsHook];
}
