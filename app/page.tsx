import HeroScrubber from "./components/HeroScrubber";
import ScatterManifesto from "./components/ScatterManifesto";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroScrubber />
      <ScatterManifesto text="Fuego y Tierra: carbón vegetal en Murcia. Empresa familiar con más de 10 años de experiencia, especializada en hostelería y particulares. Trato cercano, calidad garantizada y pedidos con cantidad mínima." />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
