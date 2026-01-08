import WeddingNavigation from "@/components/WeddingNavigation";
import WeddingHero from "@/components/WeddingHero";
import WeddingHotels from "@/components/WeddingHotels";
import WeddingGastronomy from "@/components/WeddingGastronomy";
import WeddingBeautyServices from "@/components/WeddingBeautyServices";
import WeddingCulturalRecs from "@/components/WeddingCulturalRecs";
import WeddingRSVP from "@/components/WeddingRSVP";
import WeddingSaveTheDate from "@/components/WeddingSaveTheDate";
import { WeddingSection } from "@/components/WeddingSection";
import { WeddingMap } from "@/components/WeddingMap";
import WeddingItinerary from "@/components/WeddingItinerary";
import WeddingRSVPFab from "@/components/WeddingRSVPFab";

export default function Page() {
  return (
    <main className="min-h-dvh w-full text-foreground">
      {/* Sticky Navigation */}
      <WeddingNavigation
        currentLang="es"
        coupleName="Fernanda & Diego"
      />

      {/* Floating RSVP Button (Mobile only) */}
      <WeddingRSVPFab />

      {/* Hero (UNTOUCHED as per constraints) */}
      <div id="hero" className="scroll-mt-24">
        <WeddingHero
          imageAlt="Agave plantation in Oaxaca"
          imageUrl="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757473184363-eqh7n9twk6.png"
          names="Fernanda & Diego"
          dateLabel="12.09.26"
          locationLabel="Oaxaca, México"
          priorityImage
        />
      </div>

      {/* Sections below Hero */}

      {/* Itinerary */}
      <WeddingSection
        id="itinerario"
        title="Nuestro Itinerario"
        subtitle="Todos los momentos que formarán parte de nuestro gran día para que puedas acompañarnos en cada paso."
        textureImage="/backgrounds/fondo_soft_ivory_elegance.png"
        withSeparator
        noAnimation
      >
        <WeddingItinerary language="es" />
      </WeddingSection>

      {/* Hotels */}
      <WeddingSection
        id="hoteles"
        title="Hoteles recomendados"
        subtitle="Hospedaje seleccionado para que disfrutes al máximo de tu estancia en Oaxaca."
        textureImage="/backgrounds/fondo_soft_sage_green.png"
        topGradient
        noAnimation={true}
      >
        <WeddingHotels
          locale="es"
          hotels={[
            {
              name: "Grand Fiesta Americana",
              category: "5*",
              rooms: "50",
              address: "Calle de José María Pino Suárez #702, Centro",
              phones: ["9515017690", "4433108019", "4431378728"],
              website: "https://www.corpo-rate.com/login?groupId=G1UZ48@FGO",
              email: "banquetesfgoa@posadas.com",
              promoCode: "G1UZ48@FGO",
              instructions: "Tarifa sujeta a disponibilidad de cuartos destinados a este código. Reservaciones únicamente por los canales indicados.",
              rate: "$6,188.00 (Ocupación Sencilla o Doble)",
              deadline: "12 de Agosto",
              contact: "Karla",
              coords: { lat: 17.0706, lng: -96.7208 },
              distanceToVenue: "0.8 km",
              durationToVenue: "11 mins"
            },
            {
              name: "Holiday Inn Express",
              category: "4*",
              rooms: "A Disposición",
              address: "Diaz Quintas 115, Oaxaca, OAX, MX",
              phones: ["8008385364"],
              website: "https://www.ihg.com/holidayinnexpress/hotels/us/es/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=OAXMX&qCiD=11&qCiMy=082026&qCoD=13&qCoMy=082026&qGrpCd=FYD&setPMCookies=true&qSHBrC=EX&qDest=Diaz%20Quintas%20:%20115,%20Oaxaca,%20OAX,%20MX&showApp=true&adjustMonth=false&srb_u=1&qRmFltr=",
              promoCode: "FYD",
              instructions: "Reservar llamando al 800 8385364 mencionando el nombre del evento “Boda Fernanda González Pozas & Diego Garza González” o a través del link con el código FYD.",
              rate: "Tarifa Preferencial",
              deadline: "Bloqueo Abierto",
              contact: "Directo en el link",
              coords: { lat: 17.0706, lng: -96.7231 },
              distanceToVenue: "0.5 km",
              durationToVenue: "7 mins"
            },
            {
              name: "Hotel Boutique de la Parra",
              category: "Boutique",
              rooms: "13",
              address: "Guerrero #117, Centro",
              phones: ["9515141900"],
              website: "https://www.hoteldelaparra.com",
              email: "frontdesk@hoteldelaparra.com",
              promoCode: "F&D1009",
              rate: "$4,875.00 - $6,880.00",
              deadline: "Bloqueo Abierto",
              contact: "Daniela",
              coords: { lat: 17.0594, lng: -96.7234 },
              distanceToVenue: "0.9 km",
              durationToVenue: "13 mins"
            },
            {
              name: "Suites de la Parra",
              category: "Boutique",
              rooms: "14",
              address: "Las Casas #110, Centro",
              phones: ["9515141900"],
              website: "https://suitesdelaparra.com/",
              email: "suitesdelaparra@gmail.com",
              promoCode: "F&D1009",
              rate: "$4,050.00 - $6,000.00",
              deadline: "Bloqueo Abierto",
              contact: "Paola",
              coords: { lat: 17.0592, lng: -96.7247 },
              distanceToVenue: "0.9 km",
              durationToVenue: "14 mins"
            },
            {
              name: "Majagua",
              category: "Boutique",
              rooms: "A Disposición",
              address: "José María Pino Suárez #519, Centro",
              phones: ["5513284105"],
              website: "https://www.majaguahotel.com",
              promoCode: "FERNANDAYDIEGO2026",
              instructions: "10% de descuento sobre la tarifa del momento. En Código Promocional, poner el código creado al reservar.",
              rate: "10% de Descuento",
              deadline: "Bloqueo Abierto",
              contact: "Blanca",
              coords: { lat: 17.0673, lng: -96.7214 },
              distanceToVenue: "0.4 km",
              durationToVenue: "6 mins"
            },
            {
              name: "Naura",
              category: "Boutique",
              rooms: "24",
              address: "Miguel Hidalgo 918, Centro, Oaxaca de Juárez",
              phones: ["9515015400"],
              website: "https://www.hotelnaura.com",
              email: "reservaciones@hotelnaura.com",
              rate: "$2,499.00 - $3,213.00 (Imp. Incluidos)",
              deadline: "Bloqueo Abierto",
              contact: "Maricruz",
              coords: { lat: 17.0603, lng: -96.7196 },
              distanceToVenue: "1.0 km",
              durationToVenue: "16 mins"
            },
            {
              name: "Hotel Abu",
              category: "Boutique",
              rooms: "10",
              address: "Murguía #104, Centro",
              phones: ["9515164900"],
              website: "https://www.hotelabu.com/",
              email: "reservaciones@hotelabu.com",
              rate: "$1,743.00 - $2,756.00 (Imp. Incluidos)",
              deadline: "Bloqueo Abierto",
              contact: "Jorge",
              coords: { lat: 17.0641, lng: -96.7248 },
              distanceToVenue: "0.4 km",
              durationToVenue: "6 mins"
            },
            {
              name: "Hotel City Centro",
              category: "4*",
              rooms: "A Disposición",
              address: "Aldama #414, Barrio de Jalatlaco",
              phones: ["5564488773"],
              website: "https://www.cityexpress.com",
              email: "rfuentesr@norte19.com",
              rate: "$3,332.00 - $4,284.00 (Imp. Incluidos)",
              deadline: "Bloqueo Abierto",
              contact: "Rocio",
              coords: { lat: 17.0675, lng: -96.7139 },
              distanceToVenue: "1.5 km",
              durationToVenue: "20 mins"
            },
          ]}
        />
      </WeddingSection>

      {/* RSVP */}
      <WeddingSection
        id="rsvp"
        textureImage="/backgrounds/fondo_ivory_texture.png"
        maxWidth="max-w-4xl"
        topGradient
      >
        <WeddingRSVP />
      </WeddingSection>

      {/* Gastronomy */}
      <WeddingSection
        id="gastronomia"
        title="Gastronomía"
        subtitle="Nuestros lugares favoritos para desayunar, comer y brindar en el centro de Oaxaca."
        textureImage="/backgrounds/fondo_soft_blush_sand.png"
        topGradient
      >
        <WeddingGastronomy lang="es" />
      </WeddingSection>

      {/* Beauty Services */}
      <WeddingSection
        id="maquillaje"
        title="Maquillaje & Peinado"
        subtitle="Servicios profesionales recomendados para que luzcas espectacular."
        textureImage="/backgrounds/fondo_soft_blush_sand.png"
        className="py-24 md:py-28"
        topGradient
      >
        <WeddingBeautyServices 
          services={[
            {
              name: "Coquetta Salón de Belleza",
              phone: "+529513101160",
              instagram: { handle: "@coquettasalondebelleza", url: "https://instagram.com/coquettasalondebelleza" },
              note: "Servicio profesional de maquillaje y peinado en Oaxaca.",
            },
            {
              name: "Krasivo Studio Oaxaca",
              phone: "+529511179639",
              instagram: { handle: "@krasivo_oaxaca", url: "https://instagram.com/krasivo_oaxaca" },
              note: "Especialistas en resaltar tu belleza natural para eventos especiales.",
            },
            {
              name: "L'Yette Beauty Lab",
              phone: "+529513922478",
              instagram: { handle: "@lyette.oax", url: "https://instagram.com/lyette.oax" },
              note: "Laboratorio de belleza con servicios personalizados de alta calidad.",
            },
          ]} 
        />
      </WeddingSection>

      {/* Cultural Recommendations */}
      <WeddingSection
        id="cultura"
        title="Recomendaciones Culturales"
        subtitle="Descubre la riqueza histórica y cultural de Oaxaca y sus alrededores."
        textureImage="/backgrounds/fondo_soft_sage_green.png"
        topGradient
      >
        <WeddingCulturalRecs lang="es" />
      </WeddingSection>

      {/* Footer / Save the Date */}
      <WeddingSection
        bgColor="var(--bg-ivory)"
        className="py-12 md:py-16"
        withSeparator
      >
        <WeddingSaveTheDate
          title="SAVE THE DATE"
          date="12 de septiembre de 2026"
          layout="comfortable"
        />
      </WeddingSection>
    </main>
  );
}
