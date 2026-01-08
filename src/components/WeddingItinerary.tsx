"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Music, Utensils, Sparkles, Navigation, Calendar } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"
import { cn } from "@/lib/utils"

type Language = "es" | "en"

interface ItineraryEvent {
  id: string
  dayKey: "saturday" | "sunday"
  time: string
  title: string
  description: string
  locationName: string
  coords: { lat: number; lng: number }
  icon: React.ReactNode
}

const SATURDAY_EVENTS: ItineraryEvent[] = [
  {
    id: "calenda",
    dayKey: "saturday",
    time: "5:30 pm",
    title: "Calenda Oaxaqueña",
    description: "Iniciaremos con una tradicional calenda de tehuanas desde el Templo de Santo Domingo hacia Restaurante Catedral.",
    locationName: "Templo de Santo Domingo",
    coords: { lat: 17.0664, lng: -96.7233 },
    icon: <Music className="h-5 w-5" />,
  },
  {
    id: "rompehielos",
    dayKey: "saturday",
    time: "6:15 pm",
    title: "Rompehielos",
    description: "Brindis de bienvenida y convivencia en Restaurante Catedral para conocernos antes del gran día.",
    locationName: "Restaurante Catedral",
    coords: { lat: 17.0608, lng: -96.7254 },
    icon: <Utensils className="h-5 w-5" />,
  },
]

const SUNDAY_EVENTS: ItineraryEvent[] = [
  {
    id: "ceremonia",
    dayKey: "sunday",
    time: "5:45 pm",
    title: "Ceremonia Religiosa",
    description: "Acompáñanos a celebrar nuestra unión matrimonial en este recinto histórico de la ciudad.",
    locationName: "Templo de Santo Domingo",
    coords: { lat: 17.0664, lng: -96.7233 },
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: "recepcion",
    dayKey: "sunday",
    time: "7:00 pm",
    title: "Recepción",
    description: "Cena, baile y mucha alegría para celebrar nuestro amor en una noche inolvidable.",
    locationName: "Salón Berriozábal 120",
    coords: { lat: 17.0629, lng: -96.7219 },
    icon: <HeartIcon className="h-5 w-5" />,
  },
]

const ALL_EVENTS = [...SATURDAY_EVENTS, ...SUNDAY_EVENTS]

const EVENT_ICONS: { [key: string]: string } = {
  calenda: "🎶",
  rompehielos: "🥂",
  ceremonia: "⛪",
  recepcion: "✨",
}

