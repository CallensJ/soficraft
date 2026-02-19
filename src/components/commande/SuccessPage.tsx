"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

// ============================================================================
// SUCCESS PAGE COMPONENT
// ============================================================================

export default function SuccessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLDivElement>(null);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Checkmark reveal + content fade in
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const timeline = gsap.timeline();

    // Checkmark animation
    if (checkmarkRef.current) {
      timeline.fromTo(
        checkmarkRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out",
        },
        0,
      );
    }

    // Content animations
    const contentElements = containerRef.current?.querySelectorAll(
      "[data-success-content]",
    ) as NodeListOf<HTMLElement>;

    if (contentElements.length > 0) {
      timeline.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.3,
      );
    }

    // Confetti-like particle effect (optional)
    createConfetti();
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // CONFETTI EFFECT
  // ──────────────────────────────────────────────────────────────────────

  const createConfetti = () => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 30;
    const particles: HTMLElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "success-page__confetti";
      particle.textContent = ["✨", "💚", "🌿", "✨"][i % 4];
      container.appendChild(particle);
      particles.push(particle);

      const xStart = Math.random() * 100 - 50;
      const duration = 2 + Math.random() * 1;
      const delay = Math.random() * 0.3;

      gsap.to(particle, {
        x: xStart * 2,
        y: window.innerHeight + 100,
        opacity: 0,
        duration: duration,
        delay: delay,
        ease: "power1.in",
      });
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="success-page" ref={containerRef}>
      {/* CHECKMARK ICON */}
      <div className="success-page__checkmark" ref={checkmarkRef}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="success-page__checkmark-svg"
        >
          <circle
            cx="40"
            cy="40"
            r="38"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M32 42L36 46L48 34"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* MAIN MESSAGE */}
      <h1 className="success-page__title" data-success-content>
        Merci ! Ta demande est reçue. ✨
      </h1>

      <p className="success-page__subtitle" data-success-content>
        Prépare-toi. Quelque chose de magique arrive.
      </p>

      {/* NEXT STEPS BOX */}
      <div className="success-page__box" data-success-content>
        <h2 className="success-page__box-title">
          Voici ce qui se passe maintenant :
        </h2>

        <div className="success-page__timeline">
          {/* STEP 1 */}
          <div className="success-page__timeline-item">
            <div className="success-page__timeline-marker">
              <span className="success-page__timeline-icon">✓</span>
            </div>
            <div className="success-page__timeline-content">
              <h3 className="success-page__timeline-title">
                J'ai reçu ta demande
              </h3>
              <p className="success-page__timeline-description">
                Tu devrais avoir un email de confirmation dans quelques minutes.
                Vérifie tes spams si tu ne le vois pas !
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="success-page__timeline-item">
            <div className="success-page__timeline-marker">
              <span className="success-page__timeline-icon">⏳</span>
            </div>
            <div className="success-page__timeline-content">
              <h3 className="success-page__timeline-title">
                Je conçois ton bijou
              </h3>
              <p className="success-page__timeline-description">
                Je vais lire tes inspirations, tes idées, tes rêves. Puis je
                fais un sketch juste pour toi. Délai : 1-2 jours (tu reçois un
                email quand c'est prêt)
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="success-page__timeline-item">
            <div className="success-page__timeline-marker">
              <span className="success-page__timeline-icon">🎨</span>
            </div>
            <div className="success-page__timeline-content">
              <h3 className="success-page__timeline-title">
                On affine ensemble
              </h3>
              <p className="success-page__timeline-description">
                Tu valides le sketch, ou tu me dis ce que tu veux changer. On
                itère jusqu'à ce que ce soit parfait. Délai : 24-48h par cycle
                de feedback
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="success-page__timeline-item">
            <div className="success-page__timeline-marker">
              <span className="success-page__timeline-icon">🛠️</span>
            </div>
            <div className="success-page__timeline-content">
              <h3 className="success-page__timeline-title">Je crée la magie</h3>
              <p className="success-page__timeline-description">
                Mains à l'ouvrage. Je fabrique ton bijou avec soin et attention.
                Délai : 7-14 jours selon complexité
              </p>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="success-page__timeline-item">
            <div className="success-page__timeline-marker">
              <span className="success-page__timeline-icon">📦</span>
            </div>
            <div className="success-page__timeline-content">
              <h3 className="success-page__timeline-title">Tu le reçois</h3>
              <p className="success-page__timeline-description">
                Je te l'envoie sécurisé, assuré, avec suivi. Tu découvres enfin
                ta création. 💚 Délai : 2-5 jours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EMAIL INFO BOX */}
      <div className="success-page__info-box" data-success-content>
        <h3 className="success-page__info-title">📧 Regarde bien tes emails</h3>
        <p className="success-page__info-text">Tu vas recevoir :</p>
        <ul className="success-page__info-list">
          <li>
            Un email de confirmation immédiate (avec un résumé de ta commande)
          </li>
          <li>Un email avec le sketch de ta création (dans 1-2 jours)</li>
          <li>Des updates tout au long du processus</li>
        </ul>
        <p className="success-page__info-contact">
          Si tu ne reçois rien dans les 2h, vérifie tes spams ou contacte-moi :
          <br />
          <a
            href="mailto:contact@soficraft.com"
            className="success-page__contact-link"
          >
            contact@soficraft.com
          </a>
        </p>
      </div>

      {/* ACTIONS */}
      <div className="success-page__actions" data-success-content>
        <Link
          href="/"
          className="success-page__button success-page__button--primary"
        >
          ← Revenir à l'accueil
        </Link>
        <Link
          href="/galerie"
          className="success-page__button success-page__button--secondary"
        >
          Découvrir la galerie →
        </Link>
      </div>

      {/* CLOSING MESSAGE */}
      <div className="success-page__closing" data-success-content>
        <p className="success-page__closing-text">
          Merci de m'avoir choisi pour créer quelque chose de beau pour toi.
          <br />
          Merci de croire à la magie.
          <br />
          Je suis impatiente de te créer quelque chose d'extraordinaire.
        </p>
        <p className="success-page__closing-signature">
          À bientôt 💚
          <br />
          <span className="success-page__closing-author">— Sophie</span>
        </p>
      </div>
    </div>
  );
}
