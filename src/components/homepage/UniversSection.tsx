"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SECTION 2 : UNIVERS SOFICRAFT — Mini À Propos (Teaser)
// Enhanced with cinematic GSAP animations
// Inspired by luxury hotel sites with smooth, magical reveals
// ============================================================

export default function UniversSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const imageColumnRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Floating ornaments refs
  const ornamentsRef = useRef<HTMLDivElement>(null);

  // Magnetic CTA state
  const [ctaPosition, setCtaPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const textCol = textColumnRef.current;
    const imageCol = imageColumnRef.current;
    const imageInner = imageInnerRef.current;
    const decor = decorRef.current;
    const cta = ctaRef.current;
    const title = titleRef.current;
    const ornaments = ornamentsRef.current;

    if (
      !section ||
      !container ||
      !textCol ||
      !imageCol ||
      !imageInner ||
      !decor ||
      !cta ||
      !title ||
      !ornaments
    )
      return;

    const ctx = gsap.context(() => {
      // ═══════════════════════════════════════════════════════════
      // 1. SECTION PIN — Cinematic scroll experience
      // Pin the section briefly for dramatic effect
      // ═══════════════════════════════════════════════════════════
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=40%",
        pin: false, // Set to true for more dramatic pin effect
        scrub: 1,
      });

      // ═══════════════════════════════════════════════════════════
      // 2. TITLE — Character-by-character reveal with stagger
      // Magical text reveal inspired by luxury sites
      // ═══════════════════════════════════════════════════════════
      const titleWords = title.querySelectorAll(".univers__title-word");

      gsap.from(titleWords, {
        y: 120,
        rotationX: -60,
        opacity: 0,
        stagger: {
          each: 0.08,
          ease: "power2.out",
        },
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // ═══════════════════════════════════════════════════════════
      // 3. PRETITLE — Fade in with letter spacing animation
      // ═══════════════════════════════════════════════════════════
      const pretitle = textCol.querySelector(".univers__pretitle");

      gsap.from(pretitle, {
        opacity: 0,
        letterSpacing: "0.6em",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pretitle,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // ═══════════════════════════════════════════════════════════
      // 4. DECORATIVE LINE — Organic growth animation
      // ═══════════════════════════════════════════════════════════
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: decor,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.from(decor, {
        scaleX: 0,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
        transformOrigin: "left center",
      }).to(
        decor,
        {
          opacity: 1,
          duration: 0.4,
        },
        "-=1.2"
      );

      // ═══════════════════════════════════════════════════════════
      // 5. PARAGRAPHS — Line-by-line reveal with clip-path mask
      // Smooth, organic reveals for storytelling flow
      // ═══════════════════════════════════════════════════════════
      const paragraphs = textCol.querySelectorAll(".univers__paragraph");

      paragraphs.forEach((p, index) => {
        gsap.from(p, {
          clipPath: "inset(0 0 100% 0)",
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: p,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: index * 0.1,
        });
      });

      // ═══════════════════════════════════════════════════════════
      // 6. QUOTE — Special reveal with emphasis
      // ═══════════════════════════════════════════════════════════
      const quote = textCol.querySelector(".univers__quote");

      if (quote) {
        gsap.from(quote, {
          clipPath: "inset(0 100% 0 0)",
          x: -30,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: quote,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Animate the quote bar separately
        const quoteBefore = gsap.timeline({
          scrollTrigger: {
            trigger: quote,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        quoteBefore.from(quote, {
          "--quote-bar-height": "0%",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // ═══════════════════════════════════════════════════════════
      // 7. CTA BUTTON — Reveal with scale + rotation
      // ═══════════════════════════════════════════════════════════
      gsap.from(cta, {
        scale: 0.8,
        opacity: 0,
        rotationX: 45,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: cta,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // ═══════════════════════════════════════════════════════════
      // 8. IMAGE — Sophisticated multi-layer reveal
      // Gradient mask reveal + scale + rotation for luxury feel
      // ═══════════════════════════════════════════════════════════
      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: imageCol,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none none",
        },
      });

      // Image reveal with clip-path mask
      imageTimeline
        .from(imageInner, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          duration: 1.4,
          ease: "expo.inOut",
        })
        .from(
          imageInner.querySelector(".univers__image-placeholder") ||
            imageInner,
          {
            scale: 1.3,
            rotation: 3,
            duration: 1.6,
            ease: "expo.out",
          },
          "-=1.2"
        );

      // Image caption fade in
      const caption = imageCol.querySelector(".univers__image-caption");
      if (caption) {
        gsap.from(caption, {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: caption,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // ═══════════════════════════════════════════════════════════
      // 9. PARALLAX — Multi-layer depth
      // Different scroll speeds for container elements
      // ═══════════════════════════════════════════════════════════

      // Text column — subtle upward movement
      gsap.to(textCol, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Image — opposite direction for parallax depth
      gsap.to(imageInner, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Decorative line — subtle rotation on scroll
      gsap.to(decor, {
        scaleX: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom top",
          scrub: 2,
        },
      });

      // ═══════════════════════════════════════════════════════════
      // 10. FLOATING ORNAMENTS — Magical atmosphere
      // Parallax floating elements for depth
      // ═══════════════════════════════════════════════════════════
      const ornamentElements =
        ornaments.querySelectorAll(".univers__ornament");

      ornamentElements.forEach((ornament, index) => {
        // Continuous float animation
        gsap.to(ornament, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(4, 7)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });

        // Scroll-based parallax
        gsap.to(ornament, {
          y: `random(-80, -120)`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1 + index * 0.5,
          },
        });
      });

      // Reveal ornaments on section enter
      gsap.from(ornamentElements, {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ═══════════════════════════════════════════════════════════
      // 11. CONTAINER FADE — Subtle opacity change on scroll
      // ═══════════════════════════════════════════════════════════
      gsap.to(container, {
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom 30%",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // MAGNETIC CTA — Mouse tracking effect
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cta.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.25;
      const deltaY = (e.clientY - centerY) * 0.25;

      setCtaPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setCtaPosition({ x: 0, y: 0 });
    };

    cta.addEventListener("mousemove", handleMouseMove);
    cta.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cta.removeEventListener("mousemove", handleMouseMove);
      cta.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Apply magnetic transform
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    gsap.to(cta, {
      x: ctaPosition.x,
      y: ctaPosition.y,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [ctaPosition]);

  // ═══════════════════════════════════════════════════════════════
  // HELPER: Split title into words for animation
  // ═══════════════════════════════════════════════════════════════
  const titleText = "Plongez dans un univers où la magie rencontre l'artisanat";
  const titleWords = titleText.split(" ");

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  return (
    <section
      ref={sectionRef}
      className="univers"
      aria-labelledby="univers-heading"
    >
      {/* Floating decorative ornaments */}
      <div ref={ornamentsRef} className="univers__ornaments" aria-hidden="true">
        <span className="univers__ornament univers__ornament--1">✦</span>
        <span className="univers__ornament univers__ornament--2">✧</span>
        <span className="univers__ornament univers__ornament--3">❋</span>
        <span className="univers__ornament univers__ornament--4">✦</span>
      </div>

      <div ref={containerRef} className="univers__container">
        {/* ============================================= */}
        {/* COLONNE GAUCHE — Texte storytelling           */}
        {/* ============================================= */}
        <div ref={textColumnRef} className="univers__text">
          {/* Pré-titre */}
          <span className="univers__pretitle">L&apos;histoire</span>

          {/* H2 — Titre de section avec mots séparés */}
          <h2 ref={titleRef} id="univers-heading" className="univers__title">
            {titleWords.map((word, index) => (
              <span
                key={index}
                className="univers__title-word"
                style={{
                  display: "inline-block",
                  perspective: "1000px",
                }}
              >
                {word}
                {index < titleWords.length - 1 && "\u00A0"}
              </span>
            ))}
          </h2>

          {/* Ligne décorative */}
          <span
            ref={decorRef}
            className="univers__decor-line"
            aria-hidden="true"
          />

          {/* Paragraphe 1 — Accroche émotionnelle */}
          <p className="univers__paragraph">
            Avant tout, il y a une main. Une main qui connaît le langage des
            métaux précieux parce qu&apos;elle a grandi en l&apos;écoutant.
          </p>

          {/* Paragraphe 2 — Citation mise en avant */}
          <blockquote className="univers__quote">
            Sophie n&apos;a pas choisi le bijou. Le bijou a choisi Sophie.
          </blockquote>

          {/* Paragraphe 3 — L'héritage et la passion */}
          <p className="univers__paragraph">
            Son père joaillier lui a transmis bien plus qu&apos;un
            savoir-faire&nbsp;— il lui a donné le pouvoir de transformer des
            matières brutes en histoires portables. Dans le chaos de sa vie
            d&apos;infirmière au rythme effréné, Sophie s&apos;échappe en créant
            des mondes miniatures où la magie existe vraiment.
          </p>

          {/* Paragraphe 4 — L'unicité */}
          <p className="univers__paragraph">
            Contrairement aux bijoux traditionnels qui célèbrent la richesse,
            les créations SOFICRAFT racontent autre chose. Elles racontent
            <em> ton </em> histoire. Chaque pièce porte une intention, une
            énergie particulière. Sophie ne produit jamais en masse. Elle crée
            <em> pour toi</em>. Rien de plus, rien de moins.
          </p>

          {/* CTA vers page À Propos avec effet magnétique */}
          <Link
            ref={ctaRef}
            href="/a-propos"
            className="univers__cta"
            style={{ willChange: "transform" }}
          >
            <span className="univers__cta-text">
              Découvrir l&apos;histoire complète
            </span>
            <svg
              className="univers__cta-arrow"
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

        {/* ============================================= */}
        {/* COLONNE DROITE — Image                        */}
        {/* ============================================= */}
        <div ref={imageColumnRef} className="univers__image">
          <div ref={imageInnerRef} className="univers__image-inner">
            {/*
              IMAGE PLACEHOLDER :
              Remplacer par <Image> Next.js quand disponible.
              Option 1 : Photo de Sophie au travail dans son atelier
              Option 2 : Création phare en gros plan (bijou féerique)

              <Image
                src="/images/sophie-atelier.jpg"
                alt="Sophie dans son atelier, façonnant un bijou féerique"
                width={600}
                height={750}
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            */}
            <div className="univers__image-placeholder" aria-hidden="true">
              {/* Ornement décoratif dans le placeholder */}
              <span className="univers__image-ornament">✦</span>
            </div>
          </div>

          {/* Légende sous l'image */}
          <span className="univers__image-caption">
            Sophie dans son atelier — où la magie prend forme
          </span>
        </div>
      </div>
    </section>
  );
}
