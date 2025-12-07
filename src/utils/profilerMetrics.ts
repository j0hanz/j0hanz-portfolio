// ============================================================================
// PROFILER METRICS UTILITIES
// Development-only utilities for aggregating and analyzing Profiler metrics
// ============================================================================

interface RenderMetrics {
  id: string;
  phase: 'mount' | 'update' | 'nested-update';
  actualDuration: string;
  baseDuration: string;
  memoizationEfficiency: string;
  timestamp: number;
  // Extended metrics
  renderCount: number;
  exceededFrameBudget: boolean;
  memoryMB?: number;
  timeSinceLastRender?: string;
}

// Store metrics for aggregation (dev only)
const metricsStore = new Map<string, RenderMetrics[]>();
const renderCountStore = new Map<string, number>();
const lastRenderTimeStore = new Map<string, number>();

// Check if component is re-rendering excessively (>10 renders in 1s)
export function isExcessiveRerender(id: string): boolean {
  const metrics = metricsStore.get(id) ?? [];
  const oneSecondAgo = performance.now() - 1000;
  const recentRenders = metrics.filter((m) => m.timestamp > oneSecondAgo);
  return recentRenders.length > 10;
}

// Internal: Add metrics to store (called by ProfilerWrapper)
export function addMetrics(
  id: string,
  metrics: Omit<RenderMetrics, 'renderCount' | 'timeSinceLastRender'>
): RenderMetrics {
  // Track render count
  const count = (renderCountStore.get(id) ?? 0) + 1;
  renderCountStore.set(id, count);

  // Calculate time since last render
  const lastTime = lastRenderTimeStore.get(id);
  const timeSinceLastRender = lastTime
    ? `${(metrics.timestamp - lastTime).toFixed(0)}ms`
    : undefined;
  lastRenderTimeStore.set(id, metrics.timestamp);

  const fullMetrics: RenderMetrics = {
    ...metrics,
    renderCount: count,
    timeSinceLastRender,
  };

  const existing = metricsStore.get(id) ?? [];
  // Keep last 50 entries per component
  metricsStore.set(id, [...existing.slice(-49), fullMetrics]);

  return fullMetrics;
}

export type { RenderMetrics };
