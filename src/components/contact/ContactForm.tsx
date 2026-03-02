"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ── Zod schema ────────────────────────────────────────────────────────────────

const schema = z.object({
  nom: z.string().min(2, "Minimum 2 caractères"),
  email: z.string().email("Email invalide"),
  typedemande: z.enum(["sur-mesure", "question", "collaboration", "autre"], {
    message: "Sélectionne une option",
  }),
  budget: z.string().optional(),
  description: z
    .string()
    .min(10, "Décris ton projet en quelques mots (min. 10 caractères)")
    .max(1500, "Maximum 1500 caractères"),
  delai: z.string().optional(),
  provenance: z.array(z.string()).optional(),
  consentement: z
    .boolean()
    .refine((v) => v === true, "Ce champ est requis pour continuer"),
});

type FormValues = z.infer<typeof schema>;

// ── Field wrapper with float label ───────────────────────────────────────────

function Field({
  id,
  label,
  error,
  children,
  floated,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  floated: boolean;
}) {
  return (
    <div
      className={[
        "contact-form__field",
        floated ? "contact-form__field--floated" : "",
        error ? "contact-form__field--error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={id} className="contact-form__label">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="contact-form__error">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [descLength, setDescLength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { provenance: [] },
  });

  const watchedNom = watch("nom");
  const watchedEmail = watch("email");
  const watchedType = watch("typedemande");
  const watchedBudget = watch("budget");
  const watchedDesc = watch("description");
  const watchedDelai = watch("delai");

  useEffect(() => {
    setDescLength((watchedDesc ?? "").length);
  }, [watchedDesc]);

  // GSAP: reveal form fields on scroll
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const fields = form.querySelectorAll(".contact-form__field, .contact-form__submit, [data-reveal]");
    const ctx = gsap.context(() => {
      gsap.from(fields, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, form);

    return () => ctx.revert();
  }, []);

  // GSAP: animate success message after submitted state flips
  useEffect(() => {
    if (!submitted || !successRef.current) return;
    gsap.fromTo(
      successRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
  }, [submitted]);

  const showSuccess = () => {
    const form = formRef.current;
    if (!form) return;

    gsap.to(form, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
      },
    });
  };

  const onSubmit = async (_data: FormValues) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    showSuccess();
  };

  const provenanceOptions = [
    { value: "instagram", label: "Instagram" },
    { value: "bouche-a-oreille", label: "Bouche à oreille" },
    { value: "google", label: "Moteur de recherche" },
    { value: "autre", label: "Autre" },
  ];

  return (
    <section
      ref={sectionRef}
      className="contact-form-section"
      aria-labelledby="form-title"
    >
      <div className="contact-form-section__inner">
        <div className="contact-form-section__header" data-reveal>
          <h2 id="form-title" className="contact-form-section__title">
            Raconte-moi Ton Projet
          </h2>
          <p className="contact-form-section__subtitle">
            Remplis le formulaire ci-dessous. Plus tu seras détaillée(é), plus je comprendrai
            ta vision et pourrai te proposer quelque chose d&rsquo;authentique.
          </p>
        </div>

        {/* ── Form ── */}
        {!submitted && (
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Field 1 — Nom */}
            <Field
              id="nom"
              label="Ton prénom et nom *"
              error={errors.nom?.message}
              floated={!!watchedNom}
            >
              <input
                id="nom"
                type="text"
                className="contact-form__input"
                autoComplete="name"
                aria-required="true"
                {...register("nom")}
              />
            </Field>

            {/* Field 2 — Email */}
            <Field
              id="email"
              label="Ton email pour que je te réponde *"
              error={errors.email?.message}
              floated={!!watchedEmail}
            >
              <input
                id="email"
                type="email"
                className="contact-form__input"
                autoComplete="email"
                aria-required="true"
                {...register("email")}
              />
            </Field>

            {/* Field 3 — Type de demande */}
            <Field
              id="typedemande"
              label="Type de demande *"
              error={errors.typedemande?.message}
              floated={!!watchedType}
            >
              <select
                id="typedemande"
                className="contact-form__select"
                aria-required="true"
                {...register("typedemande")}
              >
                <option value="" disabled />
                <option value="sur-mesure">Bijou sur-mesure</option>
                <option value="question">Question sur un produit</option>
                <option value="collaboration">Collaboration</option>
                <option value="autre">Autre</option>
              </select>
            </Field>

            {/* Field 4 — Budget (optional) */}
            <Field
              id="budget"
              label="Budget indicatif"
              error={undefined}
              floated={!!watchedBudget}
            >
              <select id="budget" className="contact-form__select" {...register("budget")}>
                <option value="" />
                <option value="50-100">50€ – 100€</option>
                <option value="100-250">100€ – 250€</option>
                <option value="250-500">250€ – 500€</option>
                <option value="500+">500€ +</option>
              </select>
              <p className="contact-form__help">
                Cela m&rsquo;aide à comprendre le scope de ton projet
              </p>
            </Field>

            {/* Field 5 — Description */}
            <Field
              id="description"
              label="Décris-moi ta vision *"
              error={errors.description?.message}
              floated={!!watchedDesc}
            >
              <textarea
                id="description"
                className="contact-form__textarea"
                maxLength={1500}
                aria-required="true"
                placeholder=""
                {...register("description")}
              />
              <p
                className={[
                  "contact-form__counter",
                  descLength > 1400 ? "contact-form__counter--warning" : "",
                  descLength >= 1500 ? "contact-form__counter--limit" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {descLength} / 1500
              </p>
            </Field>

            {/* Field 6 — Délai (optional) */}
            <Field
              id="delai"
              label="Délai souhaité"
              error={undefined}
              floated={!!watchedDelai}
            >
              <select id="delai" className="contact-form__select" {...register("delai")}>
                <option value="" />
                <option value="sans-urgence">Sans urgence</option>
                <option value="1-2-mois">Dans 1-2 mois</option>
                <option value="1-mois">Dans 1 mois</option>
                <option value="asap">ASAP (à discuter)</option>
              </select>
              <p className="contact-form__help">
                Cela m&rsquo;aide à planifier mon calendrier
              </p>
            </Field>

            {/* Field 7 — Provenance (optional checkboxes) */}
            <div className="contact-form__field" data-reveal>
              <span className="contact-form__group-label">Comment tu m&rsquo;as trouvée ?</span>
              <Controller
                name="provenance"
                control={control}
                render={({ field }) => (
                  <div className="contact-form__checkboxes">
                    {provenanceOptions.map(({ value, label }) => (
                      <label key={value} className="contact-form__checkbox-item">
                        <input
                          type="checkbox"
                          value={value}
                          checked={(field.value ?? []).includes(value)}
                          onChange={(e) => {
                            const current = field.value ?? [];
                            if (e.target.checked) {
                              field.onChange([...current, value]);
                            } else {
                              field.onChange(current.filter((v) => v !== value));
                            }
                          }}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Field 8 — Consentement */}
            <div className="contact-form__field" data-reveal>
              <label className="contact-form__consent">
                <input
                  type="checkbox"
                  aria-required="true"
                  {...register("consentement")}
                />
                <span>
                  J&rsquo;accepte que Sophie me contacte pour discuter de mon projet *
                </span>
              </label>
              {errors.consentement && (
                <p role="alert" className="contact-form__error">
                  {errors.consentement.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="contact-form__submit">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Envoi en cours…
                  </>
                ) : (
                  "Envoyer Mon Projet"
                )}
              </button>
            </div>
          </form>
        )}

        {/* ── Success message ── */}
        {submitted && (
          <div ref={successRef} className="contact-success" aria-live="polite">
            <div className="contact-success__icon" aria-hidden="true">🌙</div>
            <h2 className="contact-success__title">Merci !</h2>
            <p className="contact-success__text">
              {`Ton message m'a été transmis avec succès. Je vais le lire attentivement et te répondre dans les 2-3 jours ouvrables.\n\nEn attendant, tu peux explorer la Galerie pour découvrir d'autres créations ou me suivre sur Instagram pour les nouveautés.`}
            </p>
            <p className="contact-success__signature">À bientôt, Sophie ✨</p>
            <Link href="/gallerie" className="btn btn-secondary">
              Explorer la Galerie
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
