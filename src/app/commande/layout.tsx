import type { Metadata } from "next";

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: "Créons ensemble votre bijou unique | SOFICRAFT",
  description:
    "Formulaire de commande sur-mesure pour bijoux fantasy artisanaux. Collaborez avec Sophie pour créer votre bijou unique elfique, féerique ou dragon.",
  openGraph: {
    title: "Créons ensemble votre bijou unique | SOFICRAFT",
    description:
      "Formulaire de commande sur-mesure pour bijoux fantasy artisanaux",
    type: "website",
    url: "https://soficraft.com/commande",
  },
  alternates: {
    canonical: "https://soficraft.com/commande",
  },
};

// ============================================================================
// LAYOUT
// ============================================================================

interface CommandeLayoutProps {
  children: React.ReactNode;
}

export default function CommandeLayout({ children }: CommandeLayoutProps) {
  return <div className="commande-layout">{children}</div>;
}
