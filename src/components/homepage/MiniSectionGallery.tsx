"use client";

import { useEffect, useRef } from "react";
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
  size: "tall" | "wide" | "square" | "large" | "xlarge"; // Ajout de xlarge
  offset: "up" | "down" | "none";
}

const galleryItems: GalleryItem[] = [
  {
    id: "creation-01",
    title: "Couronne Sylvestre",
    category: "Bague",
    size: "tall",
    offset: "down",
  },
  {
    id: "creation-02",
    title: "Murmure Celtique",
    category: "Collier",
    size: "wide",
    offset: "up",
  },
  {
    id: "creation-03",
    title: "Rosée Lunaire",
    category: "Boucles d'oreille",
    size: "xlarge", // Utilisation de la nouvelle taille
    offset: "none",
  },
  {
    id: "creation-04",
    title: "Lierre Enchanté",
    category: "Bracelet",
    size: "large",
    offset: "up",
  },
  {
    id: "creation-05",
    title: "Rêve de Fae",
    category: "Bague",
    size: "tall",
    offset: "down",
  },
  {
    id: "creation-06",
    title: "Souffle d'Automne",
    category: "Collier",
    size: "wide",
    offset: "none",
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
        x: 80,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 75%",
        },
      });

      // -------------------------------------------------------
      // 2. Calcul des limites de défilement
      // -------------------------------------------------------
      const getBounds = () => track.scrollWidth - wrapper.offsetWidth;
      let maxScroll = getBounds();

      // -------------------------------------------------------
      // 3. Défilement automatique (Auto-scroll)
      // -------------------------------------------------------
      const autoScrollTween = gsap.to(track, {
        x: () => -getBounds(), // Valeur dynamique recalculée au besoin
        ease: "none",
        duration: 25, // Ajuste cette durée pour modifier la vitesse
        paused: true,
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 60%", // Démarre quand la galerie est bien visible
        onEnter: () => autoScrollTween.play(),
        onLeave: () => autoScrollTween.pause(),
        onEnterBack: () => autoScrollTween.play(),
        onLeaveBack: () => autoScrollTween.pause(),
      });

      // -------------------------------------------------------
      // 4. Drag-to-scroll via GSAP Draggable
      // -------------------------------------------------------
      Draggable.create(track, {
        type: "x",
        bounds: { minX: -maxScroll, maxX: 0 },
        edgeResistance: 0.65,
        inertia: true,
        cursor: "grab",
        activeCursor: "grabbing",
        onPress: () => {
          // L'utilisateur interagit : on arrête le défilement auto
          autoScrollTween.kill();
        },
        onClick: function () {
          // Permet de cliquer sur les liens à l'intérieur
        },
      });

      // -------------------------------------------------------
      // 5. Scroll horizontal à la molette (Wheel event)
      // -------------------------------------------------------
      const handleWheel = (e: WheelEvent) => {
        const currentX = gsap.getProperty(track, "x") as number;
        const currentMax = getBounds();

        if (
          (e.deltaY > 0 && currentX > -currentMax) ||
          (e.deltaY < 0 && currentX < 0)
        ) {
          e.preventDefault();

          // L'utilisateur utilise la molette : on arrête le défilement auto
          autoScrollTween.kill();

          const newX = Math.max(
            -currentMax,
            Math.min(0, currentX - e.deltaY * 1.5),
          );

          gsap.to(track, {
            x: newX,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto", // Évite les conflits de tweens
          });
        }
      };

      wrapper.addEventListener("wheel", handleWheel, { passive: false });

      // -------------------------------------------------------
      // 6. Gestion du redimensionnement (Resize)
      // -------------------------------------------------------
      const handleResize = () => {
        maxScroll = getBounds();
        Draggable.get(track)?.applyBounds({ minX: -maxScroll, maxX: 0 });

        // Si l'animation automatique tourne encore, on force le recalcul de sa destination
        if (autoScrollTween.isActive()) {
          autoScrollTween.invalidate();
        }
      };

      window.addEventListener("resize", handleResize);

      // Nettoyage des événements
      return () => {
        window.removeEventListener("resize", handleResize);
        wrapper.removeEventListener("wheel", handleWheel);
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
          ces pièces raconte une histoire particulière&nbsp;— celle de
          quelqu&apos;un qui a osé croire à la magie et qui a confié son rêve à
          mes mains.
        </p>
      </div>

      <div ref={wrapperRef} className="mini-galerie__wrapper">
        <div ref={trackRef} className="mini-galerie__track">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`mini-galerie__item mini-galerie__item--${item.size} mini-galerie__item--${item.offset}`}
            >
              <div className="mini-galerie__item-image">
                <div className="mini-galerie__item-placeholder" />
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
