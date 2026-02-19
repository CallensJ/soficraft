# Contact Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the `/contact` page frontend — 5 sections (Hero, ContactInfo, Horaires, LocalisationLyon, ContactForm) with GSAP animations and React Hook Form + Zod validation, no API call.

**Architecture:** Server Component page at `app/contact/page.tsx` assembles 5 `"use client"` section components. All styles live in one SCSS file `styles/components/contact/_contact.scss` imported via `main.scss`. Form submits locally (no fetch), shows inline success state.

**Tech Stack:** Next.js App Router, React 19, GSAP 3 + ScrollTrigger + SplitText, React Hook Form 7, Zod (replacing Yup for this page), SCSS (7-1 architecture).

---

## Task 1: SCSS file + main.scss import

**Files:**
- Create: `src/styles/components/contact/_contact.scss`
- Modify: `src/styles/main.scss`

**Step 1: Create the SCSS file**

Create `src/styles/components/contact/_contact.scss` with this full content:

```scss
// ════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE - SOFICRAFT
// ════════════════════════════════════════════════════════════════════════════

@use 'sass:color';
@use '../../abstracts/variables' as *;
@use '../../abstracts/mixins' as *;

// ── Shared noise grain filter ────────────────────────────────────────────────
// Applied via .contact-grain class on sections that need the parchment feel

// ════════════════════════════════════════════════════════════════════════════
// HERO CONTACT
// ════════════════════════════════════════════════════════════════════════════

.hero-contact {
  position: relative;
  min-height: 60vh;
  @include flex-center;
  flex-direction: column;
  padding: $space-4xl $space-lg;
  background-color: $color-neutral-bg;
  overflow: hidden;
  text-align: center;

  // SVG noise grain overlay
  &::after {
    content: '';
    @include absolute-full;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }

  &__inner {
    position: relative;
    z-index: 1;
    @include flex-center;
    flex-direction: column;
    max-width: 680px;
    margin: 0 auto;
  }

  // Fil d'or vertical — au-dessus du label
  &__thread {
    width: 1px;
    height: 80px;
    background: linear-gradient(to bottom, transparent, #C9A961);
    margin-bottom: $space-lg;
    transform-origin: top center;
  }

  &__label {
    font-family: $font-primary;
    font-size: $fs-sm;
    font-weight: $fw-medium;
    letter-spacing: $ls-wide * 3;
    text-transform: uppercase;
    color: $color-primary-dark;
    margin-bottom: $space-lg;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $fs-4xl;
    font-weight: $fw-normal;
    color: $color-neutral-dark;
    line-height: $lh-tight;
    margin-bottom: $space-xl;

    @include respond-to('md') {
      font-size: 5rem;
    }
  }

  &__text {
    font-family: $font-primary;
    font-size: $fs-md;
    line-height: $lh-relaxed;
    color: $color-primary-dark;
    max-width: 600px;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// CONTACT INFO — 3 cards grid
// ════════════════════════════════════════════════════════════════════════════

.contact-info {
  padding: $space-4xl $space-lg;
  background-color: #F5F1EB;

  &__inner {
    @include container;
  }

  &__header {
    text-align: center;
    margin-bottom: $space-3xl;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $fs-3xl;
    font-weight: $fw-normal;
    color: $color-neutral-dark;
    margin-bottom: $space-md;
  }

  &__subtitle {
    font-family: $font-primary;
    font-size: $fs-md;
    color: $color-primary-dark;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-xl;

    @include respond-to('md') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to('lg') {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // Card
  &__card {
    padding: $space-2xl $space-xl;
    background: rgba(212, 184, 150, 0.12);
    border: 1px solid #C9A961;
    border-radius: 2px;
    @include flex-column;
    gap: $space-md;
    @include transition(transform, $duration-normal);

    // Asymmetric tilt on middle card
    &--middle {
      transform: rotate(-0.5deg);

      &:hover {
        transform: rotate(0deg) translateY(-4px);
      }
    }

    &:not(&--middle):hover {
      transform: translateY(-4px);
    }
  }

  &__card-icon {
    width: 40px;
    height: 40px;
    color: $color-secondary-green;
    flex-shrink: 0;
  }

  &__card-title {
    font-family: $font-primary;
    font-size: $fs-lg;
    font-weight: $fw-semibold;
    color: $color-neutral-dark;
  }

  &__card-desc {
    font-family: $font-primary;
    font-size: $fs-base;
    font-style: italic;
    color: $color-primary-dark;
    line-height: $lh-relaxed;
  }

  &__card-link {
    font-family: $font-primary;
    font-size: $fs-base;
    font-weight: $fw-medium;
    color: $color-secondary-green;
    text-decoration: none;
    @include transition(color);

    &:hover {
      color: color.scale($color-secondary-green, $lightness: -15%);
      text-decoration: underline;
    }
  }
}

// ════════════════════════════════════════════════════════════════════════════
// HORAIRES
// ════════════════════════════════════════════════════════════════════════════

.horaires {
  padding: $space-4xl $space-lg;
  background: linear-gradient(180deg, $color-primary-light 0%, #F5F1EB 100%);
  text-align: center;

  &__inner {
    max-width: 680px;
    margin: 0 auto;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $fs-3xl;
    font-weight: $fw-normal;
    color: $color-neutral-dark;
    margin-bottom: $space-xl;
  }

  &__text {
    font-family: $font-primary;
    font-size: $fs-md;
    line-height: $lh-relaxed;
    color: $color-primary-dark;
    margin-bottom: $space-2xl;
  }

  &__block {
    display: inline-flex;
    flex-direction: column;
    gap: $space-md;
    text-align: left;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(201, 169, 97, 0.4);
    border-radius: 2px;
    padding: $space-xl $space-2xl;
  }

  &__item {
    @include flex-row;
    align-items: flex-start;
    gap: $space-md;
    font-family: $font-primary;
    font-size: $fs-base;
    color: $color-neutral-dark;
    line-height: $lh-relaxed;
  }

  &__item-icon {
    width: 20px;
    height: 20px;
    color: $color-secondary-green;
    flex-shrink: 0;
    margin-top: 2px;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// LOCALISATION LYON
// ════════════════════════════════════════════════════════════════════════════

.localisation {
  padding: $space-4xl $space-lg;
  background-color: $color-neutral-bg;
  overflow: hidden;

  &__inner {
    @include container;
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-3xl;
    align-items: center;

    @include respond-to('lg') {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__content {
    @include flex-column;
    gap: $space-xl;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $fs-3xl;
    font-weight: $fw-normal;
    color: $color-neutral-dark;
  }

  &__text {
    font-family: $font-primary;
    font-size: $fs-md;
    line-height: $lh-relaxed;
    color: $color-primary-dark;
  }

  &__cta {
    align-self: flex-start;
  }

  // Visual block — typographic map
  &__visual {
    position: relative;
    height: 320px;
    border: 1px solid #C9A961;
    border-radius: 2px;
    @include flex-center;
    overflow: hidden;
    background: rgba(212, 184, 150, 0.08);
  }

  &__watermark {
    position: absolute;
    font-family: $font-secondary;
    font-size: 10rem;
    color: $color-neutral-dark;
    opacity: 0.05;
    line-height: 1;
    pointer-events: none;
    user-select: none;

    @include respond-to('md') {
      font-size: 14rem;
    }
  }

  &__coords {
    position: relative;
    z-index: 1;
    text-align: center;
    @include flex-column;
    gap: $space-md;
  }

  &__coords-city {
    font-family: $font-primary;
    font-size: $fs-lg;
    font-weight: $fw-semibold;
    letter-spacing: $ls-wide * 4;
    text-transform: uppercase;
    color: $color-neutral-dark;
  }

  &__coords-sep {
    width: 40px;
    height: 1px;
    background: #C9A961;
    margin: 0 auto;
  }

  &__coords-gps {
    font-family: $font-primary;
    font-size: $fs-base;
    letter-spacing: $ls-wide * 2;
    color: $color-primary-dark;
  }

  &__coords-zone {
    font-family: $font-primary;
    font-size: $fs-sm;
    font-style: italic;
    color: $color-primary-med;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// CONTACT FORM
// ════════════════════════════════════════════════════════════════════════════

.contact-form-section {
  position: relative;
  padding: $space-4xl $space-lg;
  background-color: $color-neutral-bg;
  overflow: hidden;

  // Grain overlay (same as hero)
  &::after {
    content: '';
    @include absolute-full;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }

  &__inner {
    position: relative;
    z-index: 1;
    @include container;
  }

  &__header {
    text-align: center;
    margin-bottom: $space-3xl;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $fs-3xl;
    font-weight: $fw-normal;
    color: $color-neutral-dark;
    margin-bottom: $space-md;
  }

  &__subtitle {
    font-family: $font-primary;
    font-size: $fs-md;
    color: $color-primary-dark;
    line-height: $lh-relaxed;
  }
}

// ── Form wrapper ─────────────────────────────────────────────────────────────

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  @include flex-column;
  gap: $space-2xl;

  // ── Float label field ──────────────────────────────────────────────────────
  &__field {
    position: relative;
  }

  &__label {
    position: absolute;
    top: $space-md;
    left: 0;
    font-family: $font-primary;
    font-size: $fs-base;
    color: $color-primary-med;
    pointer-events: none;
    @include transition(all, $duration-fast);
    transform-origin: left top;

    // Floated state (when input has value or is focused)
    .contact-form__field--floated & {
      transform: translateY(-22px) scale(0.85);
      color: $color-primary-dark;
    }

    .contact-form__field--error & {
      color: $color-error;
    }

    .contact-form__field--floated.contact-form__field--error & {
      color: $color-error;
    }
  }

  &__input,
  &__select,
  &__textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid $color-primary-med;
    border-radius: 0;
    padding: $space-md 0;
    font-family: $font-primary;
    font-size: $fs-base;
    color: $color-neutral-dark;
    outline: none;
    appearance: none;
    @include transition(border-bottom-color, $duration-fast);

    &:focus {
      border-bottom-color: $color-secondary-green;
    }

    .contact-form__field--error & {
      border-bottom-color: $color-error;
    }
  }

  &__select {
    cursor: pointer;

    option[value=""] {
      color: $color-primary-med;
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  // Character counter
  &__counter {
    text-align: right;
    font-family: $font-primary;
    font-size: $fs-sm;
    color: $color-primary-med;
    margin-top: $space-xs;

    &--warning {
      color: $color-warning;
    }

    &--limit {
      color: $color-error;
    }
  }

  // Error message
  &__error {
    font-family: $font-primary;
    font-size: $fs-sm;
    color: $color-error;
    margin-top: $space-xs;
  }

  // Help text
  &__help {
    font-family: $font-primary;
    font-size: $fs-sm;
    font-style: italic;
    color: $color-primary-med;
    margin-top: $space-xs;
  }

  // Checkboxes group
  &__checkboxes {
    @include flex-column;
    gap: $space-sm;
    margin-top: $space-md;
  }

  &__checkbox-item {
    display: flex;
    align-items: center;
    gap: $space-md;
    cursor: pointer;
    font-family: $font-primary;
    font-size: $fs-base;
    color: $color-neutral-dark;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: $color-secondary-green;
      cursor: pointer;
      flex-shrink: 0;
    }
  }

  // Consent checkbox (single)
  &__consent {
    display: flex;
    align-items: flex-start;
    gap: $space-md;
    font-family: $font-primary;
    font-size: $fs-sm;
    color: $color-primary-dark;
    line-height: $lh-relaxed;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: $color-secondary-green;
      cursor: pointer;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  // Group label (for checkboxes / radio groups)
  &__group-label {
    font-family: $font-primary;
    font-size: $fs-base;
    font-weight: $fw-medium;
    color: $color-primary-dark;
    margin-bottom: $space-sm;
    display: block;
  }

  // Submit row
  &__submit {
    display: flex;
    justify-content: center;
    padding-top: $space-md;

    // Loading spinner inside button
    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// ── Success message ───────────────────────────────────────────────────────────

.contact-success {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  @include flex-column;
  align-items: center;
  gap: $space-xl;
  padding: $space-3xl $space-xl;

  &__icon {
    font-size: 3rem;
    line-height: 1;
  }

  &__title {
    font-family: $font-secondary;
    font-size: $fs-3xl;
    font-weight: $fw-normal;
    color: $color-neutral-dark;
  }

  &__text {
    font-family: $font-primary;
    font-size: $fs-md;
    line-height: $lh-relaxed;
    color: $color-primary-dark;
    white-space: pre-line;
  }

  &__signature {
    font-family: $font-primary;
    font-size: $fs-base;
    font-style: italic;
    color: $color-primary-med;
  }
}
```

