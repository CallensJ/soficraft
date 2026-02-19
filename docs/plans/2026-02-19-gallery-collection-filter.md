# Gallery Collection Filter — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Quand un utilisateur clique sur une carte homepage (bagues, colliers...), la galerie scroll vers la première création matchante et réduit l'opacité des créations non-matchantes.

**Architecture:** Ajout d'un champ `type` sur chaque création, lecture du query param `?collection=` via un Client Component wrapper, scroll GSAP vers la première création matchante, highlight visuel via GSAP sur les non-matchants.

**Tech Stack:** Next.js 16 App Router, GSAP 3.14 (ScrollToPlugin), React 19, TypeScript

---

## Task 1 : Ajouter le champ `type` dans gallery-data.ts

**Files:**
- Modify: `src/data/gallery-data.ts`

**Step 1 : Ajouter le type `BijouxType` et le champ sur `Creation`**

Dans `src/data/gallery-data.ts`, ajouter après la ligne 5 (avant `export interface Creation`) :

```ts
export type BijouxType = "bagues" | "colliers" | "bracelets" | "boucles";
```

Puis dans l'interface `Creation` (ligne 6), ajouter le champ :

```ts
export interface Creation {
  id: string;
  title: string;
  description: string;
  materials: string;
  univers: string;
  image: string;
  imageAlt: string;
  side: "left" | "right";
  type: BijouxType;   // <-- nouveau champ
}
```

**Step 2 : Ajouter le champ `type` sur chaque création**

Appliquer ce mapping exact sur les 10 objets création dans le fichier :

| id création | type |
|-------------|------|
| `foret-ancienne` | `"colliers"` |
| `runes-protectrices` | `"bracelets"` |
| `triquetra` | `"bagues"` |
| `lune-argentee` | `"colliers"` |
| `etoiles-veileuses` | `"bracelets"` |
| `anneau-minuit` | `"bagues"` |
| `quatre-elements` | `"colliers"` |
| `racines-profondes` | `"bracelets"` |
| `ailes-liberees` | `"bagues"` |
| `alchimie-interieure` | `"colliers"` |

Pour chaque objet création dans le fichier, ajouter `type: "..."` après le champ `side`.

**Step 3 : Vérifier que TypeScript compile**

```bash
cd soficraft && npx tsc --noEmit
```

Expected: aucune erreur TypeScript.

**Step 4 : Commit**

```bash
git add src/data/gallery-data.ts
git commit -m "feat: add type field to Creation interface in gallery-data"
```

---

## Task 2 : Créer le GalleryClientWrapper

**Files:**
- Create: `src/components/gallery/GalleryClientWrapper.tsx`

Ce composant est un Client Component qui lit `useSearchParams()`, déclenche le scroll GSAP et passe `activeFilter` aux enfants.

**Step 1 : Créer le fichier**

```tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { BijouxType } from "../../data/gallery-data";
import CollectionSection from "./CollectionSection";
import {
  collectionCeltique,
  collectionLunaire,
  collectionElementaire,
} from "../../data/gallery-data";

gsap.registerPlugin(ScrollToPlugin);

export default function GalleryClientWrapper() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("collection") as BijouxType | null;

  useEffect(() => {
    if (!activeFilter) return;

    // Petit délai pour laisser le DOM et les animations GSAP initiales se stabiliser
    const timer = setTimeout(() => {
      const target = document.querySelector(`[data-bijou-type="${activeFilter}"]`);
      if (!target) return;

      gsap.to(window, {
        scrollTo: { y: target, offsetY: 100 },
        duration: 1.2,
        ease: "power3.out",
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [activeFilter]);

  return (
    <div className="collectionsStack">
      <CollectionSection
        collection={collectionCeltique}
        stackIndex={0}
        totalSections={3}
        activeFilter={activeFilter}
      />
      <CollectionSection
        collection={collectionLunaire}
        layout="reversed"
        stackIndex={1}
        totalSections={3}
        activeFilter={activeFilter}
      />
      <CollectionSection
        collection={collectionElementaire}
        layout="fullwidth"
        stackIndex={2}
        totalSections={3}
        activeFilter={activeFilter}
      />
    </div>
  );
}
```

