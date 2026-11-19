import { useEffect, useId, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export interface ScreenshotMarker {
  n: number;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

export interface ScreenshotFrameProps {
  src: string;
  alt: string;
  caption?: string;
  markers?: ScreenshotMarker[];
  className?: string;
}

function MarkerOverlay({
  markers,
  activeMarker,
  onHoverMarker,
  onTapMarker,
}: {
  markers: ScreenshotMarker[];
  activeMarker: number | null;
  onHoverMarker: (n: number | null) => void;
  onTapMarker: (n: number) => void;
}) {
  return (
    <>
      {markers.map((marker) => {
        const isOpen = activeMarker === marker.n;
        const showBelow = marker.y < 18;
        const horizontalAlign =
          marker.x > 65
            ? 'right-0'
            : marker.x < 25
              ? 'left-0'
              : 'left-1/2 -translate-x-1/2';

        return (
          <div
            key={marker.n}
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              width: `${marker.w}%`,
              height: `${marker.h}%`,
            }}
            className={`absolute border-[1.5px] rounded-sm transition-colors pointer-events-none ${
              isOpen
                ? 'border-[#B3261E] bg-[#B3261E]/12 z-20'
                : 'border-[#B3261E] bg-[#B3261E]/[0.04] z-10'
            }`}
          >
            <button
              type="button"
              aria-label={`Marker ${marker.n}: ${marker.label}`}
              aria-expanded={isOpen}
              onClick={(e) => {
                e.stopPropagation();
                onTapMarker(marker.n);
              }}
              onMouseEnter={() => onHoverMarker(marker.n)}
              onMouseLeave={() => onHoverMarker(null)}
              onFocus={() => onHoverMarker(marker.n)}
              onBlur={() => onHoverMarker(null)}
              className={`pointer-events-auto absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#B3261E] text-white font-mono text-[11px] font-semibold flex items-center justify-center shadow-sm ring-2 ring-[#FEF9F0] transition-transform cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B3261E]/35 ${
                isOpen ? 'scale-110' : 'hover:scale-110'
              }`}
            >
              {marker.n}
            </button>

            {isOpen && (
              <div
                role="tooltip"
                className={`pointer-events-auto absolute z-30 min-w-[160px] max-w-[240px] rounded-lg bg-[#1D1C16] text-[#FEF9F0] border border-[#B3261E]/60 px-2.5 py-1.5 text-xs leading-snug shadow-lg ${
                  showBelow ? 'top-4' : 'bottom-full mb-3.5'
                } ${horizontalAlign}`}
              >
                <span className="font-mono text-[#FFB4AA] font-semibold mr-1.5">
                  {marker.n}.
                </span>
                <span>{marker.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export function ScreenshotFrame({
  src,
  alt,
  caption,
  markers = [],
  className = '',
}: ScreenshotFrameProps) {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [tappedMarker, setTappedMarker] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomActiveMarker, setZoomActiveMarker] = useState<number | null>(null);

  const frameRef = useRef<HTMLDivElement>(null);
  const captionId = useId();

  const activeMarker = hoveredMarker ?? tappedMarker;

  useEffect(() => {
    const handleOutsideTap = (event: MouseEvent | TouchEvent) => {
      if (
        tappedMarker !== null &&
        frameRef.current &&
        !frameRef.current.contains(event.target as Node)
      ) {
        setTappedMarker(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideTap);
    document.addEventListener('touchstart', handleOutsideTap);
    return () => {
      document.removeEventListener('mousedown', handleOutsideTap);
      document.removeEventListener('touchstart', handleOutsideTap);
    };
  }, [tappedMarker]);

  useEffect(() => {
    if (!isZoomed) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);

  const handleTapMarker = (n: number) => {
    setTappedMarker((prev) => (prev === n ? null : n));
  };

  return (
    <>
      <figure
        ref={frameRef}
        className={`rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_8px_28px_-6px_rgba(28,25,23,0.1)] ${className}`}
      >
        {/* Browser-style top bar */}
        <div className="rounded-t-xl bg-surface-container-high/65 border-b border-outline-variant/35 px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B3261E]/65" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline/35" />
          </div>

          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            aria-label={`Zoom in on ${alt}`}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-on-surface-variant hover:text-[#B3261E] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3 h-3 shrink-0" />
            <span>Click to zoom</span>
          </button>
        </div>

        {/* Screenshot canvas with responsive percentage markers */}
        <div
          className={`relative w-full bg-surface-container-low/40 ${
            caption ? '' : 'rounded-b-xl'
          }`}
        >
          <button
            type="button"
            aria-label={`Open full-screen view of ${alt}`}
            aria-describedby={caption ? captionId : undefined}
            onClick={() => setIsZoomed(true)}
            className={`block w-full p-0 border-0 bg-transparent cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B3261E] ${
              caption ? '' : 'rounded-b-xl overflow-hidden'
            }`}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="block w-full h-auto select-none"
            />
          </button>

          <MarkerOverlay
            markers={markers}
            activeMarker={activeMarker}
            onHoverMarker={setHoveredMarker}
            onTapMarker={handleTapMarker}
          />
        </div>

        {caption && (
          <figcaption
            id={captionId}
            className="rounded-b-xl px-4 sm:px-5 py-3 border-t border-outline-variant/30 bg-surface-container-low/65 text-xs sm:text-[13px] text-on-surface-variant leading-relaxed"
          >
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Full-screen zoom modal */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-[#1D1C16]/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[92vw] max-h-[90vh] flex flex-col rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-2xl overflow-hidden"
          >
            <div className="bg-surface-container-high/75 border-b border-outline-variant/35 px-4 py-2.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B3261E]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline/55" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline/40" />
              </div>

              <span className="text-[11px] text-on-surface-variant truncate">
                Press Esc or click outside to close
              </span>

              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                aria-label="Close zoomed screenshot"
                className="w-7 h-7 rounded-md border border-outline-variant/45 bg-surface-container-lowest text-on-surface hover:text-[#B3261E] hover:border-[#B3261E]/50 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-auto p-3 sm:p-4 bg-surface-container-low/40 flex items-center justify-center">
              <div className="relative inline-block">
                <img
                  src={src}
                  alt={alt}
                  className="block max-w-[86vw] max-h-[72vh] w-auto h-auto select-none rounded-sm"
                />
                <MarkerOverlay
                  markers={markers}
                  activeMarker={zoomActiveMarker}
                  onHoverMarker={setZoomActiveMarker}
                  onTapMarker={(n) =>
                    setZoomActiveMarker((prev) => (prev === n ? null : n))
                  }
                />
              </div>
            </div>

            {caption && (
              <div className="px-4 sm:px-5 py-3 border-t border-outline-variant/30 bg-surface-container-low/75 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
