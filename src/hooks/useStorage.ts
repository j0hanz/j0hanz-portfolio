import { useEffect, useState } from 'react';

import {
  StorageSource,
  UseStorageOptions,
  UseStorageReturn,
} from '@/config/types';

import useEventCallback from './useEventCallback';

type DefaultValue<T> = T | (() => T);

const isBrowser = typeof window !== 'undefined';

const defaultSerializer = <T>(value: T) => JSON.stringify(value);

// Safe parser that returns unknown for validation
const parseJson = (value: string): unknown => JSON.parse(value);

const evaluateDefaultValue = <T>(value: DefaultValue<T>): T =>
  typeof value === 'function' ? (value as () => T)() : value;

const normalizeError = (error: unknown, fallback: string): Error =>
  error instanceof Error
    ? error
    : new Error(typeof error === 'string' ? `${fallback}: ${error}` : fallback);

const resolveStorage = (source?: StorageSource): Storage | null => {
  if (!isBrowser) return null;
  if (!source || source === 'local') return window.localStorage;
  return source === 'session' ? window.sessionStorage : source;
};

// Syncs React state with Web Storage API (local/session) with defensive parsing
export function useStorage<T>(
  key: string,
  defaultValue: DefaultValue<T>,
  options: UseStorageOptions<T> = {}
): UseStorageReturn<T> {
  const {
    storage = 'local',
    serializer = defaultSerializer<T>,
    parser,
    listen = true,
    validate,
  } = options;

  const resolvedStorage = resolveStorage(storage);
  const isSupported = Boolean(resolvedStorage);

  const getDefaultValue = (): T => evaluateDefaultValue(defaultValue);

  const [error, setError] = useState<Error | null>(null);

  // Safe parsing with optional validation
  const safeParse = (raw: string): T => {
    // If custom parser provided, use it directly
    if (parser) {
      return parser(raw);
    }

    // Parse to unknown first
    const parsed = parseJson(raw);

    // Validate if validator provided
    if (validate) {
      if (!validate(parsed)) {
        throw new Error(`Invalid data format for "${key}"`);
      }
      return parsed;
    }

    // Without validation, cast (matches original behavior)
    return parsed as T;
  };

  const readValueImpl = (): T => {
    if (!resolvedStorage) return getDefaultValue();

    try {
      const raw = resolvedStorage.getItem(key);
      return raw === null ? getDefaultValue() : safeParse(raw);
    } catch (readError) {
      const normalized = normalizeError(
        readError,
        `Failed to read "${key}" from storage`
      );
      setError(normalized);
      return getDefaultValue();
    }
  };

  // Wrap with useEventCallback for stable reference in effects
  const readValue = useEventCallback(readValueImpl);

  const [value, setValue] = useState<T>(() => readValueImpl());

  const persist = (nextValue: T): void => {
    if (!resolvedStorage) return;

    try {
      resolvedStorage.setItem(key, serializer(nextValue));
      setError(null);
    } catch (writeError) {
      setError(
        normalizeError(writeError, `Failed to store "${key}" in storage`)
      );
    }
  };

  const set = (nextValue: T | ((previous: T) => T)) => {
    setValue((prev) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (previous: T) => T)(prev)
          : nextValue;
      persist(resolvedValue);
      return resolvedValue;
    });
  };

  const remove = (): void => {
    if (resolvedStorage) {
      try {
        resolvedStorage.removeItem(key);
        setError(null);
      } catch (removeError) {
        setError(
          normalizeError(removeError, `Failed to remove "${key}" from storage`)
        );
      }
    }
    setValue(getDefaultValue());
  };

  const refresh = () => {
    setValue((prev) => {
      const next = readValue();
      return Object.is(prev, next) ? prev : next;
    });
  };

  const get = () => readValue();

  const onStorageChange = useEventCallback((event: StorageEvent) => {
    if (event.key === key && event.storageArea === resolvedStorage) {
      setValue(readValue());
    }
  });

  useEffect(() => {
    if (!listen || !resolvedStorage) return undefined;

    const handleStorage = (event: StorageEvent): void => {
      onStorageChange(event);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [listen, resolvedStorage, onStorageChange]);

  return {
    value,
    set,
    get,
    remove,
    refresh,
    isSupported,
    error,
  };
}

export default useStorage;
