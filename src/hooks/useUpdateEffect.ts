import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

/**
 * Variant of useEffect that skips execution on the initial mount
 * and only runs when dependencies update thereafter.
 *
 * COMPATIBILITY NOTE: React Compiler's exhaustive-deps rule requires array literals
 * without spreads, making generic useUpdateEffect implementations difficult.
 * This version works when callers pass array literals with inline functions.
 * React 19 Compiler automatically optimizes the effect callbacks.
 *
 * @example
 * // React Compiler stabilizes the inline function automatically
 * useUpdateEffect(() => {
 *   applyValidation(debouncedEmail);
 * }, [debouncedEmail]);
 *
 * @param effect - Effect callback (React Compiler handles optimization)
 * @param deps - Dependency array literal
 */
export function useUpdateEffect(effect: EffectCallback, deps: unknown[]): void {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    return effect();
  }, [effect, deps]);
}

export default useUpdateEffect;
