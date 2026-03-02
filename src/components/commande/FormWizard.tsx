"use client";

import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import gsap from "gsap";

import StepIndicator from "./StepIndicator";
import SuccessPage from "./SuccessPage";
import Step1Thematic from "./steps/Step1Thematic";
import Step2Materials from "./steps/Step2Materials";
import Step3Inspirations from "./steps/Step3Inspirations";
import Step4Coordinates from "./steps/Step4Coordinates";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FormDataCommande {
  // Step 1
  thematique: "elfique" | "feerique" | "dragon" | "autre";

  // Step 2
  materiaux: string[]; // ['argent', 'cuivre', 'pierres', 'bois', 'autre']

  // Step 3
  images: (File | string)[];
  description: string;

  // Step 4
  nom: string;
  email: string;
  telephone?: string;
  budgetApproximatif: number;
  consentDonnees: boolean;
}

// ============================================================================
// VALIDATION SCHEMA - YUP
// ============================================================================

const validationSchema = yup.object().shape({
  thematique: yup
    .string()
    .oneOf(
      ["elfique", "feerique", "dragon", "autre"],
      "Sélectionne une thématique valide",
    )
    .required("Tu dois choisir une thématique pour continuer"),

  materiaux: yup
    .array()
    .of(yup.string())
    .min(1, "Sélectionne au moins un matériau")
    .required("Au moins un matériau est requis"),

  images: yup.array().of(yup.mixed()),

  description: yup
    .string()
    .max(500, "Oups, tu as dépassé les 500 caractères")
    .test(
      "images-or-description",
      "Tu dois uploader une image OU écrire une description",
      function (value) {
        const { images } = this.parent;
        return (
          (images && images.length > 0) || (value && value.trim().length > 0)
        );
      },
    ),

  nom: yup
    .string()
    .required("Ton nom est requis")
    .min(2, "Ton nom doit contenir au moins 2 caractères"),

  email: yup
    .string()
    .email("Oups, cet email ne semble pas valide")
    .required("Ton email est requis"),

  telephone: yup
    .string()
    .optional()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Le format du téléphone ne semble pas valide",
    ),

  budgetApproximatif: yup
    .number()
    .required("Tu dois sélectionner un budget")
    .min(50, "Le budget minimum est 50€")
    .max(1000, "Le budget maximum est 1000€"),

  consentDonnees: yup
    .boolean()
    .oneOf(
      [true],
      "Tu dois accepter le traitement de tes données pour continuer",
    ),
});

// ============================================================================
// FORM WIZARD COMPONENT
// ============================================================================

type FormWizardProps = {
  onSuccess?: (data: FormDataCommande) => void;
};

