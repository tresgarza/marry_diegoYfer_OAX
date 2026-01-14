"use client";

import React from "react";
import { Instagram, PhoneCall } from "lucide-react";
import { WeddingCard } from "./WeddingCard";
import { WeddingButton } from "./WeddingButton";
import { WeddingGrid } from "./WeddingGrid";

type BeautyService = {
  name: string;
  phone: string;
  instagram?: {
    handle: string;
    url: string;
  };
  note?: string;
};

export interface WeddingBeautyServicesProps {
  services?: BeautyService[];
}

function formatPhoneForDisplay(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    const rest = digits.slice(1);
    return `+${rest.replace(/(\d{1,3})(\d{3})(\d{3,4})(\d{0,4})?/, (_m, a, b, c, d) =>
      [a, b, c, d].filter(Boolean).join(" ")
    )}`;
  }
  return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}

const DEFAULT_SERVICES: BeautyService[] = [
  {
    name: "Coquetta Salón de Belleza",
    phone: "+529513101160",
    instagram: {
      handle: "@coquettasalondebelleza",
      url: "https://instagram.com/coquettasalondebelleza",
    },
    note: "Servicio profesional de maquillaje y peinado en Oaxaca.",
  },
  {
    name: "Krasivo Studio Oaxaca",
    phone: "+529511179639",
    instagram: {
      handle: "@krasivo_oaxaca",
      url: "https://instagram.com/krasivo_oaxaca",
    },
    note: "Especialistas en resaltar tu belleza natural para eventos especiales.",
  },
  {
    name: "L'Yette Beauty Lab",
    phone: "+529513922478",
    instagram: {
      handle: "@lyette.oax",
      url: "https://instagram.com/lyette.oax",
    },
    note: "Laboratorio de belleza con servicios personalizados de alta calidad.",
  },
];

export default function WeddingBeautyServices({
  services = DEFAULT_SERVICES,
}: WeddingBeautyServicesProps) {
  return (
    <WeddingGrid columns={3}>
        {services.map((svc) => (
          <WeddingCard
            key={svc.name}
            className="h-full flex flex-col noPadding"
            textureImage="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/TARJETA_BLANCA-1767906668565.png?width=8000&height=8000&resize=contain"
          >
            {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <h3 className="font-heading text-xl md:text-2xl text-ink mb-2 leading-tight">
              {svc.name}
            </h3>
            {svc.note && (
              <p className="text-sm text-ink/60 leading-relaxed">
                {svc.note}
              </p>
            )}
          </div>

          {/* Actions */}
            <div className="mt-auto px-6 pb-6 pt-2 border-t border-ink/[0.08] flex flex-col gap-2">
              <WeddingButton
                as="a"
                href={`tel:${svc.phone}`}
                variant="secondary"
                className="w-full text-sm py-2.5 flex items-center justify-center gap-2"
                style={{ color: "#243A2B", borderColor: "rgba(36, 58, 43, 0.2)" }}
              >
                <PhoneCall className="h-4 w-4" />
                {formatPhoneForDisplay(svc.phone)}
              </WeddingButton>

              {svc.instagram && (
                <a
                  href={svc.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  style={{ color: "#b84269" }}
                >
                  <Instagram className="h-3.5 w-3.5" />
                  {svc.instagram.handle}
                </a>
              )}
            </div>
        </WeddingCard>
      ))}
    </WeddingGrid>
  );
}
