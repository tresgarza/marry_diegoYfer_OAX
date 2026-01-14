"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WeddingButton } from "./WeddingButton";
import { CalendarSearch, Flower } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CalendarEvent = {
  title: string;
  description?: string;
  location?: string;
  start: Date; // event start in local time
  end: Date; // event end in local time
  url?: string;
  organizer?: string;
};

export interface WeddingHeroProps {
  className?: string;
  style?: React.CSSProperties;
  imageUrl?: string;
  imageAlt?: string;
  names?: string;
  dateLabel?: string;
  locationLabel?: string;
  rsvpHref?: string;
  calendarEvent?: CalendarEvent;
  priorityImage?: boolean;
  embedUrl?: string; // optional iframe background (e.g., Canva)
}

function formatDateToICS(dt: Date): string {
  // Convert to UTC and format YYYYMMDDTHHMMSSZ
  const iso = dt.toISOString(); // e.g., 2025-09-12T18:00:00.000Z
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function buildICS(events: CalendarEvent[]): string {
  const dtstamp = formatDateToICS(new Date());
  const header = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fernanda & Diego Wedding//Calendar//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  const vevents = events.map((event) => {
    const dtstart = formatDateToICS(event.start);
    const dtend = formatDateToICS(event.end);
    const uid = `${dtstamp}-${Math.random().toString(36).slice(2)}@fernanda-diego`;
    const escape = (v?: string) =>
      (v ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");

    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${escape(event.title)}`,
      event.description ? `DESCRIPTION:${escape(event.description)}` : "",
      event.location ? `LOCATION:${escape(event.location)}` : "",
      event.url ? `URL:${escape(event.url)}` : "",
      event.organizer ? `ORGANIZER:${escape(event.organizer)}` : "",
      "END:VEVENT",
    ].join("\r\n");
  });

  return [...header, ...vevents, "END:VCALENDAR"].join("\r\n");
}

export default function WeddingHero({
  className,
  style,
  imageUrl,
  imageAlt = "Agave plantation in Oaxaca, Mexico",
  names = "Fernanda & Diego",
  dateLabel = "12.09.26",
  locationLabel = "Oaxaca, México",
  rsvpHref = "#rsvp",
  calendarEvent,
  embedUrl,
  priorityImage = true,
}: WeddingHeroProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fallbackImage =
    "https://source.unsplash.com/1600x900/?agave,plantation,oaxaca";

  const resolvedImage = imageUrl || fallbackImage;

  const defaultEvents: CalendarEvent[] = useMemo(
    () => [
      {
        title: "Calenda Oaxaqueña",
        description: "Iniciaremos con una calenda tradicional desde el Templo de Santo Domingo hacia el restaurante Catedral.",
        location: "Templo de Santo Domingo, Oaxaca de Juárez",
        start: new Date("2026-09-11T17:30:00-06:00"),
        end: new Date("2026-09-11T18:30:00-06:00"),
      },
      {
        title: "Cóctel de Bienvenida",
        description: "Cóctel de bienvenida y convivencia en el restaurante Catedral.",
        location: "Restaurante Catedral, Oaxaca de Juárez",
        start: new Date("2026-09-11T18:30:00-06:00"),
        end: new Date("2026-09-11T21:30:00-06:00"),
      },
      {
        title: "Ceremonia Religiosa",
        description: "Celebración matrimonial de Fernanda & Diego.",
        location: "Templo de Santo Domingo, Oaxaca de Juárez",
        start: new Date("2026-09-12T17:30:00-06:00"),
        end: new Date("2026-09-12T18:45:00-06:00"),
      },
      {
        title: "Recepción: Boda Fernanda & Diego",
        description: "Celebración con cena y baile. Código de vestimenta: Formal de verano.",
        location: "Salón Berriozábal 120, Oaxaca de Juárez",
        start: new Date("2026-09-12T19:00:00-06:00"),
        end: new Date("2026-09-13T02:00:00-06:00"),
      },
    ],
    []
  );

  const eventsToUse = calendarEvent ? [calendarEvent] : defaultEvents;

  const handleDownloadICS = useCallback(() => {
    try {
      const personalizedEvents: CalendarEvent[] = eventsToUse.map(event => ({
        ...event,
        description: `${event.description || ""}${guestName.trim() ? `\n\nInvitado: ${guestName.trim()}` : ""}`.trim(),
      }));

      const ics = buildICS(personalizedEvents);
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "itinerario-fernanda-diego.ics";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Itinerario listo. Abre el .ics para añadir los 4 eventos a tu calendario.");
    } catch (e) {
      toast.error("No se pudo generar el archivo del calendario. Inténtalo de nuevo.");
    }
  }, [eventsToUse, guestName]);

  return (
    <section
      className={cn(
        "relative w-full min-h-[80vh] h-[100dvh] bg-primary text-primary-foreground overflow-hidden",
        className
      )}
      style={style}
      aria-label="Sección principal: Boda de Fernanda y Diego"
    >
      <div className="absolute inset-0">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Hero media"
            loading="lazy"
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 border-0"
            allow="fullscreen"
            allowFullScreen
          />
        ) : (
          <Image
            src={resolvedImage}
            alt={imageAlt}
            fill
            priority={priorityImage}
            sizes="100vw"
            className="object-cover object-bottom sm:object-center"
          />
        )}
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        {/* Soft vignette for polish */}
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/10 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/40 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 h-full w-full">
          <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
            {/* Names */}
            <h1
                className={cn(
                  "font-heading tracking-wide uppercase",
                  "text-[2rem] leading-tight sm:text-5xl md:text-6xl lg:text-7xl",
                  "text-[#FAF9F6]"
                )}
            >
              {names}
            </h1>
  
            {/* Date */}
            <p
              className={cn(
                "mt-3 sm:mt-4",
                "font-heading text-2xl sm:text-2xl md:text-3xl",
                "text-[#FAF9F6]/90"
              )}
            >
              {dateLabel}
            </p>
  
            {/* Location */}
            <p
              className={cn(
                "mt-2",
                "font-heading text-sm sm:text-base md:text-lg tracking-wide italic",
                "text-[#FAF9F6]/80"
              )}
            >
              {locationLabel}
            </p>
  
            {/* Actions */}
            <div
              className={cn(
                "mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
              )}
            >
                <WeddingButton
                  onClick={() => setIsDialogOpen(true)}
                  className={cn(
                    "px-8 py-3.5 text-base sm:px-10 sm:py-4"
                  )}
                textureImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_VERDE-1767906605014.png?width=8000&height=8000&resize=contain"
                aria-label="Agregar al calendario"
              >
                <CalendarSearch className="mr-2 h-5 w-5" aria-hidden="true" />
                Agregar al calendario
              </WeddingButton>
            </div>


          {/* Name Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tu nombre</DialogTitle>
                <DialogDescription>
                  Escríbelo para personalizar el evento antes de añadirlo a tu calendario.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2 text-left">
                <Label htmlFor="guestName">Nombre completo</Label>
                <Input
                  id="guestName"
                  placeholder="Ej. María López"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={isSaving}
                  onClick={async () => {
                    if (!guestName.trim()) {
                      toast.error("Por favor escribe tu nombre");
                      return;
                    }
                    try {
                      setIsSaving(true);
                      const token = typeof window !== 'undefined' ? localStorage.getItem("bearer_token") : null;
                      const res = await fetch('/api/attendees', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        },
                        body: JSON.stringify({ name: guestName.trim() }),
                      });

                      if (!res.ok) {
                        const data = await res.json().catch(() => null);
                        toast.error(data?.error || 'No se pudo guardar tu nombre');
                        return;
                      }

                      toast.success('Nombre guardado ✅');
                      handleDownloadICS();
                      setIsDialogOpen(false);
                    } catch (e) {
                      toast.error('Ocurrió un error, inténtalo de nuevo.');
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                >
                  {isSaving ? 'Guardando...' : 'Agregar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Micro fade-in on mount for polish */}
          <div
            className={cn(
              "absolute inset-x-0 -bottom-10 mx-auto w-24 h-1 rounded-full",
              "bg-secondary/60"
            )}
            aria-hidden="true"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0px)" : "translateY(6px)",
              transition: "opacity 500ms ease, transform 500ms ease",
            }}
          />
        </div>
      </div>
    </section>
  );
}