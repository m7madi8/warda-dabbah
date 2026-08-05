# Menu Page — Integration Guide

Everything under `src/pages/Menu`, `src/components/Menu/*`, and the two
`src/data/menu*.js` files is new and additive — nothing existing was touched,
because I don't have the real repo in this environment. Drop this `src/`
tree into your project (merge, don't overwrite) and follow the two steps
below to wire it in.

## 1. Register the route

In `src/Router/` (wherever your `<Routes>` tree lives), add:

```jsx
import Menu from "../pages/Menu/Menu";

// inside your existing <Routes> ... </Routes>, alongside your other pages:
<Route path="/menu" element={<Menu />} />
```

`Menu.jsx` does not import or touch `MainLayout.jsx`, `ScrollSmoother`, or
your Lenis setup — it assumes it renders inside your existing layout shell
the same way your other pages do.

## 2. Patch the Home page's "Projects" button

I don't have `Home.jsx`, so I can't edit it directly — but the change is a
two-line patch. Find the existing button (it's the pill-style button shown
in your reference: light pill + dark circular arrow icon) and:

1. Change its label from `"Projects"` / `"المشاريع"` to `"Menu"` / `"القائمة"`.
2. Point its `onClick` (or `<Link to>`) at `/menu` instead of the projects route.

Everything else on that button — size, position, typography, hover/GSAP
animation — stays exactly as-is. For example, if it currently looks like:

```jsx
<Link to="/projects" className="home-hero__cta-btn">
  <span>Projects</span>
  <span className="home-hero__cta-icon"><FiArrowUpLeft /></span>
</Link>
```

the patch is only:

```jsx
<Link to="/menu" className="home-hero__cta-btn">
  <span>Menu</span>
  <span className="home-hero__cta-icon"><FiArrowUpLeft /></span>
</Link>
```

No new classes, no restyling — reuse whatever class names the button
already has.

## 3. Real assets & data (placeholders to swap)

- `src/data/menuGalleryData.js` — currently a standalone placeholder array.
  If you already have `src/data/projects.js` (or similar), replace the
  import with your real project data — the mapping snippet is commented
  at the top of the file.
- `src/data/menuServicesData.js` — placeholder copy; swap in the studio's
  real service list/copy if it exists elsewhere.
- Image paths referenced (`/assets/menu/hero-main.jpg`,
  `/assets/menu/gallery-0X.jpg`, `/assets/menu/nav-*.jpg`) are placeholders —
  drop real photography into `public/assets/menu/` with matching filenames,
  or update the paths in `MenuHero.jsx`, `menuGalleryData.js`, and
  `MenuOverlayNav.jsx`.
- `MenuContact.jsx` — phone/email/address and social links are placeholders;
  update `CONTACT_ITEMS` / `SOCIALS`.
- `BookingModal.jsx` — `handleSubmit` currently just flips to the success
  state locally (per the brief: "No browser alerts", pure UI). Wire it to
  your real lead/API endpoint where marked with the integration-note
  comment.

## Structure added

```
src/pages/Menu/
  Menu.jsx
  menu.css

src/components/Menu/
  MenuOverlayNav/     — signature full-screen nav (image reveal on hover)
  MenuHero/            — cinematic hero, section 1
  MenuGallery/          — masonry grid + lightbox, section 2
  MenuAbout/            — philosophy + animated stats, section 3
  MenuServices/         — glass service cards, section 4
  MenuMap/              — stylized architectural map, section 5
  MenuContact/          — contact + CTA, section 6
  BookingModal/         — fixed CTA + consultation modal
  PillButton/           — shared pill CTA matching your existing button style

src/data/
  menuGalleryData.js
  menuServicesData.js
```

Every component follows your convention: `ComponentName/ComponentName.jsx` +
`componentname.css`, BEM naming, no CSS modules. Every animation uses
`gsap.context()` + `ctx.revert()` on unmount, matches the required pattern
exactly, and only imports `gsap` + `ScrollTrigger` (no new dependencies).
