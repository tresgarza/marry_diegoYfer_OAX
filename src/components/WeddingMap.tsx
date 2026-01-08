"use client";

import * as React from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin, Navigation, Hotel, Utensils, Landmark, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const OAXACA_CENTER = { lat: 17.0664, lng: -96.7233 };

type MarkerType = "hotel" | "gastronomy" | "culture" | "event";

export interface MarkerData {
  id: string;
  name: string;
  type: MarkerType;
  position: { lat: number; lng: number };
  address?: string;
}

const MARKERS: MarkerData[] = [
  // Events (Main Highlights)
  { id: "e1", name: "Templo de Santo Domingo", type: "event", position: { lat: 17.0664, lng: -96.7233 }, address: "C. de Macedonio Alcalá s/n, Centro" },
  { id: "e2", name: "Salón Berriozábal 120", type: "event", position: { lat: 17.0676, lng: -96.7216 }, address: "Calle de Berriozábal 120, Centro" },

  // Hotels
  { id: "h1", name: "Grand Fiesta Americana", type: "hotel", position: { lat: 17.0706, lng: -96.7208 }, address: "Calle de José María Pino Suárez #702" },
  { id: "h2", name: "Holiday Inn Express", type: "hotel", position: { lat: 17.0706, lng: -96.7231 }, address: "Diaz Quintas 115" },
  { id: "h3", name: "Hotel Boutique de la Parra", type: "hotel", position: { lat: 17.0594, lng: -96.7234 }, address: "Guerrero #117" },
  { id: "h4", name: "Suites de la Parra", type: "hotel", position: { lat: 17.0592, lng: -96.7247 }, address: "Las Casas #110" },
  { id: "h5", name: "Majagua", type: "hotel", position: { lat: 17.0673, lng: -96.7214 }, address: "José María Pino Suárez #519" },
  { id: "h6", name: "Naura", type: "hotel", position: { lat: 17.0603, lng: -96.7196 }, address: "Miguel Hidalgo 918" },
  { id: "h7", name: "Hotel Abu", type: "hotel", position: { lat: 17.0641, lng: -96.7248 }, address: "Murguía #104" },
  { id: "h8", name: "Hotel City Centro", type: "hotel", position: { lat: 17.0675, lng: -96.7139 }, address: "Aldama #414, Jalatlaco" },
  
  // Culture
  { id: "c2", name: "Teatro Macedonio Alcalá", type: "culture", position: { lat: 17.0617, lng: -96.7224 } },
  { id: "c3", name: "Jardín Etnobotánico", type: "culture", position: { lat: 17.0674, lng: -96.7225 } },
  { id: "c4", name: "Monte Albán", type: "culture", position: { lat: 17.0439, lng: -96.7674 } },
  
{ id: "boulenc", name: "Boulenc", type: "gastronomy", position: { lat: 17.0655, lng: -96.7262 } },
{ id: "danzantes", name: "Los Danzantes", type: "gastronomy", position: { lat: 17.0660, lng: -96.7235 } },
{ id: "criollo", name: "Criollo", type: "gastronomy", position: { lat: 17.0630, lng: -96.7370 } },
    { id: "panam", name: "Pan:AM", type: "gastronomy", position: { lat: 17.0645, lng: -96.7245 } },
    { id: "itanoni", name: "Itanoní Tetelas", type: "gastronomy", position: { lat: 17.0863, lng: -96.7214 } },
    { id: "cafe-tradicion", name: "Café Tradición", type: "gastronomy", position: { lat: 17.0610, lng: -96.7260 } },
    { id: "agua-que-canta", name: "Agua Que Canta", type: "gastronomy", position: { lat: 17.0620, lng: -96.7250 } },
    { id: "pan-con-madre", name: "Pan con Madre", type: "gastronomy", position: { lat: 17.0670, lng: -96.7270 } },
    { id: "yegole", name: "Yegolé", type: "gastronomy", position: { lat: 17.0635, lng: -96.7245 } },
    { id: "pitiona", name: "La Pitiona", type: "gastronomy", position: { lat: 17.0665, lng: -96.7230 } },
    { id: "casa-oaxaca", name: "Casa Oaxaca", type: "gastronomy", position: { lat: 17.0664, lng: -96.7233 } },
    { id: "quince-letras", name: "Las Quince Letras", type: "gastronomy", position: { lat: 17.0648, lng: -96.7225 } },
    { id: "tierra-sol", name: "Tierra del Sol", type: "gastronomy", position: { lat: 17.0652, lng: -96.7238 } },
    { id: "palapa-raul", name: "La Palapa de Raúl", type: "gastronomy", position: { lat: 17.0590, lng: -96.7180 } },
    { id: "popular", name: "La Popular", type: "gastronomy", position: { lat: 17.0642, lng: -96.7238 } },
    { id: "otra-popular", name: "La Otra Popular", type: "gastronomy", position: { lat: 17.0650, lng: -96.7230 } },
    { id: "selva", name: "Selva", type: "gastronomy", position: { lat: 17.0660, lng: -96.7235 } },
    { id: "sabina-sabe", name: "Sabina Sabe", type: "gastronomy", position: { lat: 17.0640, lng: -96.7235 } },
    { id: "amantes-terraza", name: "Los Amantes (Terraza)", type: "gastronomy", position: { lat: 17.0665, lng: -96.7235 } },
    { id: "amantes-mezcal", name: "Los Amantes (Mezcal)", type: "gastronomy", position: { lat: 17.0665, lng: -96.7235 } },
    { id: "praga", name: "Praga", type: "gastronomy", position: { lat: 17.0615, lng: -96.7240 } },

];

