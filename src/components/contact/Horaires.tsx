"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IconClock = () => (
  <svg className="horaires__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ITEMS = [
  { text: "Lundi – Dimanche : Flexible selon planning" },
  { text: "Réponse garantie dans les 2-3 jours ouvrables" },
  { text: "Pour une question rapide : message Instagram" },
];

export default function Horaires() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="horaires" aria-labelledby="horaires-title">
      <div className="horaires__inner">
        <h2 id="horaires-title" className="horaires__title">
          Mes Horaires (Flexibles)
        </h2>
        <p className="horaires__text">
          Travaillant à la fois comme soignante et créatrice, mes horaires ne suivent pas une
          routine classique. Certaines semaines, je suis davantage disponible en fin d&rsquo;après-midi
          et soirée. D&rsquo;autres, mes gardes me prennent la journée.
          <br /><br />
          Ce qui est constant, c&rsquo;est mon engagement : tu auras toujours une réponse à ta demande.
        </p>
        <div className="horaires__block">
          {ITEMS.map(({ text }, i) => (
            <div key={i} className="horaires__item">
              <IconClock />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