**Step 2: Add import to `src/styles/main.scss`**

After the `// PAGE COMMANDE` block (around line 71), add:

```scss
// PAGE CONTACT
@use "components/contact/contact";
```

**Step 3: Verify SCSS compiles**

Run: `cd /home/johan/Documents/lab/Projet\ Soficraft/dev/soficraft && npm run build 2>&1 | head -30`

Expected: No SCSS compilation errors.

---

## Task 2: `app/contact/page.tsx` — Page shell

**Files:**
- Create: `src/app/contact/page.tsx`

**Step 1: Create the page**

```tsx
import HeroContact from "../../components/contact/HeroContact";
import ContactInfo from "../../components/contact/ContactInfo";
import Horaires from "../../components/contact/Horaires";
import LocalisationLyon from "../../components/contact/LocalisationLyon";
import ContactForm from "../../components/contact/ContactForm";

export const metadata = {
  title: "Contact — SOFICRAFT",
  description:
    "Contacte Sophie pour une création sur-mesure, une question ou simplement pour échanger autour de son univers de bijoux fantasy.",
};

export default function ContactPage() {
  return (
    <main>
      <HeroContact />
      <ContactInfo />
      <Horaires />
      <LocalisationLyon />
      <ContactForm />
    </main>
  );
}
```

