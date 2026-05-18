/**
 * Global loading state — used as Suspense fallback during route transitions
 * and any data-fetching boundary that doesn't provide its own loading.tsx.
 *
 * Quiet by design. A thin teal progress line at the top of the page; no
 * branded mark, no spinner. Matches BLUEPRINT §3.5 motion philosophy.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-x-0 top-0 z-50 h-0.5 bg-hairline overflow-hidden"
    >
      <div className="h-full w-1/3 bg-teal animate-[loading-bar_1.2s_ease-in-out_infinite]" />
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(400%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Loading"] > div { animation: none; width: 100%; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
