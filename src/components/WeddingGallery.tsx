"use client"

import * as React from "react"
import { Images, LayoutGrid, Camera } from "lucide-react"

type GalleryImage = {
  src: string
  alt: string
}

export interface WeddingGalleryProps {
  images?: GalleryImage[]
  className?: string
  overlayLabel?: string
}

const defaultImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1600&auto=format&fit=crop",
    alt: "Couple walking through agave fields at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    alt: "Engagement portrait with soft greenery backdrop",
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
    alt: "Hands with rings and muted gold accents",
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
    alt: "Detail shot of bouquet with warm cream tones",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    alt: "Candid laughter during engagement session",
  },
  {
    src: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1600&auto=format&fit=crop",
    alt: "Silhouette kiss at sunset among agaves",
  },
]

// Remove accidental duplicates while keeping order
function uniqueBySrc(arr: GalleryImage[]) {
  const seen = new Set<string>()
  return arr.filter((it) => {
    if (seen.has(it.src)) return false
    seen.add(it.src)
    return true
  })
}

export default function WeddingGallery({
  images = defaultImages,
  className,
  overlayLabel = "Photo viewer",
}: WeddingGalleryProps) {
  const photos = React.useMemo(() => uniqueBySrc(images).slice(0, 12), [images])
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const total = photos.length

  const openAt = React.useCallback(
    (i: number) => {
      setIndex(i)
      setOpen(true)
    },
    [setIndex, setOpen]
  )

  const close = React.useCallback(() => setOpen(false), [])
  const prev = React.useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  )
  const next = React.useCallback(() => setIndex((i) => (i + 1) % total), [total])

  // Keyboard navigation and scroll lock
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, prev, next])

  if (photos.length === 0) return null

  return (
    <section className={["w-full", className].filter(Boolean).join(" ")}>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div className="flex items-center gap-2">
          <Images className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Photo Gallery
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          <span>{photos.length} photos</span>
        </div>
      </header>

      {/* Masonry using CSS columns */}
      <div
        className="columns-1 gap-4 sm:columns-2 lg:columns-3"
        aria-label="Masonry gallery"
      >
        {photos.map((img, i) => (
          <figure
            key={`${img.src}-${i}`}
            className="mb-4 break-inside-avoid relative"
          >
            <button
              type="button"
              onClick={() => openAt(i)}
              className="group block w-full focus:outline-none"
              aria-label={`Open image ${i + 1} of ${total}: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full max-w-full h-auto rounded-[var(--radius)] bg-card shadow-sm ring-1 ring-border object-cover transition-transform duration-300 ease-out group-hover:scale-[1.01]"
              />
              <figcaption className="sr-only">{img.alt}</figcaption>
              <div className="pointer-events-none absolute inset-0 rounded-[var(--radius)] ring-0 transition-opacity duration-300 group-hover:ring-2 group-hover:ring-primary/20" />
            </button>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={overlayLabel}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        >
          <div className="absolute inset-0 flex min-w-0 items-center justify-center p-4 sm:p-6">
            {/* Content card */}
            <div className="relative w-full max-w-5xl">
              {/* Top bar */}
              <div className="pointer-events-none absolute -top-12 left-0 right-0 flex items-center justify-between text-white/90 sm:-top-14">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm sm:text-base">
                    {index + 1} / {total}
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[calc(var(--radius)+0.25rem)] bg-card shadow-xl">
                <img
                  src={photos[index]?.src}
                  alt={photos[index]?.alt || "Gallery image"}
                  className="block h-auto max-h-[70svh] w-full max-w-full object-contain bg-card"
                />

                {/* Controls */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2 sm:p-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      className="rounded-md bg-black/40 px-3 py-2 text-white text-sm backdrop-blur hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      aria-label="Previous image"
                    >
                      ‹ Prev
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="rounded-md bg-black/40 px-3 py-2 text-white text-sm backdrop-blur hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      aria-label="Next image"
                    >
                      Next ›
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-md bg-black/40 px-3 py-2 text-white text-sm backdrop-blur hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label="Close viewer"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Alt text / caption */}
              <p className="mt-3 text-center text-sm text-muted-foreground break-words">
                {photos[index]?.alt}
              </p>
            </div>
          </div>

          {/* Click outside to close */}
          <button
            type="button"
            aria-label="Close viewer background"
            className="absolute inset-0 -z-10 cursor-default"
            onClick={close}
          />
        </div>
      )}
    </section>
  )
}