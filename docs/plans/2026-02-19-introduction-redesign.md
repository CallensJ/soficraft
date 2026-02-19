# Introduction Component Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the `Introduction` component on the commande page with a quiet editorial luxury aesthetic that matches Soficraft's artisanal fantasy brand.

**Architecture:** Two files are touched — the React component (`Introduction.tsx`) and its SCSS module (`_introduction.scss`). No new files are created. The redesign keeps the same semantic content and GSAP scroll animations but elevates the visual presentation with improved typography hierarchy, a horizontal 3-column timeline (desktop), and a refined full-width callout banner.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, GSAP + ScrollTrigger, Sass (7-1 pattern), Cormorant Garamond + Imperial Script fonts.

---

## Design Brief — Option B: Quiet Editorial Luxury

### Visual Structure (top to bottom)

1. **Header block** — centered, generous vertical padding
   - Decorative thin rule above (`$color-primary-light`, 60px wide, centered)
   - `Imperial Script` title ("Créons ensemble votre bijou unique") — large (56px desktop / 36px mobile), centered, `$color-neutral-dark`
   - Thin ornamental rule below (same)
   - Single evocative quote paragraph in large `Cormorant Garamond` italic (20px / 1.9 line-height), centered, max-width 600px, muted color
   - Remaining paragraphs collapsed into a shorter 2-paragraph version in regular body style

2. **Timeline block** — "Processus de création" as a small uppercase spaced label
   - 3 cards side by side on desktop (`grid-template-columns: repeat(3, 1fr)`) — stacked on mobile
   - Each card: large number glyph (`01`, `02`, `03`) in `$color-secondary-green` at ~72px, `Cormorant Garamond` light; step title in semibold; description; duration tag
   - Cards have a top border (`2px solid $color-primary-light`) and subtle background (`rgba($color-primary-light, 0.15)`)
   - No emoji icons

3. **Callout banner** — full-width (break out of 800px container), cream background (`$color-primary-light` at 20% opacity), with a fine top+bottom border in `$color-primary-light`
   - Text centered, no icon emoji — replaced with a small typographic dagger (`✦`) ornament
   - Content: same trust message (no payment upfront)

### Animation (GSAP)
- Keep ScrollTrigger `start: "top 80%"`
- Title: `fromTo opacity 0→1, y 40→0`, duration 0.7, ease `power3.out`
- Subtitle paragraphs: stagger reveal, `y 20→0`, opacity
- Timeline cards: stagger `0.15s` each, `y 30→0`, opacity
- Callout: fade + slight scale `0.97→1`

---

## Task 1: Rewrite `Introduction.tsx`

**Files:**
- Modify: `src/components/commande/Introduction.tsx`

**Step 1: Replace the JSX structure**

Replace the entire return block with the new layout:
- Remove all emoji from JSX (`1️⃣`, `2️⃣`, `3️⃣`, `💚`)
- Slim down subtitle text: keep paragraph 1 ("Bienvenue…") and paragraph 3 ("Je ne propose pas…"), drop the shorter filler paragraphs ("C'est exactement…", "Le processus…", "Remplis le formulaire…") — condense into a single closing sentence at end of paragraph 3
- Add `data-intro-text` attribute on each subtitle `<p>` for stagger targeting
- Change timeline markers from emoji to text `01`, `02`, `03`
- Change callout icon from `💚` emoji to `<span className="introduction__callout-ornament">✦</span>`
- Add `data-timeline-card` attribute on each card for animation targeting

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector("[data-intro-title]") as HTMLElement;
      const rule1 = containerRef.current?.querySelector("[data-intro-rule-1]") as HTMLElement;
      const rule2 = containerRef.current?.querySelector("[data-intro-rule-2]") as HTMLElement;
      const texts = containerRef.current?.querySelectorAll("[data-intro-text]") as NodeListOf<HTMLElement>;
      const cards = timelineRef.current?.querySelectorAll("[data-timeline-card]") as NodeListOf<HTMLElement>;
      const callout = containerRef.current?.querySelector("[data-intro-callout]") as HTMLElement;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      if (rule1) tl.fromTo(rule1, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      if (title) tl.fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.2);
      if (rule2) tl.fromTo(rule2, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5);
      if (texts?.length) tl.fromTo(texts, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.6);
      if (cards?.length) tl.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" }, 0.8);
      if (callout) tl.fromTo(callout, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }, 1.1);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="introduction" ref={containerRef}>

      {/* HEADER */}
      <div className="introduction__header">
        <span className="introduction__rule" data-intro-rule-1 />
        <h1 className="introduction__title" data-intro-title>
          Créons ensemble votre bijou unique
        </h1>
        <span className="introduction__rule" data-intro-rule-2 />

        <div className="introduction__subtitle">
          <p data-intro-text>
            Bienvenue sur ma page de commande. Tu es ici parce que quelque chose
            t'a appelé — peut-être une création de la galerie t'a murmuré quelque
            chose, ou peut-être tu portes en toi une vision, un rêve que tu
            aimerais transformer en bijou.
          </p>
          <p data-intro-text>
            Je ne propose pas un catalogue. Je propose une collaboration — un
            dialogue entre ton univers intérieur et mes mains. Tu viens avec tes
            rêves, tes images, tes mots. Moi, je les écoute, je les comprends,
            et je les transforme en quelque chose qui vibrera avec toi, pour toi,
            à jamais. Remplis le formulaire ci-dessous et laisse la magie opérer.
          </p>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="introduction__timeline-section">
        <p className="introduction__timeline-label">Processus de création</p>

        <div className="introduction__timeline" ref={timelineRef}>
          <div className="introduction__timeline-card" data-timeline-card>
            <span className="introduction__timeline-number">01</span>
            <h3 className="introduction__timeline-step-title">Conception</h3>
            <p className="introduction__timeline-step-description">
              Je lis ton formulaire attentivement, je regarde tes inspirations,
              je ressens ton énergie. Puis je sketch et je crée des croquis pour toi.
            </p>
            <span className="introduction__timeline-duration">1–2 jours</span>
          </div>

          <div className="introduction__timeline-card" data-timeline-card>
            <span className="introduction__timeline-number">02</span>
            <h3 className="introduction__timeline-step-title">Création</h3>
            <p className="introduction__timeline-step-description">
              Une fois ta vision validée, je commence la magie. Les mains à l'ouvrage.
              Chaque détail compte, chaque finition reflète mon respect pour ton projet.
            </p>
            <span className="introduction__timeline-duration">7–14 jours</span>
          </div>

          <div className="introduction__timeline-card" data-timeline-card>
            <span className="introduction__timeline-number">03</span>
            <h3 className="introduction__timeline-step-title">Livraison</h3>
            <p className="introduction__timeline-step-description">
              Je te l'envoie avec soin, protégé et emballé comme le trésor qu'il est.
              Tu le reçois, et maintenant il n'y a que toi et lui.
            </p>
            <span className="introduction__timeline-duration">2–5 jours</span>
          </div>
        </div>
      </div>

      {/* CALLOUT */}
      <div className="introduction__callout" data-intro-callout>
        <span className="introduction__callout-ornament">✦</span>
        <p className="introduction__callout-content">
          <strong>Pas de paiement d'avance.</strong> Tu paies seulement quand tu as
          vu le résultat et que tu es heureux·se. Je te contacte par email ou téléphone
          pour valider ta vision avant la création finale.
        </p>
      </div>

    </section>
  );
}
```

**Step 2: Verify no TypeScript errors**

```bash
cd /home/johan/Documents/lab/Projet\ Soficraft/dev/soficraft && npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/components/commande/Introduction.tsx
git commit -m "feat: redesign Introduction component — editorial luxury layout"
```

---

## Task 2: Rewrite `_introduction.scss`

**Files:**
- Modify: `src/styles/components/commande/_introduction.scss`

**Step 1: Replace the entire SCSS file**

```scss
// ============================================================================
// INTRODUCTION - STYLES (Option B: Quiet Editorial Luxury)
// ============================================================================

@use '../../abstracts/variables' as *;
@use '../../abstracts/mixins' as *;

// ============================================================================
// SECTION CONTAINER
// ============================================================================

.introduction {
    width: 100%;
    max-width: 800px;
    margin: 0 auto $space-2xl;
    padding: $space-2xl $space-lg;

    @include respond-to('md') {
        padding: $space-xl $space-md;
    }

    @include respond-to('sm') {
        padding: $space-lg $space-md;
        margin-bottom: $space-xl;
    }
}

// ============================================================================
// HEADER
// ============================================================================

.introduction__header {
    text-align: center;
    margin-bottom: $space-2xl;

    @include respond-to('sm') {
        margin-bottom: $space-xl;
    }
}

// Decorative thin horizontal rules flanking the title
.introduction__rule {
    display: block;
    width: 60px;
    height: 1px;
    background-color: $color-primary-light;
    margin: 0 auto $space-md;
    transform-origin: center;
}

.introduction__title {
    font-family: $font-secondary;
    font-size: 56px;
    font-weight: 400;
    line-height: 1.15;
    color: $color-neutral-dark;
    margin: 0 0 $space-md 0;

    @include respond-to('md') {
        font-size: 44px;
    }

    @include respond-to('sm') {
        font-size: 34px;
    }
}

// ============================================================================
// SUBTITLE PARAGRAPHS
// ============================================================================

.introduction__subtitle {
    max-width: 620px;
    margin: $space-xl auto 0;
    display: flex;
    flex-direction: column;
    gap: $space-md;

    p {
        font-family: $font-primary;
        font-size: 18px;
        font-style: italic;
        color: rgba($color-neutral-dark, 0.72);
        line-height: 1.9;
        margin: 0;
        text-align: center;

        @include respond-to('sm') {
            font-size: 15px;
            text-align: left;
        }
    }
}

// ============================================================================
// TIMELINE SECTION
// ============================================================================

.introduction__timeline-section {
    margin-bottom: $space-2xl;

    @include respond-to('sm') {
        margin-bottom: $space-xl;
    }
}

