"use client";

import * as React from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { MapPin, Navigation, Hotel, Utensils, Landmark, Heart, Church, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const OAXACA_CENTER = { lat: 17.065, lng: -96.723 };

type MarkerType = "hotel" | "gastronomy" | "culture" | "event";

interface MarkerData {
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
  { id: "h8", name: "City Centro Oaxaca", type: "hotel", position: { lat: 17.0675, lng: -96.7139 }, address: "Aldama #414, Jalatlaco" },
  
  // Culture
  { id: "c2", name: "Teatro Macedonio Alcalá", type: "culture", position: { lat: 17.0617, lng: -96.7224 } },
  { id: "c3", name: "Jardín Etnobotánico", type: "culture", position: { lat: 17.0674, lng: -96.7225 } },
  { id: "c4", name: "Monte Albán", type: "culture", position: { lat: 17.0439, lng: -96.7674 } },
  
  // Gastronomy (Some favorites)
  { id: "g1", name: "Boulenc", type: "gastronomy", position: { lat: 17.0631, lng: -96.7271 } },
  { id: "g2", name: "Los Danzantes", type: "gastronomy", position: { lat: 17.0658, lng: -96.7238 } },
  { id: "g3", name: "Criollo", type: "gastronomy", position: { lat: 17.0628, lng: -96.7328 } },
];

export function WeddingMap() {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = React.useState<MarkerData | null>(null);
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null);

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
              zoom: 14,
              styles: MAP_STYLE,
              disableDefaultUI: true,
              zoomControl: true,
            });

            MARKERS.forEach((markerData) => {
              const isEvent = markerData.type === "event";
              
              const getIcon = (type: MarkerType, id: string) => {
                if (type === "event") return id === "e1" ? "⛪" : "✨";
                if (type === "hotel") return "🏨";
                if (type === "gastronomy") return "🍴";
                if (type === "culture") return "🏛️";
                return "📍";
              };

              const marker = new google.maps.Marker({
                position: markerData.position,
                map: newMap,
                title: markerData.name,
                zIndex: isEvent ? 1000 : 1,
                label: { 
                  text: getIcon(markerData.type, markerData.id), 
                  fontSize: isEvent ? "14px" : "11px", 
                  color: "white" 
                },
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: getMarkerColor(markerData.type),
                  fillOpacity: 1,
                  strokeWeight: isEvent ? 4 : 2,
                  strokeColor: isEvent ? "#FFD700" : "#FFFFFF",
                  scale: isEvent ? 16 : 11,
                  labelOrigin: new google.maps.Point(0, 0),
                },
              });


            marker.addListener("click", () => {
              setActiveMarker(markerData);
              newMap.panTo(markerData.position);
            });
          });

          setMap(newMap);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [map]);

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
    <div className="flex flex-col gap-6">
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border border-ink/10">
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
        <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-ink/5">
              <div className="flex flex-wrap gap-4 text-xs font-medium text-ink/70">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full bg-[#C66B3D] border border-white flex items-center justify-center text-[9px] text-white z-10">
                        ⛪
                      </div>
                      <div className="w-4 h-4 rounded-full bg-[#C66B3D] border border-white flex items-center justify-center text-[9px] text-white">
                        ✨
                      </div>
                    </div>
                    <span className="font-bold text-[#C66B3D]">BODA</span>
                  </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4A90E2]" />
                  <span>Hoteles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#27AE60]" />
                  <span>Restaurantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D4828E]" />
                  <span>Cultura</span>
                </div>
              </div>

        </div>

        {/* Info Card when marker selected */}
        {activeMarker && (
          <div className="absolute top-4 right-4 left-4 md:left-auto md:w-72 bg-white p-4 rounded-xl shadow-2xl border border-ink/10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-start mb-3">
                  <div className="p-2 rounded-lg bg-ink/5">
                    {activeMarker.type === "event" && (
                      activeMarker.id === "e1" ? <Church className="h-4 w-4 text-[#C66B3D]" /> :
                      activeMarker.id === "e2" ? <Sparkles className="h-4 w-4 text-[#C66B3D]" /> :
                      <Heart className="h-4 w-4 text-[#C66B3D]" />
                    )}
                      {activeMarker.type === "hotel" && <Hotel className="h-4 w-4 text-[#4A90E2]" />}
                      {activeMarker.type === "gastronomy" && <Utensils className="h-4 w-4 text-[#27AE60]" />}
                      {activeMarker.type === "culture" && <Landmark className="h-4 w-4 text-[#D4828E]" />}
                    </div>

              <button 
                onClick={() => setActiveMarker(null)}
                className="text-ink/40 hover:text-ink transition-colors"
              >
                ✕
              </button>
            </div>
            <h4 className="font-heading text-lg text-ink mb-1">{activeMarker.name}</h4>
            {activeMarker.address && (
              <p className="text-sm text-ink/60 mb-4 flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                {activeMarker.address}
              </p>
            )}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeMarker.position.lat},${activeMarker.position.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-ink text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-ink/90 transition-all"
            >
              Cómo llegar
              <Navigation className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Suggested Routes / Info */}
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
    </div>
  );
}

function getMarkerColor(type: MarkerType) {
  switch (type) {
    case "event": return "#C66B3D"; // Terracotta Oaxaqueño
    case "hotel": return "#4A90E2"; // Bright Blue
    case "gastronomy": return "#27AE60"; // Green
    case "culture": return "#D4828E"; // Pink
    default: return "#000000";
  }
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
