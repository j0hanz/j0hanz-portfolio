import { type Context, use } from 'react';

// Type-safe context hook factory with null check and error message
function createContextHook<T>(
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

// Creates split state/actions hook pair for render-optimized providers
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
