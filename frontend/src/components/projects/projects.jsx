import { useState, useRef, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiEye, FiX } from "react-icons/fi";
import { projects, categories } from "../../data/projects";
import "./projects.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Projects = () => {
  const pageRef = useRef(null);
  const modalBackdropRef = useRef(null);
  const modalContentRef = useRef(null);
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

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

  const openProject = (project) => setSelectedProject(project);

  // إغلاق المودال: تشغيل أنيميشن الخروج ثم إزالته من الشجرة بعد اكتماله
  const closeProject = () => {
    if (!modalBackdropRef.current || !modalContentRef.current) {
      setSelectedProject(null);
      return;
    }
    gsap
      .timeline({ onComplete: () => setSelectedProject(null) })
      .to(modalContentRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        modalBackdropRef.current,
        { opacity: 0, duration: 0.25, ease: "power2.in" },
        "-=0.15"
      );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeProject();
  };

  // إغلاق المودال عبر مفتاح Escape
  useEffect(() => {
    if (!selectedProject) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

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

  // أنيميشن فتح المودال: fadeIn للخلفية + slideUp للمحتوى
  useGSAP(
    () => {
      if (!selectedProject) return;
      if (!modalBackdropRef.current || !modalContentRef.current) return;

      gsap.set(modalBackdropRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, { opacity: 0, y: 40, scale: 0.96 });

      gsap
        .timeline()
        .to(modalBackdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          modalContentRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
          "-=0.15"
        );
    },
    { scope: pageRef, dependencies: [selectedProject] }
  );

  const modalImages = selectedProject
    ? selectedProject.images?.length
      ? selectedProject.images
      : [selectedProject.coverImage]
    : [];

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
              <article
                key={project.id}
                className="projects-card group cursor-pointer transition-transform duration-500 hover:-translate-y-2"
                onClick={() => openProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProject(project);
                  }
                }}
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
              </article>
            ))}
          </div>
        ) : (
          <p className="projects-empty">
            لا توجد مشاريع ضمن هذا التصنيف حالياً
          </p>
        )}
      </section>

      {/* ==== مودال تفاصيل المشروع ====
          تُعرض عبر Portal إلى document.body كي لا يتأثر التموضع الثابت (fixed)
          بتحويلات (transform) عنصر ScrollSmoother في MainLayout */}
      {selectedProject &&
        createPortal(
          <div
            className="projects-modal fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            ref={modalBackdropRef}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-modal-title"
          >
            <div
              className="projects-modal__content bg-[var(--base-100)] rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
              ref={modalContentRef}
            >
              <div className="projects-modal__header sticky top-0 flex items-center justify-between gap-4 px-6 md:px-10 py-5 bg-[var(--base-100)]">
                <h2
                  id="projects-modal-title"
                  className="projects-modal__title"
                >
                  {selectedProject.title}
                </h2>
                <button
                  type="button"
                  className="projects-modal__close"
                  onClick={closeProject}
                  aria-label="إغلاق"
                >
                  <FiX />
                </button>
              </div>

              <div className="projects-modal__body px-6 md:px-10 pb-8">
                <span className="projects-modal__badge inline-block rounded-full px-4 py-1.5">
                  {getCategoryName(selectedProject.category)}
                </span>

                <div className="projects-modal__gallery grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {modalImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedProject.title} - ${index + 1}`}
                      loading="lazy"
                      className="projects-modal__image rounded-xl w-full h-56 object-cover"
                    />
                  ))}
                </div>

                <p className="projects-modal__description">
                  {selectedProject.description}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Projects;