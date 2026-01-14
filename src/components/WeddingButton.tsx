"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WeddingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: any
  href?: string
  variant?: "primary" | "secondary"
  target?: string
  rel?: string
  textureImage?: string
}

export function WeddingButton({
  as: Component = "button",
  variant = "primary",
  textureImage,
  className,
  children,
  ...props
}: WeddingButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-md",
    secondary: "bg-transparent text-secondary-foreground hover:bg-ink/5 border border-secondary-foreground/20",
  }

  return (
    <Component
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] overflow-hidden group",
        variants[variant],
        textureImage && "text-[#f1e9df]",
        className
      )}
      {...props}
    >
      {textureImage && (
        <div className="absolute inset-0 z-0 opacity-100 transition-opacity duration-300">
          <img 
            src={textureImage} 
            alt="" 
            className="w-full h-full object-cover"
          />
          {/* Overlay to darken green/textured backgrounds */}
          <div className="absolute inset-0 bg-[#1a2e1a]/20" />
        </div>
      )}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </Component>
  )
}
