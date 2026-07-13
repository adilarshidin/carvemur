"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Service = {
  n: string;
  label: string;
  kicker: string;
  headlineTop: string;
  headlineBottom: string;
  shortBody: string;
  stat: string;
  statLabel: string;
  hero: string;
  thumbs: string[];
};

const img = {
  brasa: "/62ab09291cd96322f7e1cdd5-file-2194520567574295__msi___jpeg-1920w.jpeg",
  ascuas: "/imgi_3_5767589_m_normal_none__msi___jpg-1920w.webp",
  pila: "/137556987_l_normal_none__msi___jpg-1920w.jpeg",
  saco: "/62ab09291cd96322f7e1cdd5-file-3871080323213347__msi___jpeg-1920w.jpeg",
  palet: "/62ab09291cd96322f7e1cdd5-file-499259399238881__msi___jpeg-1920w.jpeg",
  paloRosa: "/carbon_palo_rosa_y_shisha.png",
  encinaHero: "/carbon_encina_hero.png",
  quebrachoHero: "/carbon_quebracho_blanco_hero.png",
  marabuHero: "/carbon_marabu_hero.png",
};

const services: Service[] = [
  {
    n: "01",
    label: "Carbón de encina",
    kicker: "Tipo / Nacional",
    headlineTop: "CARBÓN DE",
    headlineBottom: "ENCINA",
    shortBody:
      "Producto nacional de aroma distintivo, elaborado con madera de encina. La opción de referencia para barbacoas y asados.",
    stat: "780 Kcal/Kg",
    statLabel: "Combustión de 2 a 3 horas",
    hero: img.encinaHero,
    thumbs: [img.pila, img.saco, img.palet, img.brasa],
  },
  {
    n: "02",
    label: "Carbón de quebracho blanco",
    kicker: "Tipo / Premium",
    headlineTop: "QUEBRACHO",
    headlineBottom: "BLANCO",
    shortBody:
      "Madera dura, brasa densa y duradera. No humea ni chispea: control total para interiores y parrillas profesionales.",
    stat: "9500 Kcal/Kg",
    statLabel: "Combustión de 4 a 5 horas",
    hero: img.quebrachoHero,
    thumbs: [img.ascuas, img.palet, img.saco, img.pila],
  },
  {
    n: "03",
    label: "Carbón de marabú",
    kicker: "Tipo / Premium",
    headlineTop: "CARBÓN DE",
    headlineBottom: "MARABÚ",
    shortBody:
      "Sonido metálico, densidad excepcional. Rendimiento prolongado para una brasa sostenida y eficiente.",
    stat: "9000 Kcal/Kg",
    statLabel: "Combustión de 4 a 5 horas",
    hero: img.marabuHero,
    thumbs: [img.palet, img.pila, img.saco, img.brasa],
  },
  {
    n: "04",
    label: "Carbón de palo rosa y shisha",
    kicker: "Tipo / Premium shisha",
    headlineTop: "PALO ROSA",
    headlineBottom: "Y SHISHA",
    shortBody:
      "Categoría premium: durabilidad y eficiencia máximas. Calor constante para sesiones largas de parrilla o shisha.",
    stat: "9800 Kcal/Kg",
    statLabel: "Combustión de 4 a 5 horas",
    hero: img.paloRosa,
    thumbs: [img.saco, img.palet, img.pila, img.brasa],
  },
];

