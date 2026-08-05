import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./menuabout.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 15, suffix: "+", label: "سنة خبرة" },
  { value: 120, suffix: "+", label: "مساحة منجزة" },
  { value: 98, suffix: "%", label: "رضا العملاء" },
];

const STATEMENTS = [
  "نصمم بالضوء قبل الجدران.",
  "البساطة اختيار، لا نقص.",
  "كل مساحة تحمل توقيعاً واحداً: صاحبها.",
];

const MenuAbout = () => {
  const sectionRef = useRef(null);
  const statRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-about__statement",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".menu-about__statements", start: "top 80%" },
        }
      );

      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].value;
        const counter = { val: 0 };
        gsap.fromTo(
          el.parentElement,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ".menu-about__stats", start: "top 85%" },
          }
        );
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".menu-about__stats", start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="menu-about" ref={sectionRef}>
      <div className="menu-about__heading">
        <span className="menu-about__eyebrow">The Studio</span>
        <h2 className="menu-about__title">فلسفتنا في التصميم</h2>
      </div>

      <div className="menu-about__statements">
        {STATEMENTS.map((s) => (
          <p key={s} className="menu-about__statement">
            {s}
          </p>
        ))}
      </div>

      <div className="menu-about__stats">
        {STATS.map((stat, i) => (
          <div className="menu-about__stat" key={stat.label}>
            <span className="menu-about__stat-value">
              <span ref={(el) => (statRefs.current[i] = el)}>0</span>
              {stat.suffix}
            </span>
            <span className="menu-about__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuAbout;
