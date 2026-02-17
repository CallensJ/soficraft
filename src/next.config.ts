import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================================
  // IMAGE OPTIMIZATION
  // ============================================================
  images: {
    // Qualités supportées pour les images Next.js Image
    // Permet l'utilisation de quality="85" dans les composants Image
    qualities: [75, 85],

    // Formats acceptés (WebP prioritaire pour les navigateurs modernes)
    formats: ["image/avif", "image/webp"],

    // Tailles de remise à l'échelle automatiques
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ============================================================
  // REACT & COMPILER
  // ============================================================
  reactStrictMode: true,

  // ============================================================
  // TYPESCRIPT
  // ============================================================
  typescript: {
    // Ne pas faire échouer la compilation sur les erreurs TypeScript
    // À ajuster selon vos préférences (true = stricte)
    ignoreBuildErrors: false,
  },

  // ============================================================
  // WEBPACK CUSTOMIZATION (optionnel)
  // ============================================================
  webpack: (config) => {
    // Vos configurations webpack custom ici si nécessaire
    return config;
  },

  // ============================================================
  // REDIRECTS (optionnel)
  // ============================================================
  async redirects() {
    return [];
  },

  // ============================================================
  // REWRITES (optionnel)
  // ============================================================
  async rewrites() {
    return [];
  },
};

export default nextConfig;
