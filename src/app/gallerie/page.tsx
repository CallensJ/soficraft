import CollectionDivider from "../../components/gallery/CollectionDivider";
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

export default function GalleryPage() {
  return (
    <main className="gallery-page">
      <HeroGallery />
      <GalleryIntro />
      <CollectionSection collection={collectionCeltique} />
      <CollectionDivider />
      <CollectionSection collection={collectionLunaire} layout="reversed" />
      <CollectionDivider variant="lunaire" />
      <CollectionSection
        collection={collectionElementaire}
        layout="fullwidth"
      />
      <GalleryTransition />
      <GalleryCTA />
    </main>
  );
}
