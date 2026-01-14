"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRSVP } from "@/lib/rsvp-context"

export default function WeddingRSVPFab() {
  const [isVisible, setIsVisible] = React.useState(false)
  const { openRSVP } = useRSVP()

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    openRSVP()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={handleClick}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-6 py-3.5 text-primary-foreground shadow-2xl overflow-hidden",
              "active:scale-95 transition-transform duration-200 ring-1 ring-black/5"
            )}
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_VERDE-1767906605014.png?width=8000&height=8000&resize=contain" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#1a2e1a]/20" />
            </div>
            <MessageCircle className="relative z-10 h-5 w-5 fill-current" />
            <span className="relative z-10 font-heading font-semibold text-sm tracking-wide">Confirmar</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
