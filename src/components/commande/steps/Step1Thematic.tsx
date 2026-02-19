"use client";

import { useFormContext, Controller } from "react-hook-form";
import { FormDataCommande } from "../FormWizard";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ============================================================================
// TYPES
// ============================================================================

interface ThematicOption {
  value: "elfique" | "feerique" | "dragon" | "autre";
  label: string;
  description: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const THEMATIC_OPTIONS: ThematicOption[] = [
  {
    value: "elfique",
    label: "Elfique",
    description:
      "Inspirée par la magie des forêts anciennes, la grâce et la sagesse des elfes. Délicate, naturelle, mystérieuse.",
  },
  {
    value: "feerique",
    label: "Féerique",
    description:
      "Légère comme une aile de papillon. Magique. Remplie de poudre d'étoiles. Jouée, onirique, enchantée.",
  },
  {
    value: "dragon",
    label: "Dragon",
    description:
      "Puissante. Sauvage. Brute beauté. Inspiration dans les créatures mythiques. Force, fierté, protection.",
  },
  {
    value: "autre",
    label: "Autre",
    description:
      "Tu as une vision unique qui ne rentre pas dans ces cases ? Dis-le. Je suis là pour te créer ce que tu veux vraiment.",
  },
];

// ============================================================================
// STEP 1 THEMATIC COMPONENT
// ============================================================================

export default function Step1Thematic() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormDataCommande>();
  const containerRef = useRef<HTMLDivElement>(null);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Stagger options in on mount
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const options = containerRef.current?.querySelectorAll(
      "[data-thematic-option]",
    ) as NodeListOf<HTMLElement>;

    if (options.length > 0) {
      gsap.fromTo(
        options,
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
      );
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="step-1-thematic" ref={containerRef}>
      {/* HEADER */}
      <div className="step-1-thematic__header">
        <h2 className="step-1-thematic__title">Quelle est ta thématique ?</h2>
        <p className="step-1-thematic__subtitle">
          Choisis une thématique qui résonne avec toi. C'est la base de ta
          création.
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {errors.thematique && (
        <div className="step-1-thematic__error" role="alert">
          <span className="step-1-thematic__error-icon">⚠️</span>
          <span className="step-1-thematic__error-text">
            {errors.thematique.message}
          </span>
        </div>
      )}

      {/* RADIO OPTIONS */}
      <fieldset className="step-1-thematic__fieldset">
        <legend className="sr-only">Sélectionner une thématique</legend>

        <Controller
          name="thematique"
          control={control}
          render={({ field }) => (
            <div className="step-1-thematic__options">
              {THEMATIC_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`step-1-thematic__option ${
                    field.value === option.value ? "selected" : ""
                  }`}
                  data-thematic-option
                >
                  <input
                    type="radio"
                    name="thematique"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    className="step-1-thematic__input"
                    aria-describedby={`thematic-${option.value}-desc`}
                  />

                  <div className="step-1-thematic__option-content">
                    <div className="step-1-thematic__option-header">
                      <span className="step-1-thematic__radio-custom"></span>
                      <span className="step-1-thematic__option-label">
                        {option.label}
                      </span>
                    </div>
                    <p
                      className="step-1-thematic__option-description"
                      id={`thematic-${option.value}-desc`}
                    >
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
      </fieldset>

      {/* HINT TEXT */}
      <div className="step-1-thematic__hint">
        <span className="step-1-thematic__hint-icon">💡</span>
        <span className="step-1-thematic__hint-text">
          Tu peux revenir en arrière si tu veux changer d'avis.
        </span>
      </div>
    </div>
  );
}
