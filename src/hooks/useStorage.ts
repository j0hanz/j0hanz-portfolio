import { useCallback, useEffect, useState } from 'react';

import {
  StorageSource,
  UseStorageOptions,
  UseStorageReturn,
} from '@/config/types';

type DefaultValue<T> = T | (() => T);

const isBrowser = typeof window !== 'undefined';

const defaultSerializer = <T>(value: T) => JSON.stringify(value);
const defaultParser = <T>(value: string) => JSON.parse(value) as T;
const evaluateDefaultValue = <T>(value: DefaultValue<T>): T =>
  typeof value === 'function' ? (value as () => T)() : value;

const normalizeError = (error: unknown, fallback: string): Error => {
  if (error instanceof Error) {
    return error;
  }
  const message =
    typeof error === 'string' ? `${fallback}: ${error}` : fallback;
  return new Error(message);
};

const resolveStorage = (source?: StorageSource): Storage | null => {
  if (!isBrowser) {
    return null;
  }
  if (!source || source === 'local') {
    return window.localStorage;
  }
  if (source === 'session') {
    return window.sessionStorage;
  }
  return source;
};

/**
 * Local/session storage helper that keeps React state in sync with the Web Storage API.
 * Provides defensive parsing/serialization and gracefully handles environments where
 * storage is not available (SSR, private mode, etc.).
 */
export function useStorage<T>(
  key: string,
  defaultValue: DefaultValue<T>,
  options: UseStorageOptions<T> = {}
): UseStorageReturn<T> {
  const {
    storage = 'local',
    serializer = defaultSerializer<T>,
    parser = defaultParser<T>,
    listen = true,
  } = options;

  const resolvedStorage = resolveStorage(storage);
  const isSupported = Boolean(resolvedStorage);

  const getDefaultValue = useCallback((): T => {
    return evaluateDefaultValue(defaultValue);
  }, [defaultValue]);

  const [error, setError] = useState<Error | null>(null);

  const readValue = useCallback((): T => {
    if (!resolvedStorage) return getDefaultValue();

    try {
      const raw = resolvedStorage.getItem(key);
      return raw === null ? getDefaultValue() : parser(raw);
    } catch (readError) {
      const normalized = normalizeError(
        readError,
        `Failed to read "${key}" from storage`
      );
      setError(normalized);
      return getDefaultValue();
    }
  }, [getDefaultValue, key, parser, resolvedStorage]);

  const [value, setValue] = useState<T>(() => readValue());

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

  useEffect(() => {
    if (!listen || !resolvedStorage || !isBrowser) return undefined;

    const handleStorage = (event: StorageEvent): void => {
      if (event.key === key && event.storageArea === resolvedStorage) {
        setValue(readValue());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, listen, resolvedStorage, readValue]);

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
