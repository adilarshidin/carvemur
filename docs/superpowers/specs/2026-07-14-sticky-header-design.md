# Sticky header

## Context

The site currently has no header/nav — `app/page.tsx` renders straight into
`HeroScrubber` (a full-bleed black 500vh pinned scroll-scrubber section),
followed by `ScrollTextReveal` (`#manifesto`), `ServicesSection`
(`#servicios`), and `ContactSection` (`#contacto`), all on a cream `#faf7f2`
background. The footer in `ContactSection` already establishes the brand
mark (amber dot + "Fuego y Tierra" wordmark) and contact details (phone,
email, WhatsApp).

We're adding a sticky header, present across the whole site, that reuses
these existing style conventions rather than inventing new ones.

## Component

New client component `app/components/Header.tsx`, rendered once in
`app/layout.tsx` (wraps around `{children}`, not per-page) so it persists
across scroll.

**Layout** (`fixed inset-x-0 top-0 z-50`):
- Left: amber dot + "Fuego y Tierra" wordmark, `font-sans font-semibold
  tracking-[-0.02em]` — same treatment as the footer brand block.
- Center/right: nav links `Productos` → `#servicios` and `Contacto` →
  `#contacto`, visible `md:` and up (hidden on mobile — no mobile menu in
  this iteration).
- Far right: phone number `+34 652 22 81 00` as a `rounded-full` pill CTA
  (`tel:` link), styled to match the site's pill buttons.

## Style switching (dark hero → light content)

The header must read clearly over both the black hero and the cream
sections below it:

- **Over the hero** (default state): transparent background, white
  text/wordmark/CTA — legible against the black canvas.
- **Past the hero** (scrolled state): `bg-white/80 backdrop-blur-md
  border-b border-neutral-200`, `#111111` text — matches the cream
  section's card/border language (`ContactSection`'s form panel uses the
  same border + shadow treatment).

Transition trigger: an `IntersectionObserver` watching the hero container
(give `HeroScrubber`'s outer `<div>` `id="hero"`), flipping state when the
hero scrolls out of view. This is the same pattern `ServicesSection`
already uses to observe `#manifesto` for image preloading — no new
technique introduced. `IntersectionObserver` is preferred over a raw
`scrollY` threshold because the black region spans the entire 500vh pinned
hero; a fixed pixel threshold would either flip too early (dark text over
still-black background) or require hardcoding the hero's scroll height.

Both states animate with a CSS `transition-colors` on the wrapper for a
smooth crossfade rather than an abrupt swap.

## Out of scope

- No mobile hamburger menu — nav links simply hide below `md:`, consistent
  with how `ServicesSection`'s short-body copy and thumbnails already hide
  on mobile.
- No scroll-direction hide/show behavior (e.g. hiding on scroll-down) —
  just the two visual states described above.
