"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setIsScrolled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "border-b border-neutral-200 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span
            className={`text-[1.1rem] font-semibold tracking-[-0.02em] transition-colors duration-300 ${
              isScrolled ? "text-[#111111]" : "text-white"
            }`}
          >
            Fuego y Tierra
          </span>
        </a>

        <nav
          className={`hidden items-center gap-8 text-[0.85rem] font-medium transition-colors duration-300 md:flex ${
            isScrolled ? "text-neutral-600" : "text-white/80"
          }`}
        >
          <a
            href="#servicios"
            className={`transition-colors ${
              isScrolled ? "hover:text-[#111111]" : "hover:text-white"
            }`}
          >
            Productos
          </a>
          <a
            href="#contacto"
            className={`transition-colors ${
              isScrolled ? "hover:text-[#111111]" : "hover:text-white"
            }`}
          >
            Contacto
          </a>
        </nav>

        <a
          href="tel:+34652228100"
          className={`inline-flex items-center rounded-full px-5 py-2.5 text-[0.85rem] font-medium tracking-[-0.01em] transition-colors duration-300 ${
            isScrolled
              ? "bg-neutral-950 text-white hover:bg-neutral-800"
              : "border border-white/20 bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          +34 652 22 81 00
        </a>
      </div>
    </header>
  );
}
