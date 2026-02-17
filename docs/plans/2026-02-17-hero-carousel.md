# Hero Background Carousel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a GSAP crossfade carousel to the HeroSection that cycles through 3 background images every 5 seconds automatically.

**Architecture:** Stack 3 absolutely-positioned slide divs inside the existing `.hero__background` wrapper. After the entry animation timeline resolves, a `setInterval` triggers GSAP crossfades between slides every 5 seconds. The wrapper's parallax and entry animations are untouched.

**Tech Stack:** Next.js 13+ App Router, GSAP (already installed), SCSS modules (BEM)

---

### Task 1: Add SCSS for slide elements

**Files:**
- Modify: `src/styles/components/homepage/_hero.scss` — add `.hero__background-slide` rule inside the `.hero` block

**Step 1: Add the slide rule**

Inside `_hero.scss`, after the `&__background-overlay` block (around line 92), add:

```scss
&__background-slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    will-change: opacity;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
```

**Step 2: Visual check**

Open the dev server (`npm run dev`) and confirm nothing breaks. The hero should look identical to before (first slide will get `opacity: 1` in JS in the next task).

**Step 3: Commit**

```bash
git add src/styles/components/homepage/_hero.scss
git commit -m "style: add hero__background-slide SCSS rule"
```

---

### Task 2: Refactor HeroSection to use slide divs

**Files:**
- Modify: `src/components/homepage/HeroSection.tsx`

**Step 1: Add the `slidesRef` ref**

Below the existing `const backgroundRef = useRef<HTMLDivElement>(null);` line, add:

```tsx
const slidesRef = useRef<HTMLDivElement[]>([]);
```

Also add a helper to collect refs:

```tsx
const setSlideRef = (el: HTMLDivElement | null, index: number) => {
  if (el) slidesRef.current[index] = el;
};
```

**Step 2: Replace the single `<Image>` with three slide divs**

Replace the content of `<div ref={backgroundRef} className="hero__background">` (currently contains a text placeholder + one `<Image>` + the overlay) with:

```tsx
<div ref={backgroundRef} className="hero__background">
  {[
    { src: "/images/Hero-background/hero-forest.jpg",   alt: "Forêt enchantée baignée de lumière dorée" },
    { src: "/images/Hero-background/Bracelet-hand.webp", alt: "Bracelet artisanal en main" },
    { src: "/images/Hero-background/workshop.webp",      alt: "Atelier de création de bijoux" },
  ].map((slide, i) => (
    <div
      key={slide.src}
      ref={(el) => setSlideRef(el, i)}
      className="hero__background-slide"
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority={i === 0}
        quality={75}
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  ))}
  <div className="hero__background-overlay" />
</div>
```

**Step 3: Visual check**

Dev server should still show the hero — but now blank (all slides at opacity 0). We'll fix that in Task 3.

---

### Task 3: Initialise first slide and add GSAP carousel

**Files:**
- Modify: `src/components/homepage/HeroSection.tsx` — update the `useEffect`

**Step 1: Initialise the first slide opacity**

At the very start of the `gsap.context(() => { ... })` block, before the timeline, add:

```tsx
// Initialise: first slide visible, others hidden
gsap.set(slidesRef.current[0], { opacity: 1 });
```

**Step 2: Add carousel logic after the entry timeline**

After the timeline definition (after the last `tl.from(...)` call, before the parallax block), add:

```tsx
// -------------------------------------------------------
// CAROUSEL — crossfade every 5 seconds (starts after entry)
// -------------------------------------------------------
let currentIndex = 0;
let carouselInterval: ReturnType<typeof setInterval> | null = null;

const startCarousel = () => {
  carouselInterval = setInterval(() => {
    const slides = slidesRef.current;
    if (!slides.length) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    gsap.to(slides[currentIndex], { opacity: 0, duration: 1.2, ease: "power2.inOut" });
    gsap.to(slides[nextIndex],    { opacity: 1, duration: 1.2, ease: "power2.inOut" });
    currentIndex = nextIndex;
  }, 5000);
};

tl.then(startCarousel);
```

**Step 3: Clean up interval on unmount**

The `gsap.context(() => {...}, section)` cleanup already calls `ctx.revert()`. To also clear the interval, add cleanup inside `return () => ctx.revert()`:

```tsx
return () => {
  ctx.revert();
  if (carouselInterval) clearInterval(carouselInterval);
};
```

Note: `carouselInterval` is declared inside `useEffect` but outside `gsap.context` scope, so it IS accessible in the cleanup return. You'll need to declare it before `gsap.context(...)` and assign it inside. See exact placement in Step 4.

**Step 4: Final useEffect shape**

The full `useEffect` should look like this:

```tsx
useEffect(() => {
  const section = sectionRef.current;
  const bg = backgroundRef.current;
  const title = titleRef.current;
  const subtitle = subtitleRef.current;
  const ctaContainer = ctaContainerRef.current;
  const decorLine = decorLineRef.current;

  if (!section || !bg || !title || !subtitle || !ctaContainer || !decorLine) return;

  let carouselInterval: ReturnType<typeof setInterval> | null = null;

  const ctx = gsap.context(() => {
    // Initialise first slide
    gsap.set(slidesRef.current[0], { opacity: 1 });

    // Entry timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(bg, { scale: 1.15, opacity: 0, duration: 1.8, ease: "power2.out" });

    const words = title.querySelectorAll(".hero__title-word");
    tl.from(words, { y: 80, opacity: 0, rotateX: 40, stagger: 0.12, duration: 1, ease: "power3.out" }, "-=1.2");
    tl.from(decorLine, { scaleX: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.4");
    tl.from(subtitle, { y: 30, opacity: 0, duration: 0.8 }, "-=0.3");
    tl.from(ctaContainer.querySelectorAll(".hero__cta"), { y: 25, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.3");

    // Start carousel after entry
    let currentIndex = 0;
    tl.then(() => {
      carouselInterval = setInterval(() => {
        const slides = slidesRef.current;
        if (!slides.length) return;
        const nextIndex = (currentIndex + 1) % slides.length;
        gsap.to(slides[currentIndex], { opacity: 0, duration: 1.2, ease: "power2.inOut" });
        gsap.to(slides[nextIndex],    { opacity: 1, duration: 1.2, ease: "power2.inOut" });
        currentIndex = nextIndex;
      }, 5000);
    });

    // Parallax
    gsap.to(bg, {
      y: "30%",
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
    });

    // Content fade on scroll
    gsap.to(".hero__content", {
      y: -50,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: section, start: "60% top", end: "bottom top", scrub: true },
    });
  }, section);

  return () => {
    ctx.revert();
    if (carouselInterval) clearInterval(carouselInterval);
  };
}, []);
```

**Step 5: Visual verification**

1. Open dev server (`npm run dev`)
2. Navigate to homepage
3. Confirm first image (forest) is visible on load
4. Wait 5 seconds — confirm fade to bracelet image
5. Wait 5 more seconds — confirm fade to workshop image
6. Wait 5 more seconds — confirm loop back to forest

**Step 6: Commit**

```bash
git add src/components/homepage/HeroSection.tsx
git commit -m "feat: add GSAP crossfade carousel to HeroSection background"
```
