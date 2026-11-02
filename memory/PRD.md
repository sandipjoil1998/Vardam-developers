# Vardam's GOA3 — Premium Farmhouse Plots & Construction Website

## Original Problem Statement
Build a complete, premium, five-page static website for Vardam's GOA3 — an independent farmhouse development in Malvan, Konkan, Maharashtra selling farmhouse plots and offering farmhouse construction services. Position as a luxury farmhouse lifestyle destination. Primary objective: generate genuine customer enquiries via WhatsApp (+91 9642601301) and an enquiry form. No public pricing. Forest green + champagne gold + ivory palette, premium serif/sans typography, actual project imagery (to be supplied), zoomable master plan, categorized gallery with lightbox, floating WhatsApp button, no backend/database.

## User Personas
- Prospective plot buyer (urban professional from Mumbai/Pune/Goa seeking a Konkan weekend retreat)
- Plot owner wanting a custom farmhouse designed and built
- Family researching farmhouse communities near Malvan

## Architecture
- Pure static site (per user choice): HTML5 + CSS3 + vanilla JS in `/app/frontend/public/`
- Served by `serve -s public -l 3000` (package.json rewritten; CRA removed). No build step, no backend usage (MongoDB/FastAPI present but unused).
- Central config: `public/assets/js/config.js` (brand, contact, WhatsApp, image URLs, plots, designs)
- Shared chrome: `public/assets/js/shared.js` (header/footer injection, floating WhatsApp, veil page transitions, Lenis smooth scroll, IntersectionObserver reveals, parallax, icon library)
- Feature JS: `home.js` (featured designs, confirm-before-WhatsApp modal, callback), `plots.js` (plot cards, design catalogue + detail modal), `gallery.js` (delegated filters + lightbox prev/next), `zoomer.js` (master plan zoom/pan), `contact.js` (validated enquiry form → formatted WhatsApp message → confirm modal → wa.me open)
- Design: Cormorant Garamond + Manrope, forest #1A3626, gold #D4AF37, ivory #FAF9F6; custom SVG logo mark used as favicon

## Implemented (2026-07)
- Five pages: index, about, plots-designs, master-plan, contact — all 200 OK, shared nav/footer
- Kinetic hero with masked line-by-line reveal, parallax hero, page-veil transitions, editorial marquee, film grain
- Home: intro, 4 highlight cards, 3 featured designs, master plan preview, lifestyle editorial, why-choose rows, final CTA (WhatsApp + Request a Callback)
- About: vision, entrance gate section, philosophy banner, 3-step approach, plot planning, 4 construction services, commitment CTA
- Plots & Designs: 6 clearly-labelled SAMPLE plot cards (no prices, per-plot WhatsApp enquiry) + 4-design catalogue with detail modal (exterior/plan/interior tabs, specs, WhatsApp)
- Master Plan & Gallery: zoom/pan master plan viewer with tools + fullscreen lightbox, 17-image bento gallery with 6 category filters + lightbox prev/next/keyboard, lifestyle section
- Contact: click-to-call, click-to-email, WhatsApp card, Google Maps embed (Malvan region, indicative), validated enquiry form → confirmation modal with message preview → wa.me link with all details
- Floating WhatsApp button on every page; all CTAs use wa.me/919642601301
- SEO meta + JSON-LD, OG tags, responsive (375/768/1366 verified), reduced-motion support
- Tagline updated (2026-07): "Own Your Piece of Paradise" — hero headline, brand subline, SEO/OG copy
- Real entrance-gate render supplied by user is now the homepage hero + About "Arrival" section + gallery (Entrance Gate) at `assets/img/entrance-gate.jpg`; other imagery still placeholder
- Real 3D master plan render supplied by user (2026-07) at `assets/img/master-plan.jpg` — used in master plan zoomer, gallery (plan category), home master-plan preview, About plot-planning section, Plots page hero background
- About page: tagline "Designed for Space, Light, and Quiet Luxury.", Goa 2 / 128-acre / 5500-7500 sqft NA plots / 1.2 FSI copy, Konkan farmhouse hero background
- Header: permanent frosted-ivory glass bar (always visible on scroll) + sliding gold ink indicator that marks the active page, slides on hover, and scroll-spies homepage sections in order (Home → About → Plots & Designs → Master Plan & Gallery → Contact)
- All page heroes use real user-supplied photos (2026-07): Home = entrance-gate.jpg, About = konkan-beach.jpg (+ meadow-sunset.jpg philosophy banner), Plots & Designs = master-plan.jpg, Master Plan & Gallery = konkan-hills.jpg (NOTE: still carries Adobe Stock watermark — needs licensed version), Contact = meadow-sunset.jpg. Remaining placeholders: farmhouse exterior/interior renders + 3D floor plans in cards/gallery

## Backlog / Next
- P0: Swap in real assets when supplied — 3D master plan, entrance gate render, floor plans, exterior/interior renders (update `config.js` image URLs only)
- P1: Real plot inventory & statuses from owner (replace sample `plots` array)
- P1: Additional farmhouse designs as finalized (append to `designs` array — catalogue auto-expands)
- P2: Exact project map pin when address is confirmed
- P2: Publish/deploy the site
