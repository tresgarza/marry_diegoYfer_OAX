"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  MapPin,
  CircleArrowOutUpRight,
  MessageCirclePlus,
  Copyright as CopyrightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "es";

type LocationLink = {
  labelEn: string;
  labelEs: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
};

export interface WeddingFooterProps {
  className?: string;
  lang: Lang;
  onLangChange?: (lang: Lang) => void;
  whatsappPhone: string;
  whatsappMessageEn?: string;
  whatsappMessageEs?: string;
  locations: LocationLink[];
  socialLinks?: SocialLink[];
  brandName?: string;
  year?: number;
}

export default function WeddingFooter({
  className,
  lang,
  onLangChange,
  whatsappPhone,
  whatsappMessageEn = "Hello! I have a question about the wedding.",
  whatsappMessageEs = "¡Hola! Tengo una pregunta sobre la boda.",
  locations,
  socialLinks = [],
  brandName = "Fernanda & Diego",
  year = new Date().getFullYear(),
}: WeddingFooterProps) {
  const isEN = lang === "en";

  const handleLangChange = (next: Lang) => {
    if (next === lang) return;
    onLangChange?.(next);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("site:lang", next);
      }
    } catch {
      // no-op
    }
    toast.success(next === "en" ? "Language set to English" : "Idioma cambiado a Español");
  };

  const openWhatsApp = () => {
    const msg = isEN ? whatsappMessageEn : whatsappMessageEs;
    const phone = whatsappPhone.replace(/[^\d]/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer
      className={cn(
        "w-full bg-primary text-secondary",
        "border-t border-primary/40",
        className
      )}
      aria-labelledby="wedding-footer-heading"
    >
      <div className="container py-8 sm:py-10">
        <h2 id="wedding-footer-heading" className="sr-only">
          {isEN ? "Site Footer" : "Pie de página del sitio"}
        </h2>

        <div className="flex flex-col gap-8">
          {/* Top row: Language + Contact */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm/6 opacity-90">
                {isEN ? "Language" : "Idioma"}
              </span>
              <div
                role="group"
                aria-label={isEN ? "Language toggle" : "Selector de idioma"}
                className={cn(
                  "inline-flex rounded-full bg-secondary/10 p-1 backdrop-blur",
                  "ring-1 ring-inset ring-secondary/20"
                )}
              >
                <Button
                  type="button"
                  variant="ghost"
                  aria-pressed={lang === "es"}
                  onClick={() => handleLangChange("es")}
                  className={cn(
                    "h-8 rounded-full px-3 text-xs font-medium transition-colors",
                    lang === "es"
                      ? "bg-secondary text-primary hover:bg-secondary"
                      : "text-secondary hover:bg-secondary/10"
                  )}
                >
                  ES
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  aria-pressed={lang === "en"}
                  onClick={() => handleLangChange("en")}
                  className={cn(
                    "h-8 rounded-full px-3 text-xs font-medium transition-colors",
                    lang === "en"
                      ? "bg-secondary text-primary hover:bg-secondary"
                      : "text-secondary hover:bg-secondary/10"
                  )}
                >
                  EN
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={openWhatsApp}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full",
                  "bg-secondary text-primary hover:bg-secondary/90",
                  "h-9 px-4"
                )}
                aria-label={
                  isEN ? "Chat on WhatsApp" : "Chatear en WhatsApp"
                }
              >
                <MessageCirclePlus className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">
                  {isEN ? "Questions? WhatsApp" : "¿Dudas? WhatsApp"}
                </span>
              </Button>
            </div>
          </div>

          <Separator className="bg-secondary/20" />

          {/* Middle row: Locations + Social */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-secondary/90">
                {isEN ? "Venues & Maps" : "Lugares y Mapas"}
              </h3>
              <ul className="flex flex-col gap-2">
                {locations.slice(0, 6).map((loc, idx) => (
                  <li key={`${loc.href}-${idx}`} className="min-w-0">
                    <a
                      href={loc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group inline-flex items-center gap-2 rounded-md px-2 py-1.5",
                        "text-sm text-secondary hover:bg-secondary/10 focus:bg-secondary/10",
                        "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-primary"
                      )}
                    >
                      <MapPin
                        className="h-4 w-4 text-secondary/80"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 truncate">
                        {isEN ? loc.labelEn : loc.labelEs}
                      </span>
                      <CircleArrowOutUpRight
                        className="h-3.5 w-3.5 text-secondary/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
                {locations.length === 0 && (
                  <li className="text-sm text-secondary/70">
                    {isEN ? "Location details coming soon." : "Pronto compartiremos las ubicaciones."}
                  </li>
                )}
              </ul>
            </div>

            <div className="min-w-0">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-secondary/90">
                {isEN ? "Connect" : "Conectar"}
              </h3>
              {socialLinks.length > 0 ? (
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {socialLinks.map((s, i) => (
                    <li key={`${s.href}-${i}`}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group inline-flex items-center gap-1.5 rounded-md px-2 py-1.5",
                          "text-sm text-secondary hover:bg-secondary/10 focus:bg-secondary/10",
                          "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-primary"
                        )}
                      >
                        <span className="truncate">{s.label}</span>
                        <CircleArrowOutUpRight
                          className="h-3.5 w-3.5 text-secondary/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-secondary/70">
                  {isEN
                    ? "Follow along — social links will appear here."
                    : "Síguenos — aquí aparecerán los enlaces sociales."}
                </p>
              )}
            </div>
          </div>

          <Separator className="bg-secondary/20" />

          {/* Bottom row: Legal */}
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="flex items-center gap-1.5 text-xs text-secondary/80">
              <CopyrightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate">
                {year} {brandName}.{" "}
                {isEN ? "All rights reserved." : "Todos los derechos reservados."}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://policies.google.com/privacy?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 text-secondary/80 hover:text-secondary",
                  "rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-primary"
                )}
                aria-label={isEN ? "View Privacy Policy" : "Ver Política de Privacidad"}
              >
                <span>{isEN ? "Privacy" : "Privacidad"}</span>
                <CircleArrowOutUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <span className="hidden h-3 w-px bg-secondary/30 sm:inline-block" aria-hidden="true" />
              <a
                href="https://policies.google.com/terms?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 text-secondary/80 hover:text-secondary",
                  "rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-primary"
                )}
                aria-label={isEN ? "View Terms of Use" : "Ver Términos de Uso"}
              >
                <span>{isEN ? "Terms" : "Términos"}</span>
                <CircleArrowOutUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}