"use client";

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
  Navigation
} from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
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
  const [activeHotelId, setActiveHotelId] = React.useState<string | null>(hotels[0]?.name || null);
  const [isLocked, setIsLocked] = React.useState(false);
  const lockTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
        // If locked or updated too recently, skip
        if (isLocked || Date.now() - lastUpdateRef.current < 100) return;

        // Find the best candidate: must be intersecting and have the highest ratio
        let bestCandidate: { name: string, ratio: number } | null = null;

        entries.forEach(entry => {
          const name = entry.target.getAttribute('data-hotel-name');
          if (name && entry.isIntersecting) {
            if (!bestCandidate || entry.intersectionRatio > bestCandidate.ratio) {
              bestCandidate = { name, ratio: entry.intersectionRatio };
            }
          }
        });

        // Threshold: only update if the best candidate is significantly visible
        // and it's different from the current active item
        if (bestCandidate && bestCandidate.name !== activeHotelIdRef.current) {
          if (bestCandidate.ratio > 0.4) {
            setActiveHotelId(bestCandidate.name);
            lastUpdateRef.current = Date.now();
          }
        }
      };

      observerRef.current = new IntersectionObserver(callback, {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-30% 0px -30% 0px" // Tighter band to prevent overlap triggers
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
        
        {/* Sticky Map Container - Now on the LEFT */}
        <div className="w-full lg:w-[42%] sticky lg:sticky top-[68px] lg:top-[120px] z-30 order-1 lg:order-1 bg-inherit">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[250px] md:h-[300px] lg:h-[calc(100vh-220px)] w-full rounded-[24px] lg:rounded-[30px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] lg:shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-2 border-white group"
          >
            <WeddingMap 
              compact={true} 
              activeMarkerId={activeHotelId}
              filterTypes={["hotel", "event"]}
              onMarkerClick={handleMarkerClick}
              offsetX={-60}
              offsetY={40}
              />
          </motion.div>
          {/* Mobile indicator for scrolling */}
          <div className="lg:hidden flex justify-center mt-2 mb-1">
            <div className="w-12 h-1 bg-ink/10 rounded-full" />
          </div>
        </div>

        {/* Cards Container - Now on the RIGHT */}
        <div className="w-full lg:w-[58%] flex flex-col gap-4 order-2 lg:order-2 pb-12">
            {hotels.map((hotel, idx) => (
              <HotelCard 
                key={hotel.name} 
                id={`hotel-${hotel.name.toLowerCase().replace(/\s+/g, "-")}`}
                hotel={hotel} 
                index={idx}
                isActive={activeHotelId === hotel.name}
                onManualClick={() => {
                  lockObserver(1000);
                  setActiveHotelId(hotel.name);
                }}
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
  index,
  isActive,
  onManualClick
}: { 
  id?: string;
  hotel: Hotel; 
  index: number; 
  isActive: boolean;
  onManualClick: () => void;
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
        opacity: isActive ? 1 : 0.4, 
        scale: isActive ? 1 : 0.98,
        y: 0 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border",
        isActive 
          ? "shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-neutral-200 z-10" 
          : "shadow-none border-neutral-100 grayscale-[0.4]"
      )}
    >
      <div className="p-4 md:p-5 flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg md:text-xl text-ink leading-tight">
              {hotel.name}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {renderCategory(hotel.category)}
              {hotel.durationToVenue && (
                <div className="flex items-center gap-1.5 text-[9px] text-secondary font-bold uppercase tracking-wider">
                  <Footprints className="h-3 w-3" />
                  <span>{hotel.durationToVenue}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className={cn(
            "shrink-0 inline-flex items-center px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
            isLockOpen 
              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
              : "bg-orange-50 text-orange-700 border-orange-100"
          )}>
            {isLockOpen ? "Abierto" : "Limitada"}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
          <MapPin className="h-4 w-4 text-secondary shrink-0" />
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[8px] uppercase font-black text-ink/30 tracking-widest">Dirección</span>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] text-ink font-semibold leading-tight truncate">
                {hotel.address}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${hotel.coords.lat},${hotel.coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-ink transition-all flex items-center gap-1.5 border-l border-neutral-200 pl-3 active:scale-95"
              >
                <span>Cómo llegar</span>
                <Navigation className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Rates and Promo Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Rate Card */}
            <div className="flex-1 flex items-center gap-3 bg-secondary/5 p-3 rounded-xl border border-secondary/10">
              <CreditCard className="h-4 w-4 text-secondary shrink-0" />
              <div className="flex flex-col">
                <span className="text-[8px] uppercase font-black text-secondary/60 tracking-widest">Tarifa</span>
                <p className="text-[13px] font-bold text-ink leading-tight">{hotel.rate}</p>
              </div>
            </div>
            
            {/* Promo Code - Prominent */}
            {hotel.promoCode && (
              <div className="flex-1 flex items-center justify-between px-3 py-2.5 bg-ink text-white rounded-lg shadow-lg">
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/50 font-black uppercase tracking-widest">Menciona este código</span>
                  <span className="text-[15px] font-mono font-black tracking-wider text-white">{hotel.promoCode}</span>
                </div>
                <Ticket className="h-4 w-4 text-secondary" />
              </div>
            )}
          </div>
        </div>

        {/* Details Section - "Datos para reserva" */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-ink/30 whitespace-nowrap">Datos para reserva</span>
            <div className="h-[1px] w-full bg-neutral-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ejecutivo */}
            <div className="flex flex-col">
              <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Ejecutivo(a)</span>
              <span className="text-[13px] font-bold text-ink">{hotel.contact}</span>
            </div>

            {/* Email */}
            {hotel.email && (
              <div className="flex flex-col">
                <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-1">Vía Email</span>
                <a href={`mailto:${hotel.email}`} className="text-[13px] font-bold text-secondary hover:underline">
                  {hotel.email}
                </a>
              </div>
            )}
          </div>

          {/* Líneas Directas */}
          <div className="flex flex-col">
            <span className="text-[8px] text-ink/30 font-black uppercase tracking-widest mb-2">Líneas Directas</span>
            <div className="flex flex-wrap gap-3">
              {hotel.phones.map((p, i) => (
                <a 
                  key={i} 
                  href={`tel:${p}`}
                  className="text-[14px] font-bold text-ink hover:text-secondary transition-colors"
                >
                  {formatMxPhone(p)}
                </a>
              ))}
            </div>
          </div>

          {/* Instructions / Note */}
          {hotel.instructions && (
            <div className="bg-neutral-50/80 p-4 rounded-xl border border-neutral-100 relative overflow-hidden group">
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
        {hotel.website && (
          <a
            href={hotel.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-ink text-white rounded-xl text-[12px] font-black uppercase tracking-widest transition-all hover:bg-secondary active:scale-[0.98] shadow-md"
          >
            <span>Gestionar Reserva</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
