import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Archivo } from "next/font/google";
import "./senior.css";
import SeniorNav from "@/components/senior/SeniorNav";
import SeniorFooter from "@/components/senior/SeniorFooter";
import { senior } from "./config";

// bold grotesk display — strong, editorial
const display = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: `${senior.name} — An International Education`,
  description: senior.tagline,
};

export default function SeniorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`senior ${display.variable}`}
      style={
        {
          "--brand": senior.brand,
          "--red": senior.red,
          "--gold": senior.gold,
          "--font-head-senior": "var(--font-archivo)",
          "--font-body": "var(--font-inter)",
        } as CSSProperties
      }
    >
      <SeniorNav />
      <main>{children}</main>
      <SeniorFooter />
    </div>
  );
}
