import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, categories } from '../../data/projects';
import './projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const pageRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Check if filter is passed from Services section
        if (location.state?.filter) {
            setActiveFilter(location.state.filter);
        }
    }, [location.state]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Filter tabs animation
            gsap.fromTo(".filter-tab",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".projects-header",
                        start: "top 80%",
                    }
                }
            );

            // Projects grid animation
            gsap.fromTo(".project-card",
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
                    }
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, [activeFilter]);

    const handleFilterChange = (filterId) => {
        setActiveFilter(filterId);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const closeProjectModal = () => {
        setSelectedProject(null);
    };

    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeFilter);

    return (
        <div className="projects-page" ref={pageRef}>
            {/* Header */}
            <div className="projects-header min-h-[50vh] flex flex-col items-center justify-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-[var(--base-300)] mb-4">
                    مشاريعنا
                </h1>
                <p className="text-xl text-[var(--natural)] text-center max-w-2xl">
                    استكشف مجموعة من مشاريعنا التي تعكس التزامنا بالجودة والإبداع في كل تفصيل
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="filter-container flex justify-center gap-4 mb-12 px-4 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterChange(category.id)}
                        className={`filter-tab px-6 py-3 rounded-full font-bold transition-all ${
                            activeFilter === category.id
                                ? 'bg-[var(--base-300)] text-[var(--base-100)]'
                                : 'bg-white text-[var(--base-300)] hover:bg-[var(--terracotta)]'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card group cursor-pointer"
                            onClick={() => handleProjectClick(project)}
                        >
                            <div className="project-image-container rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={project.coverImage}
                                    alt={project.title}
                                    className="project-image w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-[var(--base-300)] font-bold text-lg">
                                        عرض التفاصيل
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--base-300)] mb-2">
                                {project.title}
                            </h3>
                            <p className="text-[var(--natural)] text-sm">
                                {categories.find(cat => cat.id === project.category)?.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className="project-modal fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeProjectModal}>
                    <div className="modal-content bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header p-6 flex justify-between items-center border-b border-[var(--terracotta)]">
                            <h2 className="text-3xl font-bold text-[var(--base-300)]">
                                {selectedProject.title}
                            </h2>
                            <button
                                onClick={closeProjectModal}
                                className="text-[var(--base-300)] hover:text-[var(--accent)] text-3xl font-bold transition-colors"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body p-6">
                            <div className="modal-images mb-6">
                                {selectedProject.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${selectedProject.title} ${index + 1}`}
                                        className="w-full h-80 object-cover rounded-xl mb-4"
                                    />
                                ))}
                            </div>
                            <div className="modal-info">
                                <span className="inline-block px-4 py-2 bg-[var(--accent)] text-[var(--base-100)] rounded-full text-sm font-bold mb-4">
                                    {categories.find(cat => cat.id === selectedProject.category)?.name}
                                </span>
                                <p className="text-[var(--base-300)] text-lg leading-relaxed">
                                    {selectedProject.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;