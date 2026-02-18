"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroGallery() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!hero || !image || !overlay || !title || !subtitle) return;

    const ctx = gsap.context(() => {
      // ── 1. Ken Burns : zoom léger sur l'image au chargement
      gsap.from(image, {
        scale: 1.08,
        duration: 2.5,
        ease: "power1.out",
      });

      // ── 2. H1 : SplitText word by word reveal
      const splitTitle = new SplitText(title, { type: "words" });
      gsap.from(splitTitle.words, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });

      // ── 3. Sous-titre fade-in après le H1
      gsap.from(subtitle, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        delay: 1.4,
      });

      // ── 4. Overlay s'estompe légèrement au scroll
      gsap.to(overlay, {
        opacity: 0.25,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── 5. Parallax léger sur l'image au scroll
      gsap.to(image, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="heroGallery">
      {/* ── Image de fond ── */}
      <div ref={imageRef} className="heroGallery__imageWrapper">
        <Image
          src="/images/gallery/workshop.jpg"
          alt="Univers de créations SOFICRAFT — bijoux artisanaux fantasy"
          fill
          priority
          sizes="100vw"
          className="heroGallery__image"
        />
      </div>

      {/* ── Overlay gradient ── */}
      <div ref={overlayRef} className="heroGallery__overlay" />

      {/* ── Contenu texte ── */}
      <div className="heroGallery__content">
        <h1 ref={titleRef} className="heroGallery__title">
          Plongez dans l&apos;univers de mes créations
        </h1>
        <p ref={subtitleRef} className="heroGallery__subtitle">
          Dix histoires. Dix chemins. Dix univers.{" "}
          <span>
            Chacune de ces créations est une porte vers un monde intérieur. Pas
            pour te montrer ce que tu peux acheter, mais pour t&apos;inspirer et
            te faire rêver.
          </span>
        </p>
      </div>
    </section>
  );
}
