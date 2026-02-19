"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

// ============================================================
// SECTION 4 : MINI GALERIE
// ============================================================

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  size: "compact" | "medium" | "expanded" | "hero" | "statement"; // Tailles d'images
  offset: "up" | "down" | "none";
  image: string; // Nom du fichier webp
}

const galleryItems: GalleryItem[] = [
  {
    id: "creation-01",
    title: "Couronne Sylvestre",
    category: "Bague",
    size: "medium",
    offset: "down",
    image: "bagues.webp",
  },
  {
    id: "creation-02",
    title: "Murmure Celtique",
    category: "Collier",
    size: "compact",
    offset: "up",
    image: "collier.webp",
  },
  {
    id: "creation-03",
    title: "Rosée Lunaire",
    category: "Boucles d'oreille",
    size: "hero",
    offset: "none",
    image: "earrings.webp",
  },
  {
    id: "creation-04",
    title: "Lierre Enchanté",
    category: "Bracelet",
    size: "expanded",
    offset: "up",
    image: "bracelet.png", // À ajouter plus tard
  },
  {
    id: "creation-05",
    title: "Rêve de Fae",
    category: "Bague",
    size: "compact",
    offset: "down",
    image: "bague.webp", // Réutilisation de boucle d'orreile.webp
  },
  {
    id: "creation-06",
    title: "Souffle d'Automne",
    category: "Collier",
    size: "statement",
    offset: "none",
    image: "necklace.webp", // Réutilisation de collier.webp
  },
];

