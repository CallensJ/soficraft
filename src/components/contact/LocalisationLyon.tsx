"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Lyon,France";

export default function LocalisationLyon() {
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const visual = visualRef.current;
    if (!content || !visual) return;

    const ctx = gsap.context(() => {
      gsap.from(content, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: content,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(visual, {
        opacity: 0,
        x: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: visual,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="localisation" aria-labelledby="localisation-title">
      <div className="localisation__inner">
        {/* Text side */}
        <div ref={contentRef} className="localisation__content">
          <h2 id="localisation-title" className="localisation__title">
            Une Créatrice de Lyon
          </h2>
          <p className="localisation__text">
            Mon atelier est basé à Lyon, une ville riche d&rsquo;histoire et de magie où
            l&rsquo;inspiration ne manque jamais. C&rsquo;est entre les traboules de la
            Presqu&rsquo;île et les rues de Fourvière que je crée mes bijoux, en hommage à
            ma région natale.
            <br /><br />
            Si tu es dans la région, tu peux aussi passer me rencontrer directement pour
            discuter de ton projet en personne. N&rsquo;oublie pas de me prévenir à l&rsquo;avance
            via le formulaire ou un message.
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary localisation__cta"
            aria-label="Voir Lyon sur Google Maps (nouvel onglet)"
          >
            Voir sur la carte
          </a>
        </div>

        {/* Visual side — typographic map */}
        <div ref={visualRef} className="localisation__visual" aria-hidden="true">
          <span className="localisation__watermark">Lyon</span>
          <div className="localisation__coords">
            <span className="localisation__coords-city">Lyon</span>
            <div className="localisation__coords-sep" />
            <span className="localisation__coords-gps">45°46&rsquo; N / 4°50&rsquo; E</span>
            <span className="localisation__coords-zone">Europe / Paris</span>
          </div>
        </div>
      </div>
    </section>
  );
}
