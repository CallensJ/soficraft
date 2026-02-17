import type { Metadata } from "next";
import "../styles/main.scss";
import SmoothScroll from "../components/SmoothScroll";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "SOFICRAFT - Bijoux Fantasy Artisanaux",
  description:
    "Découvrez nos créations uniques de bijoux fantasy artisanaux. Pièces originales inspirées de la nature et du merveilleux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
