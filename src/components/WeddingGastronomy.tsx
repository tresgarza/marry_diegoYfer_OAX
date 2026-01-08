"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Instagram, 
  Coffee, 
  UtensilsCrossed, 
  Martini, 
  MapPin, 
  Award, 
  Navigation, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Landmark,
  Map as MapIcon,
  X,
  Maximize2
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { WeddingMap } from "./WeddingMap";

type Language = "es" | "en";

interface GastronomyItem {
  id: string;
  name: string;
  price: string;
  distinction?: string;
  tag: string;
  description: string;
  handle?: string;
  instagram?: string;
  maps: string;
  coords: { lat: number; lng: number };
  category: string;
  distanceToSantoDomingo?: string;
  distanceToBerriozabal?: string;
}

type CategoryId = "breakfast" | "meals" | "drinks";

const GASTRO_DATA: GastronomyItem[] = [
  // Desayuno/Brunch
  {
    id: "boulenc",
    category: "breakfast",
    name: "Boulenc",
    price: "$$–$$$",
    tag: "Panadería + patio",
    description: "Pan artesanal y brunch estilo europeo; spot muy agradable para empezar el día en el centro.",
    handle: "@boulencpan",
    instagram: "https://www.instagram.com/boulencpan/",
    maps: "https://www.google.com/maps/search/?api=1&query=Boulenc%20Oaxaca",
    coords: { lat: 17.0655, lng: -96.7262 },
    distanceToSantoDomingo: "350 m",
    distanceToBerriozabal: "550 m"
  },
  {
    id: "panam",
    category: "breakfast",
    name: "Pan:AM",
    price: "$$–$$$",
    tag: "Café-panadería",
    description: "Café + panadería muy popular para desayuno; ideal si buscas algo casual pero bien hecho.",
    handle: "@panaeme",
    instagram: "https://www.instagram.com/panaeme/",
    maps: "https://www.google.com/maps/search/?api=1&query=PAN%3AAM%20Oaxaca",
    coords: { lat: 17.0645, lng: -96.7245 },
    distanceToSantoDomingo: "250 m",
    distanceToBerriozabal: "450 m"
  },
  {
    id: "itanoni",
    category: "breakfast",
    name: "Itanoní Tetelas",
    price: "$",
    distinction: "Guía MICHELIN (Selección)",
    tag: "Maíz oaxaqueño",
    description: "Antojitos de maíz (tetelas/memelas) con enfoque tradicional; auténtico y directo.",
    handle: "@itanonioficial",
    instagram: "https://www.instagram.com/itanonioficial/",
    maps: "https://www.google.com/maps/search/?api=1&query=Itanon%C3%AD%20Tetelas%20Oaxaca",
    coords: { lat: 17.0863, lng: -96.7214 },
    distanceToSantoDomingo: "2.2 km",
    distanceToBerriozabal: "2.1 km"
  },
  {
    id: "cafe-tradicion",
    category: "breakfast",
    name: "Café Tradición",
    price: "$$",
    tag: "Clásico de centro",
    description: "Café y desayuno tradicional; opción confiable, sin complicaciones.",
    handle: "@cafetradicionoax",
    instagram: "https://www.instagram.com/cafetradicionoax/",
    maps: "https://www.google.com/maps/search/?api=1&query=Caf%C3%A9%20Tradici%C3%B3n%20Oaxaca",
    coords: { lat: 17.0610, lng: -96.7260 },
    distanceToSantoDomingo: "650 m",
    distanceToBerriozabal: "850 m"
  },
  {
    id: "agua-que-canta",
    category: "breakfast",
    name: "Agua Que Canta",
    price: "$–$$",
    tag: "Healthy / vegan-friendly",
    description: "Smoothies y snacks saludables; perfecto si quieres algo ligero y rápido.",
    handle: "@agua.que.canta",
    instagram: "https://www.instagram.com/agua.que.canta/",
    maps: "https://www.google.com/maps/search/?api=1&query=Agua%20Que%20Canta%20Oaxaca",
    coords: { lat: 17.0620, lng: -96.7250 },
    distanceToSantoDomingo: "500 m",
    distanceToBerriozabal: "700 m"
  },
  {
    id: "pan-con-madre",
    category: "breakfast",
    name: "Pan con Madre",
    price: "$–$$",
    tag: "Masa madre",
    description: "Panadería artesanal (sourdough); ideal para “grab & go” con café.",
    handle: "@panconmadre",
    instagram: "https://www.instagram.com/panconmadre/",
    maps: "https://www.google.com/maps/search/?api=1&query=Pan%20con%20Madre%20Oaxaca",
    coords: { lat: 17.0670, lng: -96.7270 },
    distanceToSantoDomingo: "400 m",
    distanceToBerriozabal: "600 m"
  },
  {
    id: "yegole",
    category: "breakfast",
    name: "Yegolé",
    price: "$–$$",
    tag: "Café casual",
    description: "Café y opciones ligeras; cómodo para sentarte un rato (tipo work-friendly).",
    handle: "@yegolecafe",
    instagram: "https://www.instagram.com/yegolecafe/",
    maps: "https://www.google.com/maps/search/?api=1&query=Yegol%C3%A9%20Oaxaca",
    coords: { lat: 17.0635, lng: -96.7245 },
    distanceToSantoDomingo: "350 m",
    distanceToBerriozabal: "550 m"
  },
  // Comida/Cena
  {
    id: "danzantes",
    category: "meals",
    name: "Los Danzantes",
    price: "$$$",
    distinction: "1 Estrella MICHELIN",
    tag: "Fine dining oaxaqueño",
    description: "Cocina oaxaqueña contemporánea en uno de los patios más icónicos; gran opción para cena “importante”.",
    handle: "@danzantesoaxaca",
    instagram: "https://www.instagram.com/danzantesoaxaca/",
    maps: "https://www.google.com/maps/search/?api=1&query=Los%20Danzantes%20Oaxaca",
    coords: { lat: 17.0660, lng: -96.7235 },
    distanceToSantoDomingo: "100 m",
    distanceToBerriozabal: "250 m"
  },
  {
    id: "pitiona",
    category: "meals",
    name: "La Pitiona",
    price: "$$$",
    tag: "Rooftop + autor",
    description: "Cocina de autor con vibra de rooftop; buena para date night y experiencias más “chef-driven”.",
    handle: "@pitionaoax",
    instagram: "https://www.instagram.com/pitionaoax/",
    maps: "https://www.google.com/maps/search/?api=1&query=La%20Pitiona%20Oaxaca",
    coords: { lat: 17.0665, lng: -96.7230 },
    distanceToSantoDomingo: "50 m",
    distanceToBerriozabal: "200 m"
  },
  {
    id: "casa-oaxaca",
    category: "meals",
    name: "Casa Oaxaca (El Restaurante)",
    price: "$$$",
    distinction: "Guía MICHELIN (Selección)",
    tag: "Clásico premium",
    description: "Restaurante muy consolidado; cocina contemporánea y ambiente elegante (frecuente en rooftops/terraza).",
    handle: "@casaoaxacaelrestaurante",
    instagram: "https://www.instagram.com/casaoaxacaelrestaurante/",
    maps: "https://www.google.com/maps/search/?api=1&query=Casa%20Oaxaca%20el%20Restaurante",
    coords: { lat: 17.0664, lng: -96.7233 },
    distanceToSantoDomingo: "50 m",
    distanceToBerriozabal: "200 m"
  },
  {
    id: "quince-letras",
    category: "meals",
    name: "Las Quince Letras",
    price: "$$",
    distinction: "Bib Gourmand (MICHELIN)",
    tag: "Gran valor",
    description: "Cocina regional con excelente relación calidad-precio; gran “must” para sabores oaxaqueños.",
    handle: "@lasquinceletrasoax",
    instagram: "https://www.instagram.com/lasquinceletrasoax/",
    maps: "https://www.google.com/maps/search/?api=1&query=Las%20Quince%20Letras%20Oaxaca",
    coords: { lat: 17.0648, lng: -96.7225 },
    distanceToSantoDomingo: "250 m",
    distanceToBerriozabal: "350 m"
  },
  {
    id: "tierra-sol",
    category: "meals",
    name: "Tierra del Sol",
    price: "$$",
    distinction: "Bib Gourmand (MICHELIN)",
    tag: "Rooftop local",
    description: "Muy buen valor y experiencia; opción sólida para comer rico sin irte a $$$$.",
    handle: "@tierradelsolrestaurante",
    instagram: "https://www.instagram.com/tierradelsolrestaurante/",
    maps: "https://www.google.com/maps/search/?api=1&query=Tierra%20del%20Sol%20Oaxaca",
    coords: { lat: 17.0652, lng: -96.7238 },
    distanceToSantoDomingo: "150 m",
    distanceToBerriozabal: "300 m"
  },
  {
    id: "palapa-raul",
    category: "meals",
    name: "La Palapa de Raúl",
    price: "$$",
    tag: "Tradicional",
    description: "Oaxaqueño tradicional (antojitos/moles y comfort food local); opción confiable y sin pretensión.",
    handle: "@lapalapaderaul.oax",
    instagram: "https://www.instagram.com/lapalapaderaul.oax/",
    maps: "https://www.google.com/maps/search/?api=1&query=La%20Palapa%20de%20Ra%C3%BAl%20Oaxaca",
    coords: { lat: 17.0590, lng: -96.7180 },
    distanceToSantoDomingo: "1.0 km",
    distanceToBerriozabal: "1.1 km"
  },
  {
    id: "criollo",
    category: "meals",
    name: "Criollo",
    price: "$$$$",
    distinction: "Guía MICHELIN (Selección)",
    tag: "Tasting menu",
    description: "Experiencia de degustación (nivel alto); ideal si quieres una “gran cena” memorable.",
    handle: "@criollo_oax",
    instagram: "https://www.instagram.com/criollo_oax/",
    maps: "https://www.google.com/maps/search/?api=1&query=Criollo%20Restaurante%20Oaxaca",
    coords: { lat: 17.0630, lng: -93.7370 },
    distanceToSantoDomingo: "1.5 km",
    distanceToBerriozabal: "1.7 km"
  },
  // Drinks
  {
    id: "popular",
    category: "drinks",
    name: "La Popular",
    price: "$–$$",
    tag: "Cantina casual",
    description: "Buena para pre/after; ambiente relajado y accesible.",
    handle: "@la_popular_oaxaca",
    instagram: "https://www.instagram.com/la_popular_oaxaca/",
    maps: "https://www.google.com/maps/search/?api=1&query=La%20Popular%20Oaxaca",
    coords: { lat: 17.0642, lng: -96.7238 },
    distanceToSantoDomingo: "250 m",
    distanceToBerriozabal: "400 m"
  },
  {
    id: "otra-popular",
    category: "drinks",
    name: "La Otra Popular",
    price: "$",
    tag: "Bar accesible",
    description: "Opción muy casual y “sin complicaciones”; buena para pasar por un drink rápido.",
    maps: "https://www.google.com/maps/search/?api=1&query=La%20Otra%20Popular%20Oaxaca",
    coords: { lat: 17.0650, lng: -96.7230 },
    distanceToSantoDomingo: "150 m",
    distanceToBerriozabal: "300 m"
  },
  {
    id: "selva",
    category: "drinks",
    name: "Selva",
    price: "$$$",
    distinction: "50 Best Discovery",
    tag: "Coctelería de autor",
    description: "Barra creativa y de alto perfil; ideal si quieres coctelería “seria” y distinta.",
    handle: "@selvaoaxaca",
    instagram: "https://www.instagram.com/selvaoaxaca/",
    maps: "https://www.google.com/maps/search/?api=1&query=Selva%20Oaxaca%20Cocktail%20Bar",
    coords: { lat: 17.0660, lng: -96.7235 },
    distanceToSantoDomingo: "50 m",
    distanceToBerriozabal: "200 m"
  },
  {
    id: "sabina-sabe",
    category: "drinks",
    name: "Sabina Sabe",
    price: "$$$",
    distinction: "North America’s 50 Best Bars",
    tag: "Mezcal + cocktails",
    description: "Referente en mezcal/cócteles; gran parada si quieres una experiencia muy Oaxaca.",
    handle: "@sabinasabeoaxaca",
    instagram: "https://www.instagram.com/sabinasabeoaxaca/",
    maps: "https://www.google.com/maps/search/?api=1&query=Sabina%20Sabe%20Oaxaca",
    coords: { lat: 17.0640, lng: -96.7235 },
    distanceToSantoDomingo: "300 m",
    distanceToBerriozabal: "450 m"
  },
  {
    id: "amantes-terraza",
    category: "drinks",
    name: "Los Amantes (Terraza)",
    price: "$$$",
    tag: "Rooftop vista",
    description: "Terraza para cocteles con vista; gran spot para atardecer/noche.",
    handle: "@terrazalosamantesoax",
    instagram: "https://www.instagram.com/terrazalosamantesoax/",
    maps: "https://www.google.com/maps/search/?api=1&query=Terraza%20Los%20Amantes%20Oaxaca",
    coords: { lat: 17.0665, lng: -96.7235 },
    distanceToSantoDomingo: "50 m",
    distanceToBerriozabal: "200 m"
  },
  {
    id: "amantes-mezcal",
    category: "drinks",
    name: "Los Amantes (Mezcal)",
    price: "$$–$$$",
    tag: "Mezcalería",
    description: "Opción enfocada en mezcal y cócteles; buena para algo más “mezcal-driven”.",
    handle: "@losamantesmezcal",
    instagram: "https://www.instagram.com/losamantesmezcal/",
    maps: "https://www.google.com/maps/search/?api=1&query=Los%20Amantes%20Mezcal%20Oaxaca",
    coords: { lat: 17.0665, lng: -96.7235 },
    distanceToSantoDomingo: "50 m",
    distanceToBerriozabal: "200 m"
  },
  {
    id: "praga",
    category: "drinks",
    name: "Praga",
    price: "$$",
    tag: "Bar flexible",
    description: "Café-restaurante-bar; opción versátil si buscas algo que funcione para todos.",
    handle: "@pragaoaxaca",
    instagram: "https://www.instagram.com/pragaoaxaca/",
    maps: "https://www.google.com/maps/search/?api=1&query=Praga%20Oaxaca",
    coords: { lat: 17.0615, lng: -96.7240 },
    distanceToSantoDomingo: "550 m",
    distanceToBerriozabal: "700 m"
  },
];

