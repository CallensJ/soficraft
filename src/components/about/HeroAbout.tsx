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
  /** URL de l'image portrait. Par défaut : image locale */
  imageSrc?: string;
  /** Alt text de l'image portrait */
  imageAlt?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_IMAGE = "/images/about/about-portrait.png";

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
  const labelRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const citationRef = useRef<HTMLQuoteElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const h1 = h1Ref.current;
    const citation = citationRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!section || !label || !h1 || !citation || !imageWrapper) return;

    const ctx = gsap.context(() => {
      // ── 1. Label — glissement vers le haut ─────────────────────────────────
      gsap.from(label, {
        opacity: 0,
        y: 12,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
      });

      // ── 2. SplitText sur H1 — animation au chargement ──────────────────────
      // Note : pas d'opacity:0 en CSS sur h1 — GSAP gère l'état initial
      // des chars via gsap.from(), ce qui évite le bug d'invisibilité
      // après splitH1.revert().
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

      // ── 3. Citation — délai simple (toujours dans le viewport initial) ──────
      gsap.from(citation, {
        opacity: 0,
        y: 24,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.9,
      });

      // ── 4. Révélation de l'image — rideau clip-path gauche → droite ─────────
      gsap.fromTo(
        imageWrapper,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
          delay: 0.1,
          onComplete: () => {
            // Nettoyer clip-path après l'animation pour ne pas bloquer le parallax
            gsap.set(imageWrapper, { clipPath: "none" });
          },
        },
      );

      // Scale subtil de l'image pendant la révélation
      const img = section.querySelector<HTMLImageElement>(".hero-about__image");
      if (img) {
        gsap.from(img, {
          scale: 1.12,
          duration: 2,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // ── 5. Parallax subtil sur l'image au scroll ───────────────────────────
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
      {/* ── Panneau texte (gauche sur desktop) ──────────────────────────────── */}
      <div className="hero-about__panel">
        <span ref={labelRef} className="hero-about__label">
          À propos
        </span>

        <h1 ref={h1Ref} className="hero-about__title">
          L&rsquo;histoire derrière chaque création
        </h1>

        <blockquote ref={citationRef} className="hero-about__citation">
          <p>{CITATION}</p>
        </blockquote>
      </div>

      {/* ── Image portrait (droite sur desktop) ─────────────────────────────── */}
      <div ref={imageWrapperRef} className="hero-about__image-wrapper">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="hero-about__image"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
    </section>
  );
}
