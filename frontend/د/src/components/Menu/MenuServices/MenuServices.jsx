import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuServices } from "../../../data/menuServicesData";
import "./menuservices.css";

gsap.registerPlugin(ScrollTrigger);

const MenuServices = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-services__card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".menu-services__grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="menu-services" ref={sectionRef}>
      <div className="menu-services__heading">
        <span className="menu-services__eyebrow">What We Offer</span>
        <h2 className="menu-services__title">خدماتنا</h2>
      </div>

      <div className="menu-services__grid">
        {menuServices.map((s) => (
          <article className="menu-services__card" key={s.id}>
            <span className="menu-services__index">{s.index}</span>
            <h3 className="menu-services__card-title">{s.title}</h3>
            <p className="menu-services__card-desc">{s.desc}</p>
            <span className="menu-services__card-en">{s.titleEn}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MenuServices;
