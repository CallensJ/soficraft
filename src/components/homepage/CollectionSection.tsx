"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SECTION 3 : COLLECTIONS DE SOPHIE
// 5 cartes collections : Bagues, Colliers, Bracelets,
// Boucles d'oreille, Créations sur-mesure
// Contenu issu de HOMEPAGE_SOFICRAFT_CONTENU.txt
// Voix narrative : Sophie (JE / MES créations)
// ============================================================

interface Collection {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  ornament: string; // Icône décorative placeholder
}

const collections: Collection[] = [
  {
    id: "bagues",
    title: "Bagues",
    description:
      "Les bagues sont le cœur battant de mes créations. Elles épousent votre peau, se chargent de votre énergie, et deviennent des talismans intimes. De l'anneau minimaliste aux bagues complexes ornées de symboles runiques, chaque pièce vous raconte un secret.",
    cta: "Découvrir les bagues",
    href: "/galerie?collection=bagues",
    ornament: "◇",
  },
  {
    id: "colliers",
    title: "Colliers",
    description:
      "Les colliers suspendent la magie près de votre cœur. Qu'il s'agisse de pendentifs en forme de créatures ailées ou de chaînes gravées de symboles celtiques, chaque collier est un pont entre votre âme et le mystère de l'univers.",
    cta: "Découvrir les colliers",
    href: "/galerie?collection=colliers",
    ornament: "❋",
  },
  {
    id: "bracelets",
    title: "Bracelets",
    description:
      "Les bracelets enroulent votre poignet de sagesse. Avec leurs feuilles entrelacées, leurs textures gravées et leurs pierres suspendues, ils racontent l'histoire des forêts anciennes et des mondes oubliés.",
    cta: "Découvrir les bracelets",
    href: "/galerie?collection=bracelets",
    ornament: "✧",
  },
  {
    id: "boucles",
    title: "Boucles d'oreille",
    description:
      "Les boucles d'oreille encadrent votre rêve. Qu'elles soient délicates comme des gouttes de rosée gelée ou audacieuses comme des créatures mythiques, elles ajoutent une touche de magie à chaque geste que vous faites.",
    cta: "Découvrir les boucles d'oreille",
    href: "/galerie?collection=boucles",
    ornament: "✦",
  },
  {
    id: "sur-mesure",
    title: "Créations sur-mesure",
    description:
      "Votre vision mérite de devenir réalité. Si aucune de mes créations existantes ne vous appelle, venez collaborer avec moi. Ensemble, nous transformerons votre rêve en un bijou qui n'existera que pour vous, uniquement.",
    cta: "Commencer votre création",
    href: "/commande",
    ornament: "✺",
  },
];

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsRef.current;

    if (!section || !header || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------
      // Header — Fade in + slide up
      // -------------------------------------------------------
      const headerElements = header.querySelectorAll(".collections__animate");

      gsap.from(headerElements, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // -------------------------------------------------------
      // Cards — Stagger fade-in (effet Nida Tabba)
      // -------------------------------------------------------
      const cards = cardsContainer.querySelectorAll(".collections__card");

      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainer,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // -------------------------------------------------------
      // Hover scale — géré en CSS mais GSAP pour le smooth
      // -------------------------------------------------------
      cards.forEach((card) => {
        const image = card.querySelector(".collections__card-image-inner");
        if (!image) return;

        card.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.08, duration: 0.6, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  return (
    <section
      ref={sectionRef}
      className="collections"
      aria-labelledby="collections-heading"
    >
      {/* ============================================= */}
      {/* HEADER — Titre + intro                        */}
      {/* ============================================= */}
      <div ref={headerRef} className="collections__header">
        <span className="collections__pretitle collections__animate">
          Les collections
        </span>

        <h2
          id="collections-heading"
          className="collections__title collections__animate"
        >
          Explorez les univers de mes créations
        </h2>

        <p className="collections__intro collections__animate">
          Chaque collection raconte une histoire. Du murmure des feuilles
          celtiques aux reflets lunaires sur les pierres oubliées, mes créations
          habitent des univers distincts mais harmonieux. Découvrez les thèmes
          qui parlent à votre âme.
        </p>
      </div>

      {/* ============================================= */}
      {/* GRILLE DE CARTES — 5 collections              */}
      {/* ============================================= */}
      <div ref={cardsRef} className="collections__grid">
        {collections.map((collection) => (
          <article
            key={collection.id}
            className={`collections__card collections__card--${collection.id}`}
          >
            {/* Image placeholder */}
            <div className="collections__card-image">
              <div className="collections__card-image-inner">
                {/*
                  IMAGE PLACEHOLDER :
                  Remplacer par <Image> Next.js quand disponible.

                  <Image
                    src={`/images/collections/${collection.id}.jpg`}
                    alt={`Collection ${collection.title} SOFICRAFT`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    style={{ objectFit: 'cover' }}
                  />
                */}
                <div className="collections__card-placeholder">
                  <span className="collections__card-ornament">
                    {collection.ornament}
                  </span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="collections__card-overlay">
                <span className="collections__card-overlay-text">
                  {collection.cta}
                </span>
              </div>
            </div>

            {/* Contenu texte */}
            <div className="collections__card-content">
              <h3 className="collections__card-title">{collection.title}</h3>
              <p className="collections__card-description">
                {collection.description}
              </p>
              <Link href={collection.href} className="collections__card-cta">
                <span>{collection.cta}</span>
                <svg
                  width="16"
                  height="16"
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
          </article>
        ))}
      </div>
    </section>
  );
}
