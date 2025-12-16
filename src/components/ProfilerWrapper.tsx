import { Profiler, type ProfilerOnRenderCallback, type ReactNode } from 'react';

interface ProfilerWrapperProps {
  id: string;
  children: ReactNode;
  threshold?: number;
}

const isDev = import.meta.env.DEV;
const FRAME_BUDGET_MS = 16.67;

// Simplified profiler - logs slow renders only in development
export function ProfilerWrapper({
  id,
  children,
  threshold = FRAME_BUDGET_MS,
}: ProfilerWrapperProps) {
  if (!isDev) return <>{children}</>;

  const onRender: ProfilerOnRenderCallback = (
    _id,
    phase,
    actualDuration,
    _baseDuration,
    _startTime,
    _commitTime
  ) => {
    if (actualDuration > threshold) {
      console.warn(
        `[Profiler] ⚠️ Slow render: "${id}" took ${actualDuration.toFixed(2)}ms (${phase})`
      );
    }
  };

  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
}