const getMarkerIconEmoji = (type: MarkerType, id: string) => {
  if (type === "event") return id === "e1" ? "⛪" : "✨";
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
}

export function WeddingMap({ 
  compact = false,
  activeMarkerId,
  filterTypes,
  onMarkerClick,
  offsetX = 0,
  offsetY = 0,
  customLegend,
  markerColorOverride
}: WeddingMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [overlay, setOverlay] = React.useState<google.maps.OverlayView | null>(null);
  const [activeMarker, setActiveMarker] = React.useState<MarkerData | null>(null);
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const markersRef = React.useRef<{ [key: string]: google.maps.Marker }>({});
  const lastPannedIdRef = React.useRef<string | null>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    // Helper for Panning with Offset - Mathematically stable during animation
    const panToWithOffset = React.useCallback((targetMap: google.maps.Map, latLng: google.maps.LatLngLiteral, offX: number, offY: number) => {
      const zoom = targetMap.getZoom() || 14;
      const scale = Math.pow(2, zoom);
      
      const projection = targetMap.getProjection();
      if (!projection) return;

      // 1. Get world coordinate of the marker (stable)
      const worldPoint = projection.fromLatLngToPoint(new google.maps.LatLng(latLng.lat, latLng.lng));
      if (!worldPoint) return;

      // 2. Convert pixel offset to world coordinate offset
      // Google Maps world coordinates are 256x256 at zoom 0
      const worldOffX = offX / scale;
      const worldOffY = offY / scale;

      // 3. The target map center should be such that the marker is at (offX, offY) relative to center
      // Since map center is always (width/2, height/2) in pixels, 
      // we want markerPixel = centerPixel + (offX, offY)
      // So centerPixel = markerPixel - (offX, offY)
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
          
          // Use setCenter for small adjustments, panTo for larger distances
          // 0.0001 is ~10-15 meters. If it's very small, don't move at all.
          if (latDiff > 0.005 || lngDiff > 0.005) {
            targetMap.panTo(targetLatLng);
          } else if (latDiff > 0.0002 || lngDiff > 0.0002) {
            targetMap.setCenter(targetLatLng);
          }
        }
      }
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
            }, 150); // Lowered to 150ms for snappier feel without jitter
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
              zoomControl: true,
              gestureHandling: "greedy",
              clickableIcons: false,
            });

            // Create Overlay Helper for projections
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
                        fontSize: isEvent ? "14px" : "11px", 
                        color: "white" 
                      } : null as any,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      fillColor: markerColorOverride ? markerColorOverride(markerData) : getMarkerColor(markerData.type),
                      fillOpacity: 1,
                      strokeWeight: isEvent ? 4 : 2,
                      strokeColor: isEvent ? "#FFD700" : "#FFFFFF",
                      scale: isEvent ? 16 : 11,
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
  }, [map, filterTypes, onMarkerClick]);

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
            scale: m.type === 'event' ? 22 : 18,
            labelOrigin: new google.maps.Point(0, 0),
          });
            marker.setLabel(getMarkerIconEmoji(m.type, m.id) ? {
              text: getMarkerIconEmoji(m.type, m.id),
              fontSize: m.type === 'event' ? "18px" : "15px",
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
            scale: isEvent ? 16 : 11,
            labelOrigin: new google.maps.Point(0, 0),
          });
          marker.setLabel(getMarkerIconEmoji(m.type, m.id) ? {
            text: getMarkerIconEmoji(m.type, m.id),
            fontSize: isEvent ? "14px" : "11px",
            color: "white"
          } : null as any);
        }
      }
    });
  }, [map, filterTypes, activeMarker]);

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
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-ink/10">
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Overlay Controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <button
            onClick={handleGetLocation}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-ink hover:bg-white transition-all border border-ink/5"
            title="Mi ubicación"
          >
            <Navigation className="h-5 w-5" />
          </button>
        </div>

          {/* Legend */}
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
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27AE60] shadow-sm" />
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
