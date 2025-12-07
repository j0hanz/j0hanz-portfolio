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

// Get aggregated metrics for a component
export function getProfilerMetrics(id: string): RenderMetrics[] {
  return metricsStore.get(id) ?? [];
}

// Get average render time for a component
export function getAverageRenderTime(id: string): number {
  const metrics = metricsStore.get(id);
  if (!metrics?.length) return 0;
  const total = metrics.reduce(
    (sum, m) => sum + parseFloat(m.actualDuration),
    0
  );
  return total / metrics.length;
}

// Clear stored metrics
export function clearProfilerMetrics(id?: string): void {
  if (id) {
    metricsStore.delete(id);
    renderCountStore.delete(id);
    lastRenderTimeStore.delete(id);
  } else {
    metricsStore.clear();
    renderCountStore.clear();
    lastRenderTimeStore.clear();
  }
}

// Get render count for a component
export function getRenderCount(id: string): number {
  return renderCountStore.get(id) ?? 0;
}

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
