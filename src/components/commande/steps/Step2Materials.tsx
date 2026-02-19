"use client";

import { useFormContext, Controller } from "react-hook-form";
import { FormDataCommande } from "../FormWizard";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// ============================================================================
// TYPES
// ============================================================================

interface MaterialOption {
  value: string;
  label: string;
  description: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    value: "argent",
    label: "Argent",
    description:
      "Noble. Lumineux. Le classique qui ne vieillira jamais. Accompagne chaque style, chaque peau.",
  },
  {
    value: "cuivre",
    label: "Cuivre",
    description:
      "Chaleur naturelle. Légèrement vert-de-grisé avec le temps. Apaise, équilibre, connecte à la terre.",
  },
  {
    value: "pierres",
    label: "Pierres (minéraux, cristaux, gemmes)",
    description:
      "Améthyste, quartz, lapis-lazuli, agate... Chacune a sa propre magie. Compte sur moi pour bien les choisir.",
  },
  {
    value: "bois",
    label: "Bois",
    description:
      "Organique. Vivant. Léger. Parfait pour les créations éphémères ou les touches naturelles.",
  },
  {
    value: "autre",
    label: "Autre",
    description:
      "Acier, bronze, laiton, verre ? Dis-moi. On peut travailler ensemble.",
  },
];

// ============================================================================
// STEP 2 MATERIALS COMPONENT
// ============================================================================

export default function Step2Materials() {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<FormDataCommande>();
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedMaterials = watch("materiaux");

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Stagger checkboxes in on mount
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const checkboxes = containerRef.current?.querySelectorAll(
      "[data-material-option]",
    ) as NodeListOf<HTMLElement>;

    if (checkboxes.length > 0) {
      gsap.fromTo(
        checkboxes,
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
  // ANIMATION - Selection scale effect
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const selectedElements = containerRef.current?.querySelectorAll(
      "[data-material-option].selected",
    ) as NodeListOf<HTMLElement>;

    selectedElements?.forEach((element) => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.2,
        ease: "back.out",
      });
    });
  }, [selectedMaterials]);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="step-2-materials" ref={containerRef}>
      {/* HEADER */}
      <div className="step-2-materials__header">
        <h2 className="step-2-materials__title">
          Quels matériaux t'attirent ?
        </h2>
        <p className="step-2-materials__subtitle">
          Tu peux en sélectionner plusieurs. Plus tu en choisis, plus on a
          d'options pour affiner ton projet.
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {errors.materiaux && (
        <div className="step-2-materials__error" role="alert">
          <span className="step-2-materials__error-icon">⚠️</span>
          <span className="step-2-materials__error-text">
            {errors.materiaux.message}
          </span>
        </div>
      )}

      {/* CHECKBOX OPTIONS */}
      <fieldset className="step-2-materials__fieldset">
        <legend className="sr-only">Sélectionner des matériaux</legend>

        <Controller
          name="materiaux"
          control={control}
          render={({ field }) => (
            <div className="step-2-materials__options">
              {MATERIAL_OPTIONS.map((option) => {
                const isSelected = field.value?.includes(option.value) || false;

                return (
                  <label
                    key={option.value}
                    className={`step-2-materials__option ${
                      isSelected ? "selected" : ""
                    }`}
                    data-material-option
                  >
                    <input
                      type="checkbox"
                      name="materiaux"
                      value={option.value}
                      checked={isSelected}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(field.value || []), option.value]
                          : field.value?.filter((v) => v !== option.value) ||
                            [];
                        field.onChange(newValue);
                      }}
                      onBlur={field.onBlur}
                      className="step-2-materials__input"
                      aria-describedby={`material-${option.value}-desc`}
                    />

                    <div className="step-2-materials__option-content">
                      <div className="step-2-materials__option-header">
                        <span className="step-2-materials__checkbox-custom"></span>
                        <span className="step-2-materials__option-label">
                          {option.label}
                        </span>
                      </div>
                      <p
                        className="step-2-materials__option-description"
                        id={`material-${option.value}-desc`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        />
      </fieldset>

      {/* SELECTED COUNT */}
      {selectedMaterials && selectedMaterials.length > 0 && (
        <div className="step-2-materials__selection-info">
          <span className="step-2-materials__selection-count">
            {selectedMaterials.length} matériau
            {selectedMaterials.length > 1 ? "x" : ""} sélectionné
            {selectedMaterials.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* HINT TEXT */}
      <div className="step-2-materials__hint">
        <span className="step-2-materials__hint-icon">💡</span>
        <span className="step-2-materials__hint-text">
          Les matériaux sélectionnés vont influencer le budget et les délais.
          Pas de souci, on affine ça ensemble.
        </span>
      </div>
    </div>
  );
}
