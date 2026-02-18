"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function GalleryTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const phraseRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const phrase = phraseRef.current;

    if (!section || !title || !phrase) return;

    const ctx = gsap.context(() => {
      // ── 1. H2 — SplitText mots
      const splitTitle = new SplitText(title, { type: "words" });
      gsap.from(splitTitle.words, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        },
      });

      // ── 2. Phrase poétique — SplitText mots, rythme plus lent
      const splitPhrase = new SplitText(phrase, { type: "words" });
      gsap.from(splitPhrase.words, {
        opacity: 0,
        y: 15,
        stagger: 0.06,
        duration: 1.4,
        ease: "power1.out",
        scrollTrigger: {
          trigger: phrase,
          start: "top 80%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="galleryTransition">
      <div className="galleryTransition__inner">
        <h2 ref={titleRef} className="galleryTransition__title">
          Tu as reconnu une création ?
        </h2>

        <p ref={phraseRef} className="galleryTransition__phrase">
          Si l&apos;une de ces pièces t&apos;a regardé(e) dans les yeux et
          t&apos;a murmuré quelque chose... Si tu sens une vibration entre toi
          et l&apos;une d&apos;elles... C&apos;est parce qu&apos;elle
          t&apos;appartient. <em>Elle t&apos;attendait.</em>
        </p>
      </div>
    </section>
  );
}
