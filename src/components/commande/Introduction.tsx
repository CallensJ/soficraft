"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// INTRODUCTION COMPONENT — Option B: Quiet Editorial Luxury
// ============================================================================

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Editorial reveal sequence
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector("[data-intro-title]") as HTMLElement;
      const rule1 = containerRef.current?.querySelector("[data-intro-rule-1]") as HTMLElement;
      const rule2 = containerRef.current?.querySelector("[data-intro-rule-2]") as HTMLElement;
      const texts = containerRef.current?.querySelectorAll("[data-intro-text]") as NodeListOf<HTMLElement>;
      const cards = timelineRef.current?.querySelectorAll("[data-timeline-card]") as NodeListOf<HTMLElement>;
      const callout = containerRef.current?.querySelector("[data-intro-callout]") as HTMLElement;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      if (rule1) tl.fromTo(rule1, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      if (title) tl.fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.2);
      if (rule2) tl.fromTo(rule2, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5);
      if (texts?.length) tl.fromTo(texts, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.6);
      if (cards?.length) tl.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" }, 0.8);
      if (callout) tl.fromTo(callout, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, 1.1);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <section className="introduction" ref={containerRef}>

      {/* HEADER */}
      <div className="introduction__header">
        <span className="introduction__rule" data-intro-rule-1 />
        <h1 className="introduction__title" data-intro-title>
          Créons ensemble votre bijou unique
        </h1>
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

    </section>
  );
}
