"use client";

import * as React from "react";
import { Landmark, ExternalLink } from "lucide-react";
import { WeddingCard } from "./WeddingCard";
import { WeddingGrid } from "./WeddingGrid";

type Lang = "es" | "en" | "bilingual";

export interface WeddingCulturalRecsProps {
  id?: string;
  lang?: Lang;
}

const RICH_CATEGORIES = [
  {
    key: "centro",
    title: "Oaxaca · Centro",
    items: [
      {
        name: "Centro Histórico de Oaxaca",
        desc: "Patrimonio Mundial, calles empedradas, arquitectura colonial y vida cultural vibrante.",
        href: "https://www.google.com/maps/search/?api=1&query=Centro%20Hist%C3%B3rico%20de%20Oaxaca",
      },
      {
        name: "Templo de Santo Domingo de Guzmán",
        desc: "Joya del barroco mexicano con impresionante interior dorado y capilla del Rosario.",
        href: "https://www.google.com/maps/search/?api=1&query=Templo%20de%20Santo%20Domingo%20de%20Guzm%C3%A1n%20Oaxaca",
      },
      {
        name: "Museo de las Culturas de Oaxaca",
        desc: "Ubicado en Santo Domingo, alberga tesoros prehispánicos como la Tumba 7 de Monte Albán.",
        href: "https://www.google.com/maps/search/?api=1&query=Museo%20de%20las%20Culturas%20de%20Oaxaca",
      },
      {
        name: "Museo de San Pedro y San Pablo",
        desc: "Arte contemporáneo y exposiciones en un ex convento restaurado.",
        href: "https://www.google.com/maps/search/?api=1&query=Museo%20de%20San%20Pedro%20y%20San%20Pablo%20Oaxaca",
      },
      {
        name: "Teatro Macedonio Alcalá",
        desc: "Teatro art nouveau inaugurado en 1909, sede de conciertos y artes escénicas.",
        href: "https://www.google.com/maps/search/?api=1&query=Teatro%20Macedonio%20Alcal%C3%A1%2C%20Oaxaca",
      },
      {
        name: "Jardín Etnobotánico de Oaxaca",
        desc: "Jardín con flora nativa oaxaqueña dentro del ex convento de Santo Domingo.",
        href: "https://www.google.com/maps/search/?api=1&query=Jard%C3%ADn%20Etnobot%C3%A1nico%20de%20Oaxaca",
      },
      {
        name: "Plaza de la Danza",
        desc: "Espacio abierto para eventos culturales y presentaciones de danza tradicional.",
        href: "https://www.google.com/maps/search/?api=1&query=Plaza%20de%20la%20Danza%20Oaxaca",
      },
    ],
  },
  {
    key: "tour",
    title: "Oaxaca · Alrededores",
    items: [
      {
        name: "Monte Albán",
        desc: "Antigua capital zapoteca en la cima de una montaña, Patrimonio Mundial.",
        href: "https://www.google.com/maps/search/?api=1&query=Monte%20Alb%C3%A1n%2C%20Oaxaca",
      },
      {
        name: "San Pablo Villa de Mitla",
        desc: "Sitio arqueológico famoso por sus intrincados mosaicos de piedra y grecas.",
        href: "https://www.google.com/maps/search/?api=1&query=Zona%20Arqueol%C3%B3gica%20de%20Mitla",
      },
      {
        name: "Teotitlán del Valle",
        desc: "Pueblo zapoteco reconocido por sus tapetes de lana tejidos a mano con tintes naturales.",
        href: "https://www.google.com/maps/search/?api=1&query=Teotitl%C3%A1n%20del%20Valle",
      },
      {
        name: "Hierve el Agua",
        desc: "Cascadas petrificadas y pozas minerales con miradores espectaculares al valle.",
        href: "https://www.google.com/maps/search/?api=1&query=Hierve%20el%20Agua",
      },
      {
        name: "San Martín Tilcajete",
        desc: "Cuna de los alebrijes, coloridas figuras de madera talladas y pintadas a mano.",
        href: "https://www.google.com/maps/search/?api=1&query=San%20Mart%C3%ADn%20Tilcajete",
      },
    ],
  },
];

export default function WeddingCulturalRecs({
  lang = "es",
}: WeddingCulturalRecsProps) {
  return (
    <WeddingGrid columns={2}>
      {RICH_CATEGORIES.map((cat) => (
        <WeddingCard key={cat.key} noPadding className="h-full flex flex-col">
          {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-ink/[0.08]">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#D4828E]/10 text-[#D4828E]">
                  <Landmark className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-xl text-ink">
                  {cat.title}
                </h3>
              </div>
            </div>

          {/* List */}
          <ul className="flex-1 divide-y divide-ink/[0.08]">
            {cat.items.map((item, idx) => (
              <li key={item.name} className="px-6 py-4 transition-colors hover:bg-ink/[0.02]">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4828E]/30" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink mb-1">
                      {item.name}
                    </p>
                    <p className="text-sm text-ink/70 leading-relaxed mb-2">
                      {item.desc}
                    </p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#D4828E] hover:text-[#D4828E]/80 transition-colors inline-flex items-center gap-1.5"
                    >
                      Mapa
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </WeddingCard>
      ))}
    </WeddingGrid>
  );
}
