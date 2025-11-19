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
  const previousDepsRef = useRef<DependencyList | undefined>(undefined);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousDepsRef.current = deps;
      return;
    }

    if (!deps) {
      return effect();
    }

    const previousDeps = previousDepsRef.current;
    previousDepsRef.current = deps;

    if (!previousDeps || previousDeps.length !== deps.length) {
      return effect();
    }

    const hasChanged = deps.some(
      (dependency, index) => !Object.is(dependency, previousDeps[index])
    );
    if (hasChanged) {
      return effect();
    }
  });
}

export default useUpdateEffect;
