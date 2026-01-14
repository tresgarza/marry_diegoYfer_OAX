"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"

type Lang = "es" | "en"

type SectionDef = {
  id: string
  labelEs: string
  labelEn: string
}

export interface WeddingNavigationProps {
  className?: string
  style?: React.CSSProperties
  currentLang?: Lang
  onLanguageChange?: (lang: Lang) => void
  sections?: SectionDef[]
  scrollOffset?: number
  onNavigate?: (id: string) => void
  coupleName?: string
}

const DEFAULT_SECTIONS: SectionDef[] = [
  { id: "itinerario", labelEs: "Itinerario", labelEn: "Itinerary" },
  { id: "rsvp", labelEs: "Confirmar", labelEn: "RSVP" },
  { id: "hoteles", labelEs: "Hoteles", labelEn: "Hotels" },
  { id: "mapa", labelEs: "Mapa", labelEn: "Map" },
  { id: "gastronomia", labelEs: "Gastronomía", labelEn: "Gastronomy" },
  { id: "maquillaje", labelEs: "Maquillaje", labelEn: "Beauty" },
  { id: "cultura", labelEs: "Cultura", labelEn: "Culture" },
]

export default function WeddingNavigation({
  className,
  style,
  currentLang = "es",
  onLanguageChange,
  sections = DEFAULT_SECTIONS,
  scrollOffset = 72,
  onNavigate,
  coupleName = "Fernanda & Diego",
}: WeddingNavigationProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)

  // Smooth scroll handler
  const handleAnchorClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const href = `#${id}`
      if (typeof document === "undefined") return
      const el = document.querySelector(href) as HTMLElement | null
      if (!el) return
      e.preventDefault()
      const offset = scrollOffset ?? 72
      const top =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        Math.max(offset, navRef.current?.offsetHeight ?? 0)
      window.scrollTo({ top, behavior: "smooth" })
      setActiveId(id)
      onNavigate?.(id)
      setIsOpen(false)
    },
    [onNavigate, scrollOffset],
  )

  // Observe sections to highlight active link
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActiveId(visible.target.id)
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6],
        rootMargin: `-${Math.max(scrollOffset, navRef.current?.offsetHeight ?? 0)}px 0px -40% 0px`,
      },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections, scrollOffset])

  const renderLabel = (s: SectionDef) => (currentLang === "es" ? s.labelEs : s.labelEn)

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label={currentLang === "es" ? "Navegación principal" : "Primary navigation"}
      className={cn(
        "sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md shadow-black/5",
        "backdrop-blur supports-[backdrop-filter]:bg-primary/95",
        className,
      )}
      style={style}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Logo / Names */}
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "hero")}
            className="group inline-flex items-center gap-2 rounded-full px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-secondary ring-1 ring-black/5"
              aria-hidden="true"
            >
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757476063645-f3wef72rnce.png"
                alt="Logo FD"
                width={28}
                height={28}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="font-heading text-base sm:text-lg font-semibold tracking-tight text-white">
              {coupleName}
            </span>
          </a>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-1">
                {sections.map((s) => {
                  const isActive = activeId === s.id
                  const isRSVP = s.id === "rsvp"
                  const isExternalRoute = s.id === "mapa"
                  
                  if (isExternalRoute) {
                    return (
                      <li key={s.id}>
                        <Link
                          href="/mapa"
                          className={cn(
                            "inline-flex items-center px-3.5 py-2 text-sm font-medium transition-all relative",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            "text-primary-foreground/80 hover:text-white"
                          )}
                        >
                          <span className="truncate">{renderLabel(s)}</span>
                        </Link>
                      </li>
                    )
                  }

                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => handleAnchorClick(e, s.id)}
                        className={cn(
                          "inline-flex items-center px-3.5 py-2 text-sm font-medium transition-all relative",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isRSVP 
                            ? "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90 ml-2 px-5 rounded-full" 
                            : isActive
                              ? "text-white after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-white after:content-['']"
                              : "text-primary-foreground/80 hover:text-white",
                        )}
                      >
                        <span className="truncate">{renderLabel(s)}</span>
                      </a>
                    </li>
                  )
                })}

            </ul>


          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    aria-label={currentLang === "es" ? "Abrir menú" : "Open menu"}
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-96 bg-primary text-primary-foreground border-none"
                >
                  <SheetHeader className="text-left">
                    <SheetTitle className="font-heading text-lg">
                      {currentLang === "es" ? "Menú" : "Menu"}
                    </SheetTitle>
                  </SheetHeader>
                      <div className="mt-4 flex flex-col gap-2">
                        {sections.map((s) => {
                          const isActive = activeId === s.id
                          const isRSVP = s.id === "rsvp"
                          const isExternalRoute = s.id === "mapa"

                            if (isExternalRoute) {
                              return (
                                <SheetClose asChild key={s.id}>
                                  <Link
                                    href="/mapa"
                                    className={cn(
                                      "flex items-center justify-between px-4 py-3.5 text-base font-medium transition-all relative",
                                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                      "text-primary-foreground hover:bg-white/5",
                                    )}
                                  >
                                    <span className="min-w-0 truncate">{renderLabel(s)}</span>
                                    <span
                                      className="ml-3 h-1.5 w-1.5 rounded-full bg-primary-foreground/20"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                </SheetClose>
                              )
                            }
                            
                            return (
                              <SheetClose asChild key={s.id}>
                                <a
                                  href={`#${s.id}`}
                                  onClick={(e) => handleAnchorClick(e, s.id)}
                                  className={cn(
                                    "flex items-center justify-between px-4 py-3.5 text-base font-medium transition-all relative",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    isRSVP
                                      ? "bg-secondary text-secondary-foreground shadow-md mt-2 rounded-xl"
                                      : isActive
                                        ? "text-white after:absolute after:bottom-2 after:left-4 after:right-10 after:h-0.5 after:bg-white after:content-['']"
                                        : "text-primary-foreground hover:bg-white/5",
                                  )}
                                >
                                  <span className="min-w-0 truncate">{renderLabel(s)}</span>
                                  {isRSVP ? (
                                    <div className="h-2 w-2 rounded-full bg-secondary-foreground animate-pulse" />
                                  ) : (
                                    <span
                                      className={cn(
                                        "ml-3 h-1.5 w-1.5 rounded-full",
                                        isActive ? "bg-white" : "bg-primary-foreground/20",
                                      )}
                                      aria-hidden="true"
                                    />
                                  )}
                                </a>
                              </SheetClose>
                            )
                        })}
                      </div>


                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}