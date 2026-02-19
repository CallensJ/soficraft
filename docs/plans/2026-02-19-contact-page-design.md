# Design Doc — Page Contact SOFICRAFT

**Date:** 2026-02-19
**Scope:** Frontend uniquement (pas d'API, pas d'email)
**Stack:** Next.js App Router, React, GSAP + ScrollTrigger, React Hook Form + Zod, SCSS (architecture 7-1)

---

## Architecture

### Fichiers à créer

```
src/
├── app/contact/
│   └── page.tsx                          # Page principale (Server Component)
├── components/contact/
│   ├── HeroContact.tsx                   # "use client" — Hero + GSAP
│   ├── ContactInfo.tsx                   # "use client" — Grille 3 cards + GSAP stagger
│   ├── Horaires.tsx                      # "use client" — Bloc disponibilités + GSAP
│   ├── LocalisationLyon.tsx              # "use client" — Bloc Lyon statique + GSAP
│   └── ContactForm.tsx                   # "use client" — Formulaire RHF + Zod
└── styles/components/contact/
    └── _contact.scss                     # Tous les styles de la page contact
```

### Import dans `main.scss`

Sous la section `// PAGE COMMANDE` :
```scss
// PAGE CONTACT
@use "components/contact/contact";
```

---

## Sections

### 1. HeroContact

**Layout:** Pleine largeur, min-height 60vh, centré verticalement
**Contenu:**
- Label supérieur : `"Contact"` (letterspacing wide, Cormorant Garamond, uppercase)
- H1 : `"Me Contacter"` (Imperial Script, ~5rem desktop / 3rem mobile)
- Paragraphe narratif (Cormorant Garamond 1.2rem, max-width 600px, centré)

**Design details:**
- Fond : `$color-neutral-bg` (#e8eae3) avec filtre SVG noise (grain parchemin, opacity 0.04)
- Fil d'or vertical : pseudo-élément `::before` centré, 1px solid `#C9A961`, hauteur 80px, au-dessus du label
- Pas d'image hero (focus sur le texte)

**Animations GSAP (au load, pas au scroll) :**
1. Fil d'or : `scaleY: 0 → 1`, transformOrigin top, duration 0.8s
2. Label : `opacity 0, y: -8 → 0`, delay 0.4s
3. H1 : SplitText chars, `opacity 0, y: 40, rotateX: -20`, stagger 0.025s, delay 0.6s
4. Paragraphe : `opacity 0, y: 24 → 0`, delay 1.2s

---

### 2. ContactInfo

**Layout:** Grille 3 colonnes (1 col mobile, 2 col tablette, 3 col desktop)
**Contenu:** 3 cards — Formulaire · Email · Instagram

**Design details:**
- Fond section : blanc cassé légèrement différent du hero (`#F5F1EB`)
- Cards : `background: rgba(212, 184, 150, 0.12)` (beige sable transparent), border `1px solid #C9A961` (or doux), border-radius 2px (presque carré, style artisanal)
- Légère rotation asymétrique sur la card du milieu : `transform: rotate(-0.5deg)` (subtil)
- Icône en haut de chaque card (SVG inline, couleur `$color-secondary-green`)
- Titre card : Cormorant Garamond semibold
- Description : Cormorant Garamond normal, italic

**Animations GSAP ScrollTrigger :**
- Stagger : `opacity 0, y: 40 → 0`, 0.15s entre chaque card
- Trigger : `"top 80%"`

---

### 3. Horaires

**Layout:** Pleine largeur, fond dégradé `$color-primary-light → #F5F1EB` (beige sable → beige clair)
**Contenu:**
- H2 : "Mes Horaires (Flexibles)"
- Paragraphe narratif
- Bloc disponibilités : liste simple avec icône horloge SVG

**Design details:**
- Padding généreux (80px vertical)
- Texte aligné centré
- Largeur contenu contrainte : max-width 680px, centré

**Animations GSAP ScrollTrigger :**
- Section entière : `opacity 0, y: 30 → 0`, duration 0.9s

---

### 4. LocalisationLyon

**Layout:** Deux colonnes sur desktop (texte gauche, visuel droite), une colonne mobile
**Contenu côté texte :**
- H2 : "Une Créatrice de Lyon"
- Paragraphe
- Bouton lien externe vers `https://maps.google.com/?q=Lyon,France`

**Visuel statique (côté droit) :**
- Grand texte watermark `"Lyon"` en Imperial Script, opacity 0.06, couleur `$color-neutral-dark`
- Par-dessus : coordonnées GPS typographiées (`45°46' N / 4°50' E`) en Cormorant Garamond monospace-like, lettrée, couleur `$color-primary-dark`
- Border décorative : cadre en `#C9A961` (or doux), 1px, inset léger

**Animations GSAP ScrollTrigger :**
- Texte : `opacity 0, x: -30 → 0`
- Visuel : `opacity 0, x: 30 → 0`
- Simultané, duration 1s

---

### 5. ContactForm

**Layout:** Centré, max-width 600px desktop, full-width mobile
**Fond section :** `$color-neutral-bg` avec grain subtil (même filtre SVG que hero)

**Champs (8 au total) :**

| # | Type | Label | Requis |
|---|------|-------|--------|
| 1 | Text | Nom complet | Oui |
| 2 | Email | Email | Oui |
| 3 | Select | Type de demande (Bijou sur-mesure / Question / Collaboration / Autre) | Oui |
| 4 | Select | Budget indicatif (50-100€ / 100-250€ / 250-500€ / 500€+) | Non |
| 5 | Textarea | Description du projet (max 1500 chars, compteur visible) | Oui |
| 6 | Select | Délai souhaité (Sans urgence / 1-2 mois / 1 mois / ASAP) | Non |
| 7 | Checkboxes | Comment m'as-tu trouvée ? (Instagram / Bouche à oreille / Google / Autre) | Non |
| 8 | Checkbox | Consentement (requis) | Oui |

**Style des champs :**
- Underline uniquement (pas de box) : `border: none; border-bottom: 1px solid $color-primary-med`
- Float label : label monte et réduit quand le champ est focus/rempli (animation CSS `transition`)
- Focus : `border-bottom-color: $color-secondary-green`
- Erreur : `border-bottom-color: $color-error` + message d'erreur sous le champ
- Fond des champs : transparent (fond section visible par transparence)

**Bouton submit :**
- Classe `.btn .btn--primary` (réutilise le système existant)
- Loading state : spinner CSS inline, bouton disabled
- Texte : "Envoyer Mon Projet"

**Comportement post-submit :**
- Pas d'appel API
- Formulaire disparaît (`opacity 0, y: -20`, duration 0.5s)
- Message de succès apparaît en remplacement (`opacity 0 → 1, y: 20 → 0`)
- Message : "Merci ! 🌙 Ton message m'a été transmis..." (contenu du plan)
- Bouton retour galerie

**Validation Zod (on blur) :**
- `nom` : min 2 chars
- `email` : email valide
- `typedemande` : enum requis
- `description` : min 10 chars, max 1500
- `consentement` : doit être true

**Animations GSAP ScrollTrigger :**
- H2 + paragraphe intro : `opacity 0, y: 30 → 0`
- Champs : stagger reveal `opacity 0, y: 20 → 0`, 0.08s entre chaque, trigger `"top 75%"`

---

## Design System — Tokens utilisés

| Token | Valeur | Usage |
|-------|--------|-------|
| `$color-secondary-green` | #4d6b3d | Bouton CTA, focus, icônes |
| `$color-primary-light` | #d4b896 | Cards background teinté |
| `$color-primary-dark` | #8b6b47 | Texte secondaire |
| `$color-neutral-bg` | #e8eae3 | Fonds de sections |
| `#C9A961` | Or Doux | Borders cards, fil or, accents |
| `$font-secondary` | Imperial Script | H1 hero, watermark Lyon |
| `$font-primary` | Cormorant Garamond | Tout le reste |

---

## Responsive

| Breakpoint | Comportement |
|------------|-------------|
| Mobile < 640px | 1 colonne partout, padding 30px |
| Tablette 641-1024px | 2 colonnes pour ContactInfo cards |
| Desktop > 1024px | 3 colonnes cards, 2 colonnes LocalisationLyon |

---

## Non inclus dans ce scope

- API route `/api/contact`
- Envoi d'email (Resend)
- Carte Google Maps / Mapbox
- Page `/thank-you` séparée (remplacée par message inline)
