import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://handypro-kiel.de'),
  title: "HandyPro - Ihre Experten für Handyreparaturen in Kiel!",
  description: "Schnell, zuverlässig und professionell! Displaywechsel, Akkuwechsel, Datenrettung und mehr für Ihr Handy in Kiel.",
  keywords: ["Handyreparatur", "Kiel", "Displaywechsel", "Akkuwechsel", "Datenrettung", "Wasserschaden", "HandyPro"],
  authors: [{ name: "HandyPro Kiel" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "HandyPro - Ihre Experten für Handyreparaturen",
    description: "Schnell, zuverlässig und professionell! Displaywechsel, Akkuwechsel, Datenrettung und mehr.",
    url: "https://handypro-kiel.de",
    siteName: "HandyPro",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HandyPro - Ihre Experten für Handyreparaturen",
    description: "Schnell, zuverlässig und professionell! Displaywechsel, Akkuwechsel, Datenrettung und mehr.",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