const CATEGORIES: { id: CategoryId; title: { es: string; en: string }; color: string }[] = [
  { id: "breakfast", title: { es: "Desayuno/Brunch", en: "Breakfast/Brunch" }, color: "#B45309" },
  { id: "meals", title: { es: "Comida/Cena", en: "Lunch/Dinner" }, color: "#059669" },
  { id: "drinks", title: { es: "Drinks", en: "Drinks" }, color: "#5B21B6" },
];

  export default function WeddingGastronomy({ lang = "es" }: { lang?: Language }) {
    const [activeTab, setActiveTab] = React.useState<CategoryId>(CATEGORIES[0].id);
    const [activeItemId, setActiveItemId] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        const firstItem = GASTRO_DATA.find(i => i.category === activeTab);
        if (firstItem) setActiveItemId(firstItem.id);
      }
    }, [activeTab]);

    const [isLocked, setIsLocked] = React.useState(false);
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const lockTimerRef = React.useRef<NodeJS.Timeout | null>(null);
    const observerRef = React.useRef<IntersectionObserver | null>(null);

    const lockObserver = (ms = 800) => {
      setIsLocked(true);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => setIsLocked(false), ms);
    };

    const filteredItems = GASTRO_DATA.filter(item => item.category === activeTab);

    const activeItemIdRef = React.useRef(activeItemId);
    const lastUpdateRef = React.useRef(Date.now());

    React.useEffect(() => {
      activeItemIdRef.current = activeItemId;
    }, [activeItemId]);

    React.useEffect(() => {
      const callback = (entries: IntersectionObserverEntry[]) => {
        if (isLocked || Date.now() - lastUpdateRef.current < 100) return;
        
        // Disable auto-open on mobile
        if (window.innerWidth < 1024) return;

        let bestCandidate: { id: string, ratio: number } | null = null;
        
        entries.forEach(entry => {
          const itemId = entry.target.getAttribute('data-gastro-id');
          if (itemId && entry.isIntersecting) {
            if (!bestCandidate || entry.intersectionRatio > bestCandidate.ratio) {
              bestCandidate = { id: itemId, ratio: entry.intersectionRatio };
            }
          }
        });

        if (bestCandidate && bestCandidate.id !== activeItemIdRef.current) {
          if (bestCandidate.ratio > 0.4) {
            setActiveItemId(bestCandidate.id);
            lastUpdateRef.current = Date.now();
          }
        }
      };

      observerRef.current = new IntersectionObserver(callback, {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-30% 0px -30% 0px"
      });

      const currentObserver = observerRef.current;
      const cards = document.querySelectorAll('[data-gastro-id]');
      cards.forEach(card => currentObserver.observe(card));

      return () => currentObserver.disconnect();
    }, [isLocked, activeTab]);

    const handleTabChange = (catId: CategoryId) => {
      lockObserver(1500);
      setActiveTab(catId);
      
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        const firstItem = GASTRO_DATA.find(i => i.category === catId);
        if (firstItem) setActiveItemId(firstItem.id);
      } else {
        setActiveItemId(null);
      }
      
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleItemClick = (id: string) => {
      lockObserver(1000);
      setActiveItemId(prev => {
        if (window.innerWidth < 1024) {
          return prev === id ? null : id;
        }
        return id;
      });

      if (window.innerWidth < 1024) {
        const element = document.getElementById(`gastro-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    const handleMarkerClick = (marker: any) => {
      const item = GASTRO_DATA.find(i => i.id === marker.id || i.name === marker.name);
      if (item) {
        if (item.category !== activeTab) {
          setActiveTab(item.category as CategoryId);
        }
        handleItemClick(item.id);
      }
    };

    return (
      <div ref={sectionRef} className="w-full">
        {/* Category Tabs */}
        <div className="flex justify-center mb-6 lg:mb-12 sticky top-16 md:top-20 z-40 py-4">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-ink/10 shadow-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-[12px] lg:text-sm font-black transition-all duration-300 whitespace-nowrap",
                  activeTab === cat.id
                    ? "text-white shadow-lg"
                    : "text-ink/60 hover:text-ink hover:bg-white/50"
                )}
                style={{
                  backgroundColor: activeTab === cat.id ? cat.color : "transparent"
                }}
              >
                {cat.title[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          {/* Sticky Map Column (Desktop Only) */}
          <div className="hidden lg:block w-[42%] sticky top-[120px] z-30">
            <div className="h-[500px] w-full rounded-[2.5rem] overflow-hidden border-2 border-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] relative group">
              <WeddingMap 
                compact={true}
                activeMarkerId={activeItemId || undefined}
                filterTypes={["gastronomy"]}
                onMarkerClick={handleMarkerClick}
                offsetX={-60}
                offsetY={40}
                customLegend={CATEGORIES.map(c => ({
                  label: c.title[lang],
                  color: c.color
                }))}
                markerColorOverride={(marker) => {
                  const item = GASTRO_DATA.find(i => i.id === marker.id || i.name === marker.name);
                  if (item) {
                    return CATEGORIES.find(c => c.id === item.category)?.color || "#27AE60";
                  }
                  return "#27AE60";
                }}
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

          {/* List Column */}
          <div className="w-full lg:w-[58%] space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6"
              >
                {filteredItems.map((item) => (
                  <GastroCard 
                    key={item.id} 
                    item={item} 
                    isActive={activeItemId === item.id}
                    onClick={() => handleItemClick(item.id)}
                    onMarkerClick={handleMarkerClick}
                    lang={lang}
                    color={CATEGORIES.find(c => c.id === item.category)?.color}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

function GastroCard({ 
  item, 
  isActive, 
  onClick,
  onMarkerClick,
  lang,
  color
}: { 
  item: GastronomyItem; 
  isActive: boolean;
  onClick?: () => void;
  onMarkerClick?: (marker: any) => void;
  lang: Language;
  color?: string;
}) {
  return (
    <motion.div
      id={`gastro-${item.id}`}
      data-gastro-id={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
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
            <h4 className="font-heading text-[18px] lg:text-2xl text-ink leading-tight group-hover:text-primary transition-colors">
              {item.name}
            </h4>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span 
                className="px-2 lg:px-3 py-0.5 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-white shadow-sm"
                style={{ backgroundColor: color }}
              >
                {item.price}
              </span>
              {item.distinction && (
                <span className="px-2 lg:px-3 py-0.5 bg-primary/10 text-primary rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border border-primary/20 flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  {item.distinction}
                </span>
              )}
              <span className="px-2 lg:px-3 py-0.5 bg-neutral-100 text-ink/40 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border border-neutral-200">
                {item.tag}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 p-3 lg:p-4 rounded-2xl border border-neutral-100">
          <p className={cn(
            "text-[12px] lg:text-[14px] text-ink/70 leading-relaxed font-medium transition-all duration-300",
            !isActive ? "line-clamp-2" : "line-clamp-none"
          )}>
            {item.description}
          </p>
        </div>

        {/* Action bar shown when collapsed - Mobile Only */}
        {!isActive && (
          <div className="flex flex-col items-center gap-3 pt-1 lg:hidden">
            <div className="flex w-full gap-2">
              <a
                href={item.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Cómo llegar</span>
                <Navigation className="h-3 w-3" />
              </a>
              {item.instagram && (
                <a
                  href={item.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-ink text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Instagram</span>
                  <Instagram className="h-3 w-3" />
                </a>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/60">
              ver más detalles
            </span>
          </div>
        )}

        {/* Detailed Content (Mobile Expansion) */}
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
                  activeMarkerId={item.id}
                  filterTypes={["gastronomy"]}
                  onMarkerClick={onMarkerClick}
                  hideUI={true}
                  hideLegend={true}
                />
              </div>

              {/* Distance Info */}
              <div className="grid grid-cols-2 gap-4 py-3 border-y border-neutral-100 bg-neutral-50/50 -mx-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-ink/30 uppercase tracking-widest">A Templo Santo Domingo</span>
                    <div className="flex items-center gap-2 text-ink font-bold text-[11px]">
                      <Landmark className="h-3.5 w-3.5 text-primary" />
                      <span>{item.distanceToSantoDomingo || "–"}</span>
                    </div>
                  </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-ink/30 uppercase tracking-widest">A Berriozabal 120</span>
                  <div className="flex items-center gap-2 text-ink font-bold text-[11px]">
                    <Sparkles className="h-3.5 w-3.5 text-secondary" />
                    <span>{item.distanceToBerriozabal || "–"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                 <a
                  href={item.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-ink active:scale-[0.98] shadow-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Cómo llegar</span>
                  <Navigation className="h-4 w-4" />
                </a>
                
                {item.instagram && (
                    <a
                      href={item.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-ink text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:bg-secondary active:scale-[0.98] shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Instagram</span>
                      <Instagram className="h-4 w-4" />
                    </a>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
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

        {/* Desktop Only Distance & Links */}
        <div className="hidden lg:flex flex-col gap-5">
          {/* Distance Info */}
          <div className="grid grid-cols-2 gap-4 py-2.5 lg:py-4 border-y border-neutral-100 bg-neutral-50/50 -mx-8 px-8">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] lg:text-[9px] font-black text-ink/30 uppercase tracking-widest">A Templo Santo Domingo</span>
                <div className="flex items-center gap-2 text-ink font-bold text-[11px] lg:text-xs">
                  <Landmark className="h-3.5 w-3.5 text-primary" />
                  <span>{item.distanceToSantoDomingo || "–"}</span>
                </div>
              </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] lg:text-[9px] font-black text-ink/30 uppercase tracking-widest">A Berriozabal 120</span>
              <div className="flex items-center gap-2 text-ink font-bold text-[11px] lg:text-xs">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                <span>{item.distanceToBerriozabal || "–"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 lg:pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={item.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[11px] lg:text-xs font-black uppercase tracking-widest text-secondary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <Navigation className="h-4 w-4" />
                {lang === 'es' ? 'Cómo llegar' : 'Get directions'}
              </a>
              {item.instagram && (
                <a
                  href={item.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] lg:text-xs font-black uppercase tracking-widest text-ink/30 hover:text-ink transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram className="h-4 w-4" />
                  {item.handle}
                </a>
              )}
            </div>
            <ChevronRight className={cn(
              "h-5 w-5 transition-all duration-500 hidden md:block",
              isActive ? "text-secondary translate-x-0" : "text-ink/10 -translate-x-2"
            )} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

