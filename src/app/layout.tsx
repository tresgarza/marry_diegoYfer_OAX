import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { RSVPProvider } from "@/lib/rsvp-context";

export const metadata: Metadata = {
  title: "Fernanda & Diego — 12 de septiembre de 2026",
  description:
    "Nos hace muchísima ilusión compartir este momento contigo. Te enviamos la invitación a nuestra boda. ¡Será un gusto que nos acompañes!",
  openGraph: {
    title: "Fernanda & Diego — 12 de septiembre de 2026",
    description:
      "Nos hace muchísima ilusión compartir este momento contigo. Te enviamos la invitación a nuestra boda. ¡Será un gusto que nos acompañes!",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url:
          "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/Fernanda-Diego-invitation-oficial-2-1768430745395.png",
        width: 1200,
        height: 630,
        alt: "Invitación de boda Fernanda & Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernanda & Diego — 12 de septiembre de 2026",
    description:
      "Nos hace muchísima ilusión compartir este momento contigo. Te enviamos la invitación a nuestra boda. ¡Será un gusto que nos acompañes!",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d2144260-8874-4248-9be8-8ff966b1067f/Fernanda-Diego-invitation-oficial-2-1768430745395.png",
    ],
  },
  icons: {
    icon: [
      {
        url:
          "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757476063645-f3wef72rnce.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url:
          "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757476063645-f3wef72rnce.png",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url:
          "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757476063645-f3wef72rnce.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <RSVPProvider>
          {children}
        </RSVPProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
