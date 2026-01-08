"use client";

import { 
  Phone, 
  MapPin, 
  Star, 
  Tag, 
  Globe,
  Navigation,
  ChevronRight,
  Timer,
  ExternalLink
} from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
import { WeddingButton } from "./WeddingButton";
import { cn } from "@/lib/utils";

type Locale = "es" | "en" | "both";

export type Hotel = {
  name: string;
  category: string;
  rooms: string;
  address: string;
  phones: string[];
  website?: string;
  email?: string;
  rate: string;
  deadline: string;
  contact: string;
  promoCode?: string;
  instructions?: string;
  coords: { lat: number; lng: number };
  distanceToVenue?: string;
  durationToVenue?: string;
};

export type WeddingHotelsProps = {
  locale?: Locale;
  hotels?: Hotel[];
};

function formatMxPhone(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length < 10) return phone;
  const last10 = digits.slice(-10);
  return `${last10.slice(0, 3)} ${last10.slice(3, 6)} ${last10.slice(6)}`;
}

export default function WeddingHotels({
  hotels = [],
}: WeddingHotelsProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {hotels.map((hotel, idx) => (
          <HotelCard 
            key={hotel.name} 
            hotel={hotel} 
            index={idx} 
          />
        ))}
      </div>
    </div>
  );
}

function HotelCard({ 
  hotel, 
  index 
}: { 
  hotel: Hotel; 
  index: number; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-ink/5 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-500 overflow-hidden"
    >
      {/* Distance Badge */}
      {hotel.distanceToVenue && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-secondary/20 shadow-sm">
              <Timer className="h-3 w-3 text-secondary" />
              <span className="text-[10px] font-black text-ink tracking-tight">
                {hotel.durationToVenue}
              </span>
            </div>
            <span className="text-[8px] font-black text-secondary uppercase tracking-widest bg-secondary/5 px-2 py-0.5 rounded-full border border-secondary/10">
              A Santo Domingo
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest text-secondary border border-secondary/20 uppercase bg-secondary/5">
              {hotel.category}
            </span>
            <div className="flex items-center gap-0.5 text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-2.5 w-2.5 fill-current",
                    i >= parseInt(hotel.category) && "text-secondary/20 fill-transparent"
                  )} 
                />
              ))}
            </div>
          </div>
          <h3 className="font-heading text-lg text-ink leading-tight group-hover:text-secondary transition-colors">
            {hotel.name}
          </h3>
          <div className="mt-2 flex items-start gap-1.5">
            <MapPin className="h-3 w-3 text-ink/30 shrink-0 mt-0.5" />
            <p className="text-[10px] text-ink/50 font-medium leading-relaxed line-clamp-2">
              {hotel.address}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="p-2.5 rounded-xl bg-secondary/[0.03] border border-secondary/5">
            <p className="text-[7px] uppercase tracking-[0.15em] text-secondary/60 font-black mb-1">Tarifa</p>
            <p className="text-[11px] font-bold text-ink leading-tight">{hotel.rate}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-ink/[0.02] border border-ink/5">
            <p className="text-[7px] uppercase tracking-[0.15em] text-ink/30 font-black mb-1">Límite Reserva</p>
            <p className="text-[11px] font-bold text-ink leading-tight">{hotel.deadline}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-ink/[0.02] border border-ink/5">
            <p className="text-[7px] uppercase tracking-[0.15em] text-ink/30 font-black mb-1">Bloqueo</p>
            <p className="text-[11px] font-bold text-ink leading-tight">{hotel.rooms}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-ink/[0.02] border border-ink/5">
            <p className="text-[7px] uppercase tracking-[0.15em] text-ink/30 font-black mb-1">Contacto</p>
            <p className="text-[11px] font-bold text-ink leading-tight">{hotel.contact}</p>
          </div>
        </div>

        {/* Promo Code */}
        {hotel.promoCode && (
          <div className="mb-6 p-3 bg-secondary/5 rounded-xl border border-dashed border-secondary/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-3 w-3 text-secondary/50" />
              <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Código:</span>
              <span className="text-[10px] font-mono font-bold text-ink">{hotel.promoCode}</span>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(hotel.promoCode!)}
              className="text-[8px] font-black text-secondary hover:text-secondary/70 uppercase tracking-widest transition-colors"
            >
              Copiar
            </button>
          </div>
        )}

        {/* Instructions */}
        {hotel.instructions && (
          <div className="mt-auto pt-4 border-t border-ink/5">
            <p className="text-[10px] text-ink/60 leading-relaxed italic">
              "{hotel.instructions}"
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-ink/[0.02] border-t border-ink/5 flex items-center gap-2">
        {hotel.website && (
          <a
            href={hotel.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-ink text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all"
          >
            Reservar
            <Globe className="h-3 w-3" />
          </a>
        )}
        <div className="flex items-center gap-1">
          {hotel.phones.length > 0 && (
            <a 
              href={`tel:${hotel.phones[0]}`}
              className="p-2.5 bg-white border border-ink/10 rounded-xl text-ink/50 hover:text-secondary hover:border-secondary/30 transition-all"
              title="Llamar"
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white border border-ink/10 rounded-xl text-ink/50 hover:text-secondary hover:border-secondary/30 transition-all"
            title="Ver Mapa"
          >
            <Navigation className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
