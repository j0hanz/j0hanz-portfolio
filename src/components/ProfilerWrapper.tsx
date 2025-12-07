import { Profiler, type ProfilerOnRenderCallback, type ReactNode } from 'react';

import {
  addMetrics,
  isExcessiveRerender,
  type RenderMetrics,
} from '@/utils/profilerMetrics';

interface ProfilerWrapperProps {
  /** Unique identifier for the profiled tree */
  id: string;
  /** Components to profile */
  children: ReactNode;
  /** Custom onRender callback (optional) */
  onRender?: ProfilerOnRenderCallback;
  /** Alert threshold in ms (default: 16ms = ~60fps frame budget) */
  threshold?: number;
  /** Enable verbose logging (default: false) */
  verbose?: boolean;
}

const isDev = import.meta.env.DEV;

const DEFAULT_THRESHOLD_MS = 16;

const FRAME_BUDGET_MS = 16.67;

// Get memory usage if available (Chrome only)
const getMemoryMB = (): number | undefined => {
  const perf = performance as Performance & {
    memory?: { usedJSHeapSize: number };
  };
  return perf.memory ? perf.memory.usedJSHeapSize / 1024 / 1024 : undefined;
};

const createDefaultOnRender =
  (threshold: number, verbose: boolean): ProfilerOnRenderCallback =>
  (id, phase, actualDuration, baseDuration, _startTime, commitTime) => {
    const memoizationEfficiency =
      baseDuration > 0 ? (1 - actualDuration / baseDuration) * 100 : 0;
    const exceededFrameBudget = actualDuration > FRAME_BUDGET_MS;
    const memoryMB = getMemoryMB();

    const baseMetrics = {
      id,
      phase: phase as RenderMetrics['phase'],
      actualDuration: `${actualDuration.toFixed(2)}ms`,
      baseDuration: `${baseDuration.toFixed(2)}ms`,
      memoizationEfficiency: `${memoizationEfficiency.toFixed(1)}%`,
      timestamp: commitTime,
      exceededFrameBudget,
      memoryMB: memoryMB ? Math.round(memoryMB * 10) / 10 : undefined,
    };

    // Store metrics and get full metrics with render count
    const metrics = addMetrics(id, baseMetrics);

    // Warn on slow renders (exceeds custom threshold)
    if (actualDuration > threshold) {
      console.warn(
        `[Profiler] ⚠️ Slow render: "${id}" took ${actualDuration.toFixed(2)}ms (${phase})`,
        metrics
      );
    }

    // Warn on excessive re-renders (potential infinite loop or missing deps)
    if (isExcessiveRerender(id)) {
      console.warn(
        `[Profiler] 🔄 Excessive re-renders: "${id}" rendered ${metrics.renderCount} times (>10/sec)`,
        metrics
      );
    }

    // Log all renders in verbose mode
    if (verbose) {
      const status = exceededFrameBudget ? '🐢' : '✅';
      console.warn(
        `[Profiler] ${status} ${id} #${metrics.renderCount}`,
        metrics
      );
    }
  };

// Profile wrapper component
export function ProfilerWrapper({
  id,
  children,
  onRender,
  threshold = DEFAULT_THRESHOLD_MS,
  verbose = false,
}: ProfilerWrapperProps) {
  const defaultCallback = createDefaultOnRender(threshold, verbose);

  // Combined handler that calls both default and custom callbacks
  const handleRender: ProfilerOnRenderCallback = (
    profId,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    // Call default handler for metrics storage and warnings
    defaultCallback(
      profId,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    );

    // Call custom handler if provided
    onRender?.(
      profId,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    );
  };

  // Skip profiling in production - render children directly
  if (!isDev) return <>{children}</>;

  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
}
