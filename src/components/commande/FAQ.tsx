"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// ============================================================================
// TYPES
// ============================================================================

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Combien ça coûte vraiment ?",
    answer: `Le prix dépend de ta création. C'est pour ça que j'ai besoin de savoir ton budget approximatif dans le formulaire. Ensuite, une fois ta vision conçue (sketch), je te propose un prix exact.

Généralement :
• Bagues simples : 80-200€
• Colliers/bracelets : 120-400€
• Sets complets : 200-600€
• Custom complexe : 300-800€+

Je suis transparente : pas de frais cachés. Ce que je dis = ce que tu paies. Et seulement si tu es heureux(se) du résultat.`,
  },
  {
    id: "faq-2",
    question: "Et si je n'aime pas le résultat final ?",
    answer: `Excellente question. Je propose toujours un système en deux étapes :

1️⃣  Tu commandes via le formulaire. Je conçois un sketch de ta création. Tu m'envoies tes retours. On affine.

2️⃣  Une fois que tu valides le sketch, je crée la vraie pièce. À ce moment-là, tu sais exactement ce que tu reçois.

Si tu trouves que le résultat final ne correspond pas au sketch validé, on en discute. Je peux apporter des modifs mineures, ou on trouve une solution ensemble. Je ne veux pas que tu sois mécontent(e).`,
  },
  {
    id: "faq-3",
    question: "Combien de temps avant d'avoir mon bijou ?",
    answer: `Généralement :

• Conception (sketch) : 1-2 jours
• Création : 7-14 jours (dépend de la complexité)
• Livraison : 2-5 jours

Total : Compter 10-21 jours environ.

Certaines créations plus simples peuvent être plus rapides. Les créations très complexes peuvent prendre 3-4 semaines. Je te tiens toujours informé(e) du timing exact dès qu'on valide ta conception.`,
  },
  {
    id: "faq-4",
    question: "Je peux payer en ligne ?",
    answer: `Non, pas de paiement en ligne. Je fonctionne à l'ancienne :

• Tu passes commande via ce formulaire
• On échange sur les détails (sketch, affinage)
• Une fois qu'on est d'accord, tu paies (virement, Paypal, ou paiement à la réception selon ta localisation)

Pourquoi ? Parce que je veux que tu vérifies le sketch et que tu sois sûr(e) avant de payer. C'est plus juste. Plus honnête.`,
  },
  {
    id: "faq-5",
    question: "Vous faites la modification après la création ?",
    answer: `Oui, mais avec nuances :

Modifications GRATUITES = petits ajustements sur le sketch avant la création.
Ex : changer légèrement la taille, ajuster une couleur, enlever/ajouter un détail.

Modifications PAYANTES = changements majeurs après la création.
Ex : complètement refondre la pièce, refaire une partie importante.
Dans ce cas, on discute du prix et du délai.

Mon conseil : sois très précis(e) dans ta description et tes images d'inspiration. Ça évite les surprises.`,
  },
  {
    id: "faq-6",
    question: "J'habite loin (France/International). Vous livrez partout ?",
    answer: `Oui ! Je livre partout en France et à l'international.

• France métropolitaine : Livraison offerte
• Étranger : Frais de livraison selon la destination

Je poste toujours tes créations avec assurance et suivi. Tu reçois un code de tracking.`,
  },
  {
    id: "faq-7",
    question: "Comment je sais que c'est vraiment artisanal / unique ?",
    answer: `Je te le promets : chaque bijou que je crée est unique.

Pourquoi ? Parce que je les fais à la main, une à une. Pas de moule, pas de production de masse. Chaque création est le reflet direct de la vision du client et de mon savoir-faire.

Tu veux une preuve ? Viens visiter mon atelier ! Ou je te montre des photos du processus de création en cours. Je suis transparente à 100%.`,
  },
  {
    id: "faq-8",
    question: "Et si je n'ai aucune idée de ce que je veux ?",
    answer: `Pas de souci ! C'est là que je rentre en jeu.

Dans le formulaire, dis-moi simplement :
- Ta thématique préférée (Elfique, Féerique, Dragon, etc.)
- Tes matériaux favoris
- Des mots qui te décrivent (mystérieuse, sauvage, délicate, etc.)

Je vais te proposer des idées. On en discute. Et je crée quelque chose qui te surprendra.

Ou viens visiter ma galerie d'abord. Peut-être qu'une création déjà faite t'appellera. Et si tu veux la personnaliser, je peux le faire ! 💚`,
  },
];

