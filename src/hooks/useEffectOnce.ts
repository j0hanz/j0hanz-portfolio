import { EffectCallback, useEffect, useRef } from 'react';

export function useEffectOnce(effect: EffectCallback): void {
  const effectRef = useRef(effect);

  useEffect(() => effectRef.current(), []);
}

export default useEffectOnce;
