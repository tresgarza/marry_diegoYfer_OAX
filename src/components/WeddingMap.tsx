"use client";

import * as React from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin, Navigation, Hotel, Utensils, Landmark, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const OAXACA_CENTER = { lat: 17.0664, lng: -96.7233 };

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
  distinction?: string;
  tag?: string;
}

export const MARKERS: MarkerData[] = [
  // Events (Main Highlights)
  { 
    id: "ceremonia", 
    name: "Templo de Santo Domingo", 
    type: "event", 
    position: { lat: 17.0664, lng: -96.7233 }, 
    address: "C. de Macedonio Alcalá s/n, Centro",
    description: "Joya del barroco mexicano con impresionante interior dorado y capilla del Rosario."
  },
  { 
    id: "calenda", 
    name: "Calenda Tradicional", 
    type: "event", 
    position: { lat: 17.0664, lng: -96.7233 },
    description: "Desfile festivo por las calles del centro histórico con marmotas, gigantes y banda de música."
  },
  { 
    id: "recepcion", 
    name: "Salón Berriozábal 120", 
    type: "event", 
    position: { lat: 17.0629, lng: -96.7219 }, 
    address: "Calle de Berriozábal 120, Centro",
    description: "Espacio elegante donde celebraremos nuestra unión y brindaremos con todos ustedes."
  },
  { 
    id: "rompehielos", 
    name: "Restaurante Catedral", 
    type: "event", 
    position: { lat: 17.0608, lng: -96.7254 }, 
    address: "García Vigil 105, Centro",
    description: "Lugar de encuentro para nuestro cóctel de bienvenida."
  },

  // Hotels
  { 
    id: "h1", 
    name: "Grand Fiesta Americana", 
    type: "hotel", 
    position: { lat: 17.0706, lng: -96.7208 }, 
    address: "Calle de José María Pino Suárez #702",
    description: "Hotel de 5 estrellas con todas las comodidades."
  },
  { 
    id: "h2", 
    name: "Holiday Inn Express", 
    type: "hotel", 
    position: { lat: 17.0706, lng: -96.7231 }, 
    address: "Diaz Quintas 115",
    description: "Opción práctica y moderna en el centro."
  },
  { 
    id: "h3", 
    name: "Hotel Boutique de la Parra", 
    type: "hotel", 
    position: { lat: 17.0594, lng: -96.7234 }, 
    address: "Guerrero #117",
    description: "Encantador hotel boutique con arquitectura tradicional."
  },
  { 
    id: "h4", 
    name: "Suites de la Parra", 
    type: "hotel", 
    position: { lat: 17.0592, lng: -96.7247 }, 
    address: "Las Casas #110",
    description: "Suites espaciosas y elegantes."
  },
  { 
    id: "h5", 
    name: "Majagua", 
    type: "hotel", 
    position: { lat: 17.0673, lng: -96.7214 }, 
    address: "José María Pino Suárez #519",
    description: "Propuesta de hospedaje contemporánea y acogedora."
  },
  { 
    id: "h6", 
    name: "Naura", 
    type: "hotel", 
    position: { lat: 17.0603, lng: -96.7196 }, 
    address: "Miguel Hidalgo 918",
    description: "Hotel tradicional con excelente ubicación."
  },
  { 
    id: "h7", 
    name: "Hotel Abu", 
    type: "hotel", 
    position: { lat: 17.0641, lng: -96.7248 }, 
    address: "Murguía #104",
    description: "Estilo colonial y servicio personalizado."
  },
  { 
    id: "h8", 
    name: "Hotel City Centro", 
    type: "hotel", 
    position: { lat: 17.0675, lng: -96.7139 }, 
    address: "Aldama #414, Jalatlaco",
    description: "Ubicado en el colorido barrio de Jalatlaco."
  },
  
  // Culture
  { 
    id: "c2", 
    name: "Teatro Macedonio Alcalá", 
    type: "culture", 
    position: { lat: 17.0617, lng: -96.7224 },
    description: "Teatro art nouveau inaugurado en 1909, sede de conciertos y artes escénicas."
  },
  { 
    id: "c3", 
    name: "Jardín Etnobotánico", 
    type: "culture", 
    position: { lat: 17.0674, lng: -96.7225 },
    description: "Jardín con flora nativa oaxaqueña dentro del ex convento de Santo Domingo."
  },
  { 
    id: "c4", 
    name: "Monte Albán", 
    type: "culture", 
    position: { lat: 17.0439, lng: -96.7674 },
    description: "Antigua capital zapoteca en la cima de una montaña, Patrimonio Mundial."
  },
  { 
    id: "c5", 
    name: "Museo de las Culturas", 
    type: "culture", 
    position: { lat: 17.0664, lng: -96.7233 },
    description: "Alberga tesoros prehispánicos como la Tumba 7 de Monte Albán."
  },
  { 
    id: "c6", 
    name: "Hierve el Agua", 
    type: "culture", 
    position: { lat: 16.8646, lng: -96.2759 },
    description: "Cascadas petrificadas y pozas minerales con miradores espectaculares."
  },
  
  // Gastronomy
  { 
    id: "boulenc", 
    name: "Boulenc", 
    type: "gastronomy", 
    position: { lat: 17.0655, lng: -96.7262 },
    tag: "Panadería + patio",
    description: "Pan artesanal y brunch estilo europeo; spot muy agradable."
  },
  { 
    id: "danzantes", 
    name: "Los Danzantes", 
    type: "gastronomy", 
    position: { lat: 17.0660, lng: -96.7235 },
    distinction: "1 Estrella MICHELIN",
    description: "Cocina oaxaqueña contemporánea en uno de los patios más icónicos."
  },
  { 
    id: "criollo", 
    name: "Criollo", 
    type: "gastronomy", 
    position: { lat: 17.0630, lng: -96.7370 },
    tag: "Tasting menu",
    description: "Experiencia de degustación de alto nivel."
  },
  { 
    id: "panam", 
    name: "Pan:AM", 
    type: "gastronomy", 
    position: { lat: 17.0645, lng: -96.7245 },
    tag: "Café-panadería",
    description: "Café + panadería muy popular para desayuno."
  },
  { 
    id: "itanoni", 
    name: "Itanoní Tetelas", 
    type: "gastronomy", 
    position: { lat: 17.0863, lng: -96.7214 },
    distinction: "Guía MICHELIN (Selección)",
    description: "Antojitos de maíz con enfoque tradicional."
  },
  { id: "cafe-tradicion", name: "Café Tradición", type: "gastronomy", position: { lat: 17.0610, lng: -96.7260 }, description: "Café y desayuno tradicional." },
  { id: "agua-que-canta", name: "Agua Que Canta", type: "gastronomy", position: { lat: 17.0620, lng: -96.7250 }, description: "Smoothies y snacks saludables." },
  { id: "pan-con-madre", name: "Pan con Madre", type: "gastronomy", position: { lat: 17.0670, lng: -96.7270 }, description: "Panadería artesanal (sourdough)." },
  { id: "yegole", name: "Yegolé", type: "gastronomy", position: { lat: 17.0635, lng: -96.7245 }, description: "Café y opciones ligeras." },
  { id: "pitiona", name: "La Pitiona", type: "gastronomy", position: { lat: 17.0665, lng: -96.7230 }, description: "Cocina de autor con vibra de rooftop." },
  { id: "casa-oaxaca", name: "Casa Oaxaca", type: "gastronomy", position: { lat: 17.0664, lng: -96.7233 }, description: "Restaurante muy consolidado; cocina contemporánea." },
  { id: "quince-letras", name: "Las Quince Letras", type: "gastronomy", position: { lat: 17.0648, lng: -96.7225 }, distinction: "Bib Gourmand (MICHELIN)", description: "Cocina regional con excelente relación calidad-precio." },
  { id: "tierra-sol", name: "Tierra del Sol", type: "gastronomy", position: { lat: 17.0652, lng: -96.7238 }, distinction: "Bib Gourmand (MICHELIN)", description: "Muy buen valor y experiencia." },
  { id: "palapa-raul", name: "La Palapa de Raúl", type: "gastronomy", position: { lat: 17.0590, lng: -96.7180 }, description: "Oaxaqueño tradicional." },
  { id: "popular", name: "La Popular", type: "gastronomy", position: { lat: 17.0642, lng: -96.7238 }, description: "Cantina casual." },
  { id: "otra-popular", name: "La Otra Popular", type: "gastronomy", position: { lat: 17.0650, lng: -96.7230 }, description: "Bar accesible." },
  { id: "selva", name: "Selva", type: "gastronomy", position: { lat: 17.0660, lng: -96.7235 }, distinction: "50 Best Discovery", description: "Coctelería de autor de alto perfil." },
  { id: "sabina-sabe", name: "Sabina Sabe", type: "gastronomy", position: { lat: 17.0640, lng: -96.7235 }, distinction: "North America’s 50 Best Bars", description: "Referente en mezcal y cócteles." },
  { id: "amantes-terraza", name: "Los Amantes (Terraza)", type: "gastronomy", position: { lat: 17.0665, lng: -96.7235 }, description: "Terraza para cocteles con vista." },
  { id: "amantes-mezcal", name: "Los Amantes (Mezcal)", type: "gastronomy", position: { lat: 17.0665, lng: -96.7235 }, description: "Mezcalería enfocada en la experiencia." },
  { id: "praga", name: "Praga", type: "gastronomy", position: { lat: 17.0615, lng: -96.7240 }, description: "Café-restaurante-bar versátil." },
];

