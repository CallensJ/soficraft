"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const socialIconsRef = useRef<HTMLAnchorElement[]>([]);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation d'apparition du footer au scroll
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animation staggered des colonnes
      gsap.from(columnsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animation du copyright
      gsap.from(copyrightRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover animation pour les liens de navigation
      linksRef.current.forEach((link) => {
        if (!link) return;

        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Hover animation pour les icônes sociales
      socialIconsRef.current.forEach((icon) => {
        if (!icon) return;

        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.15,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const addToColumnsRef = (el: HTMLDivElement | null, index: number) => {
    if (el && !columnsRef.current.includes(el)) {
      columnsRef.current[index] = el;
    }
  };

  const addToLinksRef = (el: HTMLAnchorElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  const addToSocialIconsRef = (el: HTMLAnchorElement | null) => {
    if (el && !socialIconsRef.current.includes(el)) {
      socialIconsRef.current.push(el);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="footer"
      role="contentinfo"
      aria-label="Pied de page du site"
    >
      <div className="footer__container">
        {/* Colonne 1 : Navigation */}
        <div
          ref={(el) => addToColumnsRef(el, 0)}
          className="footer__column footer__column--navigation"
        >
          <h3 className="footer__title">Navigation</h3>
          <nav aria-label="Navigation secondaire">
            <ul className="footer__list">
              <li className="footer__item">
                <Link href="/" ref={addToLinksRef} className="footer__link">
                  Accueil
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  href="/galerie"
                  ref={addToLinksRef}
                  className="footer__link"
                >
                  Galerie
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  href="/commande"
                  ref={addToLinksRef}
                  className="footer__link"
                >
                  Commander
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  href="/a-propos"
                  ref={addToLinksRef}
                  className="footer__link"
                >
                  À Propos
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  href="/contact"
                  ref={addToLinksRef}
                  className="footer__link"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Colonne 2 : Réseaux sociaux */}
        <div
          ref={(el) => addToColumnsRef(el, 1)}
          className="footer__column footer__column--social"
        >
          <h3 className="footer__title">Rejoignez-nous</h3>
          <div className="footer__social">
            <a
              href="https://www.instagram.com/soficraft"
              target="_blank"
              rel="noopener noreferrer"
              ref={addToSocialIconsRef}
              className="footer__social-link"
              aria-label="Instagram de SOFICRAFT (ouvre dans un nouvel onglet)"
            >
              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="footer__social-text">Instagram</span>
            </a>
            <a
              href="https://www.pinterest.com/soficraft"
              target="_blank"
              rel="noopener noreferrer"
              ref={addToSocialIconsRef}
              className="footer__social-link"
              aria-label="Pinterest de SOFICRAFT (ouvre dans un nouvel onglet)"
            >
              <svg
                className="footer__social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.438.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
              </svg>
              <span className="footer__social-text">Pinterest</span>
            </a>
          </div>
          <a href="mailto:contact@soficraft.com" className="footer__email">
            contact@soficraft.com
          </a>
        </div>

        {/* Colonne 3 : Légal */}
        <div
          ref={(el) => addToColumnsRef(el, 2)}
          className="footer__column footer__column--legal"
        >
          <h3 className="footer__title">Informations Légales</h3>
          <nav aria-label="Navigation légale">
            <ul className="footer__list">
              <li className="footer__item">
                <Link
                  href="/mentions-legales"
                  ref={addToLinksRef}
                  className="footer__link"
                >
                  Mentions Légales
                </Link>
              </li>
              <li className="footer__item">
                <Link href="/cgv" ref={addToLinksRef} className="footer__link">
                  CGV
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  href="/politique-confidentialite"
                  ref={addToLinksRef}
                  className="footer__link"
                >
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div ref={copyrightRef} className="footer__copyright">
        <p className="footer__copyright-text">
          © 2026 SOFICRAFT - Tous droits réservés
        </p>
        <p className="footer__copyright-subtitle">Bijoux Fantasy Artisanaux</p>
      </div>
    </footer>
  );
};

export default Footer;
