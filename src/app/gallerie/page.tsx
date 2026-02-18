import CollectionSection from "../../components/gallery/CollectionSection";
import GalleryCTA from "../../components/gallery/Gallerycta";
import GalleryIntro from "../../components/gallery/GalleryIntro";
import GalleryTransition from "../../components/gallery/GalleryTransition";
import HeroGallery from "../../components/gallery/HeroGallery";
import {
  collectionCeltique,
  collectionElementaire,
  collectionLunaire,
} from "../../data/gallery-data";

export default function MesCreationsPage() {
  return (
    <main className="gallery-page">
      <HeroGallery />
      <GalleryIntro />

      {/* ── Stack des 3 collections ── */}
      {/* Le wrapper collectionsStack est requis pour que le sticky fonctionne */}
      <div className="collectionsStack">
        <CollectionSection
          collection={collectionCeltique}
          stackIndex={0}
          totalSections={3}
        />
        <CollectionSection
          collection={collectionLunaire}
          layout="reversed"
          stackIndex={1}
          totalSections={3}
        />
        <CollectionSection
          collection={collectionElementaire}
          layout="fullwidth"
          stackIndex={2}
          totalSections={3}
        />
      </div>

      <GalleryTransition />
      <GalleryCTA />
    </main>
  );
}
