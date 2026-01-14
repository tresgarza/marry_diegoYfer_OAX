"use client";

import * as React from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { Navigation, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const OAXACA_CENTER = { lat: 17.0658, lng: -96.7233 };

export type MarkerType = "hotel" | "gastronomy" | "culture" | "event";

export interface MarkerData {
  id: string;
  name: string;
  type: MarkerType;
  position: { lat: number; lng: number };
  address?: string;
  description?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  price?: string;
  category?: string;
  time?: string;
  tag?: string;
  distinction?: string;
  bookingCode?: string;
  deadline?: string;
  email?: string;
  rates?: string;
  contact?: string;
}

export const MARKERS: MarkerData[] = [
  // Events (Main Highlights)
  { 
    id: "ceremonia", 
    name: "Templo de Santo Domingo", 
    type: "event", 
    position: { lat: 17.0658, lng: -96.7233 }, 
    address: "C. de Macedonio Alcalá s/n, Centro",
    time: "Sábado 5:30 pm",
    description: "Joya del barroco mexicano con impresionante interior dorado y capilla del Rosario."
  },
  { 
    id: "calenda", 
    name: "Calenda Tradicional", 
    type: "event", 
    position: { lat: 17.0658, lng: -96.7233 },
    time: "Viernes 5:30 pm",
    description: "Desfile festivo por las calles del centro histórico con marmotas, gigantes y banda de música."
  },
  { 
    id: "recepcion", 
    name: "Salón Berriozábal 120", 
    type: "event", 
    position: { lat: 17.0631, lng: -96.7219 }, 
    address: "Calle de Berriozábal 120, Centro",
    time: "Sábado 7:00 pm",
    description: "Espacio elegante donde celebraremos nuestra unión y brindaremos con todos ustedes."
  },
  { 
    id: "Cóctel de bienvenida", 
    name: "Restaurante Catedral", 
    type: "event", 
    position: { lat: 17.0608, lng: -96.7254 }, 
    address: "García Vigil 105, Centro",
    time: "Viernes 6:30 pm",
    description: "Lugar de encuentro para nuestro cóctel de bienvenida."
  },

  // Hotels
  { 
    id: "h1", 
    name: "Grand Fiesta Americana", 
    type: "hotel", 
    position: { lat: 17.0712, lng: -96.7208 }, 
    address: "Calle de José María Pino Suárez #702, Centro",
    category: "5*",
    description: "Hotel de 5 estrellas con todas las comodidades.",
    phone: "9515017690, 4433108019",
    rates: "$6,188.00 (Ocupación Sencilla o Doble)",
    bookingCode: "G1UZ48@FGO",
    deadline: "12 de Agosto",
    email: "banquetesfgoa@posadas.com",
    contact: "Karla",
    website: "https://www.corpo-rate.com/login?groupId=G1UZ48@FGO"
  },
  { 
    id: "h2", 
    name: "Holiday Inn Express", 
    type: "hotel", 
    position: { lat: 17.0706, lng: -96.7231 }, 
    address: "Diaz Quintas 115, Oaxaca, OAX, MX",
    category: "4*",
    description: "Opción práctica y moderna en el centro.",
    phone: "8008385364",
    rates: "$2,500.00",
    bookingCode: "FYD",
    deadline: "Bloqueo Abierto",
    website: "https://www.ihg.com/holidayinnexpress/hotels/us/es/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=OAXMX&qCiD=11&qCiMy=082026&qCoD=13&qCoMy=082026&qGrpCd=FYD&setPMCookies=true&qSHBrC=EX&qDest=Diaz%20Quintas%20:%20115,%20Oaxaca,%20OAX,%20MX&showApp=true&adjustMonth=false&srb_u=1&qRmFltr="
  },
  { 
    id: "h3", 
    name: "Hotel Boutique de la Parra", 
    type: "hotel", 
    position: { lat: 17.0594, lng: -96.7234 }, 
    address: "Guerrero #117, Centro",
    category: "Boutique",
    description: "Encantador hotel boutique con arquitectura tradicional.",
    phone: "9515141900",
    rates: "$4,875.00 - $6,880.00",
    bookingCode: "F&D1009",
    deadline: "Bloqueo Abierto",
    email: "frontdesk@hoteldelaparra.com",
    contact: "Daniela",
    website: "https://www.hoteldelaparra.com"
  },
  { 
    id: "h4", 
    name: "Suites de la Parra", 
    type: "hotel", 
    position: { lat: 17.0592, lng: -96.7247 }, 
    address: "Las Casas #110, Centro",
    category: "Boutique",
    description: "Suites espaciosas y elegantes.",
    phone: "9515141900",
    rates: "$4,050.00 - $6,000.00",
    bookingCode: "F&D1009",
    deadline: "Bloqueo Abierto",
    email: "suitesdelaparra@gmail.com",
    contact: "Paola",
    website: "https://suitesdelaparra.com/"
  },
  { 
    id: "h5", 
    name: "Majagua", 
    type: "hotel", 
    position: { lat: 17.0673, lng: -96.7214 }, 
    address: "José María Pino Suárez #519, Centro",
    category: "Boutique",
    description: "Propuesta de hospedaje contemporánea y acogedora.",
    phone: "5513284105",
    rates: "$7,000 - $10,000 (10% Descuento)",
    bookingCode: "FERNANDAYDIEGO2026",
    deadline: "Bloqueo Abierto",
    contact: "Blanca",
    website: "https://www.majaguahotel.com/bookingstep1/?checkin=11%2F09%2F2026&idtokenprovider=100378363&currency=MXN&clientCode=FERNANDAYDIEGO2026&hsri=02040&lang=es&nights=2&parties=W3siYWR1bHRzIjoyLCJjaGlsZHJlbiI6W119XQ%3D%3D&type=hotel&step=1&home=https%3A%2F%2Fwww.majaguahotel.com%2F"
  },
  { 
    id: "h6", 
    name: "Naura", 
    type: "hotel", 
    position: { lat: 17.0603, lng: -96.7196 }, 
    address: "Miguel Hidalgo 918, Centro",
    category: "Boutique",
    description: "Hotel tradicional con excelente ubicación.",
    phone: "9515015400",
    rates: "$2,499.00 - $3,213.00",
    bookingCode: "Reservar directo",
    deadline: "Bloqueo Abierto",
    email: "reservaciones@hotelnaura.com",
    contact: "Maricruz",
    website: "https://www.hotelnaura.com"
  },
  { 
    id: "h7", 
    name: "Hotel Abu", 
    type: "hotel", 
    position: { lat: 17.0641, lng: -96.7248 }, 
    address: "Murguía #104, Centro",
    category: "Boutique",
    description: "Estilo colonial y servicio personalizado.",
    phone: "9515164900",
    rates: "$1,743.00 - $2,756.00",
    bookingCode: "Reservar directo",
    deadline: "Bloqueo Abierto",
    email: "reservaciones@hotelabu.com",
    contact: "Jorge",
    website: "https://www.hotelabu.com/"
  },
    { 
      id: "h8", 
      name: "Hotel City Centro", 
      type: "hotel", 
      position: { lat: 17.0675, lng: -96.7139 }, 
      address: "Aldama #414, Barrio de Jalatlaco",
      category: "4*",
      description: "Ubicado en el colorido barrio de Jalatlaco.",
      phone: "5564488773",
      rates: "$3,332.00 - $4,284.00",
      bookingCode: "Reservar directo",
      deadline: "Bloqueo Abierto",
      email: "rfuentesr@norte19.com",
      contact: "Rocio",
      website: "https://www.cityexpress.com"
    },
    { 
      id: "h9", 
      name: "One Oaxaca Centro", 
      type: "hotel", 
      position: { lat: 17.0629554, lng: -96.7172823 }, 
      address: "Calzada de la República #205, Centro",
      category: "3*",
      description: "Hotel moderno y funcional en el corazón de la ciudad.",
      phone: "9515016500",
      rates: "$1,600.00 - $1,900.00",
      bookingCode: "Directo en sitio",
      deadline: "Sujeto a disponibilidad",
      website: "https://www.onehotels.com/en/one-oaxaca-centro"
    },
    
    // Gastronomy
  { 
    id: "boulenc", 
    name: "Boulenc", 
    type: "gastronomy", 
    position: { lat: 17.0655, lng: -96.7262 },
    price: "$$–$$$",
    tag: "Panadería + patio",
    description: "Pan artesanal y brunch estilo europeo; spot muy agradable para empezar el día.",
    address: "C. Porfirio Díaz 207, Centro"
  },
  { 
    id: "danzantes", 
    name: "Los Danzantes", 
    type: "gastronomy", 
    position: { lat: 17.0659, lng: -96.7236 },
    price: "$$$",
    tag: "Fine dining",
    distinction: "1 Estrella MICHELIN",
    description: "Cocina oaxaqueña contemporánea en uno de los patios más icónicos.",
    address: "C. Macedonio Alcalá 403, Centro"
  },
  { 
    id: "criollo", 
    name: "Criollo", 
    type: "gastronomy", 
    position: { lat: 17.0630, lng: -96.7370 },
    price: "$$$$",
    tag: "Tasting menu",
    distinction: "Guía MICHELIN",
    description: "Experiencia de degustación de alto nivel; ideal para una cena memorable.",
    address: "Francisco I. Madero 129, Centro"
  },
  { 
    id: "panam", 
    name: "Pan:AM", 
    type: "gastronomy", 
    position: { lat: 17.0646, lng: -96.7229 },
    price: "$$–$$$",
    tag: "Café-panadería",
    description: "Café + panadería muy popular para desayuno; ideal si buscas algo casual pero bien hecho.",
    address: "C. de Mariano Abasolo 103 B, Centro"
  },
  { 
    id: "itanoni", 
    name: "Itanoní Tetelas", 
    type: "gastronomy", 
    position: { lat: 17.0863, lng: -96.7214 },
    price: "$",
    tag: "Maíz oaxaqueño",
    distinction: "Guía MICHELIN",
    description: "Antojitos de maíz (tetelas/memelas) con enfoque tradicional; auténtico y directo.",
    address: "Av. Belisario Domínguez 513, Reforma"
  },
  { id: "cafe-tradicion", name: "Café Tradición", type: "gastronomy", position: { lat: 17.0609, lng: -96.7262 }, price: "$$", tag: "Clásico de centro", description: "Café y desayuno tradicional; opción confiable, sin complicaciones.", address: "Av. De La Independencia 1203, Centro" },
  { id: "agua-que-canta", name: "Agua Que Canta", type: "gastronomy", position: { lat: 17.0615, lng: -96.7258 }, price: "$–$$", tag: "Healthy / vegan-friendly", description: "Smoothies y snacks saludables; perfecto si quieres algo ligero y rápido.", address: "Valentín Gómez Farias 402, Centro" },
  { id: "pan-con-madre", name: "Pan con Madre", type: "gastronomy", position: { lat: 17.0670, lng: -96.7210 }, price: "$–$$", tag: "Masa madre", description: "Panadería artesanal (sourdough); ideal para “grab & go” con café.", address: "C. de Quetzalcóatl 205-D, Centro" },
  { id: "yegole", name: "Yegolé", type: "gastronomy", position: { lat: 17.0635, lng: -96.7245 }, price: "$–$$", tag: "Café casual", description: "Café y opciones ligeras; cómodo para sentarte un rato.", address: "Constitución 401 A, Centro" },
  { id: "pitiona", name: "La Pitiona", type: "gastronomy", position: { lat: 17.0659523, lng: -96.7245254 }, price: "$$$", tag: "Rooftop + autor", description: "Cocina de autor con vibra de rooftop; buena para date night.", address: "Ignacio Allende 114, Centro" },
  { id: "casa-oaxaca", name: "Casa Oaxaca", type: "gastronomy", position: { lat: 17.0652183, lng: -96.7222793 }, price: "$$$", tag: "Clásico premium", distinction: "Guía MICHELIN", description: "Restaurante muy consolidado; cocina contemporánea y ambiente elegante.", address: "Constitución 104-A, Centro" },
  { id: "quince-letras", name: "Las Quince Letras", type: "gastronomy", position: { lat: 17.0649, lng: -96.7220 }, price: "$$", tag: "Regional", distinction: "Bib Gourmand", description: "Cocina regional con excelente relación calidad-precio.", address: "C. de Mariano Abasolo 300, Centro" },
  { id: "tierra-sol", name: "Tierra del Sol", type: "gastronomy", position: { lat: 17.0671, lng: -96.7208 }, price: "$$", tag: "Rooftop local", distinction: "Bib Gourmand", description: "Muy buen valor y experiencia; opción sólida para comer rico.", address: "Reforma 411, Centro" },
  { id: "palapa-raul", name: "La Palapa de Raúl", type: "gastronomy", position: { lat: 17.0588, lng: -96.7178 }, price: "$$", tag: "Tradicional", description: "Oaxaqueño tradicional; opción confiable y sin pretensiones.", address: "Carr. Internacional Al Tule Km. 11, Tlalixtac" },
  { id: "popular", name: "La Popular", type: "gastronomy", position: { lat: 17.0668, lng: -96.7243 }, price: "$–$$", tag: "Cantina casual", description: "Buena para pre/after; ambiente relajado y muy accesible.", address: "Jesús Carranza 110, Centro" },
  { id: "selva", name: "Selva", type: "gastronomy", position: { lat: 17.0659, lng: -96.7236 }, price: "$$$", tag: "Coctelería", distinction: "50 Best", description: "Barra creativa y de alto perfil; ideal para coctelería 'seria'.", address: "C. Macedonio Alcalá 403, Centro" },
  { id: "sabina-sabe", name: "Sabina Sabe", type: "gastronomy", position: { lat: 17.0632, lng: -96.7242 }, price: "$$$", tag: "Mezcal + cocktails", distinction: "50 Best", description: "Referente en mezcal y cócteles; una experiencia muy oaxaqueña.", address: "5 de Mayo 209, Centro" },
  { id: "amantes-terraza", name: "Terraza Los Amantes", type: "gastronomy", position: { lat: 17.0665, lng: -96.7235 }, price: "$$$", tag: "Rooftop vista", description: "Terraza para cocteles con vista espectacular; gran spot para el atardecer.", address: "Ignacio Allende 108, Centro" },
  { id: "praga", name: "Praga", type: "gastronomy", position: { lat: 17.0665, lng: -96.7236 }, price: "$$", tag: "Bar flexible", description: "Café-restaurante-bar; opción versátil que funciona para cualquier momento.", address: "Ignacio Allende 106, Centro" },

  // Culture
  { 
    id: "c1", 
    name: "Centro Histórico de Oaxaca", 
    type: "culture", 
    position: { lat: 17.0654528, lng: -96.7237981 },
    description: "Patrimonio Mundial de la Humanidad, calles empedradas y arquitectura colonial."
  },
  { 
    id: "c2", 
    name: "Teatro Macedonio Alcalá", 
    type: "culture", 
    position: { lat: 17.0615756, lng: -96.7234480 },
    description: "Teatro art nouveau inaugurado en 1909, sede de conciertos y artes escénicas."
  },
  { 
    id: "c3", 
    name: "Jardín Etnobotánico", 
    type: "culture", 
    position: { lat: 17.0655913, lng: -96.7219608 },
    description: "Jardín con flora nativa oaxaqueña dentro del ex convento de Santo Domingo."
  },
  { 
    id: "c4", 
    name: "Monte Albán", 
    type: "culture", 
    position: { lat: 17.0454573, lng: -96.7674673 },
    description: "Antigua capital zapoteca en la cima de una montaña, Patrimonio Mundial."
  },
  { 
    id: "c5", 
    name: "Museo de las Culturas", 
    type: "culture", 
    position: { lat: 17.0661807, lng: -96.7230860 },
    description: "Alberga tesoros prehispánicos como la Tumba 7 de Monte Albán."
  },
  { 
    id: "c6", 
    name: "Hierve el Agua", 
    type: "culture", 
    position: { lat: 16.8656531, lng: -96.2760065 },
    description: "Cascadas petrificadas y pozas minerales con miradores espectaculares."
  },
  { 
    id: "c7", 
    name: "Centro Cultural San Pablo", 
    type: "culture", 
    position: { lat: 17.0608229, lng: -96.7233039 },
    description: "Ex convento restaurado con exposiciones de arte y diseño."
  },
  { 
    id: "c8", 
    name: "San Pablo Villa de Mitla", 
    type: "culture", 
    position: { lat: 16.9268690, lng: -96.3593028 },
    description: "Sitio arqueológico famoso por sus intrincados mosaicos de piedra."
  },
  { 
    id: "c9", 
    name: "Teotitlán del Valle", 
    type: "culture", 
    position: { lat: 17.0301555, lng: -96.5207260 },
    description: "Reconocido por sus tapetes de lana tejidos a mano."
  },
  { 
    id: "c10", 
    name: "San Martín Tilcajete", 
    type: "culture", 
    position: { lat: 16.8602196, lng: -96.6947010 },
    description: "Cuna de los alebrijes, coloridas figuras de madera talladas."
  },
    { 
      id: "c11", 
      name: "Plaza de la Danza", 
      type: "culture", 
      position: { lat: 17.0636178, lng: -96.7297027 },
      description: "Espacio para eventos culturales y presentaciones de danza tradicional."
    },
    { 
      id: "c12", 
      name: "Árbol del Tule", 
      type: "culture", 
      position: { lat: 17.0466207, lng: -96.6362233 },
      description: "El árbol con el diámetro de tronco más grande del mundo, una maravilla natural de más de 2,000 años."
    },
  ];

const getMarkerIconEmoji = (type: MarkerType, id: string) => {
  const lowId = id.toLowerCase();
  if (type === "event") {
    if (lowId === "ceremonia" || lowId === "calenda") return "⛪";
    if (lowId === "recepcion") return "🎉";
    if (lowId === "cóctel de bienvenida") return "🥂";
    return "✨";
  }
  return "";
};

const getMarkerColor = (type: MarkerType) => {
  switch (type) {
    case "event": return "#C66B3D";
    case "hotel": return "#4A90E2";
    case "gastronomy": return "#059669";
    case "culture": return "#D4828E";
    default: return "#000000";
  }
};

export interface LegendItem {
  label: string;
  color: string;
  emoji?: string;
}

interface WeddingMapProps {
  compact?: boolean;
  activeMarkerId?: string | null;
  filterTypes?: MarkerType[];
  onMarkerClick?: (marker: MarkerData) => void;
  offsetX?: number;
  offsetY?: number;
  customLegend?: LegendItem[];
  markerColorOverride?: (marker: MarkerData) => string;
  hideUI?: boolean;
  hideLegend?: boolean;
  focusIds?: string[];
  autoFit?: boolean;
  defaultZoom?: number;
  activeZoom?: number;
  className?: string;
}

export function WeddingMap({ 
  compact = false,
  activeMarkerId,
  filterTypes,
  onMarkerClick,
  offsetX = 0,
  offsetY = 0,
  customLegend,
  markerColorOverride,
  hideUI = false,
  hideLegend = false,
  focusIds,
  autoFit = false,
  defaultZoom = 13,
  activeZoom = 16,
  className,
}: WeddingMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = React.useState<MarkerData | null>(null);
  const markersRef = React.useRef<{ [key: string]: google.maps.Marker }>({});
  const infoWindowRef = React.useRef<google.maps.InfoWindow | null>(null);
  const lastPannedIdRef = React.useRef<string | null>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const panToWithOffset = React.useCallback((targetMap: google.maps.Map, latLng: google.maps.LatLngLiteral, offX: number, offY: number, targetZoom?: number) => {
    const zoom = targetZoom || targetMap.getZoom() || 14;
    const scale = Math.pow(2, zoom);
    const projection = targetMap.getProjection();
    if (!projection) return;

    const worldPoint = projection.fromLatLngToPoint(new google.maps.LatLng(latLng.lat, latLng.lng));
    if (!worldPoint) return;

    const worldOffX = offX / scale;
    const worldOffY = offY / scale;
    const targetWorldPoint = new google.maps.Point(worldPoint.x - worldOffX, worldPoint.y - worldOffY);
    const targetLatLng = projection.fromPointToLatLng(targetWorldPoint);
    if (targetLatLng) targetMap.panTo(targetLatLng);
  }, []);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync active marker and pan
  React.useEffect(() => {
    if (activeMarkerId) {
      const searchId = activeMarkerId.toLowerCase();
      const found = MARKERS.find(m => m.id.toLowerCase() === searchId || m.name.toLowerCase() === searchId);
      if (found) {
        setActiveMarker(found);
        if (map && found.id !== lastPannedIdRef.current) {
          if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            debounceTimerRef.current = setTimeout(() => {
              const currentZoom = map.getZoom() || 0;
              const nextZoom = currentZoom < (activeZoom - 1) ? activeZoom : currentZoom;
              if (currentZoom < (activeZoom - 1)) map.setZoom(activeZoom);
              panToWithOffset(map, found.position, offsetX, offsetY, nextZoom);
              lastPannedIdRef.current = found.id;
            }, 150);
        }
      }
    } else {
      setActiveMarker(null);
      lastPannedIdRef.current = null;
    }
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [activeMarkerId, map, panToWithOffset, offsetX, offsetY, activeZoom]);

  // Handle focusIds
  React.useEffect(() => {
    if (!map || !focusIds || focusIds.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    let count = 0;
    focusIds.forEach(id => {
      const lowId = id.toLowerCase();
      const markerData = MARKERS.find(m => m.id.toLowerCase() === lowId || m.name.toLowerCase() === lowId);
      if (markerData) { bounds.extend(markerData.position); count++; }
    });
    if (count > 0) {
      setTimeout(() => map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 }), 200);
    }
  }, [map, focusIds]);

  // Handle autoFit
  React.useEffect(() => {
    if (!map || !autoFit) return;
    const bounds = new google.maps.LatLngBounds();
    let count = 0;
    MARKERS.forEach(m => {
      const isVisible = !filterTypes || filterTypes.includes(m.type);
      if (isVisible) {
        bounds.extend(m.position);
        count++;
      }
    });
    if (count > 0) {
      setTimeout(() => map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 }), 300);
    }
  }, [map, autoFit, filterTypes]);

  // Init Map and Markers
  React.useEffect(() => {
    const initMap = async () => {
      try {
        setOptions({ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, v: "weekly" });
        const { Map, InfoWindow } = await importLibrary("maps");
        if (mapRef.current && !map) {
          const newMap = new Map(mapRef.current, {
            center: OAXACA_CENTER,
            zoom: defaultZoom,
            styles: MAP_STYLE,
            disableDefaultUI: true,
            zoomControl: !hideUI,
            gestureHandling: hideUI ? "none" : "greedy",
            clickableIcons: false,
          });

          const iw = new InfoWindow({ disableAutoPan: true });
          infoWindowRef.current = iw;

          MARKERS.forEach((markerData) => {
            const isEvent = markerData.type === "event";
            const isVisible = !filterTypes || filterTypes.includes(markerData.type);
            
            const marker = new google.maps.Marker({
              position: markerData.position,
              map: isVisible ? newMap : null,
              title: markerData.name,
              zIndex: isEvent ? 1000 : 1,
              label: getMarkerIconEmoji(markerData.type, markerData.id) ? { 
                text: getMarkerIconEmoji(markerData.type, markerData.id), 
                fontSize: isEvent ? (isMobile ? "8px" : "11px") : (isMobile ? "7px" : "9px"), 
                color: "white" 
              } : null as any,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: markerColorOverride ? markerColorOverride(markerData) : getMarkerColor(markerData.type),
                  fillOpacity: 1,
                  strokeWeight: 0,
                  strokeColor: "transparent",
                  scale: isEvent ? (isMobile ? 8 : 12) : (isMobile ? 6 : 9),
                  labelOrigin: new google.maps.Point(0, 0),
                },
            });

            markersRef.current[markerData.id] = marker;

            marker.addListener("click", () => {
              onMarkerClick?.(markerData);
            });

            // Tooltip on Hover
            marker.addListener("mouseover", () => {
              if (isMobile) return;
              
              // Custom content for the church to show both events
              const isChurch = markerData.id === "ceremonia" || markerData.id === "calenda" || markerData.name.includes("Santo Domingo");
              
              let content = `<div style="padding: 0px; font-family: sans-serif; font-size: 11px; font-weight: 700; line-height: 1.2;">`;
              
                if (isChurch) {
                  content += `<div style="color: #333; margin-bottom: 4px; border-bottom: 1px solid #eee; padding-bottom: 4px;">Templo de Santo Domingo</div>`;
                  content += `<div style="color: #C66B3D; font-size: 9px; margin-bottom: 2px;">Viernes 5:30pm · Calenda tradicional</div>`;
                  content += `<div style="color: #C66B3D; font-size: 9px;">Sábado 5:30pm · Ceremonia religiosa</div>`;
                } else {
                content += `<div style="color: #333; margin-bottom: 2px;">${markerData.name}</div>`;
                
                if (markerData.type === "hotel" && markerData.category) {
                  content += `<div style="color: #4A90E2; font-size: 9px; text-transform: uppercase;">${markerData.category}</div>`;
                } else if (markerData.type === "gastronomy" && markerData.price) {
                  const priceLabel = markerData.price.includes("$") ? markerData.price : `Precio: ${markerData.price}`;
                  content += `<div style="color: #059669; font-size: 9px;">${priceLabel}</div>`;
                } else if (markerData.type === "event" && markerData.time) {
                  content += `<div style="color: #C66B3D; font-size: 9px;">${markerData.time}</div>`;
                }
              }
              content += `</div>`;
              
              iw.setContent(content);
              iw.open(newMap, marker);
            });

            marker.addListener("mouseout", () => {
              iw.close();
            });
          });

          setMap(newMap);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };
    initMap();
  }, [map, filterTypes, onMarkerClick, hideUI, isMobile, markerColorOverride, defaultZoom]);

  // Handle updates to marker states
  React.useEffect(() => {
    if (!map) return;
    MARKERS.forEach((m) => {
      const marker = markersRef.current[m.id];
      if (marker) {
        const isVisible = !filterTypes || filterTypes.includes(m.type);
        marker.setMap(isVisible ? map : null);
        
        const isActive = activeMarker?.id === m.id;
        if (isActive) {
          marker.setZIndex(2000);
            marker.setIcon({
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#FFD700",
              fillOpacity: 1,
              strokeWeight: 0,
              strokeColor: "transparent",
              scale: m.type === 'event' ? (isMobile ? 8 : 12) : (isMobile ? 6 : 9),
              labelOrigin: new google.maps.Point(0, 0),
            });
        } else {
          const isEvent = m.type === "event";
          marker.setZIndex(isEvent ? 1000 : 1);
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: markerColorOverride ? markerColorOverride(m) : getMarkerColor(m.type),
            fillOpacity: 1,
            strokeWeight: 0,
            strokeColor: "transparent",
            scale: isEvent ? (isMobile ? 8 : 12) : (isMobile ? 6 : 9),
            labelOrigin: new google.maps.Point(0, 0),
          });
        }
      }
    });
  }, [map, filterTypes, activeMarker, isMobile, markerColorOverride]);

  const handleGetLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
        map.setCenter(pos);
        map.setZoom(16);
        new google.maps.Marker({
          position: pos,
          map: map,
          icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 6, fillColor: "#4285F4", fillOpacity: 1, strokeWeight: 2, strokeColor: "#FFFFFF" },
          title: "Tu ubicación",
        });
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full h-full", className)}>
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-ink/10">
        <div ref={mapRef} className="w-full h-full" />
        {!hideUI && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button
              onClick={handleGetLocation}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-ink hover:bg-white transition-all border border-ink/5"
            >
              <Navigation className="h-5 w-5" />
            </button>
          </div>
        )}
        {!hideLegend && (
          <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-auto bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg border border-ink/5">
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-[10px] md:text-xs font-bold text-ink/70">
              {customLegend ? (
                customLegend.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    {item.emoji ? <span className="text-[10px]">{item.emoji}</span> : <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />}
                    <span>{item.label}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px]">⛪</span>
                    <span className="text-[#C66B3D]">BODA</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4A90E2]" />
                    <span>Hoteles</span>
                  </div>
                  {(!compact && (!filterTypes || filterTypes.includes('gastronomy'))) && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                      <span>Restaurantes</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {!compact && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
            <h5 className="font-heading text-lg text-ink mb-2">Traslados</h5>
            <p className="text-sm text-ink/70 leading-relaxed">La mayoría de los lugares están a distancia caminable (10-15 min) en el Centro Histórico.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
            <h5 className="font-heading text-lg text-ink mb-2">Aeropuerto</h5>
            <p className="text-sm text-ink/70 leading-relaxed">El Aeropuerto Internacional de Oaxaca (OAX) está a 25-30 minutos en taxi del centro.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
            <h5 className="font-heading text-lg text-ink mb-2">Clima</h5>
            <p className="text-sm text-ink/70 leading-relaxed">En septiembre el clima es templado con posibles lluvias. Calzado cómodo es recomendado.</p>
          </div>
        </div>
      )}
    </div>
  );
}

const MAP_STYLE = [
  { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] },
  { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
  { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
  { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#cad2c5" }, { "visibility": "on" }] }
];
