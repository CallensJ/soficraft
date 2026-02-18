"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Images temporaires Unsplash
// ─────────────────────────────────────────────────────────────────────────────
const IMAGES = {
  enfance:
    "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=700&q=80",
  infirmiere:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=80",
  creation:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80",
};

// ─────────────────────────────────────────────────────────────────────────────
// Composant
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
      // ── 1. Ligne verticale narrative — se dessine au scroll ──────────────
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

      // ── 2. H2 principal ──────────────────────────────────────────────────
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
            toggleActions: "play none none none",
          },
        });
      }

      // ── 3. Animations par partie ─────────────────────────────────────────
      const parts = [part1Ref, part2Ref, part3Ref];

      parts.forEach((partRef) => {
        const part = partRef.current;
        if (!part) return;

        // H3 — slide depuis la gauche avec overshoot
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

        // Paragraphes — stagger fade-in + translateY
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

        // Image — clip-path reveal (rideau de bas en haut)
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

          // Parallax sur l'image à l'intérieur du wrapper
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

      // ── 4. Texte de transition "Mais il y avait un secret..." ────────────
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

      // ── 5. Conclusion finale ─────────────────────────────────────────────
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

      // ── 6. Changement subtil de background entre parties ─────────────────
      // Partie 2 : légère teinte chaude
      if (part2Ref.current) {
        ScrollTrigger.create({
          trigger: part2Ref.current,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(section, {
              backgroundColor: "rgba(212, 184, 150, 0.06)",
              duration: 1.2,
              ease: "power2.out",
            }),
          onLeave: () =>
            gsap.to(section, {
              backgroundColor: "transparent",
              duration: 1.2,
              ease: "power2.out",
            }),
          onEnterBack: () =>
            gsap.to(section, {
              backgroundColor: "rgba(212, 184, 150, 0.06)",
              duration: 1.2,
              ease: "power2.out",
            }),
          onLeaveBack: () =>
            gsap.to(section, {
              backgroundColor: "transparent",
              duration: 1.2,
              ease: "power2.out",
            }),
        });
      }

      // Partie 3 : légère teinte verte (naissance SOFICRAFT)
      if (part3Ref.current) {
        ScrollTrigger.create({
          trigger: part3Ref.current,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(section, {
              backgroundColor: "rgba(77, 107, 61, 0.05)",
              duration: 1.2,
              ease: "power2.out",
            }),
          onLeave: () =>
            gsap.to(section, {
              backgroundColor: "transparent",
              duration: 1.2,
              ease: "power2.out",
            }),
          onEnterBack: () =>
            gsap.to(section, {
              backgroundColor: "rgba(77, 107, 61, 0.05)",
              duration: 1.2,
              ease: "power2.out",
            }),
          onLeaveBack: () =>
            gsap.to(section, {
              backgroundColor: "transparent",
              duration: 1.2,
              ease: "power2.out",
            }),
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="storytelling">
      {/* ── Ligne verticale narrative ──────────────────────────────────── */}
      <div ref={lineRef} className="storytelling__line" aria-hidden="true" />

      <div className="storytelling__container">
        {/* ── H2 ──────────────────────────────────────────────────────── */}
        <h2 className="storytelling__title">
          Mon chemin, de l&rsquo;établi de mon père à SOFICRAFT
        </h2>

        {/* ════════════════════════════════════════════════════════════════
            PARTIE 1 — Enfance & Héritage
        ════════════════════════════════════════════════════════════════ */}
        <div
          ref={part1Ref}
          className="storytelling__part storytelling__part--right"
        >
          <div className="storytelling__text">
            <h3>Une enfance suspendue entre réalité et magie</h3>

            <p>
              Je suis née dans l&rsquo;atelier de mon père. Pas littéralement,
              bien sûr, mais c&rsquo;est là que j&rsquo;ai grandi — assise sur
              un tabouret en bois, les yeux fixes sur ses mains qui
              transformaient du métal brut en créatures gracieuses. Il était
              joaillier, mais pas dans le sens traditionnel. Mon père ne créait
              pas pour les riches. Il créait pour ceux qui comprenaient que la
              beauté était une nécessité, pas un luxe.
            </p>

            <p>
              Pendant qu&rsquo;il travaillait, je dessinais. Je remplissais des
              carnets entiers de créatures que personne d&rsquo;autre ne voyait
              — des elfes aux ailes délicates, des dragons nichés dans des
              forêts de pierres précieuses, des runes celtiques qui chuchotaient
              des secrets oubliés. Mon père me regardait avec ce sourire
              bienveillant et me disait&nbsp;: &laquo;&nbsp;Sophie, tu vois les
              mondes que les autres ne peuvent pas voir. C&rsquo;est un
              don.&nbsp;&raquo;
            </p>

            <p>
              Il m&rsquo;a enseigné bien plus qu&rsquo;un savoir-faire. Il
              m&rsquo;a transmis le langage des métaux précieux, la patience
              nécessaire pour transformer une vision en réalité tangible, et
              surtout — cette conviction profonde que chaque création porte une
              intention. Que chaque bijou peut être un pont entre le monde réel
              et l&rsquo;univers imaginaire de celui qui le porte.
            </p>
          </div>

          <div className="storytelling__image-wrapper">
            <Image
              src={IMAGES.enfance}
              alt="Atelier de joaillerie — héritage familial"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── Texte de transition ──────────────────────────────────────── */}
        <p ref={transitionRef} className="storytelling__transition">
          Mais il y avait un secret dans ma vie&hellip;
        </p>

        {/* ════════════════════════════════════════════════════════════════
            PARTIE 2 — Double vie : Infirmière & Créatrice
        ════════════════════════════════════════════════════════════════ */}
        <div
          ref={part2Ref}
          className="storytelling__part storytelling__part--left"
        >
          <div className="storytelling__image-wrapper">
            <Image
              src={IMAGES.infirmiere}
              alt="Sophie dans son double rôle — infirmière et créatrice"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="storytelling__text">
            <h3>
              Entre l&rsquo;hôpital et l&rsquo;atelier&nbsp;: trouver son
              équilibre
            </h3>

            <p>
              À 22 ans, j&rsquo;ai choisi de devenir infirmière. Mes parents ont
              été surpris. Je pouvais voir la question dans leurs yeux&nbsp;:
              pourquoi abandonner l&rsquo;atelier pour les salles
              d&rsquo;hôpital&nbsp;? Mais pour moi, c&rsquo;était une évidence.
              Je voulais aider. Je voulais être présente dans les moments où les
              gens ont le plus besoin de magie — quand ils souffrent, quand ils
              doutent, quand ils ne savent pas s&rsquo;ils vont s&rsquo;en
              sortir.
            </p>

            <p>
              La vie d&rsquo;infirmière est intense. C&rsquo;est des horaires
              décalés, de la fatigue émotionnelle, des moments où tu dois mettre
              tes rêves de côté pour être là pour quelqu&rsquo;un d&rsquo;autre.
              Pendant longtemps, j&rsquo;ai pensé que j&rsquo;avais abandonné
              l&rsquo;atelier pour de bon. Que cette part de moi qui rêvait, qui
              créait, qui dansait avec les fées — elle était dormante.
            </p>

            <p>
              Et puis, un jour, pendant une nuit de garde particulièrement
              difficile, j&rsquo;ai pris un carnet et commencé à dessiner. Juste
              pour me sentir vivante à nouveau. C&rsquo;était un petit anneau en
              argent, orné de feuilles de chêne entrelacées. Quelques jours plus
              tard, j&rsquo;ai retrouvé les outils de mon père dans ma cave. Je
              ne sais pas pourquoi, mais je me suis mise à créer.
            </p>

            <p>
              Et soudain, j&rsquo;ai compris. Ce n&rsquo;était pas un choix
              entre l&rsquo;infirmière et la créatrice. C&rsquo;était un
              &laquo;&nbsp;ET&nbsp;&raquo; parfait. Les deux vies se
              nourrissaient l&rsquo;une l&rsquo;autre. À l&rsquo;hôpital, je
              voyais la vulnérabilité humaine, la beauté dans la fragilité. En
              atelier, je transformais cette compréhension en talismans.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            PARTIE 3 — Naissance de SOFICRAFT
        ════════════════════════════════════════════════════════════════ */}
        <div
          ref={part3Ref}
          className="storytelling__part storytelling__part--right"
        >
          <div className="storytelling__text">
            <h3>Comment un rêve devient réalité</h3>

            <p>
              SOFICRAFT n&rsquo;a pas commencé comme une
              &laquo;&nbsp;marque&nbsp;&raquo;. C&rsquo;est né d&rsquo;une
              conversation avec mon père. Un jour, je lui ai montré les
              créations que j&rsquo;avais faites pendant mes jours de congé. Il
              a regardé chaque pièce avec attention — en silence. Et puis il
              m&rsquo;a dit&nbsp;: &laquo;&nbsp;Ce n&rsquo;est pas la même chose
              que ce que je créais. C&rsquo;est mieux. Tu as ajouté quelque
              chose que je n&rsquo;avais pas&nbsp;: tu as compris ce que les
              gens cherchent vraiment.&nbsp;&raquo;
            </p>

            <p>
              Au début, je créais seulement pour les proches. Une amie qui
              aimait les contes de fée a reçu un anneau. Une collègue de travail
              qui se sentait perdue a reçu un bracelet aux symboles runiques. Et
              lentement, les demandes ont augmenté. Les gens sentaient quelque
              chose dans ces bijoux — ce n&rsquo;était pas juste de la matière.
              C&rsquo;était de l&rsquo;intention, de la compréhension, de la
              magie.
            </p>

            <p>
              Quand mon père m&rsquo;a suggéré de créer une
              &laquo;&nbsp;vraie&nbsp;&raquo; marque, j&rsquo;ai d&rsquo;abord
              refusé. Je ne voulais pas industrialiser ce que je faisais. Mais
              il a compris. Il m&rsquo;a dit&nbsp;: &laquo;&nbsp;Sophie, tu ne
              produis pas. Tu crées. Et tu crées pour les gens qui refusent le
              quotidien étouffant. Donne-leur un nom. Donne-leur un univers.
              Sois leur guide.&nbsp;&raquo;
            </p>

            <p>
              C&rsquo;est comme ça que SOFICRAFT est né. Non pas comme une
              bijouterie, mais comme un univers. Un espace où la magie et le
              savoir-faire se rencontrent. Un lieu où les rêveurs, les
              créateurs, les âmes sensibles peuvent trouver des talismans qui
              les comprennent vraiment.
            </p>
          </div>

          <div className="storytelling__image-wrapper">
            <Image
              src={IMAGES.creation}
              alt="Sophie créant un bijou à l'atelier"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* ── Conclusion ───────────────────────────────────────────────── */}
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
