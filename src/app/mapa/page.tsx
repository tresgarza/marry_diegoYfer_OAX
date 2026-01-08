"use client";

import * as React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Hotel, 
  Utensils, 
  Landmark, 
  Heart, 
  MapPin, 
  ChevronRight, 
  Navigation,
  Info,
  X,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WeddingMap, MARKERS, MarkerData, MarkerType } from "@/components/WeddingMap";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: MarkerType | "all"; label: string; icon: any; color: string }[] = [
  { id: "all", label: "Todo", icon: MapPin, color: "#444444" },
  { id: "event", label: "Boda", icon: Heart, color: "#C66B3D" },
  { id: "hotel", label: "Hoteles", icon: Hotel, color: "#4A90E2" },
  { id: "gastronomy", label: "Comida", icon: Utensils, color: "#059669" },
  { id: "culture", label: "Cultura", icon: Landmark, color: "#D4828E" },
];

export default function MapaPage() {
  const [activeCategory, setActiveCategory] = React.useState<MarkerType | "all">("all");
  const [selectedMarker, setSelectedMarker] = React.useState<MarkerData | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredMarkers = MARKERS.filter(m => {
    const matchesCategory = activeCategory === "all" || m.type === activeCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (m.address?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="flex flex-col lg:flex-row h-screen w-full bg-white overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center gap-4 p-4 border-b border-ink/5 bg-white z-50">
        <Link href="/" className="p-2 hover:bg-ink/5 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-heading text-lg">Guía de Oaxaca</h1>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "w-full lg:w-[400px] flex flex-col border-r border-ink/10 bg-white z-40 transition-transform duration-300",
        isMobile && selectedMarker ? "h-[40vh]" : "h-full"
      )}>
        {/* Header Desktop */}
        <div className="hidden lg:flex flex-col p-6 border-b border-ink/5 gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-ink/60 hover:text-ink transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest">Volver al inicio</span>
            </Link>
          </div>
          <h1 className="font-heading text-3xl text-ink">Mapa Interactivo</h1>
          <p className="text-sm text-ink/60 font-medium">
            Explora todos los lugares recomendados para nuestra boda en Oaxaca.
          </p>
        </div>

        {/* Categories / Search */}
        <div className="p-4 lg:p-6 space-y-4 bg-white sticky top-0">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap border",
                  activeCategory === cat.id
                    ? "text-white shadow-md border-transparent"
                    : "bg-white text-ink/40 border-ink/10 hover:border-ink/30"
                )}
                style={{
                  backgroundColor: activeCategory === cat.id ? cat.color : "transparent"
                }}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar lugares..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-ink/5 rounded-xl text-sm font-medium border-transparent focus:bg-white focus:border-ink/20 focus:ring-0 transition-all"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/30" />
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-0 space-y-3">
          {filteredMarkers.length > 0 ? (
            filteredMarkers.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMarker(m)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-2xl border transition-all text-left group",
                  selectedMarker?.id === m.id
                    ? "bg-ink/5 border-ink/20 ring-1 ring-ink/5 shadow-sm"
                    : "bg-white border-ink/5 hover:border-ink/10 hover:bg-ink/[0.02]"
                )}
              >
                <div 
                  className="mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white"
                  style={{ backgroundColor: CATEGORIES.find(c => c.id === m.type || (c.id === 'all' && m.type))?.color }}
                >
                  {m.type === 'event' && <Heart className="h-4 w-4 text-white" />}
                  {m.type === 'hotel' && <Hotel className="h-4 w-4 text-white" />}
                  {m.type === 'gastronomy' && <Utensils className="h-4 w-4 text-white" />}
                  {m.type === 'culture' && <Landmark className="h-4 w-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ink text-sm lg:text-base group-hover:text-primary transition-colors truncate">
                    {m.name}
                  </h3>
                  {m.address && (
                    <p className="text-[11px] lg:text-xs text-ink/40 font-medium truncate mt-0.5">
                      {m.address}
                    </p>
                  )}
                  {m.distinction && (
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase">
                      <Sparkles className="h-2.5 w-2.5 fill-current" />
                      {m.distinction}
                    </span>
                  )}
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 mt-2 transition-all",
                  selectedMarker?.id === m.id ? "text-primary translate-x-1" : "text-ink/10"
                )} />
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-ink/30 gap-3">
              <Info className="h-8 w-8" />
              <p className="text-sm font-bold uppercase tracking-widest text-center px-4">
                No se encontraron lugares en esta categoría
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Map Content */}
      <section className="flex-1 relative h-full">
        <WeddingMap
          className="w-full h-full rounded-none border-none shadow-none"
          activeMarkerId={selectedMarker?.id}
          onMarkerClick={handleMarkerClick}
          hideLegend={isMobile}
          hideUI={false}
          offsetX={isMobile ? 0 : 0}
          offsetY={isMobile ? -80 : 0}
        />

        {/* Selected Details Drawer/Overlay */}
        <AnimatePresence>
          {selectedMarker && (
            <motion.div
              initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
              className={cn(
                "absolute bg-white shadow-2xl border-t lg:border border-ink/10 z-50 overflow-hidden",
                isMobile 
                  ? "bottom-0 left-0 right-0 rounded-t-[2.5rem] p-8" 
                  : "bottom-8 left-8 w-[380px] rounded-[2rem] p-8"
              )}
            >
              <button 
                onClick={() => setSelectedMarker(null)}
                className="absolute top-6 right-6 p-2 hover:bg-ink/5 rounded-full transition-colors text-ink/30 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2 pr-8">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-sm"
                      style={{ backgroundColor: CATEGORIES.find(c => c.id === selectedMarker.type)?.color }}
                    >
                      {CATEGORIES.find(c => c.id === selectedMarker.type)?.label}
                    </span>
                    {selectedMarker.tag && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-ink/5 text-ink/40 border border-ink/5">
                        {selectedMarker.tag}
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-ink leading-tight">
                    {selectedMarker.name}
                  </h2>
                </div>

                {selectedMarker.description && (
                  <p className="text-sm lg:text-base text-ink/60 leading-relaxed font-medium">
                    {selectedMarker.description}
                  </p>
                )}

                <div className="space-y-4">
                  {selectedMarker.address && (
                    <div className="flex items-start gap-3 text-ink/40 group">
                      <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-snug">{selectedMarker.address}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-3 pt-4">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.position.lat},${selectedMarker.position.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-white rounded-2xl text-xs lg:text-sm font-black uppercase tracking-widest transition-all hover:bg-ink hover:shadow-xl active:scale-[0.98]"
                    >
                      <Navigation className="h-5 w-5" />
                      <span>Cómo llegar</span>
                    </a>
                    
                    {selectedMarker.website && (
                      <a
                        href={selectedMarker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-ink/5 text-ink rounded-2xl text-xs lg:text-sm font-black uppercase tracking-widest transition-all hover:bg-ink hover:text-white border border-ink/10"
                      >
                        <Info className="h-5 w-5" />
                        <span>Más información</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
