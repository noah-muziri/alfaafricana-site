# alfaafricana.com

Redesign of the Alfa Africana site. Same sections, copy, images, logo, Montserrat type and teal accent as the current site, with a cleaner layout and a scroll-driven 3D logo.

Plain HTML, CSS and JavaScript, no build step. Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

## Layout

- `index.html`, `css/style.css`, `js/main.js`: page, styling, nav / reveal / counters / form.
- Partners section: ZKTeco (Master Distributor, East Africa) and ASSA ABLOY (Distributor).
- Catalogue (`#catalogue`): a pinned section where vertical scroll drives a sideways "access journey" (Identify, Control entry, Watch & connect) through 12 product cards. The product art is original SVG illustration (symbols at the top of `index.html`), not vendor photography; swap in supplied product photos when available.
- `js/topo.js`: generates the topographic contour-line backdrop (a made-up terrain contoured with marching squares) used behind every section.
- Design language: warm paper and deep green-black sections stacked with rounded tops, Instrument Serif italic accents against Montserrat, a full-screen menu, a corner "free site survey" card, a scroll-reactive marquee and a scattered photo gallery. Inspired by the feel of landonorris.com, but all code, patterns and assets here are our own.
- `js/logo3d.js`: the 3D logo. One fixed canvas; the logo glides between the `data-stage` boxes in the page (hero, about, stats, contact) and spins as you scroll.
- `js/logo-path.js`: the outline of the real logo mark, traced from `images/alfa-logo.png` into vector loops so it can be extruded. The "ALFA AFRICANA" lettering is rebuilt from strokes (the source PNG is too small to trace cleanly), so it is a close match, not a copy.
- `js/i18n.js`: the EN / LG switch in the top bar. It swaps every text node using a dictionary keyed by the English text and remembers the choice. The Luganda is a first draft and should be reviewed by a native speaker. When you add or change English copy, add the matching entry here.
- `vendor/three.min.js`: Three.js r128 (MIT).
- `images/`: images from the current site.

## Notes

- Falls back to the flat logo PNG when WebGL is unavailable, and spinning stops under `prefers-reduced-motion`.
- The current site's "Know more" button points at `product.html`, which 404s; here it scrolls to Services.
- The form has no backend (neither does the current one). Submitting opens the visitor's email app addressed to info@alfaafricana.com. Swap in a form service or PHP handler when ready.
- The old header's five social icons all linked to `#`, so they are left out until real URLs exist.
- To deploy on the GoDaddy cPanel hosting, upload everything to `public_html`.
