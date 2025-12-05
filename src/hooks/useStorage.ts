import { useEffect, useState } from 'react';

import type {
  StorageSource,
  UseStorageOptions,
  UseStorageReturn,
} from '@/config/types';

import useEventCallback from './useEventCallback';

type DefaultValue<T> = T | (() => T);

const isBrowser = typeof window !== 'undefined';

const evaluate = <T>(v: DefaultValue<T>): T =>
  typeof v === 'function' ? (v as () => T)() : v;

const toError = (err: unknown, msg: string): Error =>
  err instanceof Error ? err : new Error(msg);

const resolveStorage = (source?: StorageSource): Storage | null => {
  if (!isBrowser) return null;
  if (!source || source === 'local') return localStorage;
  return source === 'session' ? sessionStorage : source;
};

// Syncs React state with Web Storage API (local/session)
export function useStorage<T>(
  key: string,
  defaultValue: DefaultValue<T>,
  options: UseStorageOptions<T> = {}
): UseStorageReturn<T> {
  const {
    storage = 'local',
    serializer = JSON.stringify,
    parser,
    listen = true,
    validate,
  } = options;

  const resolved = resolveStorage(storage);
  const isSupported = Boolean(resolved);
  const [error, setError] = useState<Error | null>(null);

  const parse = (raw: string): T => {
    if (parser) return parser(raw);
    const parsed: unknown = JSON.parse(raw);
    if (validate && !validate(parsed)) {
      throw new Error(`Invalid data format for "${key}"`);
    }
    return parsed as T;
  };

  const readValueImpl = (): T => {
    if (!resolved) return evaluate(defaultValue);
    try {
      const raw = resolved.getItem(key);
      return raw === null ? evaluate(defaultValue) : parse(raw);
    } catch (e) {
      setError(toError(e, `Failed to read "${key}" from storage`));
      return evaluate(defaultValue);
    }
  };

  const readValue = useEventCallback(readValueImpl);
  const [value, setValue] = useState<T>(readValueImpl);

  const persist = (next: T): void => {
    if (!resolved) return;
    try {
      resolved.setItem(key, serializer(next));
      setError(null);
    } catch (e) {
      setError(toError(e, `Failed to store "${key}" in storage`));
    }
  };

  const set = (next: T | ((prev: T) => T)) =>
    setValue((prev) => {
      const val =
        typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      persist(val);
      return val;
    });

  const remove = (): void => {
    if (resolved) {
      try {
        resolved.removeItem(key);
        setError(null);
      } catch (e) {
        setError(toError(e, `Failed to remove "${key}" from storage`));
      }
    }
    setValue(evaluate(defaultValue));
  };

  const refresh = () =>
    setValue((prev) => {
      const next = readValue();
      return Object.is(prev, next) ? prev : next;
    });

  const onStorageChange = useEventCallback((e: StorageEvent) => {
    if (e.key === key && e.storageArea === resolved) setValue(readValue());
  });

  useEffect(() => {
    if (!listen || !resolved) return;
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, [listen, resolved, onStorageChange]);

  return { value, set, get: readValue, remove, refresh, isSupported, error };
}

export default useStorage;
