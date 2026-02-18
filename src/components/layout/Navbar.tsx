"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// NAVBAR — SOFICRAFT
// Mobile-first, sticky au scroll, hamburger menu GSAP
// ============================================================

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Qui suis-je", href: "/a-propos" },
  { label: "Mes créations", href: "/gallerie" },
  { label: "Commande", href: "/commande" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  // Pages where the initial hero background is light (cream) — links need dark color
  const hasLightHero = ["/a-propos"].includes(pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // ----------------------------------------------------------
  // GSAP : Sticky header — shrink + background au scroll
  // ----------------------------------------------------------
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const st = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (self.direction === 1) {
          header.classList.add("header--scrolled");
        }
        if (self.scroll() < 80) {
          header.classList.remove("header--scrolled");
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // ----------------------------------------------------------
  // GSAP : Menu overlay fullscreen — timeline
  // ----------------------------------------------------------
  useEffect(() => {
    const overlay = menuOverlayRef.current;
    const links = menuLinksRef.current;
    if (!overlay || !links) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(overlay, {
      clipPath: "circle(150% at top right)",
      duration: 0.8,
      ease: "power4.inOut",
    })
      .from(
        links.querySelectorAll("li"),
        {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        overlay.querySelector(".nav__overlay-cta"),
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3",
      );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  // ----------------------------------------------------------
  // Toggle menu open/close
  // ----------------------------------------------------------
  const toggleMenu = () => {
    if (!timelineRef.current) return;

    if (isMenuOpen) {
      timelineRef.current.reverse();
      document.body.style.overflow = "";
    } else {
      timelineRef.current.play();
      document.body.style.overflow = "hidden";
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen && timelineRef.current) {
      timelineRef.current.reverse();
      document.body.style.overflow = "";
      setIsMenuOpen(false);
    }
  };

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  return (
    <header
      ref={headerRef}
      className={`header${hasLightHero ? " header--light-hero" : ""}`}
    >
      <nav className="nav" aria-label="Navigation principale">
        <div className="nav__container">
          {/* ---- Logo ---- */}
          <Link href="/" className="nav__logo" onClick={closeMenu}>
            Soficraft
          </Link>

          {/* ---- Desktop links ---- */}
          <ul className="nav__links" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link href={link.href} className="nav__link" role="menuitem">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ---- Desktop CTA ---- */}
          <Link href="/commande" className="nav__cta btn btn-primary">
            Commander
          </Link>

          {/* ---- Hamburger (mobile) ---- */}
          <button
            ref={hamburgerRef}
            className={`nav__hamburger ${isMenuOpen ? "nav__hamburger--active" : ""}`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="nav__hamburger-line" />
            <span className="nav__hamburger-line" />
            <span className="nav__hamburger-line" />
          </button>
        </div>
      </nav>

      {/* ---- Mobile overlay fullscreen ---- */}
      <div
        ref={menuOverlayRef}
        id="mobile-menu"
        className="nav__overlay"
        aria-hidden={!isMenuOpen}
      >
        <ul ref={menuLinksRef} className="nav__overlay-links" role="menu">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className="nav__overlay-link"
                role="menuitem"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/commande"
          className="nav__overlay-cta btn btn-primary btn-lg"
          onClick={closeMenu}
        >
          Commander sur-mesure
        </Link>
      </div>
    </header>
  );
}