**Step 2 : Vérifier que TypeScript compile**

```bash
cd soficraft && npx tsc --noEmit
```

Expected: aucune erreur (le prop `activeFilter` sur `CollectionSection` n'existe pas encore — des erreurs TS sont attendues à cette étape, elles seront résolues en Task 3).

**Step 3 : Commit**

```bash
git add src/components/gallery/GalleryClientWrapper.tsx
git commit -m "feat: add GalleryClientWrapper with useSearchParams and GSAP scroll"
```

---

## Task 3 : Mettre à jour CollectionSection pour passer activeFilter

**Files:**
- Modify: `src/components/gallery/CollectionSection.tsx`

**Step 1 : Ajouter le prop `activeFilter` à l'interface**

Dans `CollectionSection.tsx`, modifier l'interface `CollectionSectionProps` :

```ts
import { Collection, BijouxType } from "../../data/gallery-data";

interface CollectionSectionProps {
  collection: Collection;
  layout?: "default" | "reversed" | "fullwidth";
  stackIndex: number;
  totalSections: number;
  activeFilter?: BijouxType | null;  // <-- nouveau
}
```

**Step 2 : Déstructurer et passer aux enfants**

Modifier la signature de la fonction :

```ts
export default function CollectionSection({
  collection,
  layout = "default",
  stackIndex,
  totalSections,
  activeFilter,  // <-- nouveau
}: CollectionSectionProps) {
```

Et dans le JSX, passer `activeFilter` à chaque `CreationItem` :

```tsx
{collection.creations.map((creation, index) => (
  <CreationItem
    key={creation.id}
    creation={creation}
    index={index}
    activeFilter={activeFilter}  // <-- nouveau
  />
))}
```

**Step 3 : Vérifier que TypeScript compile**

```bash
cd soficraft && npx tsc --noEmit
```

Expected: erreur sur `CreationItem` (prop `activeFilter` pas encore acceptée) — normal, sera corrigé en Task 4.

**Step 4 : Commit**

```bash
git add src/components/gallery/CollectionSection.tsx
git commit -m "feat: pass activeFilter prop through CollectionSection to CreationItem"
```

---

## Task 4 : Mettre à jour CreationItem pour le highlight et le data-attribute

**Files:**
- Modify: `src/components/gallery/CreationItem.tsx`

**Step 1 : Ajouter le prop `activeFilter` à l'interface**

```ts
import { Creation, BijouxType } from "../../data/gallery-data";

interface CreationItemProps {
  creation: Creation;
  index: number;
  activeFilter?: BijouxType | null;  // <-- nouveau
}
```

**Step 2 : Déstructurer le prop**

```ts
export default function CreationItem({ creation, index, activeFilter }: CreationItemProps) {
```

**Step 3 : Ajouter l'effet GSAP highlight**

Ajouter un `useEffect` dédié au highlight, **après** le `useEffect` GSAP existant :

```ts
// ── Highlight : dim non-matching creations when a filter is active
useEffect(() => {
  if (!activeFilter || !itemRef.current) return;

  const isMatch = creation.type === activeFilter;

  if (!isMatch) {
    gsap.to(itemRef.current, {
      opacity: 0.5,
      filter: "saturate(0.3)",
      duration: 0.6,
      ease: "power2.out",
    });
  } else {
    gsap.to(itemRef.current, {
      opacity: 1,
      filter: "saturate(1)",
      duration: 0.6,
      ease: "power2.out",
    });
  }
}, [activeFilter, creation.type]);
```

**Step 4 : Ajouter le `data-bijou-type` sur le wrapper div**

Le `div` racine du return (celui avec `ref={itemRef}`) doit recevoir l'attribut :

```tsx
<div
  ref={itemRef}
  className={`creationItem creationItem--${creation.side} creationItem--index-${index}`}
  data-bijou-type={creation.type}   // <-- nouveau
>
```

**Step 5 : Vérifier que TypeScript compile sans erreur**

```bash
cd soficraft && npx tsc --noEmit
```

Expected: 0 erreurs.

**Step 6 : Commit**

```bash
git add src/components/gallery/CreationItem.tsx
git commit -m "feat: add highlight effect and data-bijou-type attribute in CreationItem"
```

---

## Task 5 : Mettre à jour la page galerie pour utiliser GalleryClientWrapper

**Files:**
- Modify: `src/app/gallerie/page.tsx`

**Step 1 : Remplacer le bloc `collectionsStack` par le wrapper**

La page galerie devient :

```tsx
import GalleryClientWrapper from "../../components/gallery/GalleryClientWrapper";
import GalleryCTA from "../../components/gallery/Gallerycta";
import GalleryIntro from "../../components/gallery/GalleryIntro";
import GalleryTransition from "../../components/gallery/GalleryTransition";
import HeroGallery from "../../components/gallery/HeroGallery";
import { Suspense } from "react";

export default function MesCreationsPage() {
  return (
    <main className="gallery-page">
      <HeroGallery />
      <GalleryIntro />

      {/* useSearchParams() dans GalleryClientWrapper nécessite Suspense */}
      <Suspense fallback={null}>
        <GalleryClientWrapper />
      </Suspense>

      <GalleryTransition />
      <GalleryCTA />
    </main>
  );
}
```

> **Pourquoi Suspense ?** Next.js App Router requiert que tout composant utilisant `useSearchParams()` soit wrappé dans `<Suspense>` pour éviter un warning de build. `fallback={null}` est suffisant ici car HeroGallery est au-dessus.

**Step 2 : Supprimer les imports devenus inutiles**

Retirer les imports de `collectionCeltique`, `collectionLunaire`, `collectionElementaire` et `CollectionSection` s'ils étaient dans la page (ils sont maintenant dans `GalleryClientWrapper`).

**Step 3 : Vérifier que TypeScript compile**

```bash
cd soficraft && npx tsc --noEmit
```

Expected: 0 erreurs.

**Step 4 : Lancer le serveur de dev et tester manuellement**

```bash
cd soficraft && npm run dev
```

Tester les URLs suivantes dans le navigateur :
- `http://localhost:3000/galerie` → galerie normale, tout à 100% opacité
- `http://localhost:3000/galerie?collection=bagues` → scroll vers Bague de la Triquetra, colliers/bracelets dimmed
- `http://localhost:3000/galerie?collection=colliers` → scroll vers Collier de la Forêt Ancienne, bagues/bracelets dimmed
- `http://localhost:3000/galerie?collection=bracelets` → scroll vers Bracelet des Runes, bagues/colliers dimmed
- `http://localhost:3000/galerie?collection=boucles` → pas de scroll (aucune création de ce type), rien n'est highlighted

**Step 5 : Commit**

```bash
git add src/app/gallerie/page.tsx
git commit -m "feat: integrate GalleryClientWrapper in gallery page with Suspense"
```

---

## Task 6 : Vérifier le build de production

**Step 1 : Build**

```bash
cd soficraft && npm run build
```

Expected: build réussi sans erreurs ni warnings liés à `useSearchParams`.

**Step 2 : Commit final si tout est propre**

```bash
git commit --allow-empty -m "chore: verify production build for gallery filter feature"
```

---

## Notes importantes

- **`boucles` sans créations :** La carte homepage "Boucles d'oreille" pointe vers `?collection=boucles`. Aucune création n'a ce type. Comportement attendu : aucun scroll, aucun dimming — la galerie s'affiche normalement. C'est acceptable pour l'instant.
- **Ordre des `useEffect` dans CreationItem :** Le highlight `useEffect` doit être **après** le GSAP d'animation existant pour ne pas interférer avec les animations d'entrée.
- **ScrollToPlugin :** Déjà inclus dans GSAP 3.x, pas besoin d'installation séparée. Il faut simplement l'importer et le `registerPlugin`.
- **Delay de 600ms sur le scroll :** Nécessaire pour laisser les animations GSAP initiales et le SplitText se terminer avant de scroller.
