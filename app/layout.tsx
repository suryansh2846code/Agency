import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Display / identity — industrial grotesk for the hero and headings.
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Engineering / terminal voice — HUD, construction notes, the cold-open readout.
const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Tiny engineered labels — dimension tags, construction notes.
const cond = Roboto_Condensed({
  variable: "--font-cond",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ORIGIN — Every Great Brand Starts as a Blueprint",
  description:
    "ORIGIN is a premium digital agency for schools & colleges. We engineer websites, content and growth — watch your brand being built, from blueprint to launch.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${inter.variable} ${mono.variable} ${cond.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
