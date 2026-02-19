"use client";

import { useFormContext, Controller } from "react-hook-form";
import { FormDataCommande } from "../FormWizard";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ============================================================================
// TYPES
// ============================================================================

interface ImagePreview {
  file: File;
  preview: string;
  id: string;
}

// ============================================================================
// STEP 3 INSPIRATIONS COMPONENT
// ============================================================================

export default function Step3Inspirations() {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormDataCommande>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadedImages = watch("images");
  const description = watch("description");
  const descriptionLength = description?.length || 0;

  // ──────────────────────────────────────────────────────────────────────
  // ANIMATION - Content fade in on mount
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll(
      "[data-inspiration-section]",
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
          stagger: 0.15,
          ease: "power2.out",
        },
      );
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // FILE HANDLING - Upload & Preview
  // ──────────────────────────────────────────────────────────────────────

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newPreviews: ImagePreview[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validation
      if (!file.type.startsWith("image/")) {
        console.error(`${file.name} n'est pas une image.`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        console.error(`${file.name} dépasse 5MB.`);
        continue;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        newPreviews.push({
          file,
          preview,
          id: `preview-${Date.now()}-${i}`,
        });

        // Update form state
        const currentFiles = uploadedImages || [];
        setValue("images", [...currentFiles, file] as any);

        // Animate new preview
        setTimeout(() => {
          const newPreviewElement = containerRef.current?.querySelector(
            `[data-preview-id="${newPreviews[newPreviews.length - 1]?.id}"]`,
          ) as HTMLElement;

          if (newPreviewElement) {
            gsap.fromTo(
              newPreviewElement,
              {
                opacity: 0,
                scale: 0.8,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out",
              },
            );
          }
        }, 0);
      };
      reader.readAsDataURL(file);
    }

    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (id: string) => {
    const updatedPreviews = imagePreviews.filter((p) => p.id !== id);
    setImagePreviews(updatedPreviews);

    // Update form state
    const newFiles = updatedPreviews.map((p) => p.file);
    setValue("images", newFiles as any);

    // Animate removal
    const previewElement = containerRef.current?.querySelector(
      `[data-preview-id="${id}"]`,
    ) as HTMLElement;

    if (previewElement) {
      gsap.to(previewElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // VALIDATION - At least one image OR description
  // ──────────────────────────────────────────────────────────────────────

  const hasError = !!errors.description;
  const hasContent =
    imagePreviews.length > 0 || (description && description.trim().length > 0);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="step-3-inspirations" ref={containerRef}>
      {/* HEADER */}
      <div className="step-3-inspirations__header" data-inspiration-section>
        <h2 className="step-3-inspirations__title">
          Montre-moi ton inspiration
        </h2>
        <p className="step-3-inspirations__subtitle">
          C'est là que ça devient fun. Tu peux uploader des images (screenshots,
          photos, mood boards, whatevs) ET/OU me décrire ton rêve avec des mots.
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {hasError && (
        <div className="step-3-inspirations__error" role="alert">
          <span className="step-3-inspirations__error-icon">⚠️</span>
          <span className="step-3-inspirations__error-text">
            {errors.description?.message}
          </span>
        </div>
      )}

      {/* SECTION 1: IMAGE UPLOAD */}
      <section
        className="step-3-inspirations__section"
        data-inspiration-section
      >
        <h3 className="step-3-inspirations__section-title">
          Images d'inspiration
        </h3>

        {/* UPLOAD ZONE */}
        <div
          className={`step-3-inspirations__upload-zone ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileInputChange}
            className="step-3-inspirations__file-input"
            aria-label="Télécharger des images d'inspiration"
          />

          <div className="step-3-inspirations__upload-content">
            <div className="step-3-inspirations__upload-icon">📸</div>
            <p className="step-3-inspirations__upload-text">
              Glisse tes images ici... ou clique pour parcourir
            </p>
            <p className="step-3-inspirations__upload-hint">
              Formats acceptés : JPG, PNG, WebP | Max 5MB par image
            </p>
          </div>
        </div>

        {/* IMAGE PREVIEWS */}
        {imagePreviews.length > 0 && (
          <div className="step-3-inspirations__previews">
            {imagePreviews.map((preview) => (
              <div
                key={preview.id}
                className="step-3-inspirations__preview-item"
                data-preview-id={preview.id}
              >
                <img
                  src={preview.preview}
                  alt={preview.file.name}
                  className="step-3-inspirations__preview-image"
                />
                <button
                  type="button"
                  onClick={() => removeImage(preview.id)}
                  className="step-3-inspirations__preview-remove"
                  aria-label={`Supprimer ${preview.file.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* HINT */}
        <div className="step-3-inspirations__subsection-hint">
          <span className="step-3-inspirations__hint-icon">💡</span>
          <span className="step-3-inspirations__hint-text">
            Conseil : Utilise des photos claires avec bon éclairage. Ça m'aide à
            mieux comprendre les couleurs et les détails que tu aimes.
          </span>
        </div>
      </section>

      {/* SECTION 2: DESCRIPTION */}
      <section
        className="step-3-inspirations__section"
        data-inspiration-section
      >
        <h3 className="step-3-inspirations__section-title">
          Ou raconte-moi ton rêve avec des mots...
        </h3>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="step-3-inspirations__textarea-wrapper">
              <textarea
                {...field}
                placeholder="Par exemple : Je veux une bague délicate avec une feuille d'automne en cuivre, qui parle de mon amour pour la nature. Ou : Un collier qui fait peur et qui dit 'je suis sauvage'..."
                maxLength={500}
                className="step-3-inspirations__textarea"
                aria-describedby="description-hint description-count"
              />

              {/* CHARACTER COUNT */}
              <div className="step-3-inspirations__textarea-footer">
                <span
                  className="step-3-inspirations__character-count"
                  id="description-count"
                >
                  {descriptionLength}/500
                </span>
              </div>
            </div>
          )}
        />

        {/* HINT */}
        <div className="step-3-inspirations__subsection-hint">
          <span className="step-3-inspirations__hint-icon">💡</span>
          <span
            className="step-3-inspirations__hint-text"
            id="description-hint"
          >
            Ne sois pas timide ! Plus tu me décris tes sensations et tes
            émotions, plus je peux créer quelque chose qui vibre vraiment avec
            toi.
          </span>
        </div>
      </section>

      {/* VALIDATION INDICATOR */}
      {!hasError && hasContent && (
        <div className="step-3-inspirations__success">
          <span className="step-3-inspirations__success-icon">✓</span>
          <span className="step-3-inspirations__success-text">
            Inspiration reçue !
          </span>
        </div>
      )}

      {/* FINAL HINT */}
      <div className="step-3-inspirations__final-hint">
        <span className="step-3-inspirations__hint-icon">ℹ️</span>
        <span className="step-3-inspirations__hint-text">
          Tu dois au moins télécharger une image OU écrire une description.
          Parle-moi, montre-moi, ou les deux !
        </span>
      </div>
    </div>
  );
}
