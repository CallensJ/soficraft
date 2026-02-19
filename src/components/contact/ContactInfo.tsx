"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IconForm = () => (
  <svg className="contact-info__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>
);

const IconMail = () => (
  <svg className="contact-info__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const IconInstagram = () => (
  <svg className="contact-info__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CARDS = [
  {
    id: "form",
    modifier: "",
    Icon: IconForm,
    title: "Par Formulaire",
    badge: "Recommandé",
    desc: "Complète le formulaire ci-dessous avec ta demande. Tu auras une réponse dans les 2-3 jours ouvrables. C'est la meilleure façon pour me laisser tous les détails de ton projet.",
    link: null,
  },
  {
    id: "email",
    modifier: "contact-info__card--middle",
    Icon: IconMail,
    title: "Email Direct",
    badge: null,
    desc: "Si tu préfères écrire directement un email, je suis à ton écoute. Décris-moi ton idée, tes inspirations, tes rêves.",
    link: { href: "mailto:contact@soficraft.com", label: "contact@soficraft.com" },
  },
  {
    id: "instagram",
    modifier: "",
    Icon: IconInstagram,
    title: "Instagram",
    badge: null,
    desc: "Tu peux aussi m'envoyer un message privé sur Instagram. J'y suis régulièrement, c'est plus personnel et direct.",
    link: { href: "https://instagram.com/soficraft.jewelry", label: "@soficraft.jewelry" },
  },
] as const;

export default function ContactInfo() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".contact-info__card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-info" aria-labelledby="contact-info-title">
      <div className="contact-info__inner">
        <div className="contact-info__header">
          <h2 id="contact-info-title" className="contact-info__title">
            Comment me Joindre ?
          </h2>
          <p className="contact-info__subtitle">
            Voici les différentes façons de me contacter selon ce qui te convient le mieux :
          </p>
        </div>

        <div ref={gridRef} className="contact-info__grid">
          {CARDS.map(({ id, modifier, Icon, title, badge, desc, link }) => (
            <div
              key={id}
              className={`contact-info__card ${modifier}`}
              aria-label={`Contact via ${title}`}
            >
              <Icon />
              <div>
                <p className="contact-info__card-title">
                  {title}
                  {badge && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", fontStyle: "italic", color: "#4d6b3d" }}>
                      — {badge}
                    </span>
                  )}
                </p>
              </div>
              <p className="contact-info__card-desc">{desc}</p>
              {link && (
                <a
                  href={link.href}
                  className="contact-info__card-link"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
