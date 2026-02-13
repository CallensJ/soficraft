# SOFICRAFT - Site Vitrine Bijoux Fantasy

## 📌 À propos

SOFICRAFT est un site vitrine pour une artisane créatrice de bijoux fantasy et féériques sur mesure. Sophie crée des bijoux thématisés fantasy/fée en parallèle de sa carrière d'infirmière. Le site cible principalement des clients locaux (Perpignan) avec portée internationale via Instagram.

**Objectif :** Immersion client et partage de la passion artistique, pas maximiser les ventes. 

## 🛠️ Stack Technique

- **Framework** : Next.js 15+ (App Router)
- **Langage** : TypeScript
- **Animations** : GSAP (GreenSock Animation Platform)
- **Styling** : CSS Modules + Global CSS
- **Package Manager** : npm

## 📁 Structure du Projet

```
soficraft/
├── src/
│   └── app/
│       ├── layout.tsx        # Layout principal (métadonnées, structure)
│       ├── page.tsx          # Page d'accueil
│       ├── page.module.css   # Styles de la page
│       ├── globals.css       # Styles globaux
│       └── favicon.ico       # Favicon SOFICRAFT
├── public/                   # Assets statiques (images, fonts)
├── .gitignore               # Ignore node_modules, .next, etc.
├── package.json             # Dépendances (Next.js, GSAP, TypeScript)
├── tsconfig.json            # Configuration TypeScript
├── next.config.ts           # Configuration Next.js
└── README.md                # Ce fichier
```
## Structure du dossier /src/styles

 # STRUCTURE SASS 7-1 PATTERN #
 Architecture complète des dossiers :

 ```
src/styles/
├── main.scss                  # 🔴 Point d'entrée principal (imports tous les fichiers)
├── abstracts/                 # 1 - Variables, fonctions, mixins
│   ├── _variables.scss        # Couleurs, typographies, espacements SOFICRAFT
│   ├── _functions.scss        # Fonctions Sass custom
│   └── _mixins.scss           # Mixins réutilisables (breakpoints, animations)
├── vendors/                   # 2 - CSS externe (reset, normalize, etc.)
│   ├── _normalize.scss        # Normalize.css custom
│   └── _fonts.scss            # Import des fonts Google/custom
├── base/                      # 3 - Styles de base (reset, body, etc.)
│   ├── _reset.scss            # Reset CSS
│   ├── _typography.scss       # Styles de base des éléments (h1, p, etc.)
 │   └── _root.scss             # Variables CSS :root
 ├── layout/                    # 4 - Layout majeur (header, footer, grid)
 │   ├── _header.scss           # Styles du header
 │   ├── _footer.scss           # Styles du footer
 │   ├── _navigation.scss       # Styles de la nav
 │   └── _container.scss        # Container wrapper
 ├── components/                # 5 - Composants réutilisables
 │   ├── _buttons.scss          # Styles des boutons
 │   ├── _cards.scss            # Styles des cards
 │   ├── _gallery.scss          # Styles de la galerie
 │   ├── _form.scss             # Styles des formulaires
 │   └── _modal.scss            # Styles des modales
 ├── pages/                     # 6 - Styles spécifiques aux pages
 │   ├── _home.scss             # Styles page d'accueil
 │   ├── _gallery.scss          # Styles page galerie
 │   ├── _product.scss          # Styles page produit
 │   └── _contact.scss          # Styles page contact
 └── themes/                    # 7 - Thèmes alternatifs
     ├── _light.scss            # Thème clair (défaut)
     └── _dark.scss             # Thème sombre (optionnel)
     
```
 
 
 
 
 
## 🚀 Installation & Setup

```bash
# 1. Cloner et accéder au projet
git clone <repo>
cd soficraft

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev

# 4. Ouvrir http://localhost:3000
```

## 📝 Scripts npm

```bash
npm run dev      # Démarrage serveur dev (port 3000)
npm run build    # Build production
npm start        # Lancer app production
npm run lint     # Vérifier linting (ESLint)
```

## 🌳 Git Workflow (Important!)

- **`main`** : Branche de production (stable, testée)
- **`develop`** : Branche d'intégration (nouvelles features en cours)

```bash
# Workflow recommandé :
git checkout develop          # Toujours partir de develop
git checkout -b feature/xxx   # Créer une branche feature
# ... développer ...
git commit -m "feat: description"
git push origin feature/xxx
# → Créer Pull Request vers develop
# → Merge dans develop
# → Périodiquement merger develop → main
```

**⚠️ Règles importantes :**
- Ne PAS commiter `node_modules/` (géré par `.gitignore`)
- Ne PAS commiter `.next/` (fichiers build générés)
- Utiliser des messages de commit clairs (feat:, fix:, docs:, etc.)

## 🎨 Points Clés pour l'IA (Claude Code)

1. **GSAP pour animations** : Utilisé pour les animations fluides et interactions. Import via `import gsap from 'gsap'`
2. **TypeScript obligatoire** : Tous les composants en `.tsx`, typage strict
3. **Next.js App Router** : Structure basée sur `src/app/`, pas Pages Router
4. **CSS Modules** : Chaque page a son `.module.css` associé
5. **Responsive Design** : Mobile-first approach requis
6. **Métadonnées** : Gérer via `Metadata` export dans `layout.tsx`

## 📦 Dépendances Principales

- `next@latest` - Framework React fullstack
- `gsap` - Animations performantes
- `typescript` - Typage statique

## 🔗 Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [GSAP Documentation](https://gsap.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 👤 Infos Projet

- **Propriétaire** : Sophie (créatrice SOFICRAFT)
- **Gestionnaire Projet** : Johan
- **Public Cible** : Jeunes adultes intéressés par fantasy/cosplay, acheteurs de cadeaux

---

**Dernier update** : Février 2026  
**Branch active** : develop
