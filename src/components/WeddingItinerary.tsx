"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { MapPin, Music, Utensils, Sparkles, Navigation, Calendar, Heart, Wine, Maximize2 } from "lucide-react"
import { useInView } from "react-intersection-observer"
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
      description: "Iniciaremos con una calenda tradicional desde el Templo de Santo Domingo hacia el restaurante Catedral.",
      locationName: "Templo de Santo Domingo",
      coords: { lat: 17.0664, lng: -96.7233 },
      icon: <Music className="h-5 w-5" />,
    },
      {
        id: "Cóctel de bienvenida",
        dayKey: "friday",
        time: "6:30 pm - 9:30 pm",
        title: "Cóctel de bienvenida",
        description: "Cóctel de bienvenida y convivencia en el restaurante Catedral",
        locationName: "el restaurante Catedral",
        coords: { lat: 17.0608, lng: -96.7254 },
          icon: <Wine className="h-5 w-5" />,
      },
]

const SATURDAY_EVENTS_LIST: ItineraryEvent[] = [
    {
      id: "ceremonia",
      dayKey: "saturday",
      time: "5:30 pm - 6:45 pm",
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

// Solo eventos del sábado 12 para invitados de Oaxaca
const ALL_EVENTS = [...SATURDAY_EVENTS_LIST]

export default function WeddingItinerary({ language = "es" }: { language?: Language }) {
  const [activeEventId, setActiveEventId] = React.useState<string | null>(null)
  const isLockedRef = React.useRef(false)
  const lockTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = React.useRef(Date.now())

  React.useEffect(() => {
    // En desktop, activamos el primer evento del sábado por defecto para que se vea el mapa
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && !activeEventId && SATURDAY_EVENTS_LIST.length > 0) {
      setActiveEventId(SATURDAY_EVENTS_LIST[0].id)
    }
  }, [])

  const lockObserver = (ms = 2500) => {
    isLockedRef.current = true
    lastUpdateRef.current = Date.now()
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false
    }, ms)
  }

  const handleEventInView = React.useCallback((id: string) => {
    if (isLockedRef.current || Date.now() - lastUpdateRef.current < 200) return
    setActiveEventId(id)
  }, [])

  const handleItemClick = (id: string) => {
    lockObserver(2500)
    setActiveEventId(id)
    const element = document.getElementById(`itinerary-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

    const activeEvent = ALL_EVENTS.find(e => e.id === activeEventId) || SATURDAY_EVENTS_LIST[0]

    const ITINERARY_LEGEND = [
      { label: "Templo de Santo Domingo", color: "#C66B3D", emoji: "⛪" },
      { label: "Salón Berriozabal 120", color: "#C66B3D", emoji: "🎉" },
    ];


  return (
    <div className="relative w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-[55%] space-y-4 lg:space-y-8">
            {/* Día 11 oculto para invitados de Oaxaca */}
            <div className="space-y-3 lg:space-y-6 hidden">
              <DayHeader 
                dayNumber="11" 
                dayName="Viernes" 
                monthYear="Septiembre 2026" 
                bgImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_VERDE-1767905587948.png"
              />
                <div className="relative lg:pl-0">
                  <div className="hidden lg:block absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/20 lg:-translate-x-1/2" />
                <div className="space-y-6 lg:space-y-10">
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
            <div className="space-y-3 lg:space-y-6">
              <DayHeader 
                dayNumber="12" 
                dayName="Sábado" 
                monthYear="Septiembre 2026" 
                bgImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_VERDE-1767905587948.png"
              />
                <div className="relative lg:pl-0">
                  <div className="hidden lg:block absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent lg:-translate-x-1/2" />
                <div className="space-y-6 lg:space-y-10">
                  {SATURDAY_EVENTS_LIST.map((event, index) => (
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

        </div>

        <div className="hidden lg:block w-full lg:w-[45%] lg:sticky top-40 h-[600px] z-30">
          <div className="h-full w-full rounded-[2rem] overflow-hidden border border-border bg-muted shadow-2xl relative">
            <WeddingMap 
              compact={true}
              activeMarkerId={activeEventId}
              filterTypes={["event"]}
              onMarkerClick={(m) => handleItemClick(m.id)}
              hideLegend={true}
              autoFit={true}
              activeZoom={15}
            />
            <div className="absolute top-4 right-4 z-50">
              <Link
                href="/mapa"
                className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm hover:bg-white text-ink rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg border border-border"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Abrir mapa completo</span>
              </Link>
            </div>
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
                      Sábado 12 · {activeEvent?.time}
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

function DayHeader({ dayNumber, dayName, monthYear, bgImage }: { dayNumber: string, dayName: string, monthYear: string, bgImage?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn("relative p-4 lg:p-6 overflow-hidden transition-all duration-700 min-h-[100px] flex items-center bg-[#919d82]", bgImage ? "border-white/10 shadow-xl" : "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30")} style={{ borderRadius: "2rem 1.9rem 2.1rem 1.8rem / 1.9rem 2rem 1.8rem 2.1rem", border: "1px solid rgba(0,0,0,0.1)", borderBottomWidth: "4px", borderBottomColor: "rgba(0, 0, 0, 0.15)" }}>
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a2e1a]/20" />
        </div>
      )}
      <div className="flex items-center gap-4 lg:gap-8 relative z-10 w-full">
            <div className={cn("flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-[1.5rem] font-heading text-3xl lg:text-4xl font-bold transition-all duration-500", bgImage ? "bg-transparent text-[#f1e9df]" : "bg-primary text-primary-foreground")}>{dayNumber}</div>
            <div>
              <p className={cn("text-xl lg:text-lg font-heading italic mb-0.5 lg:mb-1.5", bgImage ? "text-[#f1e9df]/90" : "text-primary")}>{monthYear.toLowerCase()}</p>
              <h3 className={cn("font-heading text-3xl lg:text-4xl tracking-wide uppercase", bgImage ? "text-[#f1e9df]" : "text-foreground")}>{dayName}</h3>
            </div>

      </div>
    </motion.div>
  )
}

function TimelineItem({ event, index, onInView, onClick, isActive, alignment = "left", bgImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_BLANCA-1767905973064.png?width=8000&height=8000&resize=contain" }: { event: ItineraryEvent, index: number, onInView: (id: string) => void, onClick?: () => void, isActive: boolean, alignment?: "left" | "right", bgImage?: string }) {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: "-40% 0px -40% 0px", triggerOnce: false })
  React.useEffect(() => { if (inView && typeof window !== 'undefined' && window.innerWidth >= 1024) onInView(event.id) }, [inView, event.id, onInView])
  const isLeft = alignment === "left"
  return (
    <motion.div ref={ref} id={`itinerary-${event.id}`} initial={{ opacity: 0, x: isLeft ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} onClick={onClick} className={cn("relative flex flex-col items-start lg:items-center cursor-pointer", isLeft ? "lg:flex-row-reverse" : "lg:flex-row")}>
      <div className={cn("hidden lg:block absolute left-6 lg:left-1/2 top-6 w-3 h-3 rounded-full border-2 border-background z-20 transition-all duration-500 lg:-translate-x-1/2", isActive ? "bg-primary scale-125 shadow-lg shadow-primary/40" : "bg-muted-foreground/40")} />
      <div className="hidden lg:block lg:w-1/2" />
      <div className={cn("w-full lg:w-1/2 lg:px-6 max-w-[320px] sm:max-w-[360px] lg:max-w-none", isLeft ? "text-left lg:text-right mr-auto" : "text-right lg:text-left ml-auto")}>
        <div className={cn("relative p-3 lg:p-5 transition-all duration-500 overflow-hidden", isActive ? "border-primary/40 shadow-xl scale-[1.01]" : "border-border/50")} style={{ borderRadius: "1.5rem 1.6rem 1.4rem 1.7rem / 1.6rem 1.5rem 1.7rem 1.4rem", border: "1px solid rgba(0,0,0,0.08)", borderBottomWidth: "3px", borderBottomColor: isActive ? "rgba(198, 107, 61, 0.2)" : "rgba(0, 0, 0, 0.1)" }}>
          {bgImage && <div className="absolute inset-0 z-0"><img src={bgImage} alt="" className="w-full h-full object-cover" /></div>}
          <div className="relative z-10">
              <div className={cn("flex items-center gap-3 mb-1 lg:mb-3", isLeft ? "flex-row lg:flex-row-reverse" : "flex-row-reverse lg:flex-row", "justify-between")}>
                <span className={cn("text-[13px] font-black px-3 py-1 rounded-full uppercase tracking-wider", isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{event.time}</span>
                <div className={cn("p-1 lg:p-1.5 rounded-lg transition-colors", isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{React.cloneElement(event.icon as React.ReactElement, { className: "h-4 w-4" })}</div>
              </div>
              <h4 className="font-heading text-[20px] lg:text-xl text-foreground mb-1">{event.title}</h4>
              <p className={cn("text-[16px] lg:text-[15px] text-muted-foreground leading-relaxed mb-2 lg:mb-3 transition-all duration-300", !isActive && "lg:line-clamp-none line-clamp-2")}>{event.description}</p>
              <div className={cn("flex items-center justify-between text-[13px] lg:text-[12px] font-bold pt-2 lg:pt-3 border-t uppercase tracking-wider", isActive ? "text-primary border-primary/10" : "text-foreground/40 border-border/50")}>

              <div className={cn("flex items-center gap-2", isLeft ? "justify-start lg:justify-end lg:flex-row-reverse" : "justify-end lg:justify-start lg:flex-row")}><MapPin className="h-3 w-3" />{event.locationName}</div>
              {!isActive && <span className="lg:hidden text-primary font-bold">Ver más</span>}
            </div>
          </div>
          <AnimatePresence>
            {isActive && (
              <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: "auto", opacity: 1, marginTop: 12 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="lg:hidden w-full space-y-4 relative z-10">
                  <div className="w-full h-[120px] rounded-xl overflow-hidden border border-border shadow-inner relative pointer-events-none" onClick={(e) => e.stopPropagation()}>
                    <WeddingMap 
                      compact={true} 
                      activeMarkerId={event.id} 
                      filterTypes={["event"]} 
                      hideUI={true} 
                      hideLegend={true} 
                      activeZoom={14}
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2 pointer-events-auto"><a href={`https://www.google.com/maps/dir/?api=1&destination=${event.coords.lat},${event.coords.lng}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-primary"><Navigation className="h-4 w-4" /></a></div>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
