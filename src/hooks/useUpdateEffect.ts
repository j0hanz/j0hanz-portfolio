import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Variant of useEffect that skips execution on the initial mount
 * and only runs when dependencies update thereafter.
 *
 * @param effect - Effect callback identical to useEffect
 * @param deps - Dependency list controlling execution
 */
export function useUpdateEffect(
  effect: EffectCallback,
  deps: DependencyList | undefined
): void {
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
