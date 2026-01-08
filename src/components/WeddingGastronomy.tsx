"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Coffee, UtensilsCrossed, Martini, MapPin, Award, Navigation, ChevronRight, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { cn } from "@/lib/utils";

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
    coords: { lat: 17.0655, lng: -96.7262 }
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
    coords: { lat: 17.0645, lng: -96.7245 }
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
    coords: { lat: 17.0863, lng: -96.7214 }
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
    coords: { lat: 17.0610, lng: -96.7260 }
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
    coords: { lat: 17.0620, lng: -96.7250 }
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
    coords: { lat: 17.0670, lng: -96.7270 }
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
    coords: { lat: 17.0635, lng: -96.7245 }
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
    coords: { lat: 17.0660, lng: -96.7235 }
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
    coords: { lat: 17.0665, lng: -96.7230 }
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
    coords: { lat: 17.0664, lng: -96.7233 }
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
    coords: { lat: 17.0648, lng: -96.7225 }
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
    coords: { lat: 17.0652, lng: -96.7238 }
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
    coords: { lat: 17.0590, lng: -96.7180 }
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
    coords: { lat: 17.0630, lng: -96.7370 }
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
    coords: { lat: 17.0642, lng: -96.7238 }
  },
  {
    id: "otra-popular",
    category: "drinks",
    name: "La Otra Popular",
    price: "$",
    tag: "Bar accesible",
    description: "Opción muy casual y “sin complicaciones”; buena para pasar por un drink rápido.",
    maps: "https://www.google.com/maps/search/?api=1&query=La%20Otra%20Popular%20Oaxaca",
    coords: { lat: 17.0650, lng: -96.7230 }
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
    coords: { lat: 17.0660, lng: -96.7235 }
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
    coords: { lat: 17.0640, lng: -96.7235 }
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
    coords: { lat: 17.0665, lng: -96.7235 }
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
    coords: { lat: 17.0665, lng: -96.7235 }
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
    coords: { lat: 17.0615, lng: -96.7240 }
  },
];

const CATEGORIES: { id: CategoryId; title: { es: string; en: string }; icon: React.ComponentType<any> }[] = [
  { id: "breakfast", title: { es: "Desayuno & Brunch", en: "Breakfast & Brunch" }, icon: Coffee },
  { id: "meals", title: { es: "Comida & Cena", en: "Lunch & Dinner" }, icon: UtensilsCrossed },
  { id: "drinks", title: { es: "Drinks & Cócteles", en: "Drinks & Cocktails" }, icon: Martini },
];

