"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const paragraph1 = paragraph1Ref.current;
    const paragraph2 = paragraph2Ref.current;
    const ctaContainer = ctaContainerRef.current;

    if (!section || !title || !paragraph1 || !paragraph2 || !ctaContainer)
      return;

    // Animation timeline au scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animation séquentielle
    tl.fromTo(
      title,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    )
      .fromTo(
        paragraph1,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .fromTo(
        paragraph2,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .fromTo(
        ctaContainer.children,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.4",
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="final-cta">
      <div className="final-cta__container">
        <h2 ref={titleRef} className="final-cta__title">
          Votre transformation commence ici
        </h2>

        <div className="final-cta__content">
          <p ref={paragraph1Ref} className="final-cta__paragraph">
            Vous sentez cet appel? Cette petite voix qui vous dit que vous
            méritez plus que les bijoux génériques de masse? Celle qui sait que
            vous avez une histoire unique, une vision du monde différente, une
            âme de créateur, de rêveur, d'aventurier?
          </p>

          <p ref={paragraph2Ref} className="final-cta__paragraph">
            Chez SOFICRAFT, nous créons pour ceux qui refusent le quotidien
            étouffant. Pour ceux qui savent que la beauté existe pour une raison
            plus profonde. Pour vous, qui comprenez que chaque bijou peut être
            un talisman personnel—cette clé invisible qui vous relie à la
            personne que vous aspirez à être.
          </p>
        </div>

        <div ref={ctaContainerRef} className="final-cta__buttons">
          <Link
            href="/commande-sur-mesure"
            className="final-cta__btn final-cta__btn--primary"
          >
            Commander votre création →
          </Link>
          <Link
            href="/galerie"
            className="final-cta__btn final-cta__btn--secondary"
          >
            Parcourir la galerie →
          </Link>
        </div>
      </div>
    </section>
  );
}