// Small uppercase label above the timeline
.introduction__timeline-label {
    font-family: $font-primary;
    font-size: 11px;
    font-weight: $fw-semibold;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba($color-neutral-dark, 0.45);
    text-align: center;
    margin: 0 0 $space-xl 0;

    @include respond-to('sm') {
        margin-bottom: $space-lg;
    }
}

// 3-column grid on desktop, stacked on mobile
.introduction__timeline {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-lg;

    @include respond-to('md') {
        gap: $space-md;
    }

    @include respond-to('sm') {
        grid-template-columns: 1fr;
        gap: $space-md;
    }
}

// ============================================================================
// TIMELINE CARD
// ============================================================================

.introduction__timeline-card {
    background-color: rgba($color-primary-light, 0.15);
    border-top: 2px solid $color-primary-light;
    border-radius: $radius-md;
    padding: $space-xl $space-lg $space-lg;
    display: flex;
    flex-direction: column;
    gap: $space-sm;

    @include respond-to('sm') {
        padding: $space-lg $space-md;
        flex-direction: row;
        align-items: flex-start;
        gap: $space-md;
    }
}

// Large ordinal number glyph
.introduction__timeline-number {
    font-family: $font-primary;
    font-size: 64px;
    font-weight: $fw-light;
    line-height: 1;
    color: $color-secondary-green;
    opacity: 0.7;
    display: block;
    margin-bottom: $space-sm;

    @include respond-to('md') {
        font-size: 52px;
    }

    @include respond-to('sm') {
        font-size: 40px;
        margin-bottom: 0;
        flex-shrink: 0;
        padding-top: 2px;
    }
}

.introduction__timeline-step-title {
    font-family: $font-primary;
    font-size: 17px;
    font-weight: $fw-semibold;
    color: $color-neutral-dark;
    margin: 0;
    letter-spacing: 0.02em;

    @include respond-to('sm') {
        font-size: 15px;
    }
}

.introduction__timeline-step-description {
    font-family: $font-primary;
    font-size: 14px;
    color: rgba($color-neutral-dark, 0.68);
    line-height: 1.7;
    margin: 0;
    flex: 1;

    @include respond-to('sm') {
        font-size: 13px;
    }
}

.introduction__timeline-duration {
    font-family: $font-primary;
    font-size: 12px;
    font-weight: $fw-semibold;
    letter-spacing: 0.06em;
    color: $color-secondary-green;
    text-transform: uppercase;
    margin-top: auto;

    @include respond-to('sm') {
        font-size: 11px;
    }
}

// ============================================================================
// CALLOUT BANNER
// ============================================================================

// Break out of the 800px container to span edge-to-edge within commande-page
.introduction__callout {
    // Full-bleed: compensate for the .introduction padding
    margin-left: -$space-lg;
    margin-right: -$space-lg;
    background-color: rgba($color-primary-light, 0.18);
    border-top: 1px solid rgba($color-primary-light, 0.8);
    border-bottom: 1px solid rgba($color-primary-light, 0.8);
    padding: $space-xl $space-2xl;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-sm;
    text-align: center;

    @include respond-to('md') {
        padding: $space-lg;
        margin-left: -$space-md;
        margin-right: -$space-md;
    }

    @include respond-to('sm') {
        padding: $space-lg $space-md;
        margin-left: -$space-md;
        margin-right: -$space-md;
    }
}

.introduction__callout-ornament {
    font-size: 18px;
    color: $color-secondary-green;
    opacity: 0.7;
    display: block;
    line-height: 1;
}

.introduction__callout-content {
    font-family: $font-primary;
    font-size: 15px;
    color: rgba($color-neutral-dark, 0.78);
    line-height: 1.7;
    max-width: 560px;
    margin: 0;

    @include respond-to('sm') {
        font-size: 13px;
    }

    strong {
        color: $color-neutral-dark;
        font-weight: $fw-semibold;
    }
}

// ============================================================================
// ACCESSIBILITY
// ============================================================================

@media (prefers-reduced-motion: reduce) {
    .introduction__rule,
    .introduction__title,
    .introduction__subtitle p,
    .introduction__timeline-card,
    .introduction__callout {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
}
```

**Step 2: Verify compilation**

Start the dev server and check for SCSS errors:

```bash
cd /home/johan/Documents/lab/Projet\ Soficraft/dev/soficraft && npm run dev
```

Navigate to `http://localhost:3000/commande` and visually verify:
- [ ] Large `Imperial Script` title centered with decorative rules
- [ ] Italic subtitle paragraphs centered, max-width contained
- [ ] 3-column timeline cards on desktop with large green numerals
- [ ] Cards stack on mobile
- [ ] Callout banner breaks out edge-to-edge with fine borders
- [ ] GSAP scroll animations fire when scrolling into view

**Step 3: Commit**

```bash
git add src/styles/components/commande/_introduction.scss
git commit -m "style: redesign Introduction SCSS — editorial luxury layout"
```

---

## Final Check

- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No SCSS compilation errors
- [ ] Visual review on desktop + mobile viewport (DevTools)
- [ ] Scroll animations play correctly (GSAP ScrollTrigger)
- [ ] `prefers-reduced-motion` respected (disable animations in OS settings to test)
