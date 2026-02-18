"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CollectionDividerProps {
  variant?: "celtique" | "lunaire";
}

export default function CollectionDivider({
  variant = "celtique",
}: CollectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const divider = dividerRef.current;
    const path = pathRef.current;

    if (!divider || !path) return;

    const ctx = gsap.context(() => {
      // ── Calcul de la longueur totale du path SVG
      const length = path.getTotalLength();

      // ── État initial : path invisible (dashoffset = longueur totale)
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // ── Animation : dessin progressif au scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: divider,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, divider);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`collectionDivider collectionDivider--${variant}`}
    >
      {variant === "celtique" ? (
        // ── SVG entrelacs celtique simplifié
        <svg
          className="collectionDivider__svg"
          viewBox="0 0 400 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M20 40 C60 10, 80 70, 120 40 C160 10, 180 70, 220 40 C260 10, 280 70, 320 40 C360 10, 380 70, 380 40"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ) : (
        // ── SVG croissant de lune + étoiles
        <svg
          className="collectionDivider__svg"
          viewBox="0 0 400 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M20 40 L80 40 M100 25 C95 35, 95 45, 100 55 C110 50, 115 30, 100 25 Z M120 40 L170 40 M185 32 L188 38 L194 39 L189 44 L191 50 L185 47 L179 50 L181 44 L176 39 L182 38 Z M210 40 L270 40 M285 30 L288 38 L296 39 L290 45 L292 53 L285 49 L278 53 L280 45 L274 39 L282 38 Z M310 40 L380 40"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
}
