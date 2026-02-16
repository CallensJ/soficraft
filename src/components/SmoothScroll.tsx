"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // On s'assure que ScrollTrigger est au courant du scroll de Lenis
    gsap.registerPlugin(ScrollTrigger);

    // Cette fonction permet à GSAP de se synchroniser parfaitement
    // avec le rafraîchissement de Lenis
    function update(time: number) {
      ScrollTrigger.update();
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Intensité du lissage (0.1 = très fluide)
        duration: 1.5, // Durée de la transition
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
