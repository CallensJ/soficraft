# Hero Background Carousel — Design Document

Date: 2026-02-17

## Overview

Add a background image carousel to `HeroSection.tsx`. Three images cycle automatically
every 5 seconds using a GSAP crossfade transition. No user-facing controls.

## Decisions

| Parameter       | Value                          |
|-----------------|--------------------------------|
| Transition      | Crossfade (opacity)            |
| Controls        | Auto-play only — no UI         |
| Interval        | 5 seconds per slide            |
| Fade duration   | 1.2 seconds (simultaneous in/out) |
| Implementation  | GSAP (Approach A)              |

## Images (in order)

1. `/images/Hero-background/hero-forest.jpg` — forêt enchantée
2. `/images/Hero-background/Bracelet-hand.webp` — bracelet en main
3. `/images/Hero-background/workshop.webp` — atelier

## Architecture

The carousel lives inside the existing `.hero__background` wrapper (`backgroundRef`).
Three slides are stacked with `position: absolute; inset: 0`. GSAP parallax and entry
animation target the wrapper div and remain unchanged.

### DOM structure

```tsx
<div ref={backgroundRef} className="hero__background">
  <div className="hero__background-slide">  {/* forest */}
  <div className="hero__background-slide">  {/* bracelet */}
  <div className="hero__background-slide">  {/* workshop */}
  <div className="hero__background-overlay" />
</div>
```

### Carousel logic (GSAP)

After the entry timeline resolves (`tl.then(startCarousel)`):

```
setInterval(() => {
  gsap.to(slides[current], { opacity: 0, duration: 1.2, ease: "power2.inOut" })
  gsap.to(slides[next],    { opacity: 1, duration: 1.2, ease: "power2.inOut" })
  current = next
}, 5000)
```

`slides` is a `useRef<HTMLDivElement[]>` collecting the three slide divs.

### Entry animation compatibility

The existing `tl.from(bg, { scale: 1.15, opacity: 0, duration: 1.8 })` targets the
wrapper — all slides become visible together. No changes needed to the parallax
(`gsap.to(bg, { y: "30%" })`).

## SCSS changes

Add `.hero__background-slide`:
- `position: absolute; inset: 0; width: 100%; height: 100%`
- `opacity: 0` by default (first slide initialised to `opacity: 1` in JS)

No other SCSS changes.