// ============================================================================
// FAQ COMPONENT
// ============================================================================

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Accordion items on mount
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(
      "[data-faq-item]",
    ) as NodeListOf<HTMLElement>;

    if (items.length > 0) {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
      );
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // ACCORDION TOGGLE & HEIGHT ANIMATION
  // ──────────────────────────────────────────────────────────────────────

  const toggleItem = (id: string) => {
    const contentRef = contentRefs.current[id];

    if (expandedId === id) {
      // Close
      if (contentRef) {
        gsap.to(contentRef, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          paddingTop: 0,
          paddingBottom: 0,
        });
      }
      setExpandedId(null);
    } else {
      // Open previous if exists
      if (expandedId) {
        const prevContentRef = contentRefs.current[expandedId];
        if (prevContentRef) {
          gsap.to(prevContentRef, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            paddingTop: 0,
            paddingBottom: 0,
          });
        }
      }

      // Open new
      if (contentRef) {
        gsap.fromTo(
          contentRef,
          {
            height: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
          },
          {
            height: "auto",
            opacity: 1,
            paddingTop: 20,
            paddingBottom: 20,
            duration: 0.3,
            ease: "power2.inOut",
          },
        );
      }

      setExpandedId(id);
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <section className="faq" ref={containerRef}>
      {/* HEADER */}
      <div className="faq__header">
        <h2 className="faq__title">Questions fréquemment posées</h2>
        <p className="faq__subtitle">
          Si tu as d'autres questions, écris-moi directement :
          <a href="mailto:contact@soficraft.com" className="faq__contact-link">
            contact@soficraft.com
          </a>
        </p>
      </div>

      {/* ACCORDION */}
      <div className="faq__accordion">
        {FAQ_ITEMS.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`faq__item ${isExpanded ? "expanded" : ""}`}
              data-faq-item
            >
              {/* QUESTION BUTTON */}
              <button
                onClick={() => toggleItem(item.id)}
                className="faq__question"
                aria-expanded={isExpanded}
                aria-controls={`${item.id}-content`}
              >
                <span className="faq__question-text">{item.question}</span>
                <span className="faq__question-icon">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER CONTENT */}
              <div
                ref={(el) => {
                  if (el) contentRefs.current[item.id] = el;
                }}
                id={`${item.id}-content`}
                className="faq__answer"
                style={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                }}
              >
                <div className="faq__answer-content">
                  {item.answer.split("\n\n").map((paragraph, index) => {
                    // Check if paragraph contains a list
                    if (paragraph.includes("•")) {
                      const lines = paragraph.split("\n");
                      return (
                        <ul key={index} className="faq__answer-list">
                          {lines.map((line, idx) => {
                            if (line.includes("•")) {
                              return (
                                <li key={idx}>{line.replace("• ", "")}</li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      );
                    }

                    // Check if paragraph has numbered items
                    if (paragraph.includes("️⃣")) {
                      const lines = paragraph.split("\n");
                      return (
                        <ol key={index} className="faq__answer-list">
                          {lines.map((line, idx) => {
                            if (line.match(/^\d️⃣/)) {
                              return (
                                <li key={idx}>{line.replace(/^\d️⃣\s+/, "")}</li>
                              );
                            }
                            return null;
                          })}
                        </ol>
                      );
                    }

                    // Regular paragraph
                    return (
                      <p key={index} className="faq__answer-paragraph">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER CTA */}
      <div className="faq__footer">
        <p className="faq__footer-text">Toujours des questions ?</p>
        <a href="mailto:contact@soficraft.com" className="faq__footer-button">
          Envoie-moi un email →
        </a>
      </div>
    </section>
  );
}
