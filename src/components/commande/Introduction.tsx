"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// INTRODUCTION COMPONENT — Hero + Editorial Luxury
// ============================================================================

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Hero + Editorial reveal sequence
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroLabel = heroRef.current?.querySelector("[data-hero-label]") as HTMLElement;
      const title = heroRef.current?.querySelector("[data-intro-title]") as HTMLElement;
      const heroSub = heroRef.current?.querySelector("[data-hero-sub]") as HTMLElement;
      const heroCta = heroRef.current?.querySelector("[data-hero-cta]") as HTMLElement;
      const heroRule = heroRef.current?.querySelector("[data-hero-rule]") as HTMLElement;
      const rule1 = containerRef.current?.querySelector("[data-intro-rule-1]") as HTMLElement;
      const rule2 = containerRef.current?.querySelector("[data-intro-rule-2]") as HTMLElement;
      const texts = containerRef.current?.querySelectorAll("[data-intro-text]") as NodeListOf<HTMLElement>;
      const cards = timelineRef.current?.querySelectorAll("[data-timeline-card]") as NodeListOf<HTMLElement>;
      const callout = containerRef.current?.querySelector("[data-intro-callout]") as HTMLElement;

      // Hero entrance — staggered from load
      const heroTl = gsap.timeline({ delay: 0.3 });
      if (heroLabel) heroTl.fromTo(heroLabel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0);
      if (heroRule) heroTl.fromTo(heroRule, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.1);
      if (title) heroTl.fromTo(title, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.25);
      if (heroSub) heroTl.fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.65);
      if (heroCta) heroTl.fromTo(heroCta, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.85);

      // Subtle parallax on hero image
      if (heroRef.current) {
        const img = heroRef.current.querySelector(".introduction__hero-image") as HTMLElement;
        if (img) {
          gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      }

      // Scroll-triggered animations for the editorial body
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".introduction__body",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      if (rule1) tl.fromTo(rule1, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      if (rule2) tl.fromTo(rule2, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.3);
      if (texts?.length) tl.fromTo(texts, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.4);
      if (cards?.length) tl.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" }, 0.6);
      if (callout) tl.fromTo(callout, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, 0.9);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <section className="introduction" ref={containerRef}>

      {/* HERO */}
      <div className="introduction__hero" ref={heroRef}>
        {/* Background image */}
        <div className="introduction__hero-image-wrap">
          <Image
            src="/images/collections/commande.webp"
            alt="Bijoux artisanaux Soficraft — commande sur-mesure"
            fill
            priority
            sizes="100vw"
            className="introduction__hero-image"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="introduction__hero-overlay" aria-hidden="true" />

        {/* Hero content */}
        <div className="introduction__hero-content">
          <span className="introduction__hero-label" data-hero-label>
            Commande sur-mesure
          </span>
          <span className="introduction__hero-rule" data-hero-rule />
          <h1 className="introduction__title" data-intro-title>
            Créons ensemble<br />votre bijou unique
          </h1>
          <p className="introduction__hero-sub" data-hero-sub>
            Un dialogue entre ton univers intérieur et mes mains.
          </p>
          <a className="introduction__hero-cta" href="#commande-form" data-hero-cta>
            Commencer ma création
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="introduction__hero-scroll" aria-hidden="true">
          <span className="introduction__hero-scroll-line" />
        </div>
      </div>

      {/* EDITORIAL BODY */}
      <div className="introduction__body">

        {/* SUB-HEADER */}
        <div className="introduction__header">
          <span className="introduction__rule" data-intro-rule-1 />
          <p className="introduction__header-label">Notre processus</p>
          <span className="introduction__rule" data-intro-rule-2 />

          <div className="introduction__subtitle">
            <p data-intro-text>
              Bienvenue sur ma page de commande. Tu es ici parce que quelque chose
              t&apos;a appelé — peut-être une création de la galerie t&apos;a murmuré quelque
              chose, ou peut-être tu portes en toi une vision, un rêve que tu
              aimerais transformer en bijou.
            </p>
            <p data-intro-text>
              Je ne propose pas un catalogue. Je propose une collaboration — un
              dialogue entre ton univers intérieur et mes mains. Tu viens avec tes
              rêves, tes images, tes mots. Moi, je les écoute, je les comprends,
              et je les transforme en quelque chose qui vibrera avec toi, pour toi,
              à jamais. Remplis le formulaire ci-dessous et laisse la magie opérer.
            </p>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="introduction__timeline-section">
          <p className="introduction__timeline-label">Processus de création</p>

          <div className="introduction__timeline" ref={timelineRef}>
            <div className="introduction__timeline-card" data-timeline-card>
              <span className="introduction__timeline-number">01</span>
              <h3 className="introduction__timeline-step-title">Conception</h3>
              <p className="introduction__timeline-step-description">
                Je lis ton formulaire attentivement, je regarde tes inspirations,
                je ressens ton énergie. Puis je sketch et je crée des croquis pour toi.
              </p>
              <span className="introduction__timeline-duration">1–2 jours</span>
            </div>

            <div className="introduction__timeline-card" data-timeline-card>
              <span className="introduction__timeline-number">02</span>
              <h3 className="introduction__timeline-step-title">Création</h3>
              <p className="introduction__timeline-step-description">
                Une fois ta vision validée, je commence la magie. Les mains à l&apos;ouvrage.
                Chaque détail compte, chaque finition reflète mon respect pour ton projet.
              </p>
              <span className="introduction__timeline-duration">7–14 jours</span>
            </div>

            <div className="introduction__timeline-card" data-timeline-card>
              <span className="introduction__timeline-number">03</span>
              <h3 className="introduction__timeline-step-title">Livraison</h3>
              <p className="introduction__timeline-step-description">
                Je te l&apos;envoie avec soin, protégé et emballé comme le trésor qu&apos;il est.
                Tu le reçois, et maintenant il n&apos;y a que toi et lui.
              </p>
              <span className="introduction__timeline-duration">2–5 jours</span>
            </div>
          </div>
        </div>

        {/* CALLOUT */}
        <div className="introduction__callout" data-intro-callout>
          <span className="introduction__callout-ornament">✦</span>
          <p className="introduction__callout-content">
            <strong>Pas de paiement d&apos;avance.</strong> Tu paies seulement quand tu as
            vu le résultat et que tu es heureux·se. Je te contacte par email ou téléphone
            pour valider ta vision avant la création finale.
          </p>
        </div>

      </div>{/* end .introduction__body */}

    </section>
  );
}