export default function MiniGalerieSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;

    if (!section || !header || !track || !wrapper) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------
      // 1. Animations d'entrée (Header & Photos)
      // -------------------------------------------------------
      const headerElements = header.querySelectorAll(".mini-galerie__animate");
      gsap.from(headerElements, {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
        },
      });

      const photos = track.querySelectorAll(".mini-galerie__item");
      gsap.from(photos, {
        y: 60,
        opacity: 0,
        stagger: 0.06,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 75%",
        },
      });

      // -------------------------------------------------------
      // 2. Boucle infinie continue (Infinite Loop)
      // -------------------------------------------------------
      // Pour une boucle sans couture, on duplique le contenu
      // La largeur d'un set = la moitié du scrollWidth total
      const getLoopWidth = () => track.scrollWidth / 2;

      // Animation infinie qui revient au début de manière transparente
      const infiniteLoop = gsap.to(track, {
        x: () => -getLoopWidth(),
        duration: 40, // Durée pour parcourir un set complet (ajustable)
        ease: "none",
        repeat: -1, // Répétition infinie
        modifiers: {
          x: (x) => {
            // Reset seamless quand on atteint la fin du premier set
            const loopWidth = getLoopWidth();
            const parsedX = parseFloat(x);
            return `${(((parsedX % loopWidth) + loopWidth) % loopWidth) - loopWidth}px`;
          },
        },
      });

      // Pause/resume basé sur la visibilité
      let isPaused = false;
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          if (isPaused) {
            infiniteLoop.play();
            isPaused = false;
          }
        },
        onLeave: () => {
          infiniteLoop.pause();
          isPaused = true;
        },
        onEnterBack: () => {
          if (isPaused) {
            infiniteLoop.play();
            isPaused = false;
          }
        },
        onLeaveBack: () => {
          infiniteLoop.pause();
          isPaused = true;
        },
      });

      // -------------------------------------------------------
      // 3. Interaction : Drag-to-explore (optionnel)
      // -------------------------------------------------------
      let dragTimeout: NodeJS.Timeout;
      const draggable = Draggable.create(track, {
        type: "x",
        inertia: true,
        cursor: "grab",
        activeCursor: "grabbing",
        onPress: () => {
          // Pause temporaire de la boucle pendant le drag
          infiniteLoop.pause();
          clearTimeout(dragTimeout);
        },
        onRelease: () => {
          // Reprend la boucle après 2 secondes d'inactivité
          dragTimeout = setTimeout(() => {
            if (!isPaused) {
              infiniteLoop.play();
            }
          }, 2000);
        },
        onClick: function () {
          // Permet de cliquer sur les liens
        },
      });

      // -------------------------------------------------------
      // 4. Gestion du redimensionnement
      // -------------------------------------------------------
      const handleResize = () => {
        infiniteLoop.invalidate();
        draggable[0]?.update();
      };

      window.addEventListener("resize", handleResize);

      // Nettoyage
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(dragTimeout);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mini-galerie"
      aria-labelledby="mini-galerie-heading"
    >
      <div ref={headerRef} className="mini-galerie__header">
        <span className="mini-galerie__pretitle mini-galerie__animate">
          Galerie
        </span>
        <h2
          id="mini-galerie-heading"
          className="mini-galerie__title mini-galerie__animate"
        >
          Quelques créations qui racontent des histoires
        </h2>
        <p className="mini-galerie__intro mini-galerie__animate">
          Voici un aperçu de mes créations les plus emblématiques. Chacune de
          ces pièces raconte une histoire particulière&nbsp;– celle de
          quelqu&apos;un qui a osé croire à la magie et qui a confié son rêve à
          mes mains.
        </p>
      </div>

      <div ref={wrapperRef} className="mini-galerie__wrapper">
        <div ref={trackRef} className="mini-galerie__track">
          {/* Premier set d'images */}
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`mini-galerie__item mini-galerie__item--${item.size} mini-galerie__item--${item.offset}`}
            >
              <div className="mini-galerie__item-image">
                <Image
                  src={`/images/gallery/${item.image}`}
                  alt={`${item.title} - ${item.category}`}
                  fill
                  className="mini-galerie__item-img"
                  sizes="(max-width: 640px) 27vw, (max-width: 1024px) 40vw, 75vw"
                  priority={item.size === "hero"}
                  quality={75}
                />
              </div>
              <div className="mini-galerie__item-info">
                <span className="mini-galerie__item-category">
                  {item.category}
                </span>
                <span className="mini-galerie__item-title">{item.title}</span>
              </div>
            </div>
          ))}

          <div className="mini-galerie__cta-card">
            <Link href="/galerie" className="mini-galerie__cta">
              <span className="mini-galerie__cta-text">
                Explorer la
                <br />
                galerie complète
              </span>
              <svg
                className="mini-galerie__cta-arrow"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Duplication pour la boucle infinie seamless */}
          {galleryItems.map((item) => (
            <div
              key={`${item.id}-duplicate`}
              className={`mini-galerie__item mini-galerie__item--${item.size} mini-galerie__item--${item.offset}`}
              aria-hidden="true"
            >
              <div className="mini-galerie__item-image">
                <Image
                  src={`/images/gallery/${item.image}`}
                  alt={`${item.title} - ${item.category}`}
                  fill
                  className="mini-galerie__item-img"
                  sizes="(max-width: 640px) 27vw, (max-width: 1024px) 40vw, 75vw"
                  priority={item.size === "hero"}
                  quality={85}
                  aria-hidden="true"
                />
              </div>
              <div className="mini-galerie__item-info">
                <span className="mini-galerie__item-category">
                  {item.category}
                </span>
                <span className="mini-galerie__item-title">{item.title}</span>
              </div>
            </div>
          ))}

          <div className="mini-galerie__cta-card" aria-hidden="true">
            <Link href="/galerie" className="mini-galerie__cta" tabIndex={-1}>
              <span className="mini-galerie__cta-text">
                Explorer la
                <br />
                galerie complète
              </span>
              <svg
                className="mini-galerie__cta-arrow"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
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
      </div>

      <div className="mini-galerie__scroll-hint" aria-hidden="true">
        <span className="mini-galerie__scroll-hint-line" />
        <span className="mini-galerie__scroll-hint-text">
          Glissez pour explorer
        </span>
      </div>
    </section>
  );
}