const COLORS = {
  primary: "#C66B3D",
  secondary: "#D4AF37",
  inactive: "#9CA3AF",
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export default function WeddingItinerary({ language = "es" }: { language?: Language }) {
  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [activeEventId, setActiveEventId] = React.useState<string>(ALL_EVENTS[0].id)
  const mapRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const markersRef = React.useRef<{ [key: string]: google.maps.Marker }>({})

  React.useEffect(() => {
    const initMap = async () => {
      try {
        setOptions({
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          v: "weekly",
        })

        const { Map } = await importLibrary("maps")
        
        if (mapRef.current && !map) {
          const newMap = new Map(mapRef.current, {
            center: ALL_EVENTS[0].coords,
            zoom: 16,
            styles: MAP_STYLE,
            disableDefaultUI: true,
            zoomControl: true,
          })

          const bounds = new google.maps.LatLngBounds()

            ALL_EVENTS.forEach((event) => {
              const marker = new google.maps.Marker({
                position: event.coords,
                map: newMap,
                title: event.title,
                zIndex: event.id === activeEventId ? 1000 : 1,
                label: event.id === activeEventId ? {
                  text: EVENT_ICONS[event.id] || "📍",
                  fontSize: "12px",
                  color: "white"
                } : undefined,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: event.dayKey === "sunday" ? COLORS.secondary : COLORS.primary,
                  fillOpacity: 1,
                  strokeWeight: 3,
                  strokeColor: "#FFFFFF",
                  scale: event.id === activeEventId ? 15 : 10,
                  labelOrigin: new google.maps.Point(0, 0),
                },
              })
              markersRef.current[event.id] = marker
              bounds.extend(event.coords)
            })

          newMap.fitBounds(bounds)
          
          const listener = google.maps.event.addListener(newMap, "idle", () => {
            if (newMap.getZoom()! > 17) newMap.setZoom(17)
            google.maps.event.removeListener(listener)
          })

          setMap(newMap)
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error)
      }
    }

    initMap()
  }, [map])

    React.useEffect(() => {
      if (!map) return
  
      ALL_EVENTS.forEach((event) => {
        const marker = markersRef.current[event.id]
        if (marker) {
          const isActive = event.id === activeEventId
          marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: event.dayKey === "sunday" ? COLORS.secondary : COLORS.primary,
            fillOpacity: 1,
            strokeWeight: 3,
            strokeColor: "#FFFFFF",
            scale: isActive ? 15 : 10,
            labelOrigin: new google.maps.Point(0, 0),
          })
          marker.setLabel(isActive ? {
            text: EVENT_ICONS[event.id] || "📍",
            fontSize: "12px",
            color: "white"
          } : undefined)
          
          if (isActive) {
            marker.setZIndex(1000)
            map.panTo(event.coords)
          } else {
            marker.setZIndex(1)
          }
        }
      })
    }, [activeEventId, map])

  const handleEventInView = React.useCallback((id: string) => {
    setActiveEventId(id)
  }, [])

  const handleItemClick = (id: string, coords: { lat: number; lng: number }) => {
    setActiveEventId(id)
    const element = document.getElementById(`itinerary-${id}`)
    if (element) {
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2)
      window.scrollTo({
        top: middle,
        behavior: "smooth"
      })
    }
    if (map) {
      map.panTo(coords)
      map.setZoom(17)
    }
  }

  const activeEvent = ALL_EVENTS.find(e => e.id === activeEventId)

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Timeline Column */}
        <div className="w-full lg:w-[55%]">
          
          {/* SÁBADO 11 */}
          <div>
            <DayHeader 
              dayNumber="11" 
              dayName="Sábado" 
              monthYear="Septiembre 2026" 
            />
            <div className="relative mt-12 px-4 pb-24">
              <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/20 lg:-translate-x-1/2" />
              
              <div className="space-y-16 lg:space-y-24">
                {SATURDAY_EVENTS.map((event, index) => (
                  <TimelineItem 
                    key={event.id}
                    event={event}
                    index={index}
                    onInView={handleEventInView}
                    onClick={() => handleItemClick(event.id, event.coords)}
                    isActive={activeEventId === event.id}
                    alignment={index % 2 === 0 ? "left" : "right"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* DOMINGO 12 */}
          <div className="mt-12">
            <DayHeader 
              dayNumber="12" 
              dayName="Domingo" 
              monthYear="Septiembre 2026" 
            />
            <div className="relative mt-12 px-4 pb-12">
              <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent lg:-translate-x-1/2" />
              
              <div className="space-y-16 lg:space-y-24">
                {SUNDAY_EVENTS.map((event, index) => (
                  <TimelineItem 
                    key={event.id}
                    event={event}
                    index={index + SATURDAY_EVENTS.length}
                    onInView={handleEventInView}
                    onClick={() => handleItemClick(event.id, event.coords)}
                    isActive={activeEventId === event.id}
                    alignment={index % 2 === 0 ? "left" : "right"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* Sticky Map Column */}
          <div className="w-full lg:w-[45%] lg:relative">
            <div className="lg:sticky lg:top-40 h-[400px] lg:h-[80vh] w-full rounded-[2rem] overflow-hidden border border-border bg-muted shadow-2xl">
            <div ref={mapRef} className="w-full h-full" />
            
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-border shadow-xl">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  activeEvent?.dayKey === "sunday" ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                )}>
                  {activeEvent?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.15em]",
                    activeEvent?.dayKey === "sunday" ? "text-secondary" : "text-primary"
                  )}>
                    {activeEvent?.dayKey === "sunday" ? "Domingo 12" : "Sábado 11"} · {activeEvent?.time}
                  </p>
                  <h4 className="font-heading text-lg text-foreground truncate">
                    {activeEvent?.locationName}
                  </h4>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${activeEvent?.coords.lat},${activeEvent?.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-foreground text-background rounded-xl hover:scale-105 transition-transform shrink-0"
                  title="Abrir en Google Maps"
                >
                  <Navigation className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DayHeader({ 
  dayNumber, 
  dayName, 
  monthYear,
}: { 
  dayNumber: string
  dayName: string
  monthYear: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-8 rounded-[2rem] border-2 overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center w-24 h-24 rounded-2xl font-heading text-5xl font-bold shadow-lg bg-primary text-primary-foreground">
          {dayNumber}
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] mb-1 text-primary">
            {monthYear}
          </p>
          <h3 className="font-heading text-4xl text-foreground">
            {dayName}
          </h3>
        </div>
      </div>
      <Calendar className="absolute -right-6 -bottom-6 h-40 w-40 opacity-[0.05] text-primary" />
    </motion.div>
  )
}

function TimelineItem({ 
  event, 
  index, 
  onInView,
  onClick,
  isActive,
  alignment = "left"
}: { 
  event: ItineraryEvent
  index: number
  onInView: (id: string) => void
  onClick?: () => void
  isActive: boolean
  alignment?: "left" | "right"
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-35% 0px -35% 0px",
    triggerOnce: false,
  })

  React.useEffect(() => {
    if (inView) {
      onInView(event.id)
    }
  }, [inView, event.id, onInView])

  const isLeft = alignment === "left"

  return (
    <motion.div 
      ref={ref}
      id={`itinerary-${event.id}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start lg:items-center cursor-pointer",
        isLeft ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      {/* Timeline Dot */}
      <div className={cn(
        "absolute left-6 lg:left-1/2 top-6 w-6 h-6 rounded-full border-4 border-background z-20 transition-all duration-500 lg:-translate-x-1/2",
        isActive 
          ? "bg-primary scale-150 shadow-xl shadow-primary/40"
          : "bg-muted-foreground/40"
      )} />

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* Content Card */}
      <div className={cn(
        "w-full lg:w-1/2 pl-16 lg:pl-0 lg:px-8",
        isLeft ? "lg:text-right" : "lg:text-left"
      )}>
          <div className={cn(
            "p-8 rounded-[2rem] border transition-all duration-700",
            isActive 
              ? "bg-white border-primary/50 shadow-2xl shadow-primary/20 scale-[1.02] ring-1 ring-primary/20"
              : "bg-card/40 border-border/50 opacity-60 grayscale-[0.5] hover:opacity-80"
          )}>
          <div className={cn(
            "flex items-start gap-4 mb-4",
            isLeft ? "lg:flex-row-reverse" : "lg:flex-row",
            "justify-between"
          )}>
            <span className={cn(
              "text-sm font-black px-4 py-1.5 rounded-full",
              isActive 
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            )}>
              {event.time}
            </span>
            <div className={cn(
              "p-3 rounded-2xl transition-all duration-500",
              isActive 
                ? "bg-primary text-primary-foreground -rotate-12"
                : "bg-muted text-muted-foreground"
            )}>
              {event.icon}
            </div>
          </div>

          <h4 className="font-heading text-2xl text-foreground mb-3">{event.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
            {event.description}
          </p>

          <div className={cn(
            "flex items-center gap-2 text-sm font-bold pt-4 border-t",
            isLeft ? "lg:justify-end" : "lg:justify-start",
            isActive 
              ? "text-primary border-primary/20"
              : "text-foreground/60 border-border/50"
          )}>
            <MapPin className="h-4 w-4" />
            {event.locationName}
          </div>
        </div>
      </div>
    </motion.div>
  )
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
    "featureType": "road",
    "elementType": "all",
    "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{ "color": "#cad2c5" }, { "visibility": "on" }]
  }
]
