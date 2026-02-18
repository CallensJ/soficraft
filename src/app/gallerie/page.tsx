import GalleryIntro from "../../components/gallery/GalleryIntro";
import HeroGallery from "../../components/gallery/HeroGallery";
import CollectionSection from "../../components/gallery/CollectionSection";

export default function GalleryPage() {
  return (
    <div>
      <HeroGallery />
      <GalleryIntro />
      <CollectionSection />
    </div>
  );
}
