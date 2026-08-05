import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiX, FiLinkedin, FiInstagram } from "react-icons/fi";
import "./menuoverlaynav.css";

const NAV_ITEMS = [
  { id: "home", label: "الرئيسية", image: "/assets/menu/nav-home.jpg" },
  { id: "gallery", label: "المعرض", image: "/assets/menu/nav-gallery.jpg" },
  { id: "about", label: "الاستوديو", image: "/assets/menu/nav-about.jpg" },
  { id: "services", label: "الخدمات", image: "/assets/menu/nav-services.jpg" },
  { id: "map", label: "الموقع", image: "/assets/menu/nav-map.jpg" },
  { id: "contact", label: "تواصل", image: "/assets/menu/nav-contact.jpg" },
];

/**
 * MenuOverlayNav
 * The signature moment of this page: a full-bleed, dark overlay listing every
 * section as oversized Cairo type. Hovering a word swaps the preview image on
 * the opposite side — same beat as the reference site's nav, adapted to RTL
 * (list sits on the right, image bleeds to the left).
 */
const MenuOverlayNav = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeImage, setActiveImage] = useState(NAV_ITEMS[0].image);

  useEffect(() => {
    if (!overlayRef.current) return;
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
        );
        gsap.fromTo(
          itemsRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      } else {
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        });
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleNavigate = (id) => {
    onClose();
    const target = document.getElementById(id);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    }
  };

  return (
    <div className="menu-overlay-nav" ref={overlayRef} role="dialog" aria-modal="true">
      <button
        className="menu-overlay-nav__close"
        onClick={onClose}
        aria-label="إغلاق القائمة"
      >
        <FiX />
      </button>

      <div className="menu-overlay-nav__inner">
        <nav className="menu-overlay-nav__list">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className="menu-overlay-nav__item"
              onMouseEnter={() => setActiveImage(item.image)}
              onFocus={() => setActiveImage(item.image)}
              onClick={() => handleNavigate(item.id)}
            >
              <span className="menu-overlay-nav__item-index">{`0${i + 1}`}</span>
              <span className="menu-overlay-nav__item-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="menu-overlay-nav__preview">
          <img src={activeImage} alt="" />
          <div className="menu-overlay-nav__preview-tag">Studio</div>
        </div>
      </div>

      <div className="menu-overlay-nav__footer">
        <div className="menu-overlay-nav__socials">
          <a href="#" aria-label="Instagram"><FiInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
        </div>
        <p className="menu-overlay-nav__note">استوديو للتصميم الداخلي والمعماري</p>
      </div>
    </div>
  );
};

export default MenuOverlayNav;
