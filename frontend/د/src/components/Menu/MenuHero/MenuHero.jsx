import { useEffect, useRef } from "react";
import gsap from "gsap";
import PillButton from "../PillButton/PillButton";
import "./menuhero.css";

const MenuHero = ({ onOpenMenu }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".menu-hero__image-wrap",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }
      )
        .fromTo(
          ".menu-hero__title-line",
          { y: "110%" },
          { y: "0%", duration: 1, stagger: 0.12 },
          "-=0.8"
        )
        .fromTo(
          ".menu-hero__tagline, .menu-hero__eyebrow, .menu-hero__cta, .menu-hero__scroll",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="menu-hero" ref={heroRef}>
      <div className="menu-hero__image-wrap">
        <img
          className="menu-hero__image"
          src="/assets/menu/hero-main.jpg"
          alt="أعمال الاستوديو المعمارية"
        />
        <div className="menu-hero__scrim" />
      </div>

      <div className="menu-hero__content">
        <span className="menu-hero__eyebrow">Interior Atelier</span>

        <h1 className="menu-hero__title">
          <span className="menu-hero__title-mask">
            <span className="menu-hero__title-line">فراغك</span>
          </span>
          <span className="menu-hero__title-mask">
            <span className="menu-hero__title-line">يستحق حكاية</span>
          </span>
        </h1>

        <p className="menu-hero__tagline">
          Where architecture becomes atmosphere
        </p>

        <div className="menu-hero__cta">
          <PillButton label="استكشف القائمة" icon="menu" variant="light" onClick={onOpenMenu} />
        </div>
      </div>

      <div className="menu-hero__scroll">
        <span className="menu-hero__scroll-line" />
        <span>مرّر للأسفل</span>
      </div>
    </section>
  );
};

export default MenuHero;
