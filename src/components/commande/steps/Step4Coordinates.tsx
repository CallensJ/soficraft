"use client";

import { useFormContext, Controller } from "react-hook-form";
import { FormDataCommande } from "../FormWizard";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ============================================================================
// STEP 4 COORDINATES COMPONENT
// ============================================================================

export default function Step4Coordinates() {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormDataCommande>();

  const containerRef = useRef<HTMLDivElement>(null);
  const budgetValue = watch("budgetApproximatif");

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Content fade in on mount
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll(
      "[data-coordinate-section]",
    ) as NodeListOf<HTMLElement>;

    if (sections.length > 0) {
      gsap.fromTo(
        sections,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.12,
          ease: "power2.out",
        },
      );
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Budget value update
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const budgetDisplay = containerRef.current?.querySelector(
      "[data-budget-display]",
    ) as HTMLElement;

    if (budgetDisplay) {
      gsap.to(budgetDisplay, {
        duration: 0.3,
        textContent: `${budgetValue}€`,
        snap: { textContent: 1 },
        ease: "power2.out",
      });
    }
  }, [budgetValue]);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="step-4-coordinates" ref={containerRef}>
      {/* HEADER */}
      <div className="step-4-coordinates__header">
        <h2 className="step-4-coordinates__title">Tes coordonnées & budget</h2>
        <p className="step-4-coordinates__subtitle">
          Dernière étape ! Je vais avoir besoin de comment te contacter et d'une
          idée de ton budget.
        </p>
      </div>

      {/* FORM FIELDS */}

      {/* FIELD 1: NOM */}
      <div className="step-4-coordinates__field" data-coordinate-section>
        <label htmlFor="nom" className="step-4-coordinates__label">
          Ton nom (ou pseudo si tu préfères)
          <span className="step-4-coordinates__required">*</span>
        </label>

        <input
          id="nom"
          type="text"
          placeholder="ex: Marie"
          className={`step-4-coordinates__input ${errors.nom ? "error" : ""}`}
          {...register("nom")}
          aria-describedby={errors.nom ? "nom-error" : undefined}
        />

        {errors.nom && (
          <span className="step-4-coordinates__error" id="nom-error">
            <span className="step-4-coordinates__error-icon">⚠️</span>
            {errors.nom.message}
          </span>
        )}
      </div>

      {/* FIELD 2: EMAIL */}
      <div className="step-4-coordinates__field" data-coordinate-section>
        <label htmlFor="email" className="step-4-coordinates__label">
          Ton adresse email
          <span className="step-4-coordinates__required">*</span>
        </label>

        <input
          id="email"
          type="email"
          placeholder="ex: marie@example.com"
          className={`step-4-coordinates__input ${errors.email ? "error" : ""}`}
          {...register("email")}
          aria-describedby={errors.email ? "email-error" : "email-hint"}
        />

        {!errors.email && (
          <span className="step-4-coordinates__hint" id="email-hint">
            C'est là que je te contacte avec les nouvelles de ta création.
          </span>
        )}

        {errors.email && (
          <span className="step-4-coordinates__error" id="email-error">
            <span className="step-4-coordinates__error-icon">⚠️</span>
            {errors.email.message}
          </span>
        )}
      </div>

      {/* FIELD 3: TÉLÉPHONE */}
      <div className="step-4-coordinates__field" data-coordinate-section>
        <label htmlFor="telephone" className="step-4-coordinates__label">
          Ton téléphone (optionnel)
        </label>

        <input
          id="telephone"
          type="tel"
          placeholder="ex: +33 6 12 34 56 78"
          className={`step-4-coordinates__input ${
            errors.telephone ? "error" : ""
          }`}
          {...register("telephone")}
          aria-describedby={
            errors.telephone ? "telephone-error" : "telephone-hint"
          }
        />

        {!errors.telephone && (
          <span className="step-4-coordinates__hint" id="telephone-hint">
            Si tu préfères une conversation rapide plutôt qu'un email.
          </span>
        )}

        {errors.telephone && (
          <span className="step-4-coordinates__error" id="telephone-error">
            <span className="step-4-coordinates__error-icon">⚠️</span>
            {errors.telephone.message}
          </span>
        )}
      </div>

      {/* FIELD 4: BUDGET SLIDER */}
      <div className="step-4-coordinates__field" data-coordinate-section>
        <label
          htmlFor="budgetApproximatif"
          className="step-4-coordinates__label"
        >
          Quel est ton budget approximatif ?
          <span className="step-4-coordinates__required">*</span>
        </label>

        <div className="step-4-coordinates__budget-wrapper">
          <Controller
            name="budgetApproximatif"
            control={control}
            render={({ field }) => (
              <input
                id="budgetApproximatif"
                type="range"
                min="50"
                max="1000"
                step="10"
                className="step-4-coordinates__slider"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />

          <div className="step-4-coordinates__budget-display">
            <span
              className="step-4-coordinates__budget-value"
              data-budget-display
            >
              {budgetValue}€
            </span>
          </div>
        </div>

        <div className="step-4-coordinates__budget-guide">
          <p className="step-4-coordinates__budget-guide-title">
            Petit guide des budgets :
          </p>
          <ul className="step-4-coordinates__budget-list">
            <li>
              <span className="step-4-coordinates__budget-range">50-150€</span>
              <span className="step-4-coordinates__budget-description">
                Bague simple, collier discret, petit porte-clé
              </span>
            </li>
            <li>
              <span className="step-4-coordinates__budget-range">150-300€</span>
              <span className="step-4-coordinates__budget-description">
                Bague avec détails, collier avec pierre, boucles d'oreilles
              </span>
            </li>
            <li>
              <span className="step-4-coordinates__budget-range">300-500€</span>
              <span className="step-4-coordinates__budget-description">
                Création complexe, collier XXL, set complet
              </span>
            </li>
            <li>
              <span className="step-4-coordinates__budget-range">500€+</span>
              <span className="step-4-coordinates__budget-description">
                Custom premium. On parle d'une vraie masterpiece.
              </span>
            </li>
          </ul>
        </div>

        <div className="step-4-coordinates__hint">
          C'est une indication pour que je sache dans quel univers on travaille.
          Ce n'est pas un prix fixe. On affine ensemble après la conception.
        </div>
      </div>

      {/* FIELD 5: RGPD CONSENT */}
      <div
        className="step-4-coordinates__field step-4-coordinates__field--consent"
        data-coordinate-section
      >
        <div className="step-4-coordinates__consent-wrapper">
          <Controller
            name="consentDonnees"
            control={control}
            render={({ field }) => (
              <label className="step-4-coordinates__consent-label">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="step-4-coordinates__consent-input"
                  aria-describedby={
                    errors.consentDonnees ? "consent-error" : undefined
                  }
                />
                <span className="step-4-coordinates__consent-text">
                  Je accepte que mes données soient traitées pour ma demande de
                  commande et pour que Sophie me contacte à ce sujet.
                </span>
              </label>
            )}
          />

          {errors.consentDonnees && (
            <span className="step-4-coordinates__error" id="consent-error">
              <span className="step-4-coordinates__error-icon">⚠️</span>
              {errors.consentDonnees.message}
            </span>
          )}

          <a
            href="/confidentialite"
            className="step-4-coordinates__privacy-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lire la politique de confidentialité →
          </a>
        </div>
      </div>
    </div>
  );
}
