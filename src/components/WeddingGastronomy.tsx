"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Instagram, 
  MapPin, 
  Navigation, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Landmark,
  X,
  Maximize2
} from "lucide-react";
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
    maps: "https://www.google.com/maps/place/Pan:am+Abasolo/@17.0646,-96.7229,591m/data=!3m1!1e3!4m6!3m5!1s0x85c7223ed2790225:0xd280aaacda2a3879!8m2!3d17.0646!4d-96.7229!16s%2Fg%2F11bwm30qps",
    coords: { lat: 17.0646, lng: -96.7229 },
    distanceToSantoDomingo: "150 m",
    distanceToBerriozabal: "250 m"
  },
  {
    id: "itanoni",
    category: "breakfast",
    name: "Itanoní Tetelas",
    price: "$",
    distinction: "Guía MICHELIN",
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
    coords: { lat: 17.0609, lng: -96.7262 },
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
    coords: { lat: 17.0615, lng: -96.7258 },
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
    coords: { lat: 17.0670, lng: -96.7210 },
    distanceToSantoDomingo: "300 m",
    distanceToBerriozabal: "500 m"
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
    coords: { lat: 17.0659, lng: -96.7236 },
    distanceToSantoDomingo: "80 m",
    distanceToBerriozabal: "350 m"
  },
  {
    id: "pitiona",
    category: "meals",
    name: "La Pitiona",
    price: "$$$",
    tag: "Rooftop + autor",
    description: "Cocina de autor con vibra de rooftop; buena para date night y experiencias de autor.",
    handle: "@pitionaoax",
    instagram: "https://www.instagram.com/pitionaoax/",
    maps: "https://www.google.com/maps/place/Pitiona/@17.0664,-96.7238,1183m/data=!3m2!1e3!4b1!4m6!3m5!1s0x85c72230a24aa91f:0x9bf57f718ec745f9!8m2!3d17.0664!4d-96.7238",
    coords: { lat: 17.0664, lng: -96.7238 },
    distanceToSantoDomingo: "100 m",
    distanceToBerriozabal: "400 m"
  },
  {
    id: "casa-oaxaca",
    category: "meals",
    name: "Casa Oaxaca",
    price: "$$$",
    distinction: "Guía MICHELIN",
    tag: "Clásico premium",
    description: "Restaurante muy consolidado; cocina contemporánea y ambiente elegante.",
    handle: "@casaoaxacaelrestaurante",
    instagram: "https://www.instagram.com/casaoaxacaelrestaurante/",
    maps: "https://www.google.com/maps/place/Casa+Oaxaca+el+Restaurante/@17.0658,-96.7231,2365m/data=!3m1!1e3!4m7!3m6!1s0x85c7223e8ca4ad8f:0xebd33261b531a740!8m2!3d17.0658!4d-96.7231",
    coords: { lat: 17.0658, lng: -96.7231 },
    distanceToSantoDomingo: "50 m",
    distanceToBerriozabal: "400 m"
  },
  {
    id: "quince-letras",
    category: "meals",
    name: "Las Quince Letras",
    price: "$$",
    distinction: "Bib Gourmand",
    tag: "Gran valor",
    description: "Cocina regional con excelente relación calidad-precio; gran “must” para sabores oaxaqueños.",
    handle: "@lasquinceletrasoax",
    instagram: "https://www.instagram.com/lasquinceletrasoax/",
    maps: "https://www.google.com/maps/search/?api=1&query=Las%20Quince%20Letras%20Oaxaca",
    coords: { lat: 17.0649, lng: -96.7220 },
    distanceToSantoDomingo: "150 m",
    distanceToBerriozabal: "250 m"
  },
  {
    id: "tierra-sol",
    category: "meals",
    name: "Tierra del Sol",
    price: "$$",
    distinction: "Bib Gourmand",
    tag: "Rooftop local",
    description: "Muy buen valor y experiencia; opción sólida para comer rico sin irte a $$$$.",
    handle: "@tierradelsolrestaurante",
    instagram: "https://www.instagram.com/tierradelsolrestaurante/",
    maps: "https://www.google.com/maps/search/?api=1&query=Tierra%20del%20Sol%20Oaxaca",
    coords: { lat: 17.0671, lng: -96.7208 },
    distanceToSantoDomingo: "250 m",
    distanceToBerriozabal: "450 m"
  },
  {
    id: "palapa-raul",
    category: "meals",
    name: "La Palapa de Raúl",
    price: "$$",
    tag: "Tradicional",
    description: "Oaxaqueño tradicional; opción confiable y sin pretensión.",
    handle: "@lapalapaderaul.oax",
    instagram: "https://www.instagram.com/lapalapaderaul.oax/",
    maps: "https://www.google.com/maps/search/?api=1&query=La%20Palapa%20de%20Ra%C3%BAl%20Oaxaca",
    coords: { lat: 17.0588, lng: -96.7178 },
    distanceToSantoDomingo: "1.0 km",
    distanceToBerriozabal: "1.1 km"
  },
  {
    id: "criollo",
    category: "meals",
    name: "Criollo",
    price: "$$$$",
    distinction: "Guía MICHELIN",
    tag: "Tasting menu",
    description: "Experiencia de degustación (nivel alto); ideal si quieres una “gran cena” memorable.",
    handle: "@criollo_oax",
    instagram: "https://www.instagram.com/criollo_oax/",
    maps: "https://www.google.com/maps/search/?api=1&query=Criollo%20Restaurante%20Oaxaca",
    coords: { lat: 17.0630, lng: -96.7370 },
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
    maps: "https://www.google.com/maps/search/?api=1&query=La%20Popular%20Oaxaca%20Allende",
    coords: { lat: 17.0668, lng: -96.7243 },
    distanceToSantoDomingo: "150 m",
    distanceToBerriozabal: "500 m"
  },
  {
    id: "selva",
    category: "drinks",
    name: "Selva",
    price: "$$$",
    distinction: "50 Best",
    tag: "Coctelería de autor",
    description: "Barra creativa y de alto perfil; ideal si quieres coctelería “seria” y distinta.",
    handle: "@selvaoaxaca",
    instagram: "https://www.instagram.com/selvaoaxaca/",
    maps: "https://www.google.com/maps/search/?api=1&query=Selva%20Oaxaca%20Cocktail%20Bar",
    coords: { lat: 17.0659, lng: -96.7236 },
    distanceToSantoDomingo: "50 m",
    distanceToBerriozabal: "400 m"
  },
  {
    id: "sabina-sabe",
    category: "drinks",
    name: "Sabina Sabe",
    price: "$$$",
    distinction: "50 Best",
    tag: "Mezcal + cocktails",
    description: "Referente en mezcal/cócteles; gran parada si quieres una experiencia muy Oaxaca.",
    handle: "@sabinasabeoaxaca",
    instagram: "https://www.instagram.com/sabinasabeoaxaca/",
    maps: "https://www.google.com/maps/search/?api=1&query=Sabina%20Sabe%20Oaxaca",
    coords: { lat: 17.0632, lng: -96.7242 },
    distanceToSantoDomingo: "350 m",
    distanceToBerriozabal: "250 m"
  },
  {
    id: "amantes-terraza",
    category: "drinks",
    name: "Terraza Los Amantes",
    price: "$$$",
    tag: "Rooftop vista",
    description: "Terraza para cocteles con vista espectacular; gran spot para el atardecer.",
    handle: "@terrazalosamantesoax",
    instagram: "https://www.instagram.com/terrazalosamantesoax/",
    maps: "https://www.google.com/maps/search/?api=1&query=Terraza%20Los%20Amantes%20Oaxaca",
    coords: { lat: 17.0665, lng: -96.7235 },
    distanceToSantoDomingo: "100 m",
    distanceToBerriozabal: "450 m"
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
    coords: { lat: 17.0665, lng: -96.7236 },
    distanceToSantoDomingo: "100 m",
    distanceToBerriozabal: "450 m"
  },
];

