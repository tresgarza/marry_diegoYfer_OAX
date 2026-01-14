"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRSVP } from "@/lib/rsvp-context";

export default function WeddingRSVP() {
  const [name, setName] = React.useState("");
  const { isOpen, setIsOpen } = useRSVP();

  const handleConfirm = () => {
    if (!name.trim()) return;
    
    // Construct the WhatsApp message as requested
    const message = `Hola, soy ${name.trim()}, quiero confirmar mi asistencia a la boda de Fer y Diego el 12 de Septiembre de 2026.`;
    // Using the provided number: +52 33 9688 0318
    const whatsappUrl = `https://wa.me/523396880318?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative w-full aspect-square flex items-center justify-center">
          {/* Envelope background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/envelope_invitation-resized-1768101047547.webp?width=8000&height=8000&resize=contain"
              alt="Sobre de Invitación"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Card foreground */}
          <motion.div
            initial={{ 
              opacity: 0, 
              x: 200,
              scale: 0.9
            }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              scale: 1
            }}
            transition={{ 
              duration: 1, 
              delay: 0.8, 
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="absolute inset-0 z-10"
          >
            <DialogTrigger asChild>
              <div className="relative block w-full h-full cursor-pointer hover:scale-[1.02] transition-transform duration-300 group">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/card_invitation_oficial-resized-1768101946763.webp?width=8000&height=8000&resize=contain"
                  alt="Tarjeta de Invitación Oficial"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </DialogTrigger>
          </motion.div>
        </div>

        <DialogContent className="sm:max-w-[425px] border-primary/20 bg-[#fdfaf6] p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif text-primary text-center mb-2">
              Confirmar Asistencia
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-sm font-medium text-primary/80 px-1 text-center">
                Antes de confirmar, ¿podrías decirnos tu nombre?
              </label>
              <Input
                id="name"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/50 border-primary/20 focus-visible:ring-primary/30 h-12 text-center text-lg"
                onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              />
            </div>
            <Button 
              onClick={handleConfirm}
              disabled={!name.trim()}
              className="w-full bg-[#1a2e1a] hover:bg-[#2a3e2a] text-white py-7 rounded-full font-semibold tracking-wide flex gap-3 text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <MessageCircle className="w-6 h-6" />
              Confirmar por WhatsApp
            </Button>
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-[0.2em]">
              Abriremos WhatsApp con tu mensaje listo
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
