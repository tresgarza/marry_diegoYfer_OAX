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
  Maximize2,
  Copy,
  Check
} from "lucide-react";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const isLockedRef = React.useRef(false);
  const lockTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = React.useRef(Date.now());
  const activeHotelIdRef = React.useRef(activeHotelId);

  React.useEffect(() => {
    activeHotelIdRef.current = activeHotelId;
  }, [activeHotelId]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setActiveHotelId(hotels[0]?.name || null);
    }
  }, [hotels]);

  const lockObserver = (ms = 2500) => {
    isLockedRef.current = true;
    lastUpdateRef.current = Date.now();
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false;
    }, ms);
  };

  React.useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (isLockedRef.current || Date.now() - lastUpdateRef.current < 200) return;
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

      if (bestCandidate && bestCandidate.name !== activeHotelIdRef.current && bestCandidate.ratio > 0.4) {
        setActiveHotelId(bestCandidate.name);
        lastUpdateRef.current = Date.now();
      }
    };

    const observer = new IntersectionObserver(callback, {
      threshold: [0.1, 0.4, 0.7, 1.0],
      rootMargin: "-25% 0px -25% 0px"
    });

    const cards = document.querySelectorAll('[data-hotel-name]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [hotels]);

  const handleScrollToCard = (hotelName: string) => {
    const id = `hotel-${hotelName.toLowerCase().replace(/\s+/g, "-")}`;
    const element = document.getElementById(id);
    if (element) {
      lockObserver(2500);
      setActiveHotelId(hotelName);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleMarkerClick = (marker: any) => {
    const hotel = hotels.find(h => h.name === marker.name || h.name === marker.id);
    if (hotel) {
      handleScrollToCard(hotel.name);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        <div className="hidden lg:block w-[42%] sticky top-[120px] z-30">
          <div className="relative h-[500px] w-full rounded-[30px] overflow-hidden shadow-2xl border-2 border-white group">
            <WeddingMap 
              compact={true} 
              activeMarkerId={activeHotelId}
              filterTypes={["hotel", "event"]}
              onMarkerClick={handleMarkerClick}
              offsetX={-60}
              offsetY={40}
              autoFit={true}
              activeZoom={15}
            />
            <div className="absolute top-4 right-4 z-50">
              <Link
                href="/mapa"
                className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-ink rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg border border-ink/5"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Ver mapa completo</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[58%] flex flex-col gap-4 pb-12">
          {hotels.map((hotel) => (
            <HotelCard 
              key={hotel.name} 
              id={`hotel-${hotel.name.toLowerCase().replace(/\s+/g, "-")}`}
              hotel={hotel} 
              isActive={activeHotelId === hotel.name}
              onManualClick={() => {
                if (window.innerWidth < 1024) {
                  setActiveHotelId(prev => prev === hotel.name ? null : hotel.name);
                } else {
                  handleScrollToCard(hotel.name);
                }
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
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hotel.promoCode) {
      navigator.clipboard.writeText(hotel.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderCategory = (cat: string) => {
    const starCount = parseInt(cat);
    if (!isNaN(starCount)) {
      return (
        <div className="flex items-center gap-0.5 text-secondary">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn("h-3 w-3", i < starCount ? "fill-current" : "text-secondary/20")} />
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
      className={cn(
        "relative w-full max-w-[360px] mx-auto lg:max-w-none overflow-hidden transition-all duration-500 cursor-pointer",
        isActive ? "shadow-xl scale-[1.01] z-10" : "shadow-none hover:bg-neutral-50/50"
      )}
      style={{
        borderRadius: "1.5rem 1.6rem 1.4rem 1.7rem / 1.6rem 1.5rem 1.7rem 1.4rem",
        border: "1px solid rgba(0,0,0,0.08)",
        borderBottomWidth: "3px",
        borderBottomColor: isActive ? "rgba(198, 107, 61, 0.2)" : "rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="absolute inset-0 z-0">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_BLANCA-1767905973064.png?width=8000&height=8000&resize=contain" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 p-4 lg:p-8 flex flex-col gap-3 lg:gap-5">
        <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-[18px] lg:text-2xl text-ink leading-tight">{hotel.name}</h3>
              {(hotel.durationToChurch || hotel.durationToParty) && (
                <div className="flex items-center gap-3">
                  {hotel.durationToChurch && <div className="flex items-center gap-1.5 text-[9px] text-secondary font-bold uppercase tracking-wider"><Church className="h-3 w-3" /><span>{hotel.durationToChurch} caminando</span></div>}
                  {hotel.durationToParty && <div className="flex items-center gap-1.5 text-[9px] text-secondary font-bold uppercase tracking-wider"><Music className="h-3 w-3" /><span>{hotel.durationToParty} caminando</span></div>}
                </div>
              )}
            </div>
            <div className="shrink-0 pt-1">
              {renderCategory(hotel.category)}
            </div>
          </div>

        <div className="flex items-center gap-3 bg-neutral-50 p-3 lg:p-4 rounded-2xl border border-neutral-100">
          <MapPin className="h-4 w-4 text-secondary shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[8px] uppercase font-black text-ink/30 tracking-widest">Dirección</span>
            <p className={cn("text-[12px] lg:text-[13px] text-ink font-semibold leading-tight", !isActive ? "truncate" : "whitespace-normal")}>{hotel.address}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:hidden">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 bg-secondary/5 p-2 rounded-xl border border-secondary/10">
              <CreditCard className="h-3.5 w-3.5 text-secondary shrink-0" />
              <div className="flex flex-col">
                <span className="text-[7px] uppercase font-black text-secondary/60 tracking-widest">Tarifa Preferencial</span>
                <p className="text-[12px] font-bold text-ink leading-tight">{hotel.rate}</p>
              </div>
            </div>
            {hotel.promoCode && (
              <div 
                onClick={handleCopy}
                className="flex-1 flex items-center justify-between px-3 py-2 bg-[#1a2e1a] text-white rounded-xl shadow-sm group active:scale-95 transition-transform"
              >
                <div className="flex flex-col">
                  <span className="text-[7px] text-white/50 font-black uppercase tracking-widest">Código</span>
                  <span className="text-[12px] font-mono font-black tracking-wider text-white uppercase">{hotel.promoCode}</span>
                </div>
                <div className="bg-white/10 p-1.5 rounded-lg">
                  {copied ? <Check className="h-3.5 w-3.5 text-secondary" /> : <Copy className="h-3.5 w-3.5 text-secondary/70" />}
                </div>
              </div>
            )}
          </div>
        </div>

        {!isActive && (
          <div className="flex flex-col items-center gap-3 pt-2 lg:hidden">
            <div className="flex w-full gap-2">
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coords.lat},${hotel.coords.lng}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#b84269] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm" onClick={(e) => e.stopPropagation()}>
                <span>Cómo llegar</span>
                <Navigation className="h-3 w-3" />
              </a>
              {hotel.website && (
                <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#243A2B] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm" onClick={(e) => e.stopPropagation()}>
                  <span>Reservar</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/60">ver más detalles</span>
          </div>
        )}

        <AnimatePresence>
          {isActive && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-4 lg:hidden overflow-hidden">
                <div className="lg:hidden w-full h-[110px] rounded-2xl overflow-hidden border border-neutral-100 shadow-inner relative pointer-events-none">
                  <WeddingMap 
                    compact={true} 
                    activeMarkerId={hotel.name} 
                    focusIds={[hotel.name, "ceremonia", "recepcion"]} 
                    filterTypes={["hotel", "event"]} 
                    onMarkerClick={onMarkerClick} 
                    hideUI={true} 
                    hideLegend={true} 
                    activeZoom={14}
                  />
                </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3"><span className="text-[9px] font-black uppercase tracking-[0.2em] text-ink/30 whitespace-nowrap">Datos para reserva</span><div className="h-[1px] w-full bg-neutral-100" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!isLockOpen && (
                      <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Fecha límite</span><span className="text-[14px] font-bold text-ink">{hotel.deadline}</span></div>
                    )}
                    <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Ejecutivo(a)</span><span className="text-[14px] font-bold text-ink">{hotel.contact}</span></div>
                  {hotel.email && <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Vía Email</span><a href={`mailto:${hotel.email}`} className="text-[14px] font-bold text-secondary hover:underline" onClick={(e) => e.stopPropagation()}>{hotel.email}</a></div>}
                </div>
                <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-2">Líneas Directas</span><div className="flex flex-wrap gap-4">{hotel.phones.map((p, i) => <a key={i} href={`tel:${p}`} className="text-[14px] font-bold text-ink hover:text-secondary" onClick={(e) => e.stopPropagation()}>{formatMxPhone(p)}</a>)}</div></div>
                {hotel.instructions && <div className="bg-neutral-50/80 p-3 rounded-2xl border border-neutral-100 relative overflow-hidden"><div className="absolute top-0 right-0 p-2 opacity-5"><Info className="h-12 w-12" /></div><p className="text-[12px] text-ink/80 font-medium leading-relaxed italic">{hotel.instructions}</p></div>}
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coords.lat},${hotel.coords.lng}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-[#b84269] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-md" onClick={(e) => e.stopPropagation()}><span>Cómo llegar</span><Navigation className="h-4 w-4" /></a>
                {hotel.website && <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-[#243A2B] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-md" onClick={(e) => e.stopPropagation()}><span>Reservar</span><ExternalLink className="h-4 w-4" /></a>}
                <button onClick={(e) => { e.stopPropagation(); onManualClick(); }} className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-100 text-ink rounded-2xl text-[10px] font-black uppercase tracking-widest"><span>Ver menos</span><X className="h-3 w-3" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden lg:flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
            <div className="flex-1 flex items-center gap-3 bg-secondary/5 p-3 lg:p-4 rounded-2xl border border-secondary/10">
              <CreditCard className="h-4 w-4 text-secondary shrink-0" />
              <div className="flex flex-col"><span className="text-[8px] uppercase font-black text-secondary/60 tracking-widest">Tarifa Preferencial</span><p className="text-[14px] font-bold text-ink leading-tight">{hotel.rate}</p></div>
            </div>
            {hotel.promoCode && (
              <div 
                onClick={handleCopy}
                className="flex-1 flex items-center justify-between px-3 py-2 lg:px-4 lg:py-3 bg-[#1a2e1a] text-white rounded-2xl shadow-lg group hover:bg-[#233d23] active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/50 font-black uppercase tracking-widest">Código</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] lg:text-[16px] font-mono font-black tracking-wider text-white uppercase">{hotel.promoCode}</span>
                    {copied && <span className="text-[10px] text-secondary font-bold animate-pulse">¡Copiado!</span>}
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
                  {copied ? <Check className="h-5 w-5 text-secondary" /> : <Copy className="h-5 w-5 text-secondary/70" />}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3"><span className="text-[9px] font-black uppercase tracking-[0.2em] text-ink/30 whitespace-nowrap">Datos para reserva</span><div className="h-[1px] w-full bg-neutral-100" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {!isLockOpen && (
                  <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Fecha límite</span><span className="text-[14px] font-bold text-ink">{hotel.deadline}</span></div>
                )}
                <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Ejecutivo(a)</span><span className="text-[14px] font-bold text-ink">{hotel.contact}</span></div>
                {hotel.email && <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Vía Email</span><a href={`mailto:${hotel.email}`} className="text-[14px] font-bold text-secondary hover:underline" onClick={(e) => e.stopPropagation()}>{hotel.email}</a></div>}
              </div>
            <div className="flex flex-col"><span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-2">Líneas Directas</span><div className="flex flex-wrap gap-4">{hotel.phones.map((p, i) => <a key={i} href={`tel:${p}`} className="text-[14px] lg:text-[15px] font-bold text-ink hover:text-secondary" onClick={(e) => e.stopPropagation()}>{formatMxPhone(p)}</a>)}</div></div>
            {hotel.instructions && <div className="bg-neutral-50/80 p-3 lg:p-4 rounded-2xl border border-neutral-100 relative overflow-hidden"><div className="absolute top-0 right-0 p-2 opacity-5"><Info className="h-12 w-12" /></div><p className="text-[12px] text-ink/80 font-medium leading-relaxed italic">{hotel.instructions}</p></div>}
          </div>
          <div className="flex gap-3">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coords.lat},${hotel.coords.lng}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 lg:py-4 bg-[#b84269] text-white rounded-2xl text-[11px] lg:text-[12px] font-black uppercase tracking-widest shadow-md" onClick={(e) => e.stopPropagation()}><span>Cómo llegar</span><Navigation className="h-4 w-4" /></a>
            {hotel.website && <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 lg:py-4 bg-[#243A2B] text-white rounded-2xl text-[11px] lg:text-[12px] font-black uppercase tracking-widest shadow-md" onClick={(e) => e.stopPropagation()}><span>Reservar</span><ExternalLink className="h-4 w-4" /></a>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
