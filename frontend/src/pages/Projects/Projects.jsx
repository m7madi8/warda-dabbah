import { useState, useRef, useMemo, useEffect, useCallback } from "react";
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
  const gridRef = useRef(null);
  const filterRef = useRef(null);
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

  // Count projects per category
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return projects.length;
    return projects.filter((p) => p.category === categoryId).length;
  };

  // Animated filter transition
  const handleFilterChange = useCallback(
    (categoryId) => {
      if (categoryId === activeCategory) return;

      const cards = gridRef.current?.querySelectorAll(".projects-card");
      if (cards && cards.length > 0) {
        gsap.to(cards, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.04,
          ease: "power2.in",
          onComplete: () => {
            setActiveCategory(categoryId);
          },
        });
      } else {
        setActiveCategory(categoryId);
      }
    },
    [activeCategory]
  );

  // Keyboard navigation for filter bar (roving tabindex)
  const handleFilterKeyDown = useCallback(
    (e) => {
      const buttons = filterRef.current?.querySelectorAll(".projects-filter__btn");
      if (!buttons) return;
      const btnArray = Array.from(buttons);
      const currentIndex = btnArray.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = -1;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % btnArray.length;
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + btnArray.length) % btnArray.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = btnArray.length - 1;
      }

      if (nextIndex >= 0) {
        btnArray[currentIndex].setAttribute("tabindex", "-1");
        btnArray[nextIndex].setAttribute("tabindex", "0");
        btnArray[nextIndex].focus();
      }
    },
    []
  );

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
  useGSAP(
    () => {
      if (!filteredProjects.length) return;
      gsap.fromTo(
        ".projects-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
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
      <nav
        className="projects-filter"
        aria-label="تصفية المشاريع حسب التصنيف"
      >
        <div
          ref={filterRef}
          role="tablist"
          aria-label="تصنيفات المشاريع"
          onKeyDown={handleFilterKeyDown}
          className="projects-filter__inner max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((category, i) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleFilterChange(category.id)}
                aria-selected={isActive}
                aria-controls="projects-grid-panel"
                className={`projects-filter__btn rounded-full px-7 py-2.5 transition-colors duration-300 ${
                  isActive
                    ? "projects-filter__btn--active bg-[var(--base-300)] text-[var(--base-100)]"
                    : "bg-white text-[var(--base-300)]"
                }`}
              >
                {category.name}
                <span className="projects-filter__count">
                  ({getCategoryCount(category.id)})
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ==== شبكة المشاريع ==== */}
      <section
        id="projects-grid-panel"
        role="tabpanel"
        className="projects-grid-section max-w-7xl mx-auto px-4 md:px-8"
      >
        {filteredProjects.length > 0 ? (
          <div ref={gridRef} className="projects-grid">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="projects-card group"
                aria-label={`عرض مشروع ${project.title}`}
              >
                <div className="projects-card__image-wrap">
                  <img
                    src={project.coverImage}
                    alt={`صورة غلاف مشروع ${project.title}`}
                    loading="lazy"
                    decoding="async"
                    className="projects-card__img"
                  />
                  <div className="projects-card__overlay">
                    <span className="projects-card__overlay-text">
                      <FiEye />
                      عرض التفاصيل
                    </span>
                  </div>
                </div>
                <div className="projects-card__info">
                  <h2 className="projects-card__title">{project.title}</h2>
                  <span className="projects-card__category">
                    {getCategoryName(project.category)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <span className="projects-empty__line" />
            <span className="projects-empty__eyebrow">No Projects</span>
            <p className="projects-empty__text">
              لا توجد مشاريع ضمن هذا التصنيف حالياً — يمكنك استعراض جميع أعمالنا
            </p>
            <button
              type="button"
              className="projects-empty__reset"
              onClick={() => setActiveCategory("all")}
            >
              عرض جميع المشاريع
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;
