import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMapPin } from "react-icons/fi";
import "./menumap.css";

gsap.registerPlugin(ScrollTrigger);

const MenuMap = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-map__line",
        { strokeDashoffset: 900 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".menu-map__canvas", start: "top 75%" },
        }
      );
      gsap.fromTo(
        [".menu-map__heading > *", ".menu-map__info > *"],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".menu-map", start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="map" className="menu-map" ref={sectionRef}>
      <div className="menu-map__heading">
        <span className="menu-map__eyebrow">Find Us</span>
        <h2 className="menu-map__title">موقع الاستوديو</h2>
      </div>

      <div className="menu-map__body">
        <div className="menu-map__canvas">
          <svg viewBox="0 0 600 400" className="menu-map__svg" aria-hidden="true">
            <line x1="0" y1="80" x2="600" y2="80" className="menu-map__grid" />
            <line x1="0" y1="200" x2="600" y2="200" className="menu-map__grid" />
            <line x1="0" y1="320" x2="600" y2="320" className="menu-map__grid" />
            <line x1="150" y1="0" x2="150" y2="400" className="menu-map__grid" />
            <line x1="450" y1="0" x2="450" y2="400" className="menu-map__grid" />
            <path
              className="menu-map__line"
              d="M40,340 C120,300 140,180 220,150 S360,60 460,90 S560,180 560,90"
              fill="none"
              strokeDasharray="900"
            />
            <circle cx="300" cy="150" r="7" className="menu-map__pin-dot" />
          </svg>
          <div className="menu-map__pin">
            <FiMapPin />
          </div>
        </div>

        <div className="menu-map__info">
          <h3>استوديو الأناقة المعمارية</h3>
          <p>شارع التصميم، الحي الراقي، المدينة</p>
          <p className="menu-map__hours">السبت – الخميس · 10 ص – 7 م</p>
        </div>
      </div>
    </section>
  );
};

export default MenuMap;
