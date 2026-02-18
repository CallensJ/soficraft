"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// SVG Icônes inline — style line art
// ─────────────────────────────────────────────────────────────────────────────
const IconArtisanat = () => (
  <svg
    className="valeurs__icon"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 42 C20 42 14 38 14 30 C14 26 17 24 20 26 L20 18 C20 15 23 14 24 17 L24 14 C24 11 27 10 28 13 L28 12 C28 9 32 9 32 12 L32 18 C34 16 37 17 37 20 L37 32 C37 38 32 44 26 44 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 22 L24 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M28 21 L28 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M32 21 L32 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M40 14 L50 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="38" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M34 20 L30 36"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 2"
      opacity="0.5"
    />
  </svg>
);

const IconDurabilite = () => (
  <svg
    className="valeurs__icon"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M32 52 C32 52 12 40 12 24 C12 16 20 10 32 10 C44 10 52 16 52 24 C52 40 32 52 32 52 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 52 L32 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M32 28 C28 26 22 26 18 28"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M32 36 C27 33 21 33 17 35"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M32 28 C36 26 42 26 46 28"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M32 36 C37 33 43 33 47 35"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M26 14 C26 14 20 12 18 16 C22 18 26 14 26 14 Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

const IconMagie = () => (
  <svg
    className="valeurs__icon"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M32 8 L35 26 L52 26 L38 36 L43 54 L32 43 L21 54 L26 36 L12 26 L29 26 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M52 10 L53 14 L57 14 L54 17 L55 21 L52 18 L49 21 L50 17 L47 14 L51 14 Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
    <path
      d="M10 44 L11 47 L14 47 L12 49 L13 52 L10 50 L7 52 L8 49 L6 47 L9 47 Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
    <path
      d="M48 36 L50 38"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M54 32 L56 32"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M14 20 L12 18"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Data valeurs
// ─────────────────────────────────────────────────────────────────────────────
const VALEURS = [
  {
    id: "artisanat",
    numero: "01",
    Icon: IconArtisanat,
    titre: "Artisanat authentique",
    paragraphe:
      "Chaque pièce SOFICRAFT est faite main. Il n'y a pas de production de masse, pas de moules en série, pas de raccourcis. Je crée quelques commandes par mois seulement — parce que chacune mérite mon attention totale, mon intention complète. Vous ne serez jamais « comme les autres ».",
    sousTitre: "La qualité prime sur la quantité. Toujours.",
    bgClass: "valeurs__panneau--sable",
  },
  {
    id: "durabilite",
    numero: "02",
    Icon: IconDurabilite,
    titre: "Durabilité & responsabilité",
    paragraphe:
      "Je crois que la beauté ne doit pas venir au prix de la planète. J'utilise exclusivement des matériaux durables : argent massif, or recyclé, pierres naturelles sourcées éthiquement. Mes bijoux sont créés pour durer — pas pour être jetés. Ils vieilliront avec vous, s'enrichiront de votre histoire.",
    sousTitre: "Un bijou éthique est un bijou qui dure pour toujours.",
    bgClass: "valeurs__panneau--taupe",
  },
  {
    id: "magie",
    numero: "03",
    Icon: IconMagie,
    titre: "Chaque bijou raconte une histoire",
    paragraphe:
      "Au-delà du métal et des pierres, je crois que les objets portent une intention. Quand je crée votre bijou, je pense à vous. À qui vous êtes. À ce que vous aspirez à devenir. C'est cette intention qui transforme un simple objet en talisman — en clé invisible qui vous relie à votre propre magie.",
    sousTitre: "L'intention transforme le métal en magie.",
    bgClass: "valeurs__panneau--foret",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────────────────────────────────────
export default function ValeursSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      // ── 1. Header fade-in ────────────────────────────────────────────────
      const header = section.querySelector(".valeurs__header");
      if (header) {
        gsap.from(Array.from(header.children), {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (isMobile) {
        // ── Mobile : scroll vertical classique, fade-in des panneaux ──────
        const panneaux =
          track.querySelectorAll<HTMLDivElement>(".valeurs__panneau");
        panneaux.forEach((panneau) => {
          gsap.from(panneau, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panneau,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
        return;
      }

      // ── 2. Scroll horizontal pinné (desktop) ─────────────────────────────
      const panneaux =
        track.querySelectorAll<HTMLDivElement>(".valeurs__panneau");
      const totalPanneaux = panneaux.length;
      const scrollDistance = (totalPanneaux - 1) * 100;

      gsap.to(track, {
        xPercent: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${window.innerWidth * (totalPanneaux - 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Mise à jour des dots
            const activeIndex = Math.round(self.progress * (totalPanneaux - 1));
            dotsRef.current.forEach((dot, i) => {
              if (!dot) return;
              gsap.to(dot, {
                scale: i === activeIndex ? 1.6 : 1,
                opacity: i === activeIndex ? 1 : 0.35,
                duration: 0.3,
                ease: "power2.out",
              });
            });

            // Scale du panneau actif vs les autres
            panneaux.forEach((panneau, i) => {
              const distFromActive = Math.abs(
                i - self.progress * (totalPanneaux - 1),
              );
              gsap.to(panneau, {
                scale: distFromActive < 0.5 ? 1 : 0.96,
                duration: 0.4,
                ease: "power2.out",
              });
            });
          },
        },
      });

      // ── 3. Draw effect icônes + fade-in contenu ──────────────────────────
      panneaux.forEach((panneau, i) => {
        const paths = panneau.querySelectorAll<
          SVGPathElement | SVGCircleElement
        >(".valeurs__icon path, .valeurs__icon circle");

        // Init strokeDashoffset
        paths.forEach((path) => {
          const length = (path as SVGGeometryElement).getTotalLength?.() ?? 100;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });

        // Trigger décalé selon la position du panneau dans le scroll horizontal
        ScrollTrigger.create({
          trigger: section,
          start: `top+=${i * window.innerWidth * 0.9} top`,
          onEnter: () => {
            // Draw
            paths.forEach((path) => {
              const length =
                (path as SVGGeometryElement).getTotalLength?.() ?? 100;
              gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.3,
              });
            });

            // Fade-in contenu textuel
            const textEls = panneau.querySelectorAll(
              ".valeurs__numero, .valeurs__panneau-titre, .valeurs__panneau-texte, .valeurs__panneau-sous-titre",
            );
            gsap.from(textEls, {
              opacity: 0,
              y: 25,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.12,
              delay: 0.1,
            });
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="valeurs"
      aria-labelledby="valeurs-title"
    >
      {/* ── Header au dessus du scroll horizontal ───────────────────── */}
      <div className="valeurs__header">
        <h2 id="valeurs-title" className="valeurs__title">
          Ce en quoi je crois profondément
        </h2>
        <p className="valeurs__intro">
          Trois piliers. Trois promesses. Un univers.
        </p>
      </div>

      {/* ── Viewport + Track horizontal ───────────────────────────── */}
      <div className="valeurs__viewport">
        <div ref={trackRef} className="valeurs__track">
          {VALEURS.map(
            ({ id, numero, Icon, titre, paragraphe, sousTitre, bgClass }) => (
              <div key={id} className={`valeurs__panneau ${bgClass}`}>
                <div className="valeurs__panneau-inner">
                  <span className="valeurs__numero" aria-hidden="true">
                    {numero}
                  </span>

                  <div className="valeurs__icon-wrapper" aria-hidden="true">
                    <Icon />
                  </div>

                  <h3 className="valeurs__panneau-titre">{titre}</h3>
                  <p className="valeurs__panneau-texte">{paragraphe}</p>
                  <p className="valeurs__panneau-sous-titre">{sousTitre}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* ── Dots de progression ───────────────────────────────────── */}
      <div className="valeurs__dots" aria-hidden="true">
        {VALEURS.map((v, i) => (
          <span
            key={v.id}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="valeurs__dot"
          />
        ))}
      </div>

      {/* ── Hint scroll ───────────────────────────────────────────── */}
      <p className="valeurs__hint" aria-hidden="true">
        Faites défiler pour découvrir ↓
      </p>
    </section>
  );
}
