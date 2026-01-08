"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface WeddingSectionProps {
  id?: string
  title?: string
  subtitle?: string
  bgColor?: string
  textureImage?: string
  textureOpacity?: number
  children: React.ReactNode
  className?: string
  containerClassName?: string
    withSeparator?: boolean
    topGradient?: boolean
    maxWidth?: string
    noAnimation?: boolean
  }
  
  export function WeddingSection({
    id,
    title,
    subtitle,
    bgColor = "var(--bg-ivory)",
    textureImage,
    textureOpacity = 0.5,
    children,
    className,
    containerClassName,
    maxWidth,
    noAnimation = false,
  }: WeddingSectionProps) {

  const backgroundStyle = textureImage ? {
    backgroundImage: `url(${textureImage})`,
    backgroundSize: "cover" as const,
    backgroundPosition: "center" as const,
    backgroundRepeat: "no-repeat" as const,
  } : undefined;

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-16 md:py-24",
        className
      )}
    >
      {/* Background Layers */}
      {textureImage ? (
        <div
          className="absolute inset-0 -z-10"
          style={backgroundStyle}
        />
      ) : bgColor ? (
        <div 
          className="absolute inset-0 -z-20" 
          style={{ backgroundColor: bgColor }}
        />
      ) : null}


      <div className={cn("container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative", containerClassName)}>
        {(title || subtitle) && (
          <motion.header
            className="mb-10 md:mb-16 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.21, 0.45, 0.32, 0.9] }}
          >
            {title && (
              <h2 className="font-heading text-3xl md:text-4xl text-ink tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl font-sans opacity-70">
                {subtitle}
              </p>
            )}
          </motion.header>
        )}
        
          {noAnimation ? (
            <div className="pt-2">
              {children}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.21, 0.45, 0.32, 0.9], delay: 0.1 }}
            >
              {children}
            </motion.div>
          )}

      </div>
    </section>
  )
}
