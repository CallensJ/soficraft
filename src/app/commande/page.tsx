"use client";

import Introduction from "@/components/commande/Introduction";
import FormWizard from "@/components/commande/FormWizard";
import FAQ from "@/components/commande/FAQ";

// ============================================================================
// COMMANDE PAGE
// ============================================================================

export default function CommandePage() {
  return (
    <main className="commande-page">
      {/* INTRODUCTION SECTION */}
      <Introduction />

      {/* FORM WIZARD SECTION */}
      <section className="commande-page__form-section">
        <FormWizard />
      </section>

      {/* FAQ SECTION */}
      <section className="commande-page__faq-section">
        <FAQ />
      </section>
    </main>
  );
}
