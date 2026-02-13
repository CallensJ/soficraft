# 🎨 SOFICRAFT - Claude Code Context Guide

## Project Overview

**SOFICRAFT** is an artisanal jewelry showcase website for Sophie, a 29-year-old nurse who creates custom fantasy and fairy-themed jewelry as a passionate side project. The website prioritizes **customer immersion and artistic passion** over aggressive sales.

### Key Facts
- **Owner**: Sophie (jewelry artisan, part-time)
- **Manager**: Johan (project lead)
- **Target Market**: Young adults (fantasy/cosplay enthusiasts), gift buyers
- **Geographic Focus**: Perpignan (local), international reach via Instagram
- **Business Model**: Custom orders, modest target (~few orders/month)
- **Constraint**: Sophie's limited availability due to nursing career

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1.6** (App Router) - Modern React framework
- **React 19.2.3** - Component library
- **TypeScript** - Type-safe development

### Animation & Interactivity
- **GSAP (GreenSock)** - Professional-grade animation library
  - Used for smooth, performant animations
  - Import: `import gsap from 'gsap'`
  - Patterns: Timelines, tweens, scroll triggers

### Styling
- **Sass** - Advanced CSS preprocessing
- **CSS Modules** - Scoped component styling (`.module.css` files)
- **Global CSS** - Shared styles in `globals.css`

### Utilities
- **Clsx** - Conditional CSS class combination
- **Lenis** - Smooth scroll library for premium UX

---

## 📁 Project Structure

```
soficraft/
├── src/app/
│   ├── layout.tsx              # Root layout (metadata, document structure)
│   ├── page.tsx                # Home page component
│   ├── page.module.css         # Home page scoped styles
│   ├── globals.css             # Global styles (fonts, resets, variables)
│   └── favicon.ico             # Site icon
├── public/                     # Static assets (images, fonts, icons)
├── .gitignore                  # Git ignore rules
├── .claude-code.json           # Claude Code config
├── claude.md                   # This file - context for Claude
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── eslint.config.mjs           # ESLint rules
└── README.md                   # User-facing documentation
```

---

## 🎯 Development Guidelines

### Component Development
1. **Create functional components** in `src/app/` directory
2. **Always use TypeScript** (`.tsx` files, no `.jsx`)
3. **Use CSS Modules** for component styles (`Component.module.css`)
4. **Import GSAP** only when needed for animations: `import gsap from 'gsap'`

### Animation Best Practices
- **Use GSAP for**:
  - Smooth page transitions
  - Hover effects on jewelry items
  - Scroll-triggered animations
  - Complex sequenced animations (timelines)
  
- **Optimize**:
  - Use `transform` and `opacity` for best performance
  - Test on mobile devices
  - Consider `prefers-reduced-motion` for accessibility
  
- **Example**:
  ```typescript
  import gsap from 'gsap';
  
  export default function JewelryCard() {
    const cardRef = useRef(null);
    
    useEffect(() => {
      gsap.to(cardRef.current, {
        duration: 0.3,
        y: -10,
        opacity: 1,
        delay: 0.1
      });
    }, []);
    
    return <div ref={cardRef}>...</div>;
  }
  ```

### Styling Strategy
- **Global styles** in `globals.css` (variables, typography, resets)
- **Component styles** in `.module.css` files (scoped, no conflicts)
- **Responsive design** using CSS media queries
- **Mobile-first approach** - design for mobile, enhance for desktop

### TypeScript Standards
- **Strict mode** enabled
- **Type all props** - no implicit `any`
- **Use interfaces** for data structures
- **Component example**:
  ```typescript
  interface JewelryItemProps {
    name: string;
    price: number;
    image: string;
  }
  
  export default function JewelryItem({ name, price, image }: JewelryItemProps) {
    return <div>...</div>;
  }
  ```

---

## 🌳 Git Workflow (CRITICAL!)

### Branch Strategy
```
main       = Production stable (tested, deployed)
develop    = Integration (active development, features tested)
feature/*  = Feature branches (temporary, from develop)
```

### Workflow
1. **Always work on `develop`** (not main)
2. **Create feature branches** from develop: `git checkout -b feature/xyz`
3. **Commit frequently** with clear messages
4. **Push to origin/develop** when ready
5. **Main merges** happen after review and testing

### Commit Message Format
```
feat: add jewelry gallery component
fix: resolve animation stutter on scroll
docs: update README with GSAP guide
style: improve button styling
```

### Critical Rules
- ❌ **NEVER commit** `node_modules/` (managed by `.gitignore`)
- ❌ **NEVER commit** `.next/` (build artifacts)
- ❌ **NEVER commit** `.env` files
- ✅ **DO commit** `package.json`, `package-lock.json`, `src/`, `public/`

---

## 🚀 Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

---

## 🎨 Design & Content Guidelines

### SOFICRAFT Brand
- **Aesthetic**: Fantasy, fairy-themed, artisanal, handmade
- **Color Palette**: To be defined (consult branding docs)
- **Typography**: Elegant, readable fonts (to be finalized)
- **Tone**: Artistic, passionate, inviting (not commercial/salesy)

### Jewelry Content
- **Photography**: High-quality images of Sophie's creations
- **Descriptions**: Focus on artistry and fairy/fantasy themes
- **Storytelling**: Emphasize handmade quality and Sophie's passion
- **Customization**: Highlight custom order capabilities

### User Experience
- **Mobile-first**: All features must work on mobile
- **Fast**: Optimize images and animations for performance
- **Accessible**: Readable text, proper contrast, semantic HTML
- **Immersive**: GSAP animations should enhance experience (not distract)

---

## 🔧 Common Tasks

### Add a New Page
```bash
git checkout develop
git checkout -b feature/new-page
# Create: src/app/new-page/page.tsx
# Create: src/app/new-page/page.module.css
git add .
git commit -m "feat: add new page"
git push origin feature/new-page
# → Create Pull Request to develop
```

### Add GSAP Animation
```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedElement() {
  const ref = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);
  
  return <div ref={ref}>Content</div>;
}
```

### Add a Component
1. Create `src/app/components/ComponentName.tsx`
2. Add TypeScript types for props
3. Use CSS Module `ComponentName.module.css`
4. Import and use in pages

---

## 📋 Current Status & Next Steps

### ✅ Completed
- Project structure setup (Next.js App Router)
- TypeScript configuration
- GSAP + Sass dependencies installed
- `.gitignore` and `.claude-code.json` configured
- README and Claude context guides created

### 🚀 Next Phase
- Create home page with hero section
- Add jewelry gallery component
- Implement smooth scroll animations
- Build contact/custom order form
- Optimize for mobile and SEO

---

## ⚠️ Important Notes

### For Claude Code
- **Read this entire file** when starting work
- **Check current branch** before making changes (should be develop)
- **Always commit** after completing features
- **Test locally** before pushing (npm run dev)
- **Ask clarifying questions** if requirements are unclear

### For Sophie/Johan
- This is a **passion project** - balance quality with Sophie's available time
- Focus on **immersion and storytelling** over sales metrics
- **Respect git workflow** - develop is always integration branch
- **Test features locally** before pushing
- **Iterate based on feedback** - SOFICRAFT brand will evolve

---

## 🔗 Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Check branch | `git branch` |
| Switch branch | `git checkout develop` |
| New feature | `git checkout -b feature/name` |
| See changes | `git status` |
| Commit | `git commit -m "type: message"` |
| Push | `git push origin develop` |

---

**Last Updated**: February 13, 2026  
**Status**: Ready for development  
**Active Branch**: develop
