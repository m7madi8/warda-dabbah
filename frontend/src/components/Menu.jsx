import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiLinkedin, FiInstagram, FiTwitter } from "react-icons/fi";
import menuVisualImg from "../assets/warda_dabbah-20260805-0001.jpg";
import "./menu.css";

gsap.registerPlugin(useGSAP);

// عدّل المسارات هنا لتطابق المسارات الفعلية المعرّفة في Router.jsx
const navItems = [
  { label: "الرئيسية", path: "/" },
  { label: "المعرض", path: "/projects" },
  { label: "من نحن", path: "/about" },
  { label: "الخدمات", path: "/services" },
  { label: "الخريطة", path: "/map" },
  { label: "تواصل معنا", path: "/contact" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  const openMenu = () => setIsOpen(true);

  // إغلاق مع أنيميشن خروج قبل إزالة العنصر من الشجرة - تأثير كبسولة
  const closeMenu = () => {
    if (!overlayRef.current || !panelRef.current) {
      setIsOpen(false);
      return;
    }
    gsap
      .timeline({ onComplete: () => setIsOpen(false) })
      .to(
        ".menu-link",
        { y: -24, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.in" },
        0
      )
      .to(panelRef.current, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.in" }, 0)
      .to(overlayRef.current, { opacity: 0, scale: 0, duration: 0.6, ease: "power3.inOut" }, 0.1);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeMenu();
  };

  // إغلاق عبر مفتاح Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // أنيميشن الدخول: تأثير كبسولة مثل اللودر
  useGSAP(
    () => {
      if (!isOpen || !overlayRef.current || !panelRef.current) return;

      gsap.set(overlayRef.current, { opacity: 0, scale: 0 });
      gsap.set(panelRef.current, { opacity: 0, scale: 0.95 });

      gsap
        .timeline()
        .to(overlayRef.current, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: "power3.inOut" 
        })
        .to(
          panelRef.current,
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".menu-link",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          ".menu-index",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.08 },
          "<"
        )
        .fromTo(
          ".menu-visual__img",
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".menu-social",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          "-=0.35"
        );
    },
    { dependencies: [isOpen] }
  );

  return createPortal(
    <>
      <button
        type="button"
        onClick={isOpen ? closeMenu : openMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        className="menu-toggle fixed bottom-8 left-1/2 -translate-x-1/2 z-[95] inline-flex items-center gap-3 rounded-full bg-white pr-2 pl-5 py-2 shadow-lg"
      >
        <span className="menu-toggle__icon flex items-center justify-center rounded-full bg-[var(--base-300)] text-[var(--base-100)]">
          {isOpen ? "✕" : "☰"}
        </span>
        <span className="menu-toggle__label">{isOpen ? "إغلاق" : "القائمة"}</span>
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          className="menu-overlay fixed inset-0 z-[90] bg-[var(--base-300)]"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
        >
          <div
            ref={panelRef}
            className="menu-panel h-full flex flex-col lg:flex-row"
          >
            {/* لوحة الروابط */}
            <nav className="menu-nav flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 py-24">
              <ul className="menu-nav__list">
                {navItems.map((item, index) => (
                  <li key={item.path} className="menu-nav__item">
                    <Link to={item.path} onClick={closeMenu} className="menu-link">
                      <span className="menu-index" dir="ltr">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="menu-link__text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="menu-footer">
                <div className="menu-social">
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="menu-social__link"
                  >
                    <FiLinkedin />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="menu-social__link"
                  >
                    <FiInstagram />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="menu-social__link"
                  >
                    <FiTwitter />
                  </a>
                </div>
                <p className="menu-footer__text">
                  شريككم الهندسي الموثوق لتحويل أفكاركم إلى مخططات ومشاريع
                  متكاملة
                </p>
              </div>
            </nav>

            {/* اللوحة البصرية */}
            <div className="menu-visual hidden lg:block lg:w-[42%]">
              <div className="menu-visual__frame">
                <img
                  src={menuVisualImg}
                  alt="أعمالنا الهندسية"
                  className="menu-visual__img"
                />
                <div className="menu-visual__overlay" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Menu;
