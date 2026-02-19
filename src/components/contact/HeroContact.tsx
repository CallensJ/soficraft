"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PARAGRAPH = `Entre dans mon univers et partageons une conversation.

Que tu cherches une création sur-mesure qui te ressemble, que tu aies des questions sur mes bijoux, ou simplement envie d'en savoir plus sur mon travail entre les deux mondes — celui de soignante et celle de créatrice — je suis là pour t'écouter.`;

export default function HeroContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const thread = threadRef.current;
    const label = labelRef.current;
    const h1 = h1Ref.current;
    const text = textRef.current;

    if (!section || !thread || !label || !h1 || !text) return;

    const ctx = gsap.context(() => {
      // 1. Fil d'or — scale from top
      gsap.from(thread, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1,
      });

      // 2. Label
      gsap.from(label, {
        opacity: 0,
        y: -8,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      });

      // 3. H1 — SplitText chars
      const splitH1 = new SplitText(h1, { type: "words,chars" });
      gsap.from(splitH1.chars, {
        opacity: 0,
        y: 40,
        rotateX: -20,
        stagger: 0.025,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        onComplete: () => splitH1.revert(),
      });

      // 4. Paragraph
      gsap.from(text, {
        opacity: 0,
        y: 24,
        duration: 1.2,
        ease: "power2.out",
        delay: 1.2,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-contact" aria-label="Hero Contact">
      <div className="hero-contact__inner">
        <div ref={threadRef} className="hero-contact__thread" aria-hidden="true" />
        <span ref={labelRef} className="hero-contact__label">
          Contact
        </span>
        <h1 ref={h1Ref} className="hero-contact__title">
          Me Contacter
        </h1>
        <p ref={textRef} className="hero-contact__text">
          {PARAGRAPH}
        </p>
      </div>
    </section>
  );
}
