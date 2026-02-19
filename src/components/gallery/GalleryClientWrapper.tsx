"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { BijouxType, collectionCeltique, collectionLunaire, collectionElementaire } from "../../data/gallery-data";
import CollectionSection from "./CollectionSection";

gsap.registerPlugin(ScrollToPlugin);

export default function GalleryClientWrapper() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("collection") as BijouxType | null;

  useEffect(() => {
    if (!activeFilter) return;

    // Petit délai pour laisser le DOM et les animations GSAP initiales se stabiliser
    const timer = setTimeout(() => {
      const target = document.querySelector(`[data-bijou-type="${activeFilter}"]`);
      if (!target) return;

      gsap.to(window, {
        scrollTo: { y: target, offsetY: 100 },
        duration: 1.2,
        ease: "power3.out",
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [activeFilter]);

  return (
    <div className="collectionsStack">
      <CollectionSection
        collection={collectionCeltique}
        stackIndex={0}
        totalSections={3}
        activeFilter={activeFilter}
      />
      <CollectionSection
        collection={collectionLunaire}
        layout="reversed"
        stackIndex={1}
        totalSections={3}
        activeFilter={activeFilter}
      />
      <CollectionSection
        collection={collectionElementaire}
        layout="fullwidth"
        stackIndex={2}
        totalSections={3}
        activeFilter={activeFilter}
      />
    </div>
  );
}