const formats = [
  {
    label: "Sacos de 15 kg",
    kicker: "Hostelería y negocios",
    body: "Ideales para restaurantes, parrillas y otros negocios que requieren grandes cantidades de carbón vegetal de alta calidad. Llámanos y pide el tamaño que necesites.",
    hero: "/sacos_de_15.png",
  },
  {
    label: "Formatos de 3 kg y 5 kg",
    kicker: "Particulares y comercios",
    body: "Presentaciones pensadas para ser más accesibles a particulares y pequeños comercios que buscan ofrecer a sus clientes carbón de calidad superior.",
    hero: "/formatos.png",
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Only start fetching these images once the user has scrolled past the
  // hero "video" and reached the manifesto (second) section — avoids
  // competing with the hero frames for bandwidth on initial load.
  const [canPreload, setCanPreload] = useState(false);

  useEffect(() => {
    const el = document.getElementById("manifesto");
    if (!el) {
      setCanPreload(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanPreload(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="servicios"
      className="relative w-full overflow-hidden bg-[#faf7f2] py-28 text-[#111111] md:py-40"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      {/* Preload every hero image up front, at the same fill/100vw size the
          open panel renders it at, so it's already cached by the time a
          closed card is clicked and its panel expands. Deferred until the
          user has scrolled past the hero and into the manifesto section. */}
      {canPreload && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 h-[480px] w-full overflow-hidden opacity-0"
          style={{ top: -99999 }}
        >
          {services.map((s) => (
            <div key={s.hero} className="relative h-full w-full">
              <Image src={s.hero} alt="" fill sizes="100vw" priority />
            </div>
          ))}
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <h2 className="font-sans text-[clamp(2.4rem,5.4vw,4.8rem)] font-medium leading-[1] tracking-[-0.045em] md:col-span-12">
            Calidad garantizada
            <br />
            <span className="text-neutral-400">para </span>
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
              hostelería y particulares
            </span>
            <span className="text-neutral-400">.</span>
          </h2>
          <div className="md:col-span-6 md:col-start-7">
            <p className="mt-2 max-w-[58ch] text-[clamp(1rem,1.1vw,1.1rem)] font-light leading-[1.65] text-neutral-500">
              Carbón vegetal de excelente calidad, producido en España e
              importado desde Cuba. Servimos a hostelería y particulares
              que buscan un producto superior, con pedido mínimo de 5
              sacos. Toca un tipo de carbón para verlo abierto.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        {services.map((s, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={s.n}
              className="group relative overflow-hidden border-b border-neutral-200"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-expanded={isActive}
                className="block w-full cursor-pointer text-left focus:outline-none"
              >
                <motion.div
                  animate={{ height: isActive ? 480 : 100 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full overflow-hidden"
                >
                  {/* PANEL ABIERTO */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={s.hero}
                          alt={s.label}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/70" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                        <div
                          className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 py-6 md:px-10 md:py-10"
                          style={{ height: 480 }}
                        >
                          <div className="flex items-start justify-between gap-6">
                            <div className="flex items-center gap-3">
                              <span className="bg-gradient-to-br from-amber-400 to-yellow-300 bg-clip-text font-sans text-[1.4rem] font-medium leading-none text-transparent">
                                {s.n}
                              </span>
                              <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/70">
                                {s.kicker}
                              </span>
                            </div>
                            <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/55">
                              En detalle
                            </span>
                          </div>
                          <div className="flex items-end justify-between gap-10">
                            <h3 className="max-w-[16ch] font-sans text-[clamp(2.4rem,6.5vw,6rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white">
                              {s.headlineTop}
                              <br />
                              <span className="text-white/70">
                                {s.headlineBottom}
                              </span>
                            </h3>
                            <div className="hidden shrink-0 flex-col items-end gap-1 text-right md:flex">
                              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text font-sans text-[clamp(2rem,3.4vw,3rem)] font-medium leading-none text-transparent">
                                {s.stat}
                              </span>
                              <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/55">
                                {s.statLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* PANEL CERRADO */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
                          <div className="flex items-center justify-between gap-4 md:grid md:grid-cols-12 md:gap-6">
                            <div className="flex items-center gap-4 md:col-span-1 md:justify-start">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:border-neutral-400">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path
                                    d="M5 0v10M0 5h10"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="md:col-span-4">
                              <h3 className="font-sans text-[clamp(1.4rem,2vw,2rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                                {s.label}
                              </h3>
                              <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.32em] text-neutral-400">
                                {s.n} — {s.kicker}
                              </span>
                            </div>
                            <div className="hidden md:col-span-4 md:block">
                              <p className="max-w-[44ch] text-[0.92rem] font-light leading-[1.6] text-neutral-500">
                                {s.shortBody}
                              </p>
                            </div>
                            <div className="hidden md:col-span-3 md:block">
                              <div className="flex items-center justify-end gap-1.5">
                                {s.thumbs.slice(0, 4).map((src, j) => (
                                  <div
                                    key={j}
                                    className="relative h-12 w-12 overflow-hidden rounded-md border border-neutral-200 md:h-14 md:w-14"
                                  >
                                    <Image
                                      src={src}
                                      alt=""
                                      fill
                                      sizes="56px"
                                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-24 max-w-[1400px] px-6 md:mt-32 md:px-10">
        <h3 className="font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          Formatos disponibles{" "}
          <span className="text-neutral-400">para todos los usos.</span>
        </h3>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {formats.map((f) => (
            <div
              key={f.label}
              className="group relative h-72 overflow-hidden rounded-2xl md:h-80"
            >
              <Image
                src={f.hero}
                alt={f.label}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
                <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/60">
                  {f.kicker}
                </span>
                <h4 className="mt-2 font-sans text-[clamp(1.3rem,2.4vw,1.8rem)] font-medium leading-tight tracking-[-0.02em] text-white">
                  {f.label}
                </h4>
                <p className="mt-2 max-w-[42ch] text-[0.88rem] font-light leading-[1.55] text-white/75">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-24 max-w-[46ch] px-6 text-center font-sans text-[clamp(1.2rem,1.8vw,1.7rem)] leading-[1.3] tracking-[-0.02em] text-[#111111] md:mt-32 md:px-10">
        No dudes en contactarnos para tu pedido.{" "}
        <span className="text-neutral-400">
          Producto superior, servicio excepcional.
        </span>
      </p>
    </section>
  );
}

export default ServicesSection;
