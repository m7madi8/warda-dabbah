// src/data/menuGalleryData.js
//
// IMPORTANT — integration note:
// If the real project already has project/portfolio data (e.g. src/data/projects.js),
// import and map it here instead of this placeholder array, e.g.:
//
//   import { projects } from "../data/projects";
//   export const menuGallery = projects.map((p, i) => ({
//     id: p.id,
//     title: p.title,
//     category: p.category,
//     image: p.coverImage,
//     size: i % 5 === 0 ? "tall" : i % 3 === 0 ? "wide" : "regular",
//   }));
//
// This placeholder keeps the Menu page fully functional on its own until then.

export const menuGallery = [
  { id: "g-01", title: "فيلا الواحة", category: "سكني", image: "/assets/menu/gallery-01.jpg", size: "tall" },
  { id: "g-02", title: "مكتب النخبة", category: "تجاري", image: "/assets/menu/gallery-02.jpg", size: "regular" },
  { id: "g-03", title: "بيت الرمال", category: "سكني", image: "/assets/menu/gallery-03.jpg", size: "wide" },
  { id: "g-04", title: "استراحة الظل", category: "ضيافة", image: "/assets/menu/gallery-04.jpg", size: "regular" },
  { id: "g-05", title: "جناح الأفق", category: "سكني", image: "/assets/menu/gallery-05.jpg", size: "tall" },
  { id: "g-06", title: "صالة النور", category: "تجاري", image: "/assets/menu/gallery-06.jpg", size: "regular" },
];
