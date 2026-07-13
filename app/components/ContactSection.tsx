"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=34652228100";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1100);
  };

  const fieldClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[#111111] placeholder:text-neutral-400 transition focus:border-neutral-400 focus:outline-none";

  return (
    <section
      id="contacto"
      className="relative w-full overflow-hidden border-t border-neutral-200 bg-[#faf7f2] px-6 pt-28 text-[#111111] md:px-10 md:pt-40"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-16 lg:grid-cols-12">
        {/* Left: pitch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <h2 className="font-sans text-[clamp(2.6rem,5.6vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Cuéntanos
            <br />
            <span className="text-neutral-400">sobre tu </span>
            <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">pedido.</span>
          </h2>

          <p className="mt-7 max-w-[52ch] text-[clamp(1rem,1.1vw,1.1rem)] font-light leading-[1.65] text-neutral-500">
            Cuéntanos qué necesitas y te respondemos en menos de un día laborable. Sin compromiso, sin rodeos — solo una conversación directa sobre la cantidad y cuándo lo necesitas.
          </p>

          <ul className="mt-10 space-y-3 text-[0.95rem] font-light text-neutral-500">
            {["Respuesta en menos de un día laborable", "Asesoramiento gratuito sobre el tipo de carbón", "Pedido mínimo de 5 sacos, sin sorpresas"].map((line) => (
              <li key={line} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-1">
            <a href="tel:+34652228100" className="font-sans text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium tracking-[-0.03em] text-[#111111]">
              +34 652 22 81 00
            </a>
            <a href="mailto:info@carvemur.com" className="text-[0.95rem] text-neutral-500 underline-offset-4 hover:underline">
              info@carvemur.com
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center gap-2 text-[0.85rem] font-medium text-neutral-600 underline-offset-4 hover:underline"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.18 3.03 14.69 2 12.04 2Zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-xl shadow-neutral-900/5 md:p-10">
            {/* Decorative amber ring */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-amber-400/30"
              aria-hidden
            />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-neutral-500">
                      Solicitar pedido
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-400">Paso 1 de 1</span>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.24em] text-neutral-500">Nombre</span>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className={fieldClass} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.24em] text-neutral-500">Teléfono</span>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Opcional" className={fieldClass} />
                    </label>
                  </div>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.24em] text-neutral-500">Email</span>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className={fieldClass} />
                  </label>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.24em] text-neutral-500">Cuéntanos más</span>
                    <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Cantidad, ubicación de entrega, fecha aproximada…" className={`${fieldClass} resize-none`} />
                  </label>

                  <div className="my-8 h-px w-full bg-neutral-200" />

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 py-4 font-medium tracking-[-0.01em] text-white transition hover:bg-neutral-800 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-3">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-500 border-t-white" />
                        Enviando
                      </span>
                    ) : (
                      <>Enviar solicitud <span className="text-lg">→</span></>
                    )}
                  </button>

                  <p className="mt-5 text-center text-[0.7rem] uppercase tracking-[0.14em] text-neutral-400">
                    Pedido mínimo de 5 sacos
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-neutral-200 bg-neutral-50">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#111111]">
                      <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-[1.6rem] font-medium leading-[1.1] tracking-[-0.025em] text-[#111111]">
                    Recibido, {name || "gracias"}.
                  </h3>
                  <p className="mx-auto mt-3 max-w-[34ch] text-[0.95rem] font-light leading-[1.6] text-neutral-500">
                    Te contactaremos en menos de un día laborable para confirmar tu pedido.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mx-auto mt-28 max-w-[1400px] border-t border-neutral-200 pb-12 pt-12 md:mt-40">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[28ch]">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="font-sans text-[1.1rem] font-semibold tracking-[-0.02em] text-[#111111]">
                Fuego y Tierra
              </span>
            </div>
            <p className="mt-4 text-[0.9rem] font-light leading-[1.6] text-neutral-500">
              Carbón vegetal en Murcia. Empresa familiar con más de 10 años de experiencia, especializada en hostelería y particulares.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-neutral-400">Explorar</span>
              <ul className="mt-4 space-y-2.5 text-[0.9rem] text-neutral-500">
                <li><a href="#servicios" className="hover:text-[#111111] transition-colors">Productos</a></li>
                <li><a href="#contacto" className="hover:text-[#111111] transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-neutral-400">Contacto</span>
              <ul className="mt-4 space-y-2.5 text-[0.9rem] text-neutral-500">
                <li><a href="tel:+34652228100" className="hover:text-[#111111]">+34 652 22 81 00</a></li>
                <li><a href="mailto:info@carvemur.com" className="hover:text-[#111111]">info@carvemur.com</a></li>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#111111]">WhatsApp</a></li>
                <li className="text-neutral-400">Murcia, España</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-8 text-[0.7rem] uppercase tracking-[0.22em] text-neutral-400 md:flex-row">
          <span>© {new Date().getFullYear()} Fuego y Tierra</span>
          <span>Empresa familiar · Carbón nacional e importado</span>
        </div>
      </footer>
    </section>
  );
}

export default ContactSection;
