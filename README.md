# Everyday Carry — 11ty site

This small Eleventy site demonstrates an "everyday carry" (EDC) theme with three items. It uses a layout file and a small shortcode (`itemCard`) for reusable item cards.

What this repo contains:

- A layout in `_includes/layout.liquid` used by all pages.
- A shortcode registered in `.eleventy.js` named `itemCard` (used on the homepage).
- Three item pages under `items/` and placeholder SVG images in `images/`.
- A custom stylesheet in `styles/screen.css` with a new color palette and layout.

## Quickstart

1. Install dependencies (optional — you can use npx to run without installing):

```bash
npm install
```

2. Run the dev server with Eleventy:

```bash
npx @11ty/eleventy --serve
```

3. Open http://localhost:8080 (or the port printed by Eleventy).

## Replace with your original photos

This project includes small SVG placeholders in `images/`. The assignment expects original photos (taken with your phone or camera). To replace them:

- Put your photos in the `images/` folder using the same filenames (`watch.svg` → use a `.jpg`/`.png` if you prefer and update paths accordingly).
- Or edit the image paths in the pages under `items/` to match your filenames.

## Notes

- The `itemCard` shortcode is defined in `.eleventy.js`. It's used on the homepage to render each item consistently.
- The layout is `_includes/layout.liquid` and provides header/footer and site styles.
