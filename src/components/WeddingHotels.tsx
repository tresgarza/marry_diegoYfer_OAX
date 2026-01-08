"use client";

import Link from "next/link";
import { 
  Phone, 
  MapPin, 
  Mail,
  User,
  Calendar,
  CreditCard,
  Ticket,
  ExternalLink,
  Star,
  Footprints,
  Info,
  Navigation,
  Map as MapIcon,
  X,
  Church,
  Music,
  Maximize2
} from "lucide-react";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { WeddingMap } from "./WeddingMap";

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
    durationToChurch?: string;
    durationToParty?: string;
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
    const [activeHotelId, setActiveHotelId] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        setActiveHotelId(hotels[0]?.name || null);
      }
    }, [hotels]);

    const [isLocked, setIsLocked] = React.useState(false);
    const lockTimerRef = React.useRef<NodeJS.Timeout | null>(null);
    const observerRef = React.useRef<IntersectionObserver | null>(null);

    const lockObserver = (ms = 800) => {
      setIsLocked(true);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => setIsLocked(false), ms);
    };

    const activeHotelIdRef = React.useRef(activeHotelId);
    const lastUpdateRef = React.useRef(Date.now());

    React.useEffect(() => {
      activeHotelIdRef.current = activeHotelId;
    }, [activeHotelId]);

    React.useEffect(() => {
      const callback = (entries: IntersectionObserverEntry[]) => {
        if (isLocked || Date.now() - lastUpdateRef.current < 100) return;
        
        // Disable auto-open on mobile
        if (window.innerWidth < 1024) return;

        let bestCandidate: { name: string, ratio: number } | null = null;

      entries.forEach(entry => {
        const name = entry.target.getAttribute('data-hotel-name');
        if (name && entry.isIntersecting) {
          if (!bestCandidate || entry.intersectionRatio > bestCandidate.ratio) {
            bestCandidate = { name, ratio: entry.intersectionRatio };
          }
        }
      });

      if (bestCandidate && bestCandidate.name !== activeHotelIdRef.current) {
        if (bestCandidate.ratio > 0.4) {
          setActiveHotelId(bestCandidate.name);
          lastUpdateRef.current = Date.now();
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      threshold: [0.2, 0.4, 0.6, 0.8],
      rootMargin: "-30% 0px -30% 0px"
    });

    const currentObserver = observerRef.current;
    const cards = document.querySelectorAll('[data-hotel-name]');
    cards.forEach(card => currentObserver.observe(card));

    return () => currentObserver.disconnect();
  }, [isLocked, hotels]);

  const handleMarkerClick = (marker: any) => {
    const hotel = hotels.find(h => h.name === marker.name || h.name === marker.id);
    if (hotel) {
      lockObserver(1000);
      setActiveHotelId(hotel.name);
      const elementId = `hotel-${hotel.name.toLowerCase().replace(/\s+/g, "-")}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Sticky Map Container (Desktop Only) */}
          <div className="hidden lg:block w-[42%] sticky top-[120px] z-30">
            <div className="relative h-[500px] w-full rounded-[30px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-2 border-white group">
              <WeddingMap 
                compact={true} 
                activeMarkerId={activeHotelId}
                filterTypes={["hotel", "event"]}
                onMarkerClick={handleMarkerClick}
                offsetX={-60}
                offsetY={40}
              />
              <div className="absolute top-4 right-4 z-50">
                <Link
                  href="/mapa"
                  className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-ink rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg border border-ink/5 group"
                >
                  <Maximize2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  <span>Ver mapa completo</span>
                </Link>
              </div>
            </div>
          </div>


        {/* Cards Container */}
        <div className="w-full lg:w-[58%] flex flex-col gap-4 pb-12">
            {hotels.map((hotel, idx) => (
              <HotelCard 
                key={hotel.name} 
                id={`hotel-${hotel.name.toLowerCase().replace(/\s+/g, "-")}`}
                hotel={hotel} 
                isActive={activeHotelId === hotel.name}
                  onManualClick={() => {
                    lockObserver(1000);
                    setActiveHotelId(prev => {
                      if (window.innerWidth < 1024) {
                        return prev === hotel.name ? null : hotel.name;
                      }
                      return hotel.name;
                    });
                  }}
                onMarkerClick={handleMarkerClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function HotelCard({ 
  id,
  hotel, 
  isActive,
  onManualClick,
  onMarkerClick
}: { 
  id?: string;
  hotel: Hotel; 
  isActive: boolean;
  onManualClick: () => void;
  onMarkerClick?: (marker: any) => void;
}) {
  const isLockOpen = hotel.deadline.toLowerCase().includes("bloqueo abierto");

  const renderCategory = (cat: string) => {
    const starCount = parseInt(cat);
    if (!isNaN(starCount)) {
      return (
        <div className="flex items-center gap-0.5 text-secondary">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-3 w-3", 
                i < starCount ? "fill-current" : "text-secondary/20"
              )} 
            />
          ))}
        </div>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest text-secondary border border-secondary/20 uppercase bg-secondary/5">
        {cat}
      </span>
    );
  };

  return (
    <motion.div 
      id={id}
      data-hotel-name={hotel.name}
      onClick={onManualClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative w-full max-w-[360px] mx-auto lg:max-w-none bg-white rounded-2xl lg:rounded-[2rem] overflow-hidden transition-all duration-300 cursor-pointer border-2",
        isActive 
          ? "shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-neutral-200 z-10" 
          : "shadow-none border-neutral-100 hover:bg-neutral-50/50"
      )}
    >
        <div className="p-4 lg:p-8 flex flex-col gap-3 lg:gap-5">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-[18px] lg:text-2xl text-ink leading-tight group-hover:text-primary transition-colors">
                {hotel.name}
              </h3>
                <div className="flex flex-wrap items-center gap-4">
                  {renderCategory(hotel.category)}
                  {(hotel.durationToChurch || hotel.durationToParty) && (
                    <div className="flex items-center gap-3">
                      {hotel.durationToChurch && (
                        <div className="flex items-center gap-1.5 text-[9px] text-secondary font-bold uppercase tracking-wider">
                          <Church className="h-3 w-3" />
                          <span>{hotel.durationToChurch} caminando</span>
                        </div>
                      )}
                      {hotel.durationToParty && (
                        <div className="flex items-center gap-1.5 text-[9px] text-secondary font-bold uppercase tracking-wider">
                          <Music className="h-3 w-3" />
                          <span>{hotel.durationToParty} caminando</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
            </div>
            
            <div className={cn(
              "shrink-0 inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border shadow-sm",
              isLockOpen 
                ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                : "bg-orange-50 text-orange-700 border-orange-100"
            )}>
              {isLockOpen ? "Bloqueo Abierto" : "Disponibilidad Limitada"}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-neutral-50 p-3 lg:p-4 rounded-2xl border border-neutral-100">
            <MapPin className="h-4 w-4 text-secondary shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[8px] uppercase font-black text-ink/30 tracking-widest">Dirección</span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className={cn(
                  "text-[12px] lg:text-[13px] text-ink font-semibold leading-tight transition-all",
                  !isActive ? "truncate" : "whitespace-normal"
                )}>
                  {hotel.address}
                </p>
              </div>
            </div>
          </div>

          {/* Rates and Promo Section - Shown in collapsed version as requested - Mobile Only */}
          <div className="flex flex-col gap-2 lg:hidden">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Rate Card */}
              <div className="flex-1 flex items-center gap-3 bg-secondary/5 p-2 rounded-xl border border-secondary/10">
                <CreditCard className="h-3.5 w-3.5 text-secondary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[7px] uppercase font-black text-secondary/60 tracking-widest">Tarifa Preferencial</span>
                  <p className="text-[12px] font-bold text-ink leading-tight">{hotel.rate}</p>
                </div>
              </div>
              
              {/* Promo Code */}
              {hotel.promoCode && (
                <div className="flex-1 flex items-center justify-between px-3 py-2 bg-ink text-white rounded-xl shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[7px] text-white/50 font-black uppercase tracking-widest">Código de Grupo</span>
                    <span className="text-[12px] font-mono font-black tracking-wider text-white">{hotel.promoCode}</span>
                  </div>
                  <Ticket className="h-4 w-4 text-secondary" />
                </div>
              )}
            </div>
          </div>

          {!isActive && (
            <div className="flex flex-col items-center gap-3 pt-2 lg:hidden">
              <div className="flex w-full gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coords.lat},${hotel.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Cómo llegar</span>
                  <Navigation className="h-3 w-3" />
                </a>
                {hotel.website && (
                  <a
                    href={hotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-ink text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Reservar</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/60">
                ver más detalles
              </span>
            </div>
          )}

          {/* Detailed Info (Mobile Only expansion logic) */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-col gap-4 lg:hidden overflow-hidden"
              >
                {/* Mobile Interactive Map */}
                <div
                  className="lg:hidden w-full h-[110px] rounded-2xl overflow-hidden border border-neutral-100 shadow-inner relative pointer-events-none"
                  onClick={(e) => e.stopPropagation()}
                >
                    <WeddingMap 
                      compact={true}
                      activeMarkerId={hotel.name}
                      focusIds={[hotel.name, "ceremonia", "recepcion"]}
                      filterTypes={["hotel", "event"]}
                      onMarkerClick={onMarkerClick}
                      hideUI={true}
                      hideLegend={true}
                    />
                </div>

                {/* Details Section - "Datos para reserva" */}
                <div className="flex flex-col gap-3 lg:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ink/30 whitespace-nowrap">Datos para reserva</span>
                    <div className="h-[1px] w-full bg-neutral-100" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {/* Ejecutivo */}
                    <div className="flex flex-col">
                      <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Ejecutivo(a)</span>
                      <span className="text-[14px] font-bold text-ink">{hotel.contact}</span>
                    </div>

                    {/* Email */}
                    {hotel.email && (
                      <div className="flex flex-col">
                        <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Vía Email</span>
                        <a 
                          href={`mailto:${hotel.email}`} 
                          className="text-[14px] font-bold text-secondary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {hotel.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Líneas Directas */}
                  <div className="flex flex-col">
                    <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-2">Líneas Directas</span>
                    <div className="flex flex-wrap gap-4">
                      {hotel.phones.map((p, i) => (
                        <a 
                          key={i} 
                          href={`tel:${p}`}
                          className="text-[14px] lg:text-[15px] font-bold text-ink hover:text-secondary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {formatMxPhone(p)}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Instructions / Note */}
                  {hotel.instructions && (
                    <div className="bg-neutral-50/80 p-3 lg:p-4 rounded-2xl border border-neutral-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-5">
                        <Info className="h-12 w-12" />
                      </div>
                      <p className="text-[12px] text-ink/80 font-medium leading-relaxed italic relative z-10">
                        {hotel.instructions}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-3 pt-2">
                   <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coords.lat},${hotel.coords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-ink active:scale-[0.98] shadow-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Cómo llegar</span>
                    <Navigation className="h-4 w-4" />
                  </a>

                  {hotel.website && (
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-ink text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-secondary active:scale-[0.98] shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                        <span>Reservar</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onManualClick();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-100 text-ink rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-neutral-200"
                  >
                    <span>Ver menos</span>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Only Detailed View (Static) */}
          <div className="hidden lg:flex flex-col gap-5">
             {/* Rates and Promo Section */}
             <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                {/* Rate Card */}
                <div className="flex-1 flex items-center gap-3 bg-secondary/5 p-3 lg:p-4 rounded-2xl border border-secondary/10">
                  <CreditCard className="h-4 w-4 text-secondary shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase font-black text-secondary/60 tracking-widest">Tarifa Preferencial</span>
                    <p className="text-[14px] font-bold text-ink leading-tight">{hotel.rate}</p>
                  </div>
                </div>
                
                {/* Promo Code - Prominent */}
                {hotel.promoCode && (
                  <div className="flex-1 flex items-center justify-between px-3 py-2 lg:px-4 lg:py-3 bg-ink text-white rounded-2xl shadow-lg">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-white/50 font-black uppercase tracking-widest">Código de Grupo</span>
                      <span className="text-[14px] lg:text-[16px] font-mono font-black tracking-wider text-white">{hotel.promoCode}</span>
                    </div>
                    <Ticket className="h-5 w-5 text-secondary" />
                  </div>
                )}
              </div>
            </div>

            {/* Details Section - "Datos para reserva" */}
            <div className="flex flex-col gap-3 lg:gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ink/30 whitespace-nowrap">Datos para reserva</span>
                <div className="h-[1px] w-full bg-neutral-100" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {/* Ejecutivo */}
                <div className="flex flex-col">
                  <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Ejecutivo(a)</span>
                  <span className="text-[14px] font-bold text-ink">{hotel.contact}</span>
                </div>

                {/* Email */}
                {hotel.email && (
                  <div className="flex flex-col">
                    <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Vía Email</span>
                    <a 
                      href={`mailto:${hotel.email}`} 
                      className="text-[14px] font-bold text-secondary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {hotel.email}
                    </a>
                  </div>
                )}
              </div>

              {/* Líneas Directas */}
              <div className="flex flex-col">
                <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-2">Líneas Directas</span>
                <div className="flex flex-wrap gap-4">
                  {hotel.phones.map((p, i) => (
                    <a 
                      key={i} 
                      href={`tel:${p}`}
                      className="text-[14px] lg:text-[15px] font-bold text-ink hover:text-secondary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {formatMxPhone(p)}
                    </a>
                  ))}
                </div>
              </div>

              {/* Instructions / Note */}
              {hotel.instructions && (
                <div className="bg-neutral-50/80 p-3 lg:p-4 rounded-2xl border border-neutral-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5">
                    <Info className="h-12 w-12" />
                  </div>
                  <p className="text-[12px] text-ink/80 font-medium leading-relaxed italic relative z-10">
                    {hotel.instructions}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coords.lat},${hotel.coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 lg:py-4 bg-secondary text-white rounded-2xl text-[11px] lg:text-[12px] font-black uppercase tracking-widest transition-all hover:bg-ink active:scale-[0.98] shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Cómo llegar</span>
                <Navigation className="h-4 w-4" />
              </a>

              {hotel.website && (
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 lg:py-4 bg-ink text-white rounded-2xl text-[11px] lg:text-[12px] font-black uppercase tracking-widest transition-all hover:bg-secondary active:scale-[0.98] shadow-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Reservar</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
    </motion.div>
  );
}
