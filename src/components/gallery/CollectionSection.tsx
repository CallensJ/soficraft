"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import CreationItem from "./CreationItem";
import { Collection } from "../../data/gallery-data";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface CollectionSectionProps {
  collection: Collection;
  layout?: "default" | "reversed" | "fullwidth";
  stackIndex: number;
  totalSections: number;
}

export default function CollectionSection({
  collection,
  layout = "default",
  stackIndex,
  totalSections,
}: CollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;

    if (!section || !overlay || !title || !tagline) return;

    const ctx = gsap.context(() => {
      // ── 1. Titre collection — SplitText char par char
      const splitTitle = new SplitText(title, { type: "chars" });
      gsap.from(splitTitle.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        },
      });

      // ── 2. Tagline fade-in
      gsap.from(tagline, {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        },
      });

      // ── 3. Effet "recouvert" (Stacking) avec Pinning GSAP
      if (stackIndex < totalSections - 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom", // Se déclenche quand le BAS de la section touche le BAS de l'écran
            end: () => `+=${window.innerHeight}`, // Dure le temps que la section suivante scrolle 100vh
            scrub: true,
            pin: true, // Fige la section actuelle
            pinSpacing: false, // Permet à la section suivante de passer par-dessus
          },
        });

        tl.to(
          section,
          {
            scale: 0.94,
            transformOrigin: "center top",
            ease: "none",
          },
          0,
        );

        tl.to(
          overlay,
          {
            opacity: 0.55,
            ease: "none",
          },
          0,
        );
      }
    }, section);

    return () => ctx.revert();
  }, [stackIndex, totalSections]);

  return (
    <section
      ref={sectionRef}
      className={`collectionSection collectionSection--${collection.id} collectionSection--${layout}`}
      style={{ zIndex: stackIndex + 1 }}
    >
      <div ref={overlayRef} className="collectionSection__darkOverlay" />

      <div className="collectionSection__inner">
        <header className="collectionSection__header">
          <h2 ref={titleRef} className="collectionSection__title">
            {collection.name}
          </h2>
          <p ref={taglineRef} className="collectionSection__tagline">
            {collection.tagline}
          </p>
        </header>

        <div className="collectionSection__creations">
          {collection.creations.map((creation, index) => (
            <CreationItem key={creation.id} creation={creation} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