export default function FormWizard({ onSuccess }: FormWizardProps) {
  // ──────────────────────────────────────────────────────────────────────
  // STATE
  // ──────────────────────────────────────────────────────────────────────

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ──────────────────────────────────────────────────────────────────────
  // REACT HOOK FORM SETUP
  // ──────────────────────────────────────────────────────────────────────

  const methods = useForm<FormDataCommande>({
    resolver: yupResolver(validationSchema) as any,
    mode: "onBlur",
    defaultValues: {
      thematique: undefined,
      materiaux: [],
      images: [],
      description: "",
      nom: "",
      email: "",
      telephone: "",
      budgetApproximatif: 250,
      consentDonnees: false,
    },
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { isValid },
  } = methods;
  const watchedValues = watch();

  // ──────────────────────────────────────────────────────────────────────
  // STEP VALIDATION - Valide seulement les champs de l'étape actuelle
  // ──────────────────────────────────────────────────────────────────────

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger("thematique");
      case 2:
        return await trigger("materiaux");
      case 3:
        return await trigger(["images", "description"]);
      case 4:
        return await trigger([
          "nom",
          "email",
          "telephone",
          "budgetApproximatif",
          "consentDonnees",
        ]);
      default:
        return false;
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // NAVIGATION HANDLERS
  // ──────────────────────────────────────────────────────────────────────

  const handleNextStep = async () => {
    const isStepValid = await validateStep(currentStep);
    if (isStepValid) {
      animateStepTransition(currentStep, currentStep + 1);
      setCurrentStep(currentStep + 1);
      setSubmitError(null);
      scrollToTop();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      animateStepTransition(currentStep, currentStep - 1);
      setCurrentStep(currentStep - 1);
      setSubmitError(null);
      scrollToTop();
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // FORM SUBMISSION
  // ──────────────────────────────────────────────────────────────────────

  const onSubmit = async (data: FormDataCommande) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Animation loading
      animateSubmitting(true);

      // Simuler appel API (à remplacer par vrai endpoint)
      const response = await fetch("/api/commandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la commande");
      }

      // Success
      animateSubmitting(false);
      setSubmitSuccess(true);

      // Callback optionnel
      if (onSuccess) {
        onSuccess(data);
      }

      // Scroll to success message
      setTimeout(() => scrollToTop(), 300);
    } catch (error) {
      animateSubmitting(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Réessaye plus tard.",
      );
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // GSAP ANIMATIONS
  // ──────────────────────────────────────────────────────────────────────

  const animateStepTransition = (fromStep: number, toStep: number) => {
    const direction = toStep > fromStep ? 1 : -1;
    const formElement = document.querySelector("[data-form-step]");

    if (formElement) {
      gsap.fromTo(
        formElement,
        {
          opacity: 1,
          x: direction * 50,
        },
        {
          opacity: 0,
          x: direction * -50,
          duration: 0.3,
          ease: "power2.inOut",
        },
      );

      setTimeout(() => {
        gsap.fromTo(
          formElement,
          {
            opacity: 0,
            x: direction * -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
        );
      }, 300);
    }
  };

  const animateSubmitting = (isSubmitting: boolean) => {
    const overlay = document.querySelector("[data-form-submitting]");
    if (overlay) {
      gsap.to(overlay, {
        opacity: isSubmitting ? 1 : 0,
        duration: 0.3,
        pointerEvents: isSubmitting ? "auto" : "none",
      });
    }
  };

  const scrollToTop = () => {
    const formContainer = document.querySelector("[data-form-wizard]");
    if (formContainer) {
      gsap.to(window, {
        scrollTo: {
          y: formContainer,
          offsetY: 100,
        },
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // RENDER SUCCESS PAGE
  // ──────────────────────────────────────────────────────────────────────

  if (submitSuccess) {
    return <SuccessPage />;
  }

  // ──────────────────────────────────────────────────────────────────────
  // RENDER FORM WIZARD
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="form-wizard" data-form-wizard>
      {/* PROGRESS INDICATOR */}
      <StepIndicator currentStep={currentStep} totalSteps={4} />

      {/* FORM CONTAINER */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-wizard__form"
        noValidate
      >
        <div className="form-wizard__steps" data-form-step>
          <FormProvider {...methods}>
            {/* STEP 1: THÉMATIQUE */}
            {currentStep === 1 && <Step1Thematic />}

            {/* STEP 2: MATÉRIAUX */}
            {currentStep === 2 && <Step2Materials />}

            {/* STEP 3: INSPIRATIONS */}
            {currentStep === 3 && <Step3Inspirations />}

            {/* STEP 4: COORDONNÉES & BUDGET */}
            {currentStep === 4 && <Step4Coordinates />}
          </FormProvider>
        </div>

        {/* ERROR MESSAGE */}
        {submitError && (
          <div className="form-wizard__error" role="alert">
            <div className="form-wizard__error-icon">⚠️</div>
            <div className="form-wizard__error-content">
              <h3 className="form-wizard__error-title">
                Oups... une petite magie a échoué
              </h3>
              <p className="form-wizard__error-message">{submitError}</p>
              <div className="form-wizard__error-actions">
                <button
                  type="button"
                  onClick={() => setSubmitError(null)}
                  className="form-wizard__error-button form-wizard__error-button--retry"
                >
                  Réessayer
                </button>
                <a
                  href="mailto:contact@soficraft.com"
                  className="form-wizard__error-button form-wizard__error-button--contact"
                >
                  Envoyer un email
                </a>
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="form-wizard__nav">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="form-wizard__button form-wizard__button--prev"
              aria-label="Étape précédente"
            >
              ← Retour
            </button>
          )}

          {currentStep < 4 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="form-wizard__button form-wizard__button--next"
              aria-label="Étape suivante"
            >
              Continuer →
            </button>
          )}

          {currentStep === 4 && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="form-wizard__button form-wizard__button--submit"
              aria-label="Envoyer la demande de commande"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande ✨"}
            </button>
          )}
        </div>
      </form>

      {/* SUBMITTING OVERLAY */}
      <div
        className="form-wizard__submitting"
        data-form-submitting
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <div className="form-wizard__submitting-content">
          <div className="form-wizard__spinner"></div>
          <p className="form-wizard__submitting-text">Envoi en cours...</p>
          <p className="form-wizard__submitting-subtext">
            Je traite ta demande. Un instant magique... ✨
          </p>
        </div>
      </div>
    </div>
  );
}
