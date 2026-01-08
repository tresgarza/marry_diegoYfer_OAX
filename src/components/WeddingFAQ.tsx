"use client";

import * as React from "react";
import { ChevronDown, MessageCircleQuestionMark } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type Locale = "en" | "es" | "bilingual";

export interface WeddingFAQProps {
  className?: string;
  locale?: Locale;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  heading?: string;
  subheading?: string;
}

type QA = {
  id: string;
  es: { q: string; a: React.ReactNode };
  en: { q: string; a: React.ReactNode };
};

const FAQ_DATA: QA[] = [
  {
    id: "dress-code",
    es: {
      q: "Código de vestimenta",
      a: (
        <div className="space-y-3">
          <p>
            Elegante de fiesta. Piensa en telas frescas y cómodas: la
            celebración es sobre césped. Los tonos naturales y las texturas
            ligeras combinan perfecto con el entorno.
          </p>
          <p className="text-muted-foreground">
            Sugerencia: tacones anchos o zapatos bloque para mayor comodidad.
          </p>
        </div>
      ),
    },
    en: {
      q: "Dress code",
      a: (
        <div className="space-y-3">
          <p>
            Festive cocktail. Choose breathable fabrics—ceremony and reception
            are on grass. Natural tones and airy textures complement the
            setting.
          </p>
          <p className="text-muted-foreground">
            Tip: block heels or wedges are kind to the lawn.
          </p>
        </div>
      ),
    },
  },
  {
    id: "children",
    es: {
      q: "Niños",
      a: (
        <p>
          Amamos a los peques, pero esta noche será solo para adultos para que
          todos puedan disfrutar sin prisas. ¡Gracias por entender!
        </p>
      ),
    },
    en: {
      q: "Children",
      a: (
        <p>
          We adore little ones, but this will be an adults-only evening so
          everyone can relax and celebrate. Thank you for understanding!
        </p>
      ),
    },
  },
  {
    id: "gifts",
    es: {
      q: "Regalos y mesa",
      a: (
        <div className="space-y-3">
          <p>
            Su presencia es nuestro mejor regalo. Si desean obsequiar algo,
            hemos preparado una pequeña lista con detalles significativos.
          </p>
          <p className="text-muted-foreground">
            Compartiremos la información de la mesa de regalos en la sección de
            RSVP.
          </p>
        </div>
      ),
    },
    en: {
      q: "Gifts and registry",
      a: (
        <div className="space-y-3">
          <p>
            Your presence means the world to us. If you’d like to give a gift,
            we’ve prepared a small registry with meaningful items.
          </p>
          <p className="text-muted-foreground">
            Registry details will be shared in the RSVP section.
          </p>
        </div>
      ),
    },
  },
  {
    id: "transportation",
    es: {
      q: "Transporte",
      a: (
        <div className="space-y-3">
          <p>
            Habrá transporte coordinado desde puntos centrales del centro de
            Oaxaca hacia la sede y de regreso al finalizar la fiesta.
          </p>
          <p className="text-muted-foreground">
            Los horarios y paradas se confirmarán una semana antes del evento.
          </p>
        </div>
      ),
    },
    en: {
      q: "Transportation",
      a: (
        <div className="space-y-3">
          <p>
            We will offer coordinated shuttles from central Oaxaca to the venue
            and back after the celebration.
          </p>
          <p className="text-muted-foreground">
            Pick-up times and stops will be confirmed one week before the event.
          </p>
        </div>
      ),
    },
  },
  {
    id: "weather",
    es: {
      q: "Clima",
      a: (
        <div className="space-y-3">
          <p>
            Las noches en Oaxaca suelen ser templadas. Recomendamos un abrigo
            ligero por si refresca. Contaremos con áreas semi-cubiertas.
          </p>
          <p className="text-muted-foreground">
            Habrá ventilación y calefactores sutiles si el clima lo requiere.
          </p>
        </div>
      ),
    },
    en: {
      q: "Weather",
      a: (
        <div className="space-y-3">
          <p>
            Evenings in Oaxaca are typically mild. We suggest a light layer in
            case it cools down. There will be semi-covered areas.
          </p>
          <p className="text-muted-foreground">
            Gentle heating or airflow will be available if needed.
          </p>
        </div>
      ),
    },
  },
];

