"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────────────────────────────────────
export default function CTAAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const blocRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bloc = blocRef.current;
    const btn = btnRef.current;
    if (!section || !bloc || !btn) return;

    const ctx = gsap.context(() => {
      // ── 1. Fade-in + scale du bloc entier au scroll ──────────────────────
      gsap.from(bloc, {
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bloc,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ── 2. Hover bouton — élévation + bg GSAP ────────────────────────────
      const enterHandler = () => {
        gsap.to(btn, {
          y: -3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const leaveHandler = () => {
        gsap.to(btn, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      btn.addEventListener("mouseenter", enterHandler);
      btn.addEventListener("mouseleave", leaveHandler);

      return () => {
        btn.removeEventListener("mouseenter", enterHandler);
        btn.removeEventListener("mouseleave", leaveHandler);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cta-about"
      aria-label="Appel à l'action final"
    >
      <div ref={blocRef} className="cta-about__bloc">
        <p className="cta-about__texte">
          Ces valeurs ne sont pas des slogans marketing. Ce sont des promesses
          que je tiens chaque jour. Quand vous choisissez une création
          SOFICRAFT, vous choisissez de soutenir cet univers.
        </p>

        <Link ref={btnRef} href="/gallerie" className="cta-about__btn">
          Explorer mes créations →
        </Link>

        <Link href="/" className="cta-about__lien">
          Retourner à l&rsquo;accueil
        </Link>
      </div>
    </section>
  );
}
