import HeroContact from "../../components/contact/HeroContact";
import ContactInfo from "../../components/contact/ContactInfo";
import Horaires from "../../components/contact/Horaires";
import LocalisationLyon from "../../components/contact/LocalisationLyon";
import ContactForm from "../../components/contact/ContactForm";

export const metadata = {
  title: "Contact — SOFICRAFT",
  description:
    "Contacte Sophie pour une création sur-mesure, une question ou simplement pour échanger autour de son univers de bijoux fantasy.",
};

export default function ContactPage() {
  return (
    <main>
      <HeroContact />
      <ContactInfo />
      <Horaires />
      <LocalisationLyon />
      <ContactForm />
    </main>
  );
}
