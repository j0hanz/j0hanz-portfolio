import { useCallback, useState } from 'react';

import { UseArrayReturn } from '@/config/types';

export function useArray<T>(initialArray: T[] = []): UseArrayReturn<T> {
  const [array, setArray] = useState<T[]>(initialArray);

  const set = useCallback((nextArray: T[]) => {
    setArray(nextArray);
  }, []);

  const push = useCallback((...items: T[]) => {
    setArray((prev) => [...prev, ...items]);
  }, []);

  const pop = useCallback((): T | undefined => {
    let removed: T | undefined;
    setArray((prev) => {
      if (!prev.length) return prev;
      removed = prev[prev.length - 1];
      return prev.slice(0, -1);
    });
    return removed;
  }, []);

  const shift = useCallback((): T | undefined => {
    let removed: T | undefined;
    setArray((prev) => {
      if (!prev.length) return prev;
      removed = prev[0];
      return prev.slice(1);
    });
    return removed;
  }, []);

  const unshift = useCallback((...items: T[]) => {
    setArray((prev) => [...items, ...prev]);
  }, []);

  const insert = useCallback((index: number, ...items: T[]) => {
    setArray((prev) => {
      const copy = [...prev];
      copy.splice(index, 0, ...items);
      return copy;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeById = useCallback(
    (id: unknown, key: keyof T = 'id' as keyof T) => {
      setArray((prev) => prev.filter((item) => item?.[key] !== id));
    },
    []
  );

  const update = useCallback((index: number, item: T) => {
    setArray((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const copy = [...prev];
      copy[index] = item;
      return copy;
    });
  }, []);

  const updateById = useCallback(
    (id: unknown, item: Partial<T>, key: keyof T = 'id' as keyof T) => {
      setArray((prev) =>
        prev.map((entry) =>
          entry?.[key] === id ? { ...entry, ...item } : entry
        )
      );
    },
    []
  );

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const filter = useCallback(
    (predicate: (item: T, index: number) => boolean) => {
      setArray((prev) => prev.filter(predicate));
    },
    []
  );

  const sort = useCallback((compareFn?: (a: T, b: T) => number) => {
    setArray((prev) => [...prev].sort(compareFn));
  }, []);

  const reverse = useCallback(() => {
    setArray((prev) => [...prev].reverse());
  }, []);

  const replace = useCallback((target: T, replacement: T) => {
    setArray((prev) => {
      const index = prev.indexOf(target);
      if (index === -1) return prev;
      const copy = [...prev];
      copy[index] = replacement;
      return copy;
    });
  }, []);

  const toggle = useCallback((item: T) => {
    setArray((prev) => {
      const index = prev.indexOf(item);
      if (index === -1) return [...prev, item];
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  return {
    array,
    set,
    push,
    pop,
    shift,
    unshift,
    insert,
    remove,
    removeById,
    update,
    updateById,
    clear,
    filter,
    sort,
    reverse,
    replace,
    toggle,
    isEmpty: array.length === 0,
    length: array.length,
  };
}

export default useArray;
