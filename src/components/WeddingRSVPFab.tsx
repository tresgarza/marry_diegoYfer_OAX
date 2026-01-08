"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WeddingRSVPFab() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      // Show FAB after scrolling 400px
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById("rsvp")
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <a
            href="#rsvp"
            onClick={handleClick}
            className={cn(
              "flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-secondary-foreground shadow-2xl",
              "active:scale-95 transition-transform duration-200 ring-1 ring-black/5"
            )}
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span className="font-heading font-semibold text-sm tracking-wide">Confirmar</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-foreground"></span>
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