**Step 2: Start dev server and verify route loads**

Run: `npm run dev` then open `http://localhost:3000/contact`

Expected: Page renders (components will be stubs at this point — that's fine).

---

## Task 3: `HeroContact.tsx`

**Files:**
- Create: `src/components/contact/HeroContact.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PARAGRAPH = `Entre dans mon univers et partageons une conversation.

Que tu cherches une création sur-mesure qui te ressemble, que tu aies des questions sur mes bijoux, ou simplement envie d'en savoir plus sur mon travail entre les deux mondes — celui de soignante et celle de créatrice — je suis là pour t'écouter.`;

export default function HeroContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const thread = threadRef.current;
    const label = labelRef.current;
    const h1 = h1Ref.current;
    const text = textRef.current;

    if (!section || !thread || !label || !h1 || !text) return;

    const ctx = gsap.context(() => {
      // 1. Fil d'or — scale from top
      gsap.from(thread, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1,
      });

      // 2. Label
      gsap.from(label, {
        opacity: 0,
        y: -8,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      });

      // 3. H1 — SplitText chars
      const splitH1 = new SplitText(h1, { type: "words,chars" });
      gsap.from(splitH1.chars, {
        opacity: 0,
        y: 40,
        rotateX: -20,
        stagger: 0.025,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        onComplete: () => splitH1.revert(),
      });

      // 4. Paragraph
      gsap.from(text, {
        opacity: 0,
        y: 24,
        duration: 1.2,
        ease: "power2.out",
        delay: 1.2,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-contact" aria-label="Hero Contact">
      <div className="hero-contact__inner">
        <div ref={threadRef} className="hero-contact__thread" aria-hidden="true" />
        <span ref={labelRef} className="hero-contact__label">
          Contact
        </span>
        <h1 ref={h1Ref} className="hero-contact__title">
          Me Contacter
        </h1>
        <p ref={textRef} className="hero-contact__text">
          {PARAGRAPH}
        </p>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Visit `http://localhost:3000/contact`. Hero section should appear with thread + title animation on load.

---

## Task 4: `ContactInfo.tsx`

**Files:**
- Create: `src/components/contact/ContactInfo.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG icons inline
const IconForm = () => (
  <svg className="contact-info__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>
);

const IconMail = () => (
  <svg className="contact-info__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const IconInstagram = () => (
  <svg className="contact-info__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CARDS = [
  {
    id: "form",
    modifier: "",
    Icon: IconForm,
    title: "Par Formulaire",
    badge: "Recommandé",
    desc: "Complète le formulaire ci-dessous avec ta demande. Tu auras une réponse dans les 2-3 jours ouvrables. C'est la meilleure façon pour me laisser tous les détails de ton projet.",
    link: null,
  },
  {
    id: "email",
    modifier: "contact-info__card--middle",
    Icon: IconMail,
    title: "Email Direct",
    badge: null,
    desc: "Si tu préfères écrire directement un email, je suis à ton écoute. Décris-moi ton idée, tes inspirations, tes rêves.",
    link: { href: "mailto:contact@soficraft.com", label: "contact@soficraft.com" },
  },
  {
    id: "instagram",
    modifier: "",
    Icon: IconInstagram,
    title: "Instagram",
    badge: null,
    desc: "Tu peux aussi m'envoyer un message privé sur Instagram. J'y suis régulièrement, c'est plus personnel et direct.",
    link: { href: "https://instagram.com/soficraft.jewelry", label: "@soficraft.jewelry" },
  },
] as const;

export default function ContactInfo() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".contact-info__card");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-info" aria-labelledby="contact-info-title">
      <div className="contact-info__inner">
        <div className="contact-info__header">
          <h2 id="contact-info-title" className="contact-info__title">
            Comment me Joindre ?
          </h2>
          <p className="contact-info__subtitle">
            Voici les différentes façons de me contacter selon ce qui te convient le mieux :
          </p>
        </div>

        <div ref={gridRef} className="contact-info__grid">
          {CARDS.map(({ id, modifier, Icon, title, badge, desc, link }) => (
            <div
              key={id}
              className={`contact-info__card ${modifier}`}
              aria-label={`Contact via ${title}`}
            >
              <Icon />
              <div>
                <p className="contact-info__card-title">
                  {title}
                  {badge && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", fontStyle: "italic", color: "#4d6b3d" }}>
                      — {badge}
                    </span>
                  )}
                </p>
              </div>
              <p className="contact-info__card-desc">{desc}</p>
              {link && (
                <a
                  href={link.href}
                  className="contact-info__card-link"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Scroll to the cards section. Cards should animate in with stagger.

---

## Task 5: `Horaires.tsx`

**Files:**
- Create: `src/components/contact/Horaires.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IconClock = () => (
  <svg className="horaires__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ITEMS = [
  { text: "Lundi – Dimanche : Flexible selon planning" },
  { text: "Réponse garantie dans les 2-3 jours ouvrables" },
  { text: "Pour une question rapide : message Instagram" },
];

export default function Horaires() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="horaires" aria-labelledby="horaires-title">
      <div className="horaires__inner">
        <h2 id="horaires-title" className="horaires__title">
          Mes Horaires (Flexibles)
        </h2>
        <p className="horaires__text">
          Travaillant à la fois comme soignante et créatrice, mes horaires ne suivent pas une
          routine classique. Certaines semaines, je suis davantage disponible en fin d&rsquo;après-midi
          et soirée. D&rsquo;autres, mes gardes me prennent la journée.
          <br /><br />
          Ce qui est constant, c&rsquo;est mon engagement : tu auras toujours une réponse à ta demande.
        </p>
        <div className="horaires__block">
          {ITEMS.map(({ text }, i) => (
            <div key={i} className="horaires__item">
              <IconClock />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Section should fade in on scroll.

---

## Task 6: `LocalisationLyon.tsx`

**Files:**
- Create: `src/components/contact/LocalisationLyon.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Lyon,France";

export default function LocalisationLyon() {
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const visual = visualRef.current;
    if (!content || !visual) return;

    const ctx = gsap.context(() => {
      gsap.from(content, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: content,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(visual, {
        opacity: 0,
        x: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: visual,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="localisation" aria-labelledby="localisation-title">
      <div className="localisation__inner">
        {/* Text side */}
        <div ref={contentRef} className="localisation__content">
          <h2 id="localisation-title" className="localisation__title">
            Une Créatrice de Lyon
          </h2>
          <p className="localisation__text">
            Mon atelier est basé à Lyon, une ville riche d&rsquo;histoire et de magie où
            l&rsquo;inspiration ne manque jamais. C&rsquo;est entre les traboules de la
            Presqu&rsquo;île et les rues de Fourvière que je crée mes bijoux, en hommage à
            ma région natale.
            <br /><br />
            Si tu es dans la région, tu peux aussi passer me rencontrer directement pour
            discuter de ton projet en personne. N&rsquo;oublie pas de me prévenir à l&rsquo;avance
            via le formulaire ou un message.
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary localisation__cta"
            aria-label="Voir Lyon sur Google Maps (nouvel onglet)"
          >
            Voir sur la carte
          </a>
        </div>

        {/* Visual side — typographic map */}
        <div ref={visualRef} className="localisation__visual" aria-hidden="true">
          <span className="localisation__watermark">Lyon</span>
          <div className="localisation__coords">
            <span className="localisation__coords-city">Lyon</span>
            <div className="localisation__coords-sep" />
            <span className="localisation__coords-gps">45°46&rsquo; N / 4°50&rsquo; E</span>
            <span className="localisation__coords-zone">Europe / Paris</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

Both sides should slide in from opposite directions on scroll.

---

## Task 7: `ContactForm.tsx` — Schema + state

**Files:**
- Create: `src/components/contact/ContactForm.tsx`

**Step 1: Install Zod if not already present**

Check `package.json` — if `zod` is not listed, run:
```bash
npm install zod
```

**Step 2: Create the component**

```tsx
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
  typedemande: z.enum(
    ["sur-mesure", "question", "collaboration", "autre"],
    { errorMap: () => ({ message: "Sélectionne une option" }) }
  ),
  budget: z.string().optional(),
  description: z
    .string()
    .min(10, "Décris ton projet en quelques mots (min. 10 caractères)")
    .max(1500, "Maximum 1500 caractères"),
  delai: z.string().optional(),
  provenance: z.array(z.string()).optional(),
  consentement: z.literal(true, {
    errorMap: () => ({ message: "Ce champ est requis pour continuer" }),
  }),
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

  // Track floated state for each text/select field
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

  // GSAP: transition form → success
  const showSuccess = () => {
    const form = formRef.current;
    const success = successRef.current;
    if (!form || !success) return;

    gsap.to(form, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo(
          success,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      },
    });
  };

  const onSubmit = async (_data: FormValues) => {
    setIsLoading(true);
    // Simulate brief delay for UX (no real API call)
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
        <div
          ref={successRef}
          className="contact-success"
          style={{ opacity: submitted ? undefined : 0, display: submitted ? undefined : "none" }}
          aria-live="polite"
        >
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
      </div>
    </section>
  );
}
```

**Step 3: Fix success div visibility**

The `display: "none"` approach conflicts with the GSAP animation. Replace the `style` prop on the success div with a conditional render that appears only after submission, but keep the ref attached. Update the `showSuccess` function to use `style.display = "block"` before animating:

In `showSuccess`:
```tsx
const showSuccess = () => {
  const form = formRef.current;
  const success = successRef.current;
  if (!form || !success) return;

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
```

And update the success div to simply use `submitted` state:
```tsx
{submitted && (
  <div ref={successRef} className="contact-success" aria-live="polite">
    ...
  </div>
)}
```

And add a `useEffect` to animate on mount after `submitted` becomes true:
```tsx
useEffect(() => {
  if (!submitted || !successRef.current) return;
  gsap.fromTo(
    successRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
  );
}, [submitted]);
```

**Step 4: Verify form behaviour in browser**

- Fill out required fields → submit → spinner appears → success message fades in
- Leave required fields empty → blur → error messages appear under fields
- Float labels rise when field has value

---

## Task 8: Final check & cleanup

**Step 1: Check Navbar has a Contact link**

Read `src/components/layout/Navbar.tsx` and check if `/contact` is already in the nav links. If not, add it following the existing pattern.

**Step 2: Check pages/_contact.scss is empty / non-conflicting**

Read `src/styles/pages/_contact.scss`. If it has content that conflicts with the new component styles, clear it or keep it if it complements.

**Step 3: Full build check**

```bash
cd "/home/johan/Documents/lab/Projet Soficraft/dev/soficraft" && npm run build 2>&1 | tail -20
```

Expected: Build succeeds with no errors.

**Step 4: Manual test checklist**

- [ ] `/contact` loads without JS errors in console
- [ ] Hero thread + title animate on page load
- [ ] Cards animate in on scroll with stagger
- [ ] Horaires section fades in on scroll
- [ ] Localisation slides in from both sides
- [ ] Form fields have float label animation
- [ ] Form validates on blur (empty required fields show errors)
- [ ] Submit shows spinner, then success message
- [ ] All text is correct French (apostrophes, accents)
- [ ] Responsive: single column on mobile

---
