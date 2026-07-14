# Sticky Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sticky header, present site-wide, that starts transparent/white over the dark hero and switches to a light blurred bar once the hero scrolls out of view.

**Architecture:** One new client component (`Header.tsx`) rendered once in `app/layout.tsx`. It watches the hero section via `IntersectionObserver` (the same technique `ServicesSection.tsx` already uses to observe `#manifesto`) and flips a boolean state that drives Tailwind class swaps for background, border, and text color.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4. No test framework is configured in this repo (`package.json` has no test runner) — verification is via `npm run lint`, `npm run build`, and manual browser check with the dev server, matching how the prior `hero-video-frame-swap` work in this repo was verified.

## Global Constraints

- Brand wordmark: "Fuego y Tierra" with an amber dot (`bg-amber-500`), `font-sans font-semibold tracking-[-0.02em]` — copied from the existing footer block in `ContactSection.tsx:194-199`.
- Nav links: `Productos` → `#servicios`, `Contacto` → `#contacto` — the same anchor IDs the footer nav already links to (`ContactSection.tsx:209-210`).
- Phone CTA: `+34 652 22 81 00` as a `tel:+34652228100` link, pill-shaped (`rounded-full`).
- Font family for the header text: `var(--font-geist-sans), sans-serif`, matching `ContactSection.tsx:33` and `ServicesSection.tsx:133`.
- Dark (over-hero) state: transparent background, white text.
- Light (scrolled) state: `bg-white/80 backdrop-blur-md border-b border-neutral-200`, `#111111` text — matches `ContactSection.tsx`'s form-panel border/blur language.
- Nav links hidden below `md:` — no mobile menu in this iteration.
- No scroll-direction hide/show — only the two visual states.

---

### Task 1: Add `id="hero"` to the hero container

**Files:**
- Modify: `app/components/HeroScrubber.tsx:135`

**Interfaces:**
- Consumes: nothing new.
- Produces: a DOM element with `id="hero"` that Task 2's `Header` component observes via `document.getElementById("hero")`.

- [ ] **Step 1: Add the id**

In `app/components/HeroScrubber.tsx`, change line 135 from:

```tsx
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
```

to:

```tsx
    <div
      ref={containerRef}
      id="hero"
      className="relative h-[500vh] w-full bg-black"
    >
```

- [ ] **Step 2: Verify no regression**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add app/components/HeroScrubber.tsx
git commit -m "Add id to hero container for header scroll observer"
```

---

### Task 2: Build the `Header` component

**Files:**
- Create: `app/components/Header.tsx`

**Interfaces:**
- Consumes: the `#hero` element produced by Task 1 (falls back gracefully — see Step 1 — if it's ever missing, e.g. on a future page without a hero).
- Produces: a default-exported `Header` React component with no props, ready to be rendered by Task 3 in `app/layout.tsx`.

- [ ] **Step 1: Write the component**

Create `app/components/Header.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors in `app/components/Header.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/components/Header.tsx
git commit -m "Add sticky Header component with dark/light scroll states"
```

---

### Task 3: Wire `Header` into the root layout and verify end-to-end

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Header` default export from Task 2 (`app/components/Header.tsx`).
- Produces: nothing further downstream — this is the final integration point.

- [ ] **Step 1: Render `Header` in the layout**

In `app/layout.tsx`, add the import:

```tsx
import Header from "./components/Header";
```

and change the body from:

```tsx
      <body className="min-h-full flex flex-col">
        <ReactLenis root>{children}</ReactLenis>
      </body>
```

to:

```tsx
      <body className="min-h-full flex flex-col">
        <ReactLenis root>
          <Header />
          {children}
        </ReactLenis>
      </body>
```

- [ ] **Step 2: Run the build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors.

- [ ] **Step 3: Manual browser verification**

Run: `npm run dev`, open the site in a browser.

Confirm:
- On page load, the header is transparent with a white "Fuego y Tierra" wordmark, white nav links, and a white-on-translucent phone pill, all legible over the black hero.
- Scrolling down through the ~500vh hero, the header stays in its transparent/white state the whole time (the hero is black for its full scroll range).
- Once scrolled past the hero into the cream `#manifesto`/`#servicios` sections, the header switches to `bg-white/80 backdrop-blur-md` with a `#111111` wordmark, dark nav links, and a dark pill CTA.
- Scrolling back up past the hero boundary reverts the header to the transparent/white state.
- Clicking `Productos` scrolls to `#servicios`; clicking `Contacto` scrolls to `#contacto`; the phone pill is a working `tel:` link.
- Resize to a mobile viewport width: nav links disappear, wordmark and phone pill remain.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "Render sticky Header in root layout"
```
