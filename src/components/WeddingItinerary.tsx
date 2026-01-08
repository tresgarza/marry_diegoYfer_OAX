"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Music, Utensils, Sparkles, Navigation, Calendar, Heart } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"
import { cn } from "@/lib/utils"
import { WeddingMap } from "./WeddingMap"

type Language = "es" | "en"

interface ItineraryEvent {
  id: string
  dayKey: "friday" | "saturday"
  time: string
  title: string
  description: string
  locationName: string
  coords: { lat: number; lng: number }
  icon: React.ReactNode
}

const FRIDAY_EVENTS: ItineraryEvent[] = [
    {
      id: "calenda",
      dayKey: "friday",
      time: "5:30 pm",
      title: "Calenda Oaxaqueña",
      description: "Iniciaremos con una calenda tradicional desde el Templo de Santo Domingo hacia el restaurante catedral.",
      locationName: "Templo de Santo Domingo",
      coords: { lat: 17.0664, lng: -96.7233 },
      icon: <Music className="h-5 w-5" />,
    },
    {
      id: "rompehielos",
      dayKey: "friday",
      time: "6:30 pm",
      title: "Rompehielos",
      description: "Cóctel de bienvenida y convivencia en el restaurante catedral",
      locationName: "el restaurante catedral",
      coords: { lat: 17.0608, lng: -96.7254 },
      icon: <Utensils className="h-5 w-5" />,
    },
]

const SATURDAY_EVENTS_LIST: ItineraryEvent[] = [
  {
    id: "ceremonia",
    dayKey: "saturday",
    time: "5:30 pm",
    title: "Ceremonia Religiosa",
    description: "Acompáñanos a celebrar nuestra unión matrimonial en este recinto histórico de la ciudad.",
    locationName: "Templo de Santo Domingo",
    coords: { lat: 17.0664, lng: -96.7233 },
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: "recepcion",
    dayKey: "saturday",
    time: "7:00 pm",
    title: "Recepción",
    description: "Acompáñanos a celebrar nuestra unión en una noche llena de alegría, música y amor",
    locationName: "Salón Berriozábal 120",
    coords: { lat: 17.0629, lng: -96.7219 },
    icon: <Heart className="h-5 w-5" />,
  },
]

const ALL_EVENTS = [...FRIDAY_EVENTS, ...SATURDAY_EVENTS_LIST]

const COLORS = {
  primary: "#C66B3D",
  secondary: "#D4AF37",
  inactive: "#9CA3AF",
}

