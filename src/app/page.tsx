// ============================================================
// PAGE D'ACCUEIL — SOFICRAFT
// Route : /
// Sprint 1 — Navbar + HeroSection
// ============================================================

import CollectionsSection from "../components/homepage/CollectionSection";
import FinalCTA from "../components/homepage/FinalCTA";
import HeroSection from "../components/homepage/HeroSection";
import MiniGalerieSection from "../components/homepage/MiniSectionGallery";
import UniversSection from "../components/homepage/UniversSection";
import Navbar from "../components/layout/Navbar";

export default function HomePage() {
  return (
    <main className="page-home">
      <Navbar />
      <HeroSection />
      <UniversSection />
      <CollectionsSection />
      <FinalCTA />
      <MiniGalerieSection />
    </main>
  );
}
