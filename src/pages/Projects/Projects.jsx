import { useState, useRef, useMemo, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiEye } from "react-icons/fi";
import { projects, categories } from "../../data/projects";
import "./projects.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Projects = () => {
  const pageRef = useRef(null);
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("all");

  // Check if filter is passed from Services section
  useEffect(() => {
    if (location.state?.filter) {
      setActiveCategory(location.state.filter);
    }
  }, [location.state]);

  // تصفية المشاريع حسب التصنيف النشط
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const getCategoryName = (categoryId) => {
    const found = categories.find((cat) => cat.id === categoryId);
    return found ? found.name : categoryId;
  };

  const handleFilterChange = (categoryId) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
  };

  // أنيميشن دخول الهيدر عند تحميل الصفحة
  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".projects-header__eyebrow",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(
          ".projects-header__title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.35"
        )
        .fromTo(
          ".projects-header__subtitle",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    },
    { scope: pageRef }
  );

  // أنيميشن دخول شريط التصفية مع ScrollTrigger
  useGSAP(
    () => {
      gsap.fromTo(
        ".projects-filter__btn",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-filter",
            start: "top 85%",
          },
        }
      );
    },
    { scope: pageRef }
  );

  // أنيميشن دخول بطاقات المشاريع - يُعاد تشغيله عند تغيير التصنيف
  // (إعادة الإنشاء عبر dependencies تمنح تأثير "smooth filter transition" تلقائياً)
  useGSAP(
    () => {
      if (!filteredProjects.length) return;
      gsap.fromTo(
        ".projects-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
        }
      );
    },
    { scope: pageRef, dependencies: [activeCategory] }
  );

  return (
    <div ref={pageRef} className="projects-page">
      {/* ==== Header ==== */}
      <header className="projects-header bg-gradient-to-b from-[var(--base-100)] to-[var(--base-200)]">
        <div className="projects-header__inner max-w-7xl mx-auto px-4 md:px-8">
          <span className="projects-header__eyebrow" dir="ltr">
            Our Portfolio
          </span>
          <h1 className="projects-header__title">معرض أعمالنا</h1>
          <p className="projects-header__subtitle">
            مجموعة مختارة من مشاريعنا الداخلية والخارجية، حيث يلتقي التصميم
            بالتفاصيل الدقيقة لصنع مساحات استثنائية
          </p>
        </div>
      </header>

      {/* ==== شريط التصفية ==== */}
      <nav className="projects-filter" aria-label="تصفية المشاريع حسب التصنيف">
        <div className="projects-filter__inner max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleFilterChange(category.id)}
                aria-pressed={isActive}
                className={`projects-filter__btn rounded-full px-7 py-2.5 transition-colors duration-300 ${
                  isActive
                    ? "projects-filter__btn--active bg-[var(--base-300)] text-[var(--base-100)]"
                    : "bg-white text-[var(--base-300)]"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ==== شبكة المشاريع ==== */}
      <section className="projects-grid-section max-w-7xl mx-auto px-4 md:px-8">
        {filteredProjects.length > 0 ? (
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="projects-card group cursor-pointer transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="projects-card__image-wrap relative rounded-2xl overflow-hidden h-64 md:h-80">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    className="projects-card__img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="projects-card__overlay absolute inset-0 flex items-end justify-center pb-7 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="projects-card__overlay-text inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-[20px] bg-white/10 border border-white/30 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <FiEye />
                      عرض التفاصيل
                    </span>
                  </div>
                </div>
                <div className="projects-card__info pt-5 px-1">
                  <h3 className="projects-card__title">{project.title}</h3>
                  <span className="projects-card__category">
                    {getCategoryName(project.category)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="projects-empty">
            لا توجد مشاريع ضمن هذا التصنيف حالياً
          </p>
        )}
      </section>
    </div>
  );
};

export default Projects;
