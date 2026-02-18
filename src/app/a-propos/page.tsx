import HeroAbout from "../../components/about/HeroAbout";
import StorytellingSection from "../../components/about/StoryTellingSection";
import ValeursSection from "../../components/about/ValeursSection";
import CtaFinal from "../../components/about/CtaFinal";

export default function AboutPage() {
  return (
    <main>
      <HeroAbout />
      <StorytellingSection />
      <ValeursSection />
      <CtaFinal />
    </main>
  );
}
