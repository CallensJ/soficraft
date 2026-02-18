"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function GalleryIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const para1 = para1Ref.current;
    const para2 = para2Ref.current;
    const cta = ctaRef.current;

    if (!section || !title || !para1 || !para2 || !cta) return;

    const ctx = gsap.context(() => {
      // ── 1. H2 : SplitText ligne par ligne
      const splitTitle = new SplitText(title, { type: "lines" });
      gsap.from(splitTitle.lines, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        },
      });

      // ── 2. Paragraphes fade-in en stagger
      gsap.from([para1, para2], {
        opacity: 0,
        y: 25,
        stagger: 0.25,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: para1,
          start: "top 80%",
        },
      });

      // ── 3. CTA lien fade-in discret
      gsap.from(cta, {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cta,
          start: "top 85%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="galleryIntro">
      <div className="galleryIntro__inner">
        <h2 ref={titleRef} className="galleryIntro__title">
          Pourquoi ces créations existent
        </h2>

        <p ref={para1Ref} className="galleryIntro__text">
          Chacune de ces pièces appartient à quelqu&apos;un qui a osé croire que
          la magie existe. Qui a pris le temps de collaborer avec moi pour
          donner forme à son univers intérieur. Ces bijoux ne sont pas exposés
          pour te vendre quelque chose. Ils sont là pour te montrer ce qui est
          possible. Pour t&apos;inspirer. Pour te dire&nbsp;: tu n&apos;es pas
          seul(e) à croire que le monde extraordinaire est réel.
        </p>

        <p ref={para2Ref} className="galleryIntro__text">
          Parcours cette galerie. Laisse-toi attirer par les créations qui
          appellent ton âme. Et si l&apos;une d&apos;elles te parle vraiment —
          si tu reconnais un univers qui ressemble au tien — sache que tu peux
          la faire vivre aussi. Tu peux collaborer avec moi. Tu peux transformer
          ton rêve en quelque chose de vivant.
        </p>

        <a ref={ctaRef} href="/commande" className="galleryIntro__cta">
          Lancer mon projet sur-mesure →
        </a>
      </div>
    </section>
  );
}