const CATEGORIES: { id: CategoryId; title: { es: string; en: string }; color: string; texture: string }[] = [
    { 
      id: "breakfast", 
      title: { es: "Desayuno/Brunch", en: "Breakfast/Brunch" }, 
      color: "#b84269",
      texture: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_BLANCA-1767905973064.png?width=8000&height=8000&resize=contain"
    },
    { 
      id: "meals", 
      title: { es: "Comida/Cena", en: "Lunch/Dinner" }, 
      color: "#c2cfb2",
      texture: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_BLANCA-1767905973064.png?width=8000&height=8000&resize=contain"
    },
    { 
      id: "drinks", 
      title: { es: "Drinks", en: "Drinks" }, 
      color: "#8C6A5D",
      texture: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_BLANCA-1767905973064.png?width=8000&height=8000&resize=contain"
    },
];

export default function WeddingGastronomy({ lang = "es" }: { lang?: Language }) {
  const [activeTab, setActiveTab] = React.useState<CategoryId>(CATEGORIES[0].id);
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
  const isLockedRef = React.useRef(false);
  const lockTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = React.useRef(Date.now());
  const activeItemIdRef = React.useRef(activeItemId);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    activeItemIdRef.current = activeItemId;
  }, [activeItemId]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const firstItem = GASTRO_DATA.find(i => i.category === activeTab);
      if (firstItem) setActiveItemId(firstItem.id);
    }
  }, [activeTab]);

  const lockObserver = (ms = 2500) => {
    isLockedRef.current = true;
    lastUpdateRef.current = Date.now();
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false;
    }, ms);
  };

  const filteredItems = GASTRO_DATA.filter(item => item.category === activeTab);

  React.useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (isLockedRef.current || Date.now() - lastUpdateRef.current < 200) return;
      if (window.innerWidth < 1024) return;

      let bestCandidate: { id: string, ratio: number } | null = null;
      entries.forEach(entry => {
        const id = entry.target.getAttribute('data-gastro-id');
        if (id && entry.isIntersecting) {
          if (!bestCandidate || entry.intersectionRatio > bestCandidate.ratio) {
            bestCandidate = { id, ratio: entry.intersectionRatio };
          }
        }
      });

      if (bestCandidate && bestCandidate.id !== activeItemIdRef.current && bestCandidate.ratio > 0.4) {
        setActiveItemId(bestCandidate.id);
        lastUpdateRef.current = Date.now();
      }
    };

    const observer = new IntersectionObserver(callback, {
      threshold: [0.1, 0.4, 0.7, 1.0],
      rootMargin: "-25% 0px -25% 0px"
    });

    const cards = document.querySelectorAll('[data-gastro-id]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [activeTab]);

  const handleScrollToCard = (id: string) => {
    const elementId = `gastro-${id}`;
    const element = document.getElementById(elementId);
    if (element) {
      lockObserver(2500);
      setActiveItemId(id);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleTabChange = (catId: CategoryId) => {
    lockObserver(2500);
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

  const handleMarkerClick = (marker: any) => {
    const item = GASTRO_DATA.find(i => i.id === marker.id || i.name === marker.name);
    if (item) {
      if (item.category !== activeTab) {
        setActiveTab(item.category as CategoryId);
        setTimeout(() => handleScrollToCard(item.id), 400);
      } else {
        handleScrollToCard(item.id);
      }
    }
  };

  return (
    <div ref={sectionRef} className="w-full">
      <div className="flex justify-center mb-6 lg:mb-12 sticky top-16 md:top-20 z-40 py-4">
        <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-ink/10 shadow-lg">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-[12px] lg:text-sm font-black transition-all duration-300 whitespace-nowrap",
                activeTab === cat.id ? "text-white shadow-lg" : "text-ink/60 hover:text-ink hover:bg-white/50"
              )}
              style={{ backgroundColor: activeTab === cat.id ? cat.color : "transparent" }}
            >
              {cat.title[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        <div className="hidden lg:block w-[42%] sticky top-[120px] z-30">
            <div className="h-[500px] w-full rounded-[2.5rem] overflow-hidden border-2 border-white shadow-2xl relative group">
              <WeddingMap 
                compact={true}
                activeMarkerId={activeItemId}
                filterTypes={["gastronomy", "event"]}
                  onMarkerClick={handleMarkerClick}
                  offsetX={-60}
                  offsetY={40}
                  autoFit={false}
                  defaultZoom={15}
                  activeZoom={15}
                  customLegend={[
                    { label: "BODA", color: "#C66B3D", emoji: "⛪" },
                    ...CATEGORIES.map(c => ({ label: c.title[lang], color: c.color }))
                  ]}
                markerColorOverride={(marker) => {
                  if (marker.type === "event") return "#C66B3D";
                  const item = GASTRO_DATA.find(i => i.id === marker.id || i.name === marker.name);
                  return item ? CATEGORIES.find(c => c.id === item.category)?.color || "#059669" : "#059669";
                }}
              />
              <div className="absolute top-4 right-4 z-50">
              <Link href="/mapa" className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-ink rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg border border-ink/5 group">
                <Maximize2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span>Ver mapa completo</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[58%] space-y-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="grid gap-6">
              {filteredItems.map((item) => {
                const category = CATEGORIES.find(c => c.id === item.category);
                return (
                  <GastroCard 
                    key={item.id} 
                    item={item} 
                    isActive={activeItemId === item.id}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setActiveItemId(prev => prev === item.id ? null : item.id);
                      } else {
                        handleScrollToCard(item.id);
                      }
                    }}
                    onMarkerClick={handleMarkerClick}
                    lang={lang}
                    color={category?.color}
                    texture={category?.texture}
                  />
                );
              })}
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
  color,
  texture
}: { 
  item: GastronomyItem; 
  isActive: boolean;
  onClick?: () => void;
  onMarkerClick?: (marker: any) => void;
  lang: Language;
  color?: string;
  texture?: string;
}) {
  return (
    <motion.div
      id={`gastro-${item.id}`}
      data-gastro-id={item.id}
      onClick={onClick}
      className={cn(
        "relative w-full max-w-[360px] mx-auto lg:max-w-none overflow-hidden transition-all duration-300 cursor-pointer",
        isActive ? "shadow-2xl z-10" : "shadow-none hover:bg-neutral-50/50"
      )}
      style={{
        borderRadius: "1.5rem 1.6rem 1.4rem 1.7rem / 1.6rem 1.5rem 1.7rem 1.4rem",
        border: "1px solid rgba(0,0,0,0.08)",
        borderBottomWidth: "3px",
        borderBottomColor: isActive ? `${color}33` : "rgba(0, 0, 0, 0.1)",
      }}
    >
        {texture && (
          <div className="absolute inset-0 z-0">
            <img src={texture} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      <div className="relative z-10 p-4 lg:p-8 flex flex-col gap-3 lg:gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h4 className="font-heading text-[18px] lg:text-2xl text-ink leading-tight">{item.name}</h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2 lg:px-3 py-0.5 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-white shadow-sm" style={{ backgroundColor: color }}>{item.price}</span>
              {item.distinction && <span className="px-2 lg:px-3 py-0.5 bg-primary/10 text-primary rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border border-primary/20 flex items-center gap-1"><Star className="h-2.5 w-2.5 fill-current" />{item.distinction}</span>}
              <span className="px-2 lg:px-3 py-0.5 bg-white/40 text-ink/40 rounded-full text-[8px] lg:text-[9px] font-black uppercase tracking-widest border border-black/5 backdrop-blur-sm">{item.tag}</span>
            </div>
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-sm p-3 lg:p-4 rounded-2xl border border-black/5">
          <p className={cn("text-[12px] lg:text-[14px] text-ink/70 leading-relaxed font-medium transition-all duration-300", !isActive ? "line-clamp-2" : "line-clamp-none")}>{item.description}</p>
        </div>
        {!isActive && (
          <div className="flex flex-col items-center gap-3 pt-1 lg:hidden">
            <div className="flex w-full gap-2">
                <a href={item.maps} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm" style={{ backgroundColor: color }} onClick={(e) => e.stopPropagation()}><Navigation className="h-3 w-3" /><span>Cómo llegar</span></a>
                {item.instagram && <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm" style={{ backgroundColor: '#243A2B' }} onClick={(e) => e.stopPropagation()}><Instagram className="h-3 w-3" /><span>Instagram</span></a>}
              </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/60">ver más detalles</span>
          </div>
        )}
        <AnimatePresence>
          {isActive && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-4 lg:hidden overflow-hidden">
                <div className="lg:hidden w-full h-[110px] rounded-2xl overflow-hidden border border-neutral-100 shadow-inner relative pointer-events-none" onClick={(e) => e.stopPropagation()}>
                    <WeddingMap 
                      compact={true} 
                      activeMarkerId={item.id} 
                      filterTypes={["gastronomy", "event"]} 
                      onMarkerClick={onMarkerClick} 
                      hideUI={true} 
                      hideLegend={true} 
                      activeZoom={14}
                    />
                </div>
              <div className="grid grid-cols-2 gap-4 py-3 border-y border-black/5 bg-white/40 backdrop-blur-sm -mx-4 px-4">
                <div className="flex flex-col gap-1"><span className="text-[8px] font-black text-ink/30 uppercase tracking-widest">A Templo Santo Domingo</span><div className="flex items-center gap-2 text-ink font-bold text-[11px]"><Landmark className="h-3.5 w-3.5 text-primary" /><span>{item.distanceToSantoDomingo || "–"}</span></div></div>
                <div className="flex flex-col gap-1"><span className="text-[8px] font-black text-ink/30 uppercase tracking-widest">A Berriozabal 120</span><div className="flex items-center gap-2 text-ink font-bold text-[11px]"><Sparkles className="h-3.5 w-3.5 text-secondary" /><span>{item.distanceToBerriozabal || "–"}</span></div></div>
              </div>
                <div className="flex flex-col gap-3 pt-2">
                  <a href={item.maps} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-md" style={{ backgroundColor: color }} onClick={(e) => e.stopPropagation()}><span>Cómo llegar</span><Navigation className="h-4 w-4" /></a>
                  {item.instagram && <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-md" style={{ backgroundColor: '#243A2B' }} onClick={(e) => e.stopPropagation()}><span>Instagram</span><Instagram className="h-4 w-4" /></a>}
                  <button onClick={(e) => { e.stopPropagation(); onClick?.(); }} className="flex items-center justify-center gap-2 w-full py-3 bg-white/40 backdrop-blur-sm text-ink rounded-2xl text-[10px] font-black uppercase tracking-widest border border-black/5"><span>Ver menos</span><X className="h-3 w-3" /></button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="hidden lg:flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4 py-2.5 lg:py-4 border-y border-black/5 bg-white/40 backdrop-blur-sm -mx-8 px-8">
            <div className="flex flex-col gap-1"><span className="text-[8px] lg:text-[9px] font-black text-ink/30 uppercase tracking-widest">A Templo Santo Domingo</span><div className="flex items-center gap-2 text-ink font-bold text-[11px] lg:text-xs"><Landmark className="h-3.5 w-3.5 text-primary" /><span>{item.distanceToSantoDomingo || "–"}</span></div></div>
            <div className="flex flex-col gap-1"><span className="text-[8px] lg:text-[9px] font-black text-ink/30 uppercase tracking-widest">A Berriozabal 120</span><div className="flex items-center gap-2 text-ink font-bold text-[11px] lg:text-xs"><Sparkles className="h-3.5 w-3.5 text-secondary" /><span>{item.distanceToBerriozabal || "–"}</span></div></div>
          </div>
            <div className="flex items-center justify-between pt-1 lg:pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <a href={item.maps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] lg:text-xs font-black uppercase tracking-widest hover:underline" style={{ color: color }} onClick={(e) => e.stopPropagation()}><Navigation className="h-4 w-4" />{lang === 'es' ? 'Cómo llegar' : 'Get directions'}</a>
                {item.instagram && <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] lg:text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity" style={{ color: '#243A2B' }} onClick={(e) => e.stopPropagation()}><Instagram className="h-4 w-4" />{item.handle}</a>}
              </div>
              <ChevronRight className={cn("h-5 w-5 transition-all duration-500 hidden md:block", isActive ? "text-secondary translate-x-0" : "text-ink/10 -translate-x-2")} />
            </div>
        </div>
      </div>
    </motion.div>
  );
}
