import { useEffect, useRef, useState } from 'react';

import { UseFetchOptions, UseFetchReturn, UseFetchState } from '@/config/types';

export function useFetch<T = unknown>(
  url?: string,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const controllerRef = useRef<AbortController | null>(null);
  const optionsRef = useRef(options);
  const abortRef = useRef<() => void>(() => {});
  const executeRef = useRef<
    (overrideUrl?: string, overrideOptions?: RequestInit) => Promise<T | null>
  >(async () => null);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const abort = () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  };

  const execute = async (
    overrideUrl?: string,
    overrideOptions?: RequestInit
  ): Promise<T | null> => {
    const requestUrl = overrideUrl ?? url;
    const { onSuccess, onError, validator, ...requestInit } =
      optionsRef.current;
    if (!requestUrl) {
      const error = new Error('useFetch: URL is required');
      setState((prev) => ({ ...prev, error }));
      onError?.(error);
      throw error;
    }

    abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(requestUrl, {
        ...requestInit,
        ...overrideOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') ?? '';
      const result: unknown = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (validator && !validator(result)) {
        throw new Error('Data validation failed');
      }

      const typedResult = result as T;

      setState({ data: typedResult, loading: false, error: null });
      onSuccess?.(typedResult);
      return typedResult;
    } catch (error) {
      const fetchError = error as Error;
      if (fetchError.name !== 'AbortError') {
        setState((prev) => ({ ...prev, loading: false, error: fetchError }));
        onError?.(fetchError);
      }
      throw fetchError;
    }
  };

  const reset = () => {
    abort();
    setState({ data: null, loading: false, error: null });
  };

  abortRef.current = abort;
  executeRef.current = execute;

  useEffect(() => {
    if (options.immediate && url) {
      executeRef.current().catch(() => undefined);
    }
    return () => {
      abortRef.current();
    };
  }, [options.immediate, url]);

  return {
    ...state,
    execute,
    abort,
    reset,
  };
}

export function useGet<T = unknown>(
  url?: string,
  options?: UseFetchOptions<T>
) {
  return useFetch<T>(url, { ...options, method: 'GET' });
}

export function usePost<T = unknown>(
  url?: string,
  options?: UseFetchOptions<T>
) {
  return useFetch<T>(url, { ...options, method: 'POST' });
}

export function usePut<T = unknown>(
  url?: string,
  options?: UseFetchOptions<T>
) {
  return useFetch<T>(url, { ...options, method: 'PUT' });
}

export function useDelete<T = unknown>(
  url?: string,
  options?: UseFetchOptions<T>
) {
  return useFetch<T>(url, { ...options, method: 'DELETE' });
}

export default useFetch;
