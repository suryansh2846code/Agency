import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Poppins, Caveat } from "next/font/google";
import "./school.css";
import SchoolNav from "@/components/school/SchoolNav";
import SchoolFooter from "@/components/school/SchoolFooter";
import { school } from "./config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// handwriting — sticky notes
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: `${school.name} — Admissions Open`,
  description: school.tagline,
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`school ${poppins.variable} ${caveat.variable}`}
      style={
        {
          "--brand": school.brand,
          "--accent": school.accent,
          "--font-head-school": "var(--font-poppins)",
          "--font-body": "var(--font-inter)",
          "--font-hand": "var(--font-caveat)",
        } as CSSProperties
      }
    >
      <SchoolNav />
      <main>{children}</main>
      <SchoolFooter />
    </div>
  );
}
