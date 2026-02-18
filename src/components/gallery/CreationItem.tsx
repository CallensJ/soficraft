"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Creation } from "../../data/gallery-data";

gsap.registerPlugin(ScrollTrigger);

interface CreationItemProps {
  creation: Creation;
  index: number;
}

export default function CreationItem({ creation, index }: CreationItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!item || !image || !text) return;

    const ctx = gsap.context(() => {
      // ── 1. Image slide depuis le côté (direction selon `side`)
      gsap.from(image, {
        x: creation.side === "left" ? -80 : 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
      });

      // ── 2. Texte fade-in avec léger délai
      gsap.from(text, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
      });

      // ── 3. Parallax subtil sur l'image au scroll
      gsap.fromTo(
        image,
        { scale: 1 },
        {
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, item);

    return () => ctx.revert();
  }, [creation.side]);

  // Paragraphes : le \n\n dans les descriptions sépare les blocs
  const paragraphs = creation.description.split("\n\n");

  return (
    <div
      ref={itemRef}
      className={`creationItem creationItem--${creation.side} creationItem--index-${index}`}
    >
      {/* ── Colonne image ── */}
      <div ref={imageRef} className="creationItem__imageWrapper">
        <Image
          src={creation.image}
          alt={creation.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="creationItem__image"
        />
      </div>

      {/* ── Colonne texte ── */}
      <div ref={textRef} className="creationItem__text">
        <h3 className="creationItem__title">{creation.title}</h3>

        <div className="creationItem__description">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <hr className="creationItem__divider" />

        <dl className="creationItem__meta">
          <div className="creationItem__metaRow">
            <dt>Matériaux</dt>
            <dd>{creation.materials}</dd>
          </div>
          <div className="creationItem__metaRow">
            <dt>Univers</dt>
            <dd>{creation.univers}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
