'use client';

// LAB PAGE — internal review only. Delete with the rest of /lab/hero-animations
// once the hero animation direction is finalised.

interface ControlsProps {
  number: string;
  label: string;
  notes: string;
  loopSeconds: number | null;
  paused: boolean;
  inView: boolean;
  reducedMotion: boolean;
  onTogglePause: () => void;
  onRestart: () => void;
}

export function Controls({
  number,
  label,
  notes,
  loopSeconds,
  paused,
  inView,
  reducedMotion,
  onTogglePause,
  onRestart,
}: ControlsProps) {
  const stateLine = reducedMotion
    ? 'Reduced motion — static frame'
    : !inView
      ? 'Paused (out of viewport)'
      : paused
        ? 'Paused'
        : 'Playing';

  return (
    <div className="flex flex-col gap-3 border-t border-hairline pt-4 mt-6">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-eyebrow font-medium uppercase text-teal tracking-wider">
          {number}
        </span>
        <span className="text-caption text-mute">{label}</span>
      </div>
      <p className="text-caption text-mute leading-snug max-w-md">{notes}</p>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={onTogglePause}
          disabled={reducedMotion}
          className="h-9 px-4 text-caption font-medium border border-navy text-navy hover:bg-tint disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={onRestart}
          disabled={reducedMotion}
          className="h-9 px-4 text-caption font-medium border border-hairline text-mute hover:text-navy hover:border-navy disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          Restart
        </button>
        <span className="text-caption text-mute font-mono">
          {loopSeconds === null ? 'continuous' : `${loopSeconds}s loop`}
        </span>
        <span
          className={`text-caption font-mono ${
            reducedMotion
              ? 'text-mute'
              : !inView
                ? 'text-mute'
                : paused
                  ? 'text-mute'
                  : 'text-teal'
          }`}
        >
          {stateLine}
        </span>
      </div>
    </div>
  );
}
