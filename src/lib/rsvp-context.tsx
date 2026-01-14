"use client";

import React, { createContext, useContext, useState } from "react";

interface RSVPContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openRSVP: () => void;
  closeRSVP: () => void;
}

const RSVPContext = createContext<RSVPContextType | undefined>(undefined);

export function RSVPProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRSVP = () => setIsOpen(true);
  const closeRSVP = () => setIsOpen(false);

  return (
    <RSVPContext.Provider value={{ isOpen, setIsOpen, openRSVP, closeRSVP }}>
      {children}
    </RSVPContext.Provider>
  );
}

export function useRSVP() {
  const context = useContext(RSVPContext);
  if (context === undefined) {
    throw new Error("useRSVP must be used within a RSVPProvider");
  }
  return context;
}
