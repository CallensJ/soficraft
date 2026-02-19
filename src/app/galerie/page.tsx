import GalleryClientWrapper from "../../components/gallery/GalleryClientWrapper";
import GalleryCTA from "../../components/gallery/Gallerycta";
import GalleryIntro from "../../components/gallery/GalleryIntro";
import GalleryTransition from "../../components/gallery/GalleryTransition";
import HeroGallery from "../../components/gallery/HeroGallery";
import { Suspense } from "react";

export default function MesCreationsPage() {
  return (
    <main className="gallery-page">
      <HeroGallery />
      <GalleryIntro />

      {/* useSearchParams() dans GalleryClientWrapper nécessite Suspense */}
      <Suspense fallback={null}>
        <GalleryClientWrapper />
      </Suspense>

      <GalleryTransition />
      <GalleryCTA />
    </main>
  );
}
