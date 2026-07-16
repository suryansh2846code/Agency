import BuildIntro from "@/components/intro/BuildIntro";
import BuildHud from "@/components/hud/BuildHud";
import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Cold-open cinematic — plays once per session, then reveals the page */}
      <BuildIntro />

      {/* Inferred industrial-lab atmosphere that wakes up as you scroll */}
      <Atmosphere />

      <Nav />
      {/* Persistent BUILD% dashboard — the spine of the whole experience */}
      <BuildHud />
      <main className="relative">
        <Hero />
        <Services />
        <Stats />
        <Portfolio />
        <Process />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
