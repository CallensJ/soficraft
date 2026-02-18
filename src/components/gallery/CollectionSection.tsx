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
}

export default function CollectionSection({
  collection,
  layout = "default",
}: CollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;

    if (!section || !title || !tagline) return;

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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`collectionSection collectionSection--${collection.id} collectionSection--${layout}`}
    >
      <div className="collectionSection__inner">
        {/* ── En-tête collection ── */}
        <header className="collectionSection__header">
          <h2 ref={titleRef} className="collectionSection__title">
            {collection.name}
          </h2>
          <p ref={taglineRef} className="collectionSection__tagline">
            {collection.tagline}
          </p>
        </header>

        {/* ── Liste des créations ── */}
        <div className="collectionSection__creations">
          {collection.creations.map((creation, index) => (
            <CreationItem key={creation.id} creation={creation} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
