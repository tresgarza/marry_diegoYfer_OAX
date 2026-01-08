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
        <div className="w-full max-w-full px-6 py-10 sm:px-8 md:px-10">
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
                // Smaller on mobile to fit in one line; scale up on larger screens
                "text-2xl sm:text-4xl md:text-5xl lg:text-6xl",
              ].join(" ")}
            >
              <span className="inline-block align-middle whitespace-nowrap break-words italic">{date}</span>
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

      <span className="sr-only">
        Full-width save the date banner with background photograph.
      </span>
    </section>
  );
}