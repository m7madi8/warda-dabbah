import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiX, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { menuGallery } from "../../../data/menuGalleryData";
import "./menugallery.css";

gsap.registerPlugin(ScrollTrigger);

const MenuGallery = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-gallery__card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".menu-gallery__grid",
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".menu-gallery__heading > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".menu-gallery__heading", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (i) => setActiveIndex(i);
  const closeLightbox = () => setActiveIndex(null);
  const step = (dir) =>
    setActiveIndex((prev) => (prev + dir + menuGallery.length) % menuGallery.length);

  return (
    <section id="gallery" className="menu-gallery" ref={sectionRef}>
      <div className="menu-gallery__heading">
        <span className="menu-gallery__eyebrow">Selected Works</span>
        <h2 className="menu-gallery__title">أعمال مختارة</h2>
      </div>

      <div className="menu-gallery__grid">
        {menuGallery.map((item, i) => (
          <button
            key={item.id}
            className={`menu-gallery__card menu-gallery__card--${item.size}`}
            onClick={() => openLightbox(i)}
          >
            <img src={item.image} alt={item.title} loading="lazy" />
            <span className="menu-gallery__overlay">
              <span className="menu-gallery__cat">{item.category}</span>
              <span className="menu-gallery__name">{item.title}</span>
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="menu-gallery__lightbox" role="dialog" aria-modal="true">
          <button className="menu-gallery__lb-close" onClick={closeLightbox} aria-label="إغلاق">
            <FiX />
          </button>
          <button
            className="menu-gallery__lb-nav menu-gallery__lb-nav--prev"
            onClick={() => step(-1)}
            aria-label="السابق"
          >
            <FiArrowRight />
          </button>
          <figure className="menu-gallery__lb-frame">
            <img src={menuGallery[activeIndex].image} alt={menuGallery[activeIndex].title} />
            <figcaption>
              <span>{menuGallery[activeIndex].category}</span>
              <h3>{menuGallery[activeIndex].title}</h3>
            </figcaption>
          </figure>
          <button
            className="menu-gallery__lb-nav menu-gallery__lb-nav--next"
            onClick={() => step(1)}
            aria-label="التالي"
          >
            <FiArrowLeft />
          </button>
        </div>
      )}
    </section>
  );
};

export default MenuGallery;