function renderQuestion(item: QA, locale: Locale) {
  if (locale === "es") return item.es.q;
  if (locale === "en") return item.en.q;
  return (
    <span className="block">
      <span className="block">{item.es.q}</span>
      <span className="block text-muted-foreground text-sm">{item.en.q}</span>
    </span>
  );
}

function renderAnswer(item: QA, locale: Locale) {
  if (locale === "es") return item.es.a;
  if (locale === "en") return item.en.a;
  return (
    <div className="space-y-5">
      <div>{item.es.a}</div>
      <div className="border-t pt-4 text-sm text-muted-foreground">{item.en.a}</div>
    </div>
  );
}

export default function WeddingFAQ({
  className,
  locale = "bilingual",
  type = "single",
  defaultValue,
  heading,
  subheading,
}: WeddingFAQProps) {
  const title =
    heading ??
    (locale === "en"
      ? "Frequently Asked Questions"
      : locale === "es"
      ? "Preguntas Frecuentes"
      : "Preguntas Frecuentes · Frequently Asked Questions");

  const subtitle =
    subheading ??
    (locale === "en"
      ? "Helpful details for a relaxed celebration"
      : locale === "es"
      ? "Detalles útiles para una celebración relajada"
      : "Detalles útiles · Helpful details");

  return (
    <section
      aria-labelledby="wedding-faq-heading"
      className={cn(
        "w-full max-w-full rounded-[var(--radius)] bg-card",
        "border border-border",
        "p-4 sm:p-6 md:p-8",
        className
      )}
    >
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageCircleQuestionMark
            aria-hidden="true"
            className="h-5 w-5"
          />
          <span className="text-xs sm:text-sm tracking-wide">
            {locale === "en"
              ? "FAQ"
              : locale === "es"
              ? "FAQ"
              : "FAQ · Preguntas"}
          </span>
        </div>
        <h2
          id="wedding-faq-heading"
          className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight"
        >
          {title}
        </h2>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <Accordion
        type={type}
        defaultValue={defaultValue as any}
        className="w-full"
        collapsible={type === "single"}
      >
        {FAQ_DATA.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={cn(
              "border-b border-border focus-within:ring-1 focus-within:ring-[--ring]",
              "transition-colors"
            )}
          >
            <AccordionTrigger
              className={cn(
                "group w-full",
                "py-4 sm:py-5",
                "gap-3",
                "hover:no-underline",
                "text-left",
                "data-[state=open]:bg-secondary/40",
                "rounded-md",
                "px-2 -mx-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring]",
                "transition-colors"
              )}
            >
              <div className="flex w-full items-start justify-between gap-4">
                <div className="min-w-0 flex-1 break-words">
                  <span
                    className={cn(
                      "block",
                      "text-base sm:text-lg md:text-xl",
                      "leading-snug"
                    )}
                  >
                    {renderQuestion(item, locale)}
                  </span>
                </div>
                <span
                  className={cn(
                    "shrink-0",
                    "text-muted-foreground",
                    "group-data-[state=open]:text-primary",
                    "transition-transform"
                  )}
                  aria-hidden="true"
                >
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "overflow-hidden",
                "data-[state=open]:animate-[accordion-down]",
                "data-[state=closed]:animate-[accordion-up]"
              )}
            >
              <div
                className={cn(
                  "pl-0 sm:pl-1",
                  "pr-0 sm:pr-3",
                  "pb-5 sm:pb-6",
                  "pt-1 sm:pt-2",
                  "text-sm sm:text-base leading-relaxed",
                  "text-foreground/90"
                )}
              >
                <div
                  className={cn(
                    "relative"
                  )}
                >
                  <div className="absolute -left-3 top-1.5 hidden sm:block h-3 w-1 rounded-full bg-[color:var(--chart-2)]/60" aria-hidden="true" />
                  {renderAnswer(item, locale)}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}