"use client";

import * as React from "react";

export interface WeddingSaveTheDateProps {
  className?: string;
  style?: React.CSSProperties;
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  date?: string;
  subtext?: string;
  layout?: "compact" | "comfortable" | "spacious";
  overlayOpacity?: number; // 0 to 1
}

const heightByLayout: Record<NonNullable<WeddingSaveTheDateProps["layout"]>, string> = {
  compact: "min-h-[220px] sm:min-h-[260px] md:min-h-[320px]",
  comfortable: "min-h-[280px] sm:min-h-[340px] md:min-h-[420px]",
  spacious: "min-h-[340px] sm:min-h-[420px] md:min-h-[520px]",
};

export default function WeddingSaveTheDate({
  className,
  style,
  imageUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=MnwyMDk5Mjl8MHwxfHNlYXJjaHwxfHxiJTI3dyUyMGNvdXBsZSUyMGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBwaG90b3xlbnwwfHx8fDE3MDAwMDAwMDA",
  imageAlt = "Black and white photograph placeholder for the couple. Replace with your own photo.",
  title = "SAVE THE DATE",
  date = "12.09.26",
  subtext,
  layout = "comfortable",
  overlayOpacity = 0.55,
}: WeddingSaveTheDateProps) {
  // Clamp overlay opacity to [0,1]
  const clampedOpacity = Math.max(0, Math.min(1, overlayOpacity));

  return (
    <section
      aria-label={`${title}${date ? ` — ${date}` : ""}`}
      className={[
        "relative w-full",
        "bg-background",
        heightByLayout[layout],
        // add entrance animation
        "animate-in fade-in-50 slide-in-from-bottom-2 duration-700 ease-out",
        className,
      ].join(" ")}
      style={style}
    >
      <div className="relative z-10 flex h-full w-full items-center">
        <div className="w-full max-w-full px-6 py-10 sm:px-8 md:px-10 pb-64 sm:pb-80 md:pb-96">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className={[
                // Elegant, formal uppercase serif-like presentation using heading font
                "font-heading tracking-[0.2em] uppercase",
                "text-[0.72rem] sm:text-xs md:text-sm",
                // more visible color
                "text-primary/90",
              ].join(" ")}
            >
              {title}
            </p>

            <h2
              className={[
                "mt-3 font-heading font-semibold",
                // stronger color for date
                "text-primary",
                // Responsive text size - smaller on mobile, larger on desktop
                "text-xl sm:text-3xl md:text-4xl lg:text-5xl",
                // Allow text to wrap and center properly
                "leading-tight",
              ].join(" ")}
            >
              <span className="inline-block align-middle italic">{date}</span>
            </h2>

            {subtext ? (
              <p
                className={[
                  "mx-auto mt-4 max-w-2xl",
                  // match navbar green
                  "text-primary/90",
                  "text-sm sm:text-base md:text-lg",
                ].join(" ")}
              >
                {subtext}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Footer with logo */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p
            className={[
              "font-heading tracking-[0.15em] uppercase",
              "text-[0.65rem] sm:text-xs md:text-sm",
              "text-primary/70 mb-3",
            ].join(" ")}
          >
            HECHO A LA MEDIDA POR
          </p>
          <div className="flex justify-center items-center">
            <a
              href="https://marry.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-100"
            >
              <img
                src="/LOGO_SIMBOLO_Y_TEXTO_MARRYMX.png"
                alt="marry.mx logo"
                className="h-11 sm:h-14 md:h-16 w-auto opacity-90"
              />
            </a>
          </div>
        </div>
      </div>

      <span className="sr-only">
        Full-width save the date banner with background photograph.
      </span>
    </section>
  );
}