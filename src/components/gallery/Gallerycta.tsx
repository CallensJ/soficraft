"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const buttons = buttonsRef.current;

    if (!section || !content || !buttons) return;

    const ctx = gsap.context(() => {
      // ── 1. Bloc contenu — rise + fade
      gsap.from(content, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      // ── 2. Boutons — stagger avec délai après le contenu
      gsap.from(buttons.children, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="galleryCTA">
      <div className="galleryCTA__inner">
        <div ref={contentRef} className="galleryCTA__content">
          <p className="galleryCTA__text">
            Tu as deux choix. Tu peux commander une création exactement comme
            elle est — déjà née, prête à vibrer autour de toi. Ou tu peux
            collaborer avec moi pour la personnaliser. Changer une teinte.
            Ajouter une rune. La rendre encore plus <em>toi</em>.
          </p>
          <p className="galleryCTA__text galleryCTA__text--closing">
            Ces bijoux ne sont pas des produits. Ce sont des compagnons de
            route. Des talismans. Des promesses que tu te fais à toi-même.
          </p>
        </div>

        <div ref={buttonsRef} className="galleryCTA__buttons">
          <Link
            href="/commande"
            className="galleryCTA__btn galleryCTA__btn--primary"
          >
            Commander ma création sur-mesure →
          </Link>
          <Link
            href="/contact"
            className="galleryCTA__btn galleryCTA__btn--secondary"
          >
            Let&apos;s begin your story →
          </Link>
        </div>
      </div>
    </section>
  );
}
