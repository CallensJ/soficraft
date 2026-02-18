"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface HeroAboutProps {
  /** URL de l'image portrait. Par défaut : image Unsplash temporaire */
  imageSrc?: string;
  /** Alt text de l'image portrait */
  imageAlt?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80";

const DEFAULT_ALT = "Sophie, créatrice SOFICRAFT — portrait";

const CITATION =
  "« Ma vie oscille entre deux mondes. Mais c'est dans cet entre-deux que je suis vraiment moi. »";

// ─────────────────────────────────────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroAbout({
  imageSrc = DEFAULT_IMAGE,
  imageAlt = DEFAULT_ALT,
}: HeroAboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const citationRef = useRef<HTMLQuoteElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const h1 = h1Ref.current;
    const citation = citationRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!section || !h1 || !citation || !imageWrapper) return;

    const ctx = gsap.context(() => {
      // ── 1. SplitText sur H1 — animation au chargement ──────────────────────
      const splitH1 = new SplitText(h1, { type: "words,chars" });
      const chars = splitH1.chars;

      gsap.from(chars, {
        opacity: 0,
        y: 40,
        rotateX: -20,
        stagger: 0.025,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        onComplete: () => splitH1.revert(),
      });

      // ── 2. Fade-in citation au scroll ──────────────────────────────────────
      gsap.from(citation, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: citation,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ── 3. Parallax subtil sur l'image au scroll ───────────────────────────
      gsap.to(imageWrapper, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-about"
      aria-label="Hero — À propos de Sophie"
    >
      {/* ── Image portrait ───────────────────────────────────────────────── */}
      <div ref={imageWrapperRef} className="hero-about__image-wrapper">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-about__image"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        {/* Overlay gradient */}
        <div className="hero-about__overlay" aria-hidden="true" />
      </div>

      {/* ── Contenu ─────────────────────────────────────────────────────── */}
      <div className="hero-about__content">
        <h1 ref={h1Ref} className="hero-about__title">
          L&rsquo;histoire derrière chaque création
        </h1>

        <blockquote ref={citationRef} className="hero-about__citation">
          <p>{CITATION}</p>
        </blockquote>
      </div>
    </section>
  );
}