export default function WeddingGastronomy({ lang = "es" }: { lang?: Language }) {
  const [activeTab, setActiveTab] = React.useState<CategoryId>(CATEGORIES[0].id);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [activeItemId, setActiveItemId] = React.useState<string>(GASTRO_DATA[0].id);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const markersRef = React.useRef<{ [key: string]: google.maps.Marker }>({});

  const filteredItems = GASTRO_DATA.filter(item => item.category === activeTab);

  const handleTabChange = (catId: CategoryId) => {
    setActiveTab(catId);
    // Set first item of category as active
    const firstItem = GASTRO_DATA.find(i => i.category === catId);
    if (firstItem) setActiveItemId(firstItem.id);
    
    // Scroll to top of section
    if (sectionRef.current) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = sectionRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Initialize Map
  React.useEffect(() => {
    const initMap = async () => {
      try {
        setOptions({
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          v: "weekly",
        });

        const { Map } = await importLibrary("maps");
        
        if (mapRef.current && !map) {
          const newMap = new Map(mapRef.current, {
            center: GASTRO_DATA[0].coords,
            zoom: 15,
            styles: MAP_STYLE,
            disableDefaultUI: true,
            zoomControl: true,
          });

          GASTRO_DATA.forEach((item) => {
            const marker = new google.maps.Marker({
              position: item.coords,
              map: newMap,
              title: item.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#C66B3D",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
                scale: 8,
              },
            });
            markersRef.current[item.id] = marker;
          });

          setMap(newMap);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [map]);

  // Update Map based on active item
  React.useEffect(() => {
    if (!map) return;

    GASTRO_DATA.forEach((item) => {
      const marker = markersRef.current[item.id];
      if (marker) {
        const isActive = item.id === activeItemId;
        const isInCategory = item.category === activeTab;
        
        marker.setVisible(isInCategory);
        
        if (isInCategory) {
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: isActive ? "#C66B3D" : "#9CA3AF",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#FFFFFF",
            scale: isActive ? 12 : 8,
          });
          
          if (isActive) {
            marker.setZIndex(1000);
            map.panTo(item.coords);
          } else {
            marker.setZIndex(1);
          }
        }
      }
    });
  }, [activeItemId, activeTab, map]);

  const activeItem = GASTRO_DATA.find(i => i.id === activeItemId);

  const handleItemClick = (id: string, coords: { lat: number; lng: number }) => {
    setActiveItemId(id);
    const element = document.getElementById(`gastro-${id}`);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      window.scrollTo({
        top: middle,
        behavior: "smooth"
      });
    }
    if (map) {
      map.panTo(coords);
      map.setZoom(17);
    }
  };

  const handleItemInView = React.useCallback((id: string) => {
    setActiveItemId(id);
  }, []);

  return (
    <div ref={sectionRef} className="w-full">
      {/* Category Tabs */}
      <div className="flex justify-center mb-12 sticky top-16 md:top-20 z-40 py-4">
        <div className="inline-flex p-1.5 bg-ink/5 backdrop-blur-md rounded-full border border-ink/10 shadow-lg">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                activeTab === cat.id
                  ? "bg-ink text-white shadow-lg"
                  : "text-ink/60 hover:text-ink hover:bg-white/50"
              )}
            >
              <cat.icon className="h-4 w-4" />
              {cat.title[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* List Column */}
        <div className="w-full lg:w-[60%] space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6"
            >
              {filteredItems.map((item) => (
                <GastroCard 
                  key={item.id} 
                  item={item} 
                  isActive={activeItemId === item.id}
                  onInView={() => handleItemInView(item.id)}
                  onClick={() => handleItemClick(item.id, item.coords)}
                  lang={lang}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky Map Column */}
        <div className="w-full lg:w-[40%]">
          <div className="lg:sticky lg:top-40 h-[400px] lg:h-[70vh] w-full rounded-[2.5rem] overflow-hidden border border-border shadow-2xl relative">
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Active Item Mini Card on Map */}
            <AnimatePresence>
              {activeItem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-border shadow-xl flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-heading text-lg text-ink truncate leading-tight">
                      {activeItem.name}
                    </h4>
                    <p className="text-xs text-ink/60 truncate mt-1">
                      {activeItem.tag}
                    </p>
                  </div>
                  <a
                    href={activeItem.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-ink text-white rounded-xl hover:scale-105 transition-transform shrink-0"
                  >
                    <Navigation className="h-4 w-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function GastroCard({ 
  item, 
  isActive, 
  onInView,
  onClick,
  lang 
}: { 
  item: GastronomyItem; 
  isActive: boolean;
  onInView: () => void;
  onClick?: () => void;
  lang: Language;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-35% 0px -35% 0px",
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) onInView();
  }, [inView, onInView]);

  return (
    <motion.div
      ref={ref}
      id={`gastro-${item.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={cn(
        "group relative p-8 rounded-[2rem] border-2 transition-all duration-500 cursor-pointer",
        isActive 
          ? "bg-white border-ink/20 shadow-xl shadow-ink/5 ring-1 ring-ink/5" 
          : "bg-white/40 border-ink/5 grayscale-[0.3] opacity-70 scale-[0.98] hover:opacity-90 hover:grayscale-0"
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-ink/5 text-ink/80 rounded-full text-[10px] font-black uppercase tracking-wider border border-ink/10 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
            {item.price}
          </span>
          {item.distinction && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider border border-primary/20 flex items-center gap-1.5">
              <Star className="h-3 w-3 fill-current" />
              {item.distinction}
            </span>
          )}
          <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-[10px] font-black uppercase tracking-wider border border-secondary/20">
            {item.tag}
          </span>
        </div>

        <div>
          <h4 className="font-heading text-2xl text-ink mb-2 group-hover:text-primary transition-colors">
            {item.name}
          </h4>
          <p className="text-sm text-ink/70 leading-relaxed font-medium line-clamp-2 lg:line-clamp-none">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink/5">
          <div className="flex items-center gap-4">
            <a
              href={item.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" />
              {lang === 'es' ? 'Cómo llegar' : 'Get directions'}
            </a>
            {item.instagram && (
              <a
                href={item.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-ink/50 hover:text-ink"
              >
                <Instagram className="h-4 w-4" />
                {item.handle}
              </a>
            )}
          </div>
          <ChevronRight className={cn(
            "h-5 w-5 transition-all duration-500",
            isActive ? "text-primary translate-x-0" : "text-ink/10 -translate-x-2"
          )} />
        </div>
      </div>
    </motion.div>
  );
}

const MAP_STYLE = [
  { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] },
  { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
  { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
  { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#cad2c5" }, { "visibility": "on" }] }
];
