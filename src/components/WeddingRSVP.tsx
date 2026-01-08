"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { WeddingCard } from "./WeddingCard";
import { WeddingButton } from "./WeddingButton";

export default function WeddingRSVP() {
  const phoneNumber = "523396880318";
  const message = encodeURIComponent("¡Hola! Soy [Nombre] y quiero confirmar mi asistencia a la boda de Fer y Diego. Somos [Número] personas. ¡Nos vemos pronto!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="max-w-2xl mx-auto">
      <WeddingCard className="text-center noPadding">
        <div className="px-6 pt-10 pb-8 md:px-10 md:pt-12 md:pb-10">
          <h2 className="text-3xl md:text-4xl font-heading text-ink mb-6">
            Confirmación de Asistencia
          </h2>
          <p className="text-sm md:text-base text-ink/70 mb-10 leading-relaxed max-w-lg mx-auto font-sans">
            ¡Nos encantaría que nos acompañaras en este día tan especial! 
            Por favor, confirma tu asistencia enviándonos un mensaje directo.
          </p>
        
          <WeddingButton
            as="a"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="px-10 py-4 text-base"
          >
            <MessageCircle className="h-5 w-5 mr-2 fill-current" />
            Confirmar mi asistencia
          </WeddingButton>
        </div>
      </WeddingCard>
    </div>
  );
}
