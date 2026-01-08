import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SAVE THE DATE — 12.09.26 — Fernanda y Diego",
  description:
    "Fernanda & Diego — Oaxaca, México — 12 de septiembre de 2026. Acompáñanos a celebrar.",
  openGraph: {
    title: "SAVE THE DATE — 12.09.26 — Fernanda y Diego",
    description:
      "Fernanda & Diego — Oaxaca, México — 12 de septiembre de 2026.",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url:
          "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757476063645-f3wef72rnce.png",
        alt: "Logo Fernanda & Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAVE THE DATE — 12.09.26 — Fernanda y Diego",
    description:
      "Fernanda & Diego — Oaxaca, México — 12 de septiembre de 2026.",
    images: [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1757476063645-f3wef72rnce.png",
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
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}