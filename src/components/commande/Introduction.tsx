"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// INTRODUCTION COMPONENT
// ============================================================================

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Text reveal + timeline fade in
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const titleElement = containerRef.current?.querySelector(
      "[data-intro-title]",
    ) as HTMLElement;
    const subtitleElement = containerRef.current?.querySelector(
      "[data-intro-subtitle]",
    ) as HTMLElement;
    const calloutElement = containerRef.current?.querySelector(
      "[data-intro-callout]",
    ) as HTMLElement;
    const timelineElement = timelineRef.current;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Title
    if (titleElement) {
      timeline.fromTo(
        titleElement,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      );
    }

    // Subtitle
    if (subtitleElement) {
      timeline.fromTo(
        subtitleElement,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.2,
      );
    }

    // Timeline items
    if (timelineElement) {
      const timelineItems = timelineElement.querySelectorAll(
        "[data-timeline-item]",
      ) as NodeListOf<HTMLElement>;

      timeline.fromTo(
        timelineItems,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.4,
      );
    }

    // Callout
    if (calloutElement) {
      timeline.fromTo(
        calloutElement,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out",
        },
        0.7,
      );
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <section className="introduction" ref={containerRef}>
      {/* HEADER */}
      <div className="introduction__header">
        <h1 className="introduction__title" data-intro-title>
          Créons ensemble votre bijou unique
        </h1>

        <div className="introduction__subtitle" data-intro-subtitle>
          <p>
            Bienvenue sur ma page de commande. Tu es ici parce que quelque chose
            t'a appelé. Peut-être une création de la galerie t'a murmuré quelque
            chose. Ou peut-être que tu portes en toi une vision, une sensation,
            un rêve que tu aimerais transformer en bijou.
          </p>

          <p>C'est exactement pour ça que je suis là.</p>

          <p>
            Je ne propose pas un catalogue où tu cherches la bague parfaite
            parmi mille autres. Je propose une collaboration. Un dialogue entre
            ton univers intérieur et mes mains. Tu viens avec tes rêves, tes
            images, tes mots. Moi, je les écoute. Je les comprends. Et puis je
            les transforme en quelque chose de tangible. Quelque chose qui
            vibrera avec toi, pour toi, à jamais.
          </p>

          <p>Le processus est simple. Transparent. Bienveillant.</p>

          <p>
            Remplis le formulaire ci-dessous. Dis-moi ce que tu cherches.
            Montre-moi tes inspirations. Et laisse la magie opérer.
          </p>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="introduction__timeline-section">
        <h2 className="introduction__timeline-title">Processus de création</h2>

        <div className="introduction__timeline" ref={timelineRef}>
          {/* STEP 1 */}
          <div className="introduction__timeline-item" data-timeline-item>
            <div className="introduction__timeline-marker">
              <span className="introduction__timeline-icon">1️⃣</span>
            </div>
            <div className="introduction__timeline-connector"></div>
            <div className="introduction__timeline-content">
              <h3 className="introduction__timeline-step-title">Conception</h3>
              <p className="introduction__timeline-step-description">
                Je lis ton formulaire attentivement. Je regarde tes images. Je
                ressens ton énergie. Puis je sketch. Je conçois. Je crée des
                croquis pour toi.
              </p>
              <span className="introduction__timeline-duration">
                Délai : 1-2 jours
              </span>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="introduction__timeline-item" data-timeline-item>
            <div className="introduction__timeline-marker">
              <span className="introduction__timeline-icon">2️⃣</span>
            </div>
            <div className="introduction__timeline-connector"></div>
            <div className="introduction__timeline-content">
              <h3 className="introduction__timeline-step-title">Création</h3>
              <p className="introduction__timeline-step-description">
                Une fois ta vision validée, je commence la magie. Les mains à
                l'ouvrage. Chaque détail compte. Chaque finition reflète mon
                respect pour ton projet.
              </p>
              <span className="introduction__timeline-duration">
                Délai : 7-14 jours
              </span>
              <span className="introduction__timeline-note">
                (Variable selon complexité)
              </span>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="introduction__timeline-item" data-timeline-item>
            <div className="introduction__timeline-marker">
              <span className="introduction__timeline-icon">3️⃣</span>
            </div>
            <div className="introduction__timeline-connector"></div>
            <div className="introduction__timeline-content">
              <h3 className="introduction__timeline-step-title">Livraison</h3>
              <p className="introduction__timeline-step-description">
                Je te l'envoie avec soin. Protégé. Emballé comme le trésor qu'il
                est. Tu le reçois entre mes mains et je disparais. Maintenant,
                il n'y a que toi et lui.
              </p>
              <span className="introduction__timeline-duration">
                Délai : 2-5 jours
              </span>
              <span className="introduction__timeline-note">
                (Selon localisation)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CALLOUT BOX */}
      <div className="introduction__callout" data-intro-callout>
        <div className="introduction__callout-icon">💚</div>
        <div className="introduction__callout-content">
          <strong>IMPORTANT :</strong> Pas de paiement d'avance. Tu paies
          seulement quand tu as vu le résultat et que tu es heureux(se). Je te
          contacte par email/téléphone pour valider ta vision avant la création
          finale.
        </div>
      </div>
    </section>
  );
}
