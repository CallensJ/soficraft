# Design — Filtre collections galerie par type de bijou

**Date :** 2026-02-19
**Statut :** Approuvé

## Contexte

La section homepage `CollectionSection` propose 5 cartes par type de bijou (bagues, colliers, bracelets, boucles, sur-mesure) avec des liens vers `/galerie?collection=bagues` etc. La page galerie ignorait ces query params et affichait toujours les 3 collections (Celtique, Lunaire, Élémentaire) sans filtre.

## Objectif

Quand un utilisateur clique sur une carte homepage, la galerie :
1. Scroll automatiquement vers la première création du type choisi
2. Met en highlight les créations matchantes (opacité réduite sur les autres)
3. Garde la structure des 3 collections intacte

## Approche retenue

**Mode highlight** : la galerie conserve ses 3 collections et son layout GSAP existant. Le filtre agit visuellement — scroll + opacité — sans restructurer la page.

## Data layer

### Nouveau champ `type` sur `Creation`

```ts
type BijouxType = "bagues" | "colliers" | "bracelets" | "boucles"

interface Creation {
  // ... champs existants
  type: BijouxType
}
```

### Mapping des 10 créations

| Création | Collection | Type |
|----------|------------|------|
| Collier de la Forêt Ancienne | Celtique | `colliers` |
| Bracelet des Runes Protectrices | Celtique | `bracelets` |
| Bague de la Triquetra | Celtique | `bagues` |
| Collier de la Lune Argentée | Lunaire | `colliers` |
| Bracelet des Étoiles Veileuses | Lunaire | `bracelets` |
| Anneau de Minuit | Lunaire | `bagues` |
| Collier des Quatre Éléments | Élémentaire | `colliers` |
| Bracelet Racines Profondes | Élémentaire | `bracelets` |
| Bague des Ailes Libérées | Élémentaire | `bagues` |
| Collier de l'Alchimie Intérieure | Élémentaire | `colliers` |

> Note : aucune création actuelle n'est de type `boucles`. La carte "Boucles d'oreille" homepage ne matchera aucune création — comportement acceptable pour l'instant (scroll vers le haut de la galerie, aucun highlight).

## Comportement utilisateur

1. Clic sur "Découvrir les bagues" → `/galerie?collection=bagues`
2. Page galerie monte → lecture du query param `collection`
3. GSAP scroll vers le premier élément `[data-type="bagues"]` (offset ~100px, smooth)
4. Créations non-matchantes : `opacity: 0.65`, `filter: saturate(0.4)`, transition 0.6s
5. Créations matchantes : état naturel inchangé
6. Sans query param → comportement actuel, tout à 100%

## Architecture technique

### Pattern Next.js App Router

La page `/galerie` reste Server Component. On isole la logique client dans un wrapper :

```
src/app/gallerie/page.tsx          (Server Component — inchangé structurellement)
src/components/gallery/
  GalleryClientWrapper.tsx          (Client Component — useSearchParams)
  CollectionSection.tsx             (reçoit activeFilter prop)
  CreationItem.tsx                  (reçoit activeFilter, ajoute data-type, gère highlight)
```

### Flux des props

```
GalleryClientWrapper (lit useSearchParams)
  └─ CollectionSection (activeFilter?: BijouxType)
       └─ CreationItem (activeFilter?: BijouxType, creation.type)
```

### Scroll GSAP

Dans `GalleryClientWrapper`, au mount avec `useEffect` :

```ts
useEffect(() => {
  if (!activeFilter) return
  const target = document.querySelector(`[data-type="${activeFilter}"]`)
  if (!target) return
  gsap.to(window, { scrollTo: { y: target, offsetY: 100 }, duration: 1, ease: "power3.out" })
}, [activeFilter])
```

Requiert `gsap/ScrollToPlugin` (à enregistrer).

### Highlight dans CreationItem

```ts
useEffect(() => {
  if (!activeFilter || !wrapperRef.current) return
  const isMatch = creation.type === activeFilter
  if (!isMatch) {
    gsap.to(wrapperRef.current, { opacity: 0.65, filter: "saturate(0.4)", duration: 0.6 })
  }
}, [activeFilter])
```

## Fichiers modifiés

| Fichier | Changement |
|---------|-----------|
| `src/data/gallery-data.ts` | Ajout champ `type: BijouxType` sur `Creation` + valeurs sur les 10 créations |
| `src/app/gallerie/page.tsx` | Import `GalleryClientWrapper`, wrap du contenu principal |
| `src/components/gallery/GalleryClientWrapper.tsx` | Nouveau fichier — Client Component, `useSearchParams`, scroll GSAP |
| `src/components/gallery/CollectionSection.tsx` | Ajout prop `activeFilter?: BijouxType`, passage à `CreationItem` |
| `src/components/gallery/CreationItem.tsx` | Ajout prop `activeFilter`, `data-type` sur wrapper, effet GSAP highlight |
