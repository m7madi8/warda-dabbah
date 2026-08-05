import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";
import { projects, categories } from "../../data/projects";
import Carousel from "../../components/Carousel/Carousel";
import "./projectdetail.css";

gsap.registerPlugin(ScrollTrigger);

const getCategoryName = (categoryId) => {
  const found = categories.find((cat) => cat.id === categoryId);
  return found ? found.name : categoryId;
};

/**
 * ProjectDetail
 * Route: /projects/:id
 *
 * صفحة كاملة لكل مشروع — تحل محل المودال السابق. تدعم أي حقول إضافية
 * موجودة بـ data/projects.js (location / year / area / client) بشكل اختياري
 * دون كسر أي مشروع لا يملكها.
 */
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const projectIndex = projects.findIndex((p) => String(p.id) === String(id));
  const project = projects[projectIndex];
  const nextProject =
    projectIndex > -1 ? projects[(projectIndex + 1) % projects.length] : null;

  useEffect(() => {
    if (!project) return undefined;

    window.scrollTo({ top: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-detail__hero",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".project-detail__reveal",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".project-detail__gallery-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".project-detail__gallery", start: "top 82%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="project-detail project-detail--empty">
        <p>لم يتم العثور على هذا المشروع.</p>
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="project-detail__back"
        >
          <FiArrowRight />
          العودة إلى المعرض
        </button>
      </div>
    );
  }

  const images = project.images?.length ? project.images : [project.coverImage];

  const meta = [
    { label: "التصنيف", value: getCategoryName(project.category) },
    { label: "الموقع", value: project.location },
    { label: "السنة", value: project.year },
    { label: "المساحة", value: project.area },
    { label: "العميل", value: project.client },
  ].filter((m) => m.value);

  return (
    <div ref={pageRef} className="project-detail">
      <Link to="/projects" className="project-detail__back project-detail__reveal">
        <FiArrowRight />
        العودة إلى المعرض
      </Link>

      <header className="project-detail__hero">
        <Carousel images={images} altBase={project.title} />
      </header>

      <section className="project-detail__body">
        <div className="project-detail__intro">
          <span className="project-detail__eyebrow project-detail__reveal">
            {getCategoryName(project.category)}
          </span>
          <h1 className="project-detail__title project-detail__reveal">
            {project.title}
          </h1>
          {project.description && (
            <p className="project-detail__desc project-detail__reveal">
              {project.description}
            </p>
          )}
        </div>

        {meta.length > 0 && (
          <div className="project-detail__meta project-detail__reveal">
            {meta.map((m) => (
              <div className="project-detail__meta-item" key={m.label}>
                <span className="project-detail__meta-label">{m.label}</span>
                <span className="project-detail__meta-value">{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {images.length > 1 && (
        <section className="project-detail__gallery">
          {images.map((src, i) => (
            <div className="project-detail__gallery-item" key={i}>
              <img src={src} alt={`${project.title} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </section>
      )}

      {nextProject && (
        <Link to={`/projects/${nextProject.id}`} className="project-detail__next">
          <span className="project-detail__next-label">المشروع التالي</span>
          <span className="project-detail__next-title">{nextProject.title}</span>
        </Link>
      )}
    </div>
  );
};

export default ProjectDetail;
