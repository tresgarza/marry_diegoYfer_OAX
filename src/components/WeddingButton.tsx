"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WeddingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: any
  href?: string
  variant?: "primary" | "secondary"
  target?: string
  rel?: string
}

export function WeddingButton({
  as: Component = "button",
  variant = "primary",
  className,
  ...props
}: WeddingButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
    secondary: "bg-transparent text-secondary-foreground hover:bg-ink/5 border border-secondary-foreground/20",
  }

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
