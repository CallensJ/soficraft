"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Images temporaires Unsplash (À remplacer par tes visuels finaux)
// ─────────────────────────────────────────────────────────────────────────────
const IMAGES = {
  enfance: "/images/about/me-child.png",
  infirmiere: "/images/about/me-nurse.png",
  creation: "/images/about/me-working.png",
};

// ─────────────────────────────────────────────────────────────────────────────
// Composant corrigé avec le contenu v2.0
// ─────────────────────────────────────────────────────────────────────────────
export default function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const part3Ref = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLParagraphElement>(null);
  const conclusionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── 1. Ligne verticale narrative ──────────────
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }

      // ── 2. H2 principal ──────────────
      const h2 = section.querySelector(".storytelling__title");
      if (h2) {
        gsap.from(h2, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: h2,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      // ── 3. Animations par partie ──────────────
      const parts = [part1Ref, part2Ref, part3Ref];

      parts.forEach((partRef) => {
        const part = partRef.current;
        if (!part) return;

        const h3 = part.querySelector("h3");
        if (h3) {
          gsap.from(h3, {
            opacity: 0,
            x: -40,
            duration: 1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: h3,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        const paragraphs = part.querySelectorAll("p");
        if (paragraphs.length) {
          gsap.from(paragraphs, {
            opacity: 0,
            y: 35,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: paragraphs[0],
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        const imageWrapper = part.querySelector(".storytelling__image-wrapper");
        if (imageWrapper) {
          gsap.from(imageWrapper, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imageWrapper,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          });

          const img = imageWrapper.querySelector("img");
          if (img) {
            gsap.to(img, {
              yPercent: -12,
              ease: "none",
              scrollTrigger: {
                trigger: imageWrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          }
        }
      });

      // ── 4. Texte de transition ────────────
      if (transitionRef.current) {
        gsap.from(transitionRef.current, {
          opacity: 0,
          scale: 0.94,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: transitionRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      // ── 5. Conclusion finale ─────────────
      if (conclusionRef.current) {
        gsap.from(conclusionRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: conclusionRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      // ── 6. Changement de background ─────────────────
      if (part2Ref.current) {
        ScrollTrigger.create({
          trigger: part2Ref.current,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(section, {
              backgroundColor: "rgba(212, 184, 150, 0.06)",
              duration: 1.2,
            }),
          onLeave: () =>
            gsap.to(section, { backgroundColor: "transparent", duration: 1.2 }),
          onEnterBack: () =>
            gsap.to(section, {
              backgroundColor: "rgba(212, 184, 150, 0.06)",
              duration: 1.2,
            }),
          onLeaveBack: () =>
            gsap.to(section, { backgroundColor: "transparent", duration: 1.2 }),
        });
      }

      if (part3Ref.current) {
        ScrollTrigger.create({
          trigger: part3Ref.current,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(section, {
              backgroundColor: "rgba(77, 107, 61, 0.05)",
              duration: 1.2,
            }),
          onLeave: () =>
            gsap.to(section, { backgroundColor: "transparent", duration: 1.2 }),
          onEnterBack: () =>
            gsap.to(section, {
              backgroundColor: "rgba(77, 107, 61, 0.05)",
              duration: 1.2,
            }),
          onLeaveBack: () =>
            gsap.to(section, { backgroundColor: "transparent", duration: 1.2 }),
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="storytelling">
      <div ref={lineRef} className="storytelling__line" aria-hidden="true" />

      <div className="storytelling__container">
        {/* H2 Principal [cite: 2] */}
        <h2 className="storytelling__title">
          Mon chemin, de l&rsquo;établi de mon père à SOFICRAFT
        </h2>
        {/* PARTIE 1 — Enfance & Héritage [cite: 7, 57] */}
        <div
          ref={part1Ref}
          className="storytelling__part storytelling__part--right"
        >
          <div className="storytelling__text">
            <h3>Une enfance suspendue entre réalité et magie</h3>
            <p>
              Je suis née dans l&rsquo;atelier de mon père.Pas littéralement,
              bien sûr, mais c&rsquo;est là que j&rsquo;ai grandi — assise sur
              un tabouret en bois, les yeux fixes sur ses mains qui
              transformaient du métal brut en créatures gracieuses. Il était
              joaillier, mais pas dans le sens traditionnel. Mon père ne créait
              pas pour les riches Il créait pour ceux qui comprenaient que la
              beauté était une nécessité, pas un luxe.
            </p>
            <p>
              Pendant qu&rsquo;il travaillait, je dessinais. Je remplissais des
              carnets entiers de créatures que personne d&rsquo;autre ne voyait
              — des elfes aux ailes délicates, des dragons nichés dans des
              forêts de pierres précieuses, des runes celtiques qui chuchotaient
              des secrets oubliés. Mon père me regardait avec ce sourire
              bienveillant et me disait : &laquo; Sophie, tu vois les mondes que
              les autres ne peuvent pas voir. C&rsquo;est un don.&raquo;
            </p>
            <p>
              Il m&rsquo;a enseigné bien plus qu&rsquo;un savoir-faire. Il
              m&rsquo;a transmis le langage des métaux précieux, la patience
              nécessaire pour transformer une vision en réalité tangible, et
              surtout — cette conviction profonde que chaque création porte une
              intention.Que chaque bijou peut être un pont entre le monde réel
              et l&rsquo;univers imaginaire de celui qui le porte. Avant tout,
              il y avait une main.Une main qui connaît le langage des métaux
              précieux parce qu&rsquo;elle a grandi en l&rsquo;écoutant.
            </p>
          </div>
          <div className="storytelling__image-wrapper">
            <Image
              src={IMAGES.enfance}
              alt="Atelier de joaillerie familial"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <p ref={transitionRef} className="storytelling__transition">
          Mais il y avait un secret dans ma vie&hellip;
        </p>
        {/* PARTIE 2 — Double vie [cite: 16] */}
        <div
          ref={part2Ref}
          className="storytelling__part storytelling__part--left"
        >
          <div className="storytelling__image-wrapper">
            <Image
              src={IMAGES.infirmiere}
              alt="Dualité entre soin et création"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="storytelling__text">
            <h3>
              Entre l&rsquo;hôpital et l&rsquo;atelier : trouver son équilibre
            </h3>
            <p>
              Je vis sur une frontière. Depuis l&rsquo;enfance, j&rsquo;ai
              toujours eu un pied dans la réalité quotidienne et l&rsquo;autre
              dans des mondes que personne d&rsquo;autre ne semble voir.Mon père
              m&rsquo;a transmis bien plus qu&rsquo;un métier d&rsquo;artisan —
              il m&rsquo;a donné le pouvoir de transformer le métal en
              histoires, de faire parler les matières, de créer de la magie avec
              mes mains.
            </p>
            <p>
              Aujourd&rsquo;hui, je suis infirmière.Je travaille dans la réalité
              très concrète des hôpitaux — urgent, criant, douloureux[cite: 16].
              Le chaos de cette vie au rythme effréné. [cite_start]Et puis,
              pendant mes heures libres, chez SOFICRAFT, je retourne à
              l&rsquo;établi de mon père. Je crée. Et c&rsquo;est peut-être là
              que je suis vraiment moi-même — dans cet entre-deux où la fantasy
              rencontre l&rsquo;artisanat[cite: 18]. C&rsquo;est mon
              échappatoire. [cite_start]Un endroit où je crée des mondes
              miniatures où la magie existe vraiment.
            </p>
            <p>
              Chaque pièce née de ces mains porte une intention. Elle vibre
              d&rsquo;une énergie particulière — celle d&rsquo;une artisane qui
              refuse la production de masse. Contrairement aux bijoux
              traditionnels qui célèbrent la richesse, les créations de
              SOFICRAFT racontent ton histoire. Tu remarqueras une chose étrange
              : je ne produis jamais en masse. Je crée pour toi.Rien de plus,
              rien de moins.
            </p>
            <p>
              Cet équilibre n&rsquo;est pas facile.Mais c&rsquo;est ce qui me
              rend authentique. Quand tu portes une création SOFICRAFT, tu
              portes les mains d&rsquo;une personne qui comprend vraiment ce que
              c&rsquo;est que de chercher la magie dans le quotidien. De refuser
              l&rsquo;étouffant. De croire qu&rsquo;il existe plus.
            </p>
          </div>
        </div>
        {/* PARTIE 3 — Naissance de SOFICRAFT [cite: 26] */}
        <div
          ref={part3Ref}
          className="storytelling__part storytelling__part--right"
        >
          <div className="storytelling__text">
            <h3>Comment un rêve devient réalité</h3>
            <p>
              SOFICRAFT n&rsquo;a pas commencé comme une &laquo; marque &raquo;.
              C&rsquo;est né d&rsquo;une conversation avec mon père.Un jour, je
              lui ai montré les créations que j&rsquo;avais faites pendant mes
              jours de congé. Il a regardé chaque pièce avec attention — en
              silence. Et puis il m&rsquo;a dit : &laquo; Ce n&rsquo;est pas la
              même chose que ce que je créais. C&rsquo;est mieux. Tu as ajouté
              quelque chose que je n&rsquo;avais pas : tu as compris ce que les
              gens cherchent vraiment.&raquo;
            </p>
            <p>
              Au début, je créais seulement pour les proches. [cite_start]Une
              amie qui aimait les contes de fée a reçu un anneau[cite: 29, 30].
              Une collègue de travail qui se sentait perdue a reçu un bracelet
              aux symboles runiques. Et lentement, les demandes ont augmenté.
              Les gens sentaient quelque chose dans ces bijoux — ce
              n&rsquo;était pas juste de la matière. [cite_start]C&rsquo;était
              de l&rsquo;intention, de la compréhension, de la magie.
            </p>
            <p>
              Quand mon père m&rsquo;a suggéré de créer une &laquo; vraie
              &raquo; marque, j&rsquo;ai d&rsquo;abord refusé. Je ne voulais pas
              industrialiser ce que je faisais. [cite_start]Mais il a compris.
              Il m&rsquo;a dit : &laquo; Sophie, tu ne produis pas. Tu crées. Et
              tu crées pour les gens qui refusent le quotidien étouffant.
              Donne-leur un nom. Donne-leur un univers. Sois leur guide.&raquo;
            </p>
            <p>
              C&rsquo;est comme ça que SOFICRAFT est né.Non pas comme une
              bijouterie, mais comme un univers. Un espace où la magie et le
              savoir-faire se rencontrent. [cite_start]Un lieu où les rêveurs,
              les créateurs, les âmes sensibles peuvent trouver des talismans
              qui les comprennent vraiment.
            </p>
          </div>
          <div className="storytelling__image-wrapper">
            <Image
              src={IMAGES.creation}
              alt="Sophie à son établi"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <p ref={conclusionRef} className="storytelling__conclusion">
          Aujourd&rsquo;hui, je fais toujours les deux choses. Je soigne à
          l&rsquo;hôpital. Et dans mes heures libres, je crée. Mais je sais
          maintenant que ce n&rsquo;est pas une contradiction. C&rsquo;est ma
          nature. C&rsquo;est qui je suis vraiment.
        </p>
      </div>
    </section>
  );
}