export default function WeddingItinerary({ language = "es" }: { language?: Language }) {
  const [activeEventId, setActiveEventId] = React.useState<string>(ALL_EVENTS[0].id)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleEventInView = React.useCallback((id: string) => {
    setActiveEventId(id)
  }, [])

  const handleItemClick = (id: string) => {
    setActiveEventId(id)
    const element = document.getElementById(`itinerary-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const activeEvent = ALL_EVENTS.find(e => e.id === activeEventId)

  const ITINERARY_LEGEND = [
    { label: "Templo de Santo Domingo", color: "#C66B3D", emoji: "⛪" },
    { label: "Salón Berriozabal 120", color: "#C66B3D", emoji: "✨" },
    { label: "Restaurante Catedral", color: "#C66B3D", emoji: "🥂" },
  ];

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
          {/* Timeline Column */}
          <div className="w-full lg:w-[55%] space-y-6 lg:space-y-12">
            
            {/* VIERNES 11 */}
            <div className="space-y-4 lg:space-y-8">
              <DayHeader 
                dayNumber="11" 
                dayName="Viernes" 
                monthYear="Septiembre 2026" 
              />
              <div className="relative pl-6 lg:pl-0">
                <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/20 lg:-translate-x-1/2" />
                
                <div className="space-y-8 lg:space-y-20">
                  {FRIDAY_EVENTS.map((event, index) => (
                    <TimelineItem 
                      key={event.id}
                      event={event}
                      index={index}
                      onInView={handleEventInView}
                      onClick={() => handleItemClick(event.id)}
                      isActive={activeEventId === event.id}
                      alignment={index % 2 === 0 ? "left" : "right"}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* SÁBADO 12 */}
            <div className="space-y-4 lg:space-y-8">
              <DayHeader 
                dayNumber="12" 
                dayName="Sábado" 
                monthYear="Septiembre 2026" 
              />
              <div className="relative pl-6 lg:pl-0">
                <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent lg:-translate-x-1/2" />
                
                <div className="space-y-8 lg:space-y-20">
                  {SATURDAY_EVENTS_LIST.map((event, index) => (
                    <TimelineItem 
                      key={event.id}
                      event={event}
                      index={index + FRIDAY_EVENTS.length}
                      onInView={handleEventInView}
                      onClick={() => handleItemClick(event.id)}
                      isActive={activeEventId === event.id}
                      alignment={index % 2 === 0 ? "left" : "right"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        {/* Sticky Map Column (Desktop Only) */}
        <div className="hidden lg:block w-full lg:w-[45%] lg:sticky top-40 h-[600px] z-30">
          <div className="h-full w-full rounded-[2rem] overflow-hidden border border-border bg-muted shadow-2xl relative">
            <WeddingMap 
              compact={true}
              activeMarkerId={activeEventId}
              filterTypes={["event"]}
              onMarkerClick={(m) => handleItemClick(m.id)}
              customLegend={ITINERARY_LEGEND}
            />
            
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-border shadow-xl">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  activeEvent?.dayKey === "saturday" ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                )}>
                  {activeEvent?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.15em]",
                    activeEvent?.dayKey === "saturday" ? "text-secondary" : "text-primary"
                  )}>
                    {activeEvent?.dayKey === "saturday" ? "Sábado 12" : "Viernes 11"} · {activeEvent?.time}
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
      className="relative p-4 lg:p-8 rounded-2xl lg:rounded-[2rem] border-2 overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30"
    >
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center justify-center w-14 h-14 lg:w-20 lg:h-20 rounded-2xl font-heading text-2xl lg:text-4xl font-bold shadow-lg bg-primary text-primary-foreground">
          {dayNumber}
        </div>
        <div>
          <p className="text-[9px] lg:text-xs font-bold uppercase tracking-[0.25em] mb-1 text-primary">
            {monthYear}
          </p>
          <h3 className="font-heading text-[20px] lg:text-3xl text-foreground">
            {dayName}
          </h3>
        </div>
      </div>
      <Calendar className="absolute -right-6 -bottom-6 h-32 w-32 opacity-[0.05] text-primary" />
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
    rootMargin: "-40% 0px -40% 0px",
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
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start lg:items-center cursor-pointer",
        isLeft ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      {/* Timeline Dot */}
      <div className={cn(
        "absolute left-6 lg:left-1/2 top-8 w-4 h-4 rounded-full border-2 border-background z-20 transition-all duration-500 lg:-translate-x-1/2",
        isActive 
          ? "bg-primary scale-150 shadow-lg shadow-primary/40"
          : "bg-muted-foreground/40"
      )} />

      {/* Spacer for desktop alternating */}
      <div className="hidden lg:block lg:w-1/2" />

      {/* Content Card */}
      <div className={cn(
        "w-full lg:w-1/2 pl-12 lg:pl-0 lg:px-8 max-w-[360px] mx-auto lg:max-w-none",
        isLeft ? "lg:text-right" : "lg:text-left"
      )}>
        <div className={cn(
          "p-4 lg:p-6 rounded-2xl lg:rounded-[2rem] border transition-all duration-500",
          isActive 
            ? "bg-white border-primary/40 shadow-xl scale-[1.02]"
            : "bg-card/40 border-border/50 opacity-60 grayscale-[0.5]"
        )}>
          <div className={cn(
            "flex items-center gap-3 mb-2 lg:mb-4",
            isLeft ? "lg:flex-row-reverse" : "lg:flex-row",
            "justify-between"
          )}>
            <span className={cn(
              "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider",
              isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {event.time}
            </span>
            <div className={cn(
              "p-1.5 lg:p-2 rounded-xl transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {event.icon}
            </div>
          </div>

          <h4 className="font-heading text-[18px] lg:text-xl text-foreground mb-1 lg:mb-2">{event.title}</h4>
          <p className={cn(
            "text-[13px] lg:text-sm text-muted-foreground leading-relaxed mb-3 lg:mb-4 transition-all duration-300",
            !isActive && "lg:line-clamp-none line-clamp-2"
          )}>
            {event.description}
          </p>

          <div className={cn(
            "flex items-center gap-2 text-[11px] lg:text-xs font-bold pt-3 lg:pt-4 border-t uppercase tracking-wider",
            isLeft ? "lg:justify-end" : "lg:justify-start",
            isActive ? "text-primary border-primary/10" : "text-foreground/40 border-border/50"
          )}>
            <MapPin className="h-3.5 w-3.5" />
            {event.locationName}
          </div>

          {/* Interactive Mobile Map & Expanded Info */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="lg:hidden w-full space-y-4"
              >
                <div 
                  className="w-full h-[120px] rounded-xl overflow-hidden border border-border shadow-inner relative pointer-events-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <WeddingMap 
                    compact={true}
                    activeMarkerId={event.id}
                    filterTypes={["event"]}
                    hideUI={true}
                    hideLegend={true}
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2 pointer-events-auto">
                     <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${event.coords.lat},${event.coords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-primary"
                    >
                      <Navigation className="h-4 w-4" />
                    </a>
                  </div>
                </div>


              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
