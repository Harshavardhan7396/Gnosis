import { useEffect, useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import type { ConceptWhereMarker } from '../types/lesson';

interface ScreenshotBrowserFrameProps {
  windowUrl: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
  markers?: ConceptWhereMarker[];
  activeMarker?: number;
  onSelectMarker?: (num: number) => void;
}

function getTooltipPositionClasses(xPercent: number, yPercent: number): string {
  const vertical = yPercent < 32 ? 'top-full mt-2.5' : 'bottom-full mb-2.5';
  const horizontal =
    xPercent < 25
      ? 'left-0'
      : xPercent > 75
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';
  return `${vertical} ${horizontal}`;
}

export function ScreenshotBrowserFrame({
  windowUrl,
  imageSrc,
  imageAlt,
  caption,
  markers = [],
  activeMarker,
  onSelectMarker,
}: ScreenshotBrowserFrameProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomed(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomed]);

  const currentMarker =
    markers.find((m) => m.number === activeMarker) ?? markers[0] ?? null;

  const renderMarkers = (sizeClass: string) =>
    markers.map((marker) => {
      const isActive = activeMarker === marker.number;
      const tooltipPos = getTooltipPositionClasses(marker.xPercent, marker.yPercent);

      return (
        <div
          key={marker.number}
          style={{ left: `${marker.xPercent}%`, top: `${marker.yPercent}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 group/marker ${
            isActive ? 'z-20' : 'z-10'
          } hover:z-30 focus-within:z-30`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectMarker?.(marker.number);
            }}
            aria-label={`Marker ${marker.number}: ${marker.label}. ${marker.description}`}
            className={`${sizeClass} rounded-full font-mono font-semibold flex items-center justify-center transition-all cursor-pointer border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.28)] ${
              isActive
                ? 'bg-primary text-on-primary ring-4 ring-primary/30 scale-115'
                : 'bg-primary/95 text-on-primary hover:scale-110'
            }`}
          >
            {marker.number}
          </button>

          {/* Hover / focus tooltip */}
          <div
            role="tooltip"
            className={`pointer-events-none absolute ${tooltipPos} w-56 sm:w-64 rounded-lg bg-on-surface text-surface px-3 py-2.5 shadow-xl border border-white/15 opacity-0 invisible translate-y-1 group-hover/marker:opacity-100 group-hover/marker:visible group-hover/marker:translate-y-0 group-focus-within/marker:opacity-100 group-focus-within/marker:visible group-focus-within/marker:translate-y-0 transition-all duration-150 text-left z-40`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-on-primary font-mono text-[10px] font-bold shrink-0">
                {marker.number}
              </span>
              <span className="text-xs font-semibold leading-snug">{marker.label}</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">{marker.description}</p>
          </div>
        </div>
      );
    });

  return (
    <>
      <figure className="rounded-xl bg-surface-container-lowest border border-outline-variant/45 shadow-[0_10px_30px_-8px_rgba(28,25,23,0.12)]">
        {/* Browser Chrome */}
        <div className="bg-surface-container-high/65 border-b border-outline-variant/35 px-3.5 sm:px-4 py-2.5 flex items-center justify-between gap-3 rounded-t-xl">
          <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-outline" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline" />
          </div>

          <div className="flex-1 max-w-xs mx-auto bg-surface-container-lowest/90 border border-outline-variant/35 px-3 py-1 rounded text-center min-w-0">
            <span className="font-mono text-[11px] text-on-surface-variant truncate block">
              {windowUrl}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label="Zoom screenshot"
            title="Click to zoom"
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/80 border border-transparent hover:border-outline-variant/35 transition-colors shrink-0 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zoom</span>
          </button>
        </div>

        {/* Screenshot + Crimson Markers */}
        <div className="relative bg-white group/img select-none">
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={`Open enlarged view of: ${imageAlt}`}
            className="block w-full text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              className="w-full h-auto block"
            />
          </button>

          {renderMarkers('w-6 h-6 sm:w-7 sm:h-7 text-[11px] sm:text-xs')}

          <div className="pointer-events-none absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-on-surface/80 text-surface text-[11px] font-medium inline-flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-sm">
            <ZoomIn className="w-3 h-3" />
            <span>Click to zoom</span>
          </div>
        </div>

        {/* Caption */}
        <figcaption className="px-4 py-3 border-t border-outline-variant/30 bg-surface-container-low/45 rounded-b-xl flex flex-wrap items-center justify-between gap-2 text-xs text-on-surface-variant leading-relaxed">
          <span>{caption}</span>
          {markers.length > 0 && (
            <span className="text-[11px] text-on-surface-variant/80 whitespace-nowrap">
              Hover numbers for details
            </span>
          )}
        </figcaption>
      </figure>

      {/* Click-to-zoom Lightbox Modal */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={imageAlt}
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs p-4 sm:p-6 lg:p-10 flex items-center justify-center overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-2xl my-auto"
          >
            <div className="bg-surface-container-high/70 border-b border-outline-variant/35 px-4 sm:px-5 py-3 flex items-center justify-between gap-3 rounded-t-2xl">
              <div className="flex items-center gap-1.5 opacity-60 shrink-0" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-outline" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline" />
                <span className="w-2.5 h-2.5 rounded-full bg-outline" />
              </div>

              <div className="flex-1 max-w-md mx-auto bg-surface-container-lowest border border-outline-variant/35 px-3 py-1 rounded text-center min-w-0">
                <span className="font-mono text-xs text-on-surface-variant truncate block">
                  {windowUrl}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="Close zoomed screenshot"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest border border-outline-variant/35 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="relative bg-white select-none">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto block"
              />
              {renderMarkers('w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm')}
            </div>

            <div className="px-4 sm:px-6 py-4 border-t border-outline-variant/35 bg-surface-container-low/50 rounded-b-2xl space-y-2.5">
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {caption}
              </p>

              {currentMarker && (
                <div className="pt-2.5 border-t border-outline-variant/25 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {currentMarker.number}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-on-surface">
                      {currentMarker.label}
                    </p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {currentMarker.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
