"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// HERO SECTION — SOFICRAFT
// Fullscreen 100vh, parallax background, GSAP split text reveal
// Contenu issu de Contenu_Soficraft + Sitemap v1.1
// ============================================================

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const decorLineRef = useRef<HTMLSpanElement>(null);

  const setSlideRef = (el: HTMLDivElement | null, index: number) => {
    if (el) slidesRef.current[index] = el;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const bg = backgroundRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const ctaContainer = ctaContainerRef.current;
    const decorLine = decorLineRef.current;

    if (!section || !bg || !title || !subtitle || !ctaContainer || !decorLine)
      return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------
      // GSAP Timeline : Entrée initiale (page load)
      // -------------------------------------------------------
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // 1. Background fade in
      tl.from(bg, {
        scale: 1.15,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
      });

      // 2. Split Text Reveal — mot par mot sur le H1
      const words = title.querySelectorAll(".hero__title-word");
      tl.from(
        words,
        {
          y: 80,
          opacity: 0,
          rotateX: 40,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
        },
        "-=1.2",
      );

      // 3. Ligne décorative
      tl.from(
        decorLine,
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.4",
      );

      // 4. Sous-titre fade in
      tl.from(
        subtitle,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.3",
      );

      // 5. CTA buttons stagger
      tl.from(
        ctaContainer.querySelectorAll(".hero__cta"),
        {
          y: 25,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
        },
        "-=0.3",
      );

      // -------------------------------------------------------
      // GSAP : Parallax background au scroll
      // -------------------------------------------------------
      gsap.to(bg, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // -------------------------------------------------------
      // GSAP : Fade out content on scroll (effet immersif)
      // -------------------------------------------------------
      gsap.to(".hero__content", {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // ----------------------------------------------------------
  // Helper : Wrap chaque mot du titre dans un <span>
  // pour le Split Text Reveal GSAP
  // ----------------------------------------------------------
  const heroTitle = "Bijoux féeriques tissés de magie et de savoir-faire";
  const titleWords = heroTitle.split(" ");

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  return (
    <section ref={sectionRef} className="hero" aria-label="Accueil SOFICRAFT">
      {/* ---- Background image + overlay ---- */}
      <div ref={backgroundRef} className="hero__background">
        {[
          { src: "/images/Hero-background/hero-forest.jpg",   alt: "Forêt enchantée baignée de lumière dorée" },
          { src: "/images/Hero-background/Bracelet-hand.webp", alt: "Bracelet artisanal en main" },
          { src: "/images/Hero-background/workshop.webp",      alt: "Atelier de création de bijoux" },
        ].map((slide, i) => (
          <div
            key={slide.src}
            ref={(el) => setSlideRef(el, i)}
            className="hero__background-slide"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              quality={75}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
        <div className="hero__background-overlay" />
      </div>

      {/* ---- Contenu principal ---- */}
      <div className="hero__content">
        {/* Accroche pré-titre */}
        <span className="hero__pretitle">~ Bijoux artisanaux fantasy ~</span>

        {/* H1 — Split Text (chaque mot wrappé individuellement) */}
        <h1 ref={titleRef} className="hero__title">
          {titleWords.map((word, index) => (
            <span key={index} className="hero__title-word">
              {word}
              {index < titleWords.length - 1 && "\u00A0"}
            </span>
          ))}
        </h1>

        {/* Ligne décorative */}
        <span
          ref={decorLineRef}
          className="hero__decor-line"
          aria-hidden="true"
        />

        {/* Sous-titre émotionnel — issu de Contenu_Soficraft */}
        <p ref={subtitleRef} className="hero__subtitle">
          Un pont suspendu entre réalité et imaginaire, où chaque pièce devient
          un talisman personnel qui te relie à la personne que tu aspires à
          être.
        </p>

        {/* CTAs */}
        <div ref={ctaContainerRef} className="hero__cta-container">
          <Link href="/galerie" className="hero__cta btn btn-primary btn-lg">
            Découvrir la Galerie
          </Link>
          <Link href="/commande" className="hero__cta hero__cta--secondary">
            Commander sur-mesure
            <svg
              className="hero__cta-arrow"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-text">Défiler</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
