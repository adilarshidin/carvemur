import HeroScrubber from "./components/HeroScrubber";
import ScrollTextReveal from "./components/ScrollTextReveal";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroScrubber />
      <ScrollTextReveal
        eyebrow="Nuestra Filosofía"
        text="No vendemos sacos de carbón. Cuidamos el fuego de cada barbacoa, cada parrilla y cada noche de brasas en Murcia — con un producto nacional e importado que arde limpio, dura horas y nunca decepciona."
      />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
