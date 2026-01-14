"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface WeddingCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  noPadding?: boolean
  textureImage?: string
}

export function WeddingCard({
  children,
  className,
  hoverEffect = true,
  noPadding = false,
  textureImage,
}: WeddingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-[20px] overflow-hidden",
        // Base background with gradient (only if no textureImage)
        !textureImage && "bg-gradient-to-b from-[rgba(255,255,255,0.92)] to-[rgba(248,244,238,0.96)]",
        // Hairline border
        "border border-[rgba(40,48,38,0.10)]",
        // Ambient shadow
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        // Transitions
        "transition-all duration-200 ease-out",
        // Hover effects
        hoverEffect && "hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] hover:border-[rgba(40,48,38,0.15)]",
        className
      )}
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.55)",
        ...(textureImage ? {
          backgroundImage: `url(${textureImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        } : {})
      } as React.CSSProperties}
    >
      {/* Background Texture Overlay */}
      {textureImage && (
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            textureImage.includes('VERDE') ? "bg-[#1a2e1a]/20" : "bg-black/5"
          )} 
          style={{ mixBlendMode: 'multiply' }}
        />
      )}
      
      {/* Highlight overlay (only if no textureImage) */}
      {!textureImage && (
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background: "radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%)",
          } as React.CSSProperties}
        />
      )}
      
      {/* Content */}
      <div className={cn("relative h-full flex flex-col", !noPadding && "p-5 sm:p-6 md:p-7 lg:p-8")}>
        {children}
      </div>
    </div>
  )
}