const getMarkerIconEmoji = (type: MarkerType, id: string) => {
  const lowId = id.toLowerCase();
  if (type === "event") {
    if (lowId === "ceremonia" || lowId === "calenda") return "⛪";
    if (lowId === "recepcion") return "✨";
    if (lowId === "rompehielos") return "🥂";
    return "✨";
  }
  if (type === "hotel") return "🏨";
  if (type === "gastronomy") return "";
  if (type === "culture") return "🏛️";
  return "📍";
};

const getMarkerColor = (type: MarkerType) => {
  switch (type) {
    case "event": return "#C66B3D"; // Terracotta Oaxaqueño
    case "hotel": return "#4A90E2"; // Bright Blue
    case "gastronomy": return "#059669"; // Green (default for gastro)
    case "culture": return "#D4828E"; // Pink
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
  className,
}: WeddingMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [overlay, setOverlay] = React.useState<google.maps.OverlayView | null>(null);
  const [activeMarker, setActiveMarker] = React.useState<MarkerData | null>(null);
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const markersRef = React.useRef<{ [key: string]: google.maps.Marker }>({});
  const lastPannedIdRef = React.useRef<string | null>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Helper for Panning with Offset
  const panToWithOffset = React.useCallback((targetMap: google.maps.Map, latLng: google.maps.LatLngLiteral, offX: number, offY: number) => {
    const zoom = targetMap.getZoom() || 14;
    const scale = Math.pow(2, zoom);
    
    const projection = targetMap.getProjection();
    if (!projection) return;

    const worldPoint = projection.fromLatLngToPoint(new google.maps.LatLng(latLng.lat, latLng.lng));
    if (!worldPoint) return;

    const worldOffX = offX / scale;
    const worldOffY = offY / scale;

    const targetWorldPoint = new google.maps.Point(
      worldPoint.x - worldOffX,
      worldPoint.y - worldOffY
    );

    const targetLatLng = projection.fromPointToLatLng(targetWorldPoint);
    if (targetLatLng) {
      const currentCenter = targetMap.getCenter();
      if (currentCenter) {
        const latDiff = Math.abs(currentCenter.lat() - targetLatLng.lat());
        const lngDiff = Math.abs(currentCenter.lng() - targetLatLng.lng());
        
        if (latDiff > 0.0001 || lngDiff > 0.0001) {
          targetMap.panTo(targetLatLng);
        }
      }
    }
  }, []);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync internal activeMarker with external activeMarkerId
  React.useEffect(() => {
    if (activeMarkerId) {
      const searchId = activeMarkerId.toLowerCase();
      const found = MARKERS.find(m => 
        m.id.toLowerCase() === searchId || 
        m.name.toLowerCase() === searchId
      );
      if (found) {
        setActiveMarker(found);
        
        if (map) {
          if (found.id === lastPannedIdRef.current) return;

          if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
          
          debounceTimerRef.current = setTimeout(() => {
            panToWithOffset(map, found.position, offsetX, offsetY);
            lastPannedIdRef.current = found.id;
            
            const currentZoom = map.getZoom() || 0;
            if (currentZoom < 15) {
              map.setZoom(16);
            }
          }, 150);
        }
      }
    } else {
      setActiveMarker(null);
      lastPannedIdRef.current = null;
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [activeMarkerId, map, panToWithOffset, offsetX, offsetY]);

  // Handle focusIds change
  React.useEffect(() => {
    if (!map || !focusIds || focusIds.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    let count = 0;

    focusIds.forEach(id => {
      const lowId = id.toLowerCase();
      const markerData = MARKERS.find(m => 
        m.id.toLowerCase() === lowId || 
        m.name.toLowerCase() === lowId
      );
      if (markerData) {
        bounds.extend(markerData.position);
        count++;
      }
    });

    if (count > 0) {
      const timer = setTimeout(() => {
        map.fitBounds(bounds, {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [map, focusIds]);

  React.useEffect(() => {
    const initMap = async () => {
      try {
        setOptions({
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          v: "weekly",
        });

        const { Map } = await importLibrary("maps");
        await importLibrary("places");
        
        if (mapRef.current && !map) {
          const newMap = new Map(mapRef.current, {
            center: OAXACA_CENTER,
            zoom: 13,
            styles: MAP_STYLE,
            disableDefaultUI: true,
            zoomControl: !hideUI,
            gestureHandling: hideUI ? "none" : "greedy",
            clickableIcons: false,
          });

          const newOverlay = new google.maps.OverlayView();
          newOverlay.onAdd = () => {};
          newOverlay.draw = () => {};
          newOverlay.onRemove = () => {};
          newOverlay.setMap(newMap);
          setOverlay(newOverlay);

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
                fontSize: isEvent ? (isMobile ? "11px" : "14px") : (isMobile ? "9px" : "11px"), 
                color: "white" 
              } : null as any,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: markerColorOverride ? markerColorOverride(markerData) : getMarkerColor(markerData.type),
                fillOpacity: 1,
                strokeWeight: isEvent ? 4 : 2,
                strokeColor: isEvent ? "#FFD700" : "#FFFFFF",
                scale: isEvent ? (isMobile ? 12 : 16) : (isMobile ? 8 : 11),
                labelOrigin: new google.maps.Point(0, 0),
              },
            });

            markersRef.current[markerData.id] = marker;

            marker.addListener("click", () => {
              onMarkerClick?.(markerData);
            });
          });

          setMap(newMap);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [map, filterTypes, onMarkerClick, hideUI, isMobile, markerColorOverride]);

  // Handle visibility and highlight changes
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
            fillColor: "#000000",
            fillOpacity: 1,
            strokeWeight: 4,
            strokeColor: "#C66B3D",
            scale: m.type === 'event' ? (isMobile ? 18 : 22) : (isMobile ? 14 : 18),
            labelOrigin: new google.maps.Point(0, 0),
          });
          marker.setLabel(getMarkerIconEmoji(m.type, m.id) ? {
            text: getMarkerIconEmoji(m.type, m.id),
            fontSize: m.type === 'event' ? (isMobile ? "14px" : "18px") : (isMobile ? "12px" : "15px"),
            color: "white"
          } : null as any);
        } else {
          const isEvent = m.type === "event";
          marker.setZIndex(isEvent ? 1000 : 1);
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: markerColorOverride ? markerColorOverride(m) : getMarkerColor(m.type),
            fillOpacity: 1,
            strokeWeight: isEvent ? 4 : 2,
            strokeColor: isEvent ? "#FFD700" : "#FFFFFF",
            scale: isEvent ? (isMobile ? 12 : 16) : (isMobile ? 8 : 11),
            labelOrigin: new google.maps.Point(0, 0),
          });
          marker.setLabel(getMarkerIconEmoji(m.type, m.id) ? {
            text: getMarkerIconEmoji(m.type, m.id),
            fontSize: isEvent ? (isMobile ? "11px" : "14px") : (isMobile ? "9px" : "11px"),
            color: "white"
          } : null as any);
        }
      }
    });
  }, [map, filterTypes, activeMarker, isMobile, markerColorOverride]);


  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          if (map) {
            map.setCenter(pos);
            map.setZoom(16);
            new google.maps.Marker({
              position: pos,
              map: map,
              icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 6,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
              },
              title: "Tu ubicación",
            });
          }
        }
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full h-full", className)}>
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-ink/10">
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Overlay Controls */}
        {!hideUI && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button
              onClick={handleGetLocation}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-ink hover:bg-white transition-all border border-ink/5"
              title="Mi ubicación"
            >
              <Navigation className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Legend */}
        {!hideLegend && (
          <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-auto bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg border border-ink/5">
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-[10px] md:text-xs font-bold text-ink/70">
              {customLegend ? (
                customLegend.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    {item.emoji ? (
                      <div className="w-4 h-4 rounded-full bg-white border border-ink/10 flex items-center justify-center text-[10px] shadow-sm">
                        {item.emoji}
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                    )}
                    <span>{item.label}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full bg-[#C66B3D] border border-white flex items-center justify-center text-[9px] text-white z-10 shadow-sm">
                        ⛪
                      </div>
                    </div>
                    <span className="text-[#C66B3D]">BODA</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4A90E2] shadow-sm" />
                    <span>Hoteles</span>
                  </div>
                  {(!compact && (!filterTypes || filterTypes.includes('gastronomy'))) && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#059669] shadow-sm" />
                      <span>Restaurantes</span>
                    </div>
                  )}
                  {(!compact && (!filterTypes || filterTypes.includes('culture'))) && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D4828E] shadow-sm" />
                      <span>Cultura</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Suggested Routes / Info */}
      {!compact && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
            <h5 className="font-heading text-lg text-ink mb-2">Traslados</h5>
            <p className="text-sm text-ink/70 leading-relaxed">
              La mayoría de los hoteles y restaurantes recomendados están a una distancia caminable (10-15 min) dentro del Centro Histórico.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
            <h5 className="font-heading text-lg text-ink mb-2">Aeropuerto</h5>
            <p className="text-sm text-ink/70 leading-relaxed">
              El Aeropuerto Internacional de Oaxaca (OAX) se encuentra a unos 25-30 minutos en taxi del centro histórico.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
            <h5 className="font-heading text-lg text-ink mb-2">Clima</h5>
            <p className="text-sm text-ink/70 leading-relaxed">
              En septiembre, Oaxaca tiene un clima templado con posibles lluvias por la tarde. Recomendamos traer calzado cómodo para las calles empedradas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const MAP_STYLE = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#444444" }]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{ "color": "#f2f2f2" }]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "all",
    "stylers": [{ "visibility": "on" }, { "color": "#e5e5e5" }]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{ "visibility": "simplified" }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{ "color": "#cad2c5" }, { "visibility": "on" }]
  }
];
