"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ============================================================================
// TYPES
// ============================================================================

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

// ============================================================================
// STEP INDICATOR COMPONENT
// ============================================================================

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Progress bar width
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (progressBarRef.current) {
      const progressPercentage = (currentStep / totalSteps) * 100;

      gsap.to(progressBarRef.current, {
        width: `${progressPercentage}%`,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, [currentStep, totalSteps]);

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Step number scale-in
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const stepNumberElement = containerRef.current?.querySelector(
      "[data-step-number]",
    ) as HTMLElement;

    if (stepNumberElement) {
      gsap.fromTo(
        stepNumberElement,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out",
        },
      );
    }
  }, [currentStep]);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div
      className="step-indicator"
      ref={containerRef}
      aria-label={`Étape ${currentStep} sur ${totalSteps}`}
    >
      {/* PROGRESS BAR */}
      <div className="step-indicator__progress-container">
        <div className="step-indicator__progress-background">
          <div
            className="step-indicator__progress-bar"
            ref={progressBarRef}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* STEP COUNTER */}
      <div className="step-indicator__counter">
        <span className="step-indicator__step-number" data-step-number>
          Étape {currentStep}
        </span>
        <span className="step-indicator__step-separator">/</span>
        <span className="step-indicator__step-total">{totalSteps}</span>
      </div>

      {/* STEP LABELS (Optional - pour future amélioration) */}
      <div className="step-indicator__labels">
        <span
          className={`step-indicator__label ${currentStep === 1 ? "active" : ""}`}
        >
          Thématique
        </span>
        <span
          className={`step-indicator__label ${currentStep === 2 ? "active" : ""}`}
        >
          Matériaux
        </span>
        <span
          className={`step-indicator__label ${currentStep === 3 ? "active" : ""}`}
        >
          Inspirations
        </span>
        <span
          className={`step-indicator__label ${currentStep === 4 ? "active" : ""}`}
        >
          Coordonnées
        </span>
      </div>
    </div>
  );
}
