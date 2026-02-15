// ============================================================
// PAGE D'ACCUEIL — SOFICRAFT
// Route : /
// Sprint 1 — Navbar + HeroSection
// ============================================================

import HeroSection from "../components/homepage/HeroSection";
import UniversSection from "../components/homepage/UniversSection";
import Navbar from "../components/layout/Navbar";

export default function HomePage() {
  return (
    <main className="page-home">
      <Navbar />
      <HeroSection />
      <UniversSection />

      {/*
        PROCHAINES SECTIONS (Sprint 1 - à venir) :
        - <UniversSection />      → Section 2 : Univers SOFICRAFT
        - <ProcessSection />      → Section 3 : Processus de création
        - <FeaturedSection />     → Section 4 : Créations phares
        - <TestimonialsSection /> → Section 5 : Témoignages
        - <CTASection />          → Section 6 : Appel à l'action final
        - <Footer />              → Footer global
      */}
    </main>
  );
}
