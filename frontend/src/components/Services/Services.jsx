import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown, FaArrowLeft } from 'react-icons/fa';
import interiorBg from '../../assets/interior.jpg';
import exteriorBg from '../../assets/exterior.jpg';
import './services.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const pageRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance for screen 0 (interior) - plays once when scrolled into view
            const entranceTrigger = { trigger: ".services-section", start: "top 75%", once: true };

            gsap.fromTo(".screen-0 .service-title",
                { yPercent: 110, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out", scrollTrigger: entranceTrigger }
            );
            gsap.fromTo(".screen-0 .service-number",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: entranceTrigger }
            );
            gsap.fromTo(".screen-0 .service-desc",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: entranceTrigger }
            );
            gsap.fromTo(".screen-0 .discover-btn",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: entranceTrigger }
            );
            gsap.fromTo(".screen-0 .service-scroll-hint",
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: entranceTrigger }
            );

            // Initial hidden state for screen 1 (exterior) content
            gsap.set(".screen-1 .service-number, .screen-1 .service-desc, .screen-1 .discover-btn", { y: 40, opacity: 0 });
            gsap.set(".screen-1 .service-title", { y: 40, yPercent: 110, opacity: 0 });
            gsap.set(".screen-1 .service-img", { scale: 1.3 });

            // Pinned cinematic transition
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".services-section",
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                    pin: true,
                }
            });

            tl
                // hold on interior while it settles
                .to(".screen-0 .service-img", { scale: 1.2, duration: 1.4, ease: "power2.inOut" }, 1.2)
                .to(".screen-0", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 1.5)
                .to(".screen-1", { opacity: 1, duration: 0.9, ease: "power2.inOut" }, 1.5)
                .to(".screen-1 .service-img", { scale: 1.05, duration: 1.6, ease: "power2.inOut" }, 1.6)
                .to(".screen-1 .service-number", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 1.9)
                .to(".screen-1 .service-title", { y: 0, yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" }, 2.0)
                .to(".screen-1 .service-desc", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 2.25)
                .to(".screen-1 .discover-btn", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 2.4)

                // Progress indicator
                .to(".progress-bar", { scaleX: 1, duration: 2.5, ease: "none" }, 0)
                .to(".progress-dot-2", { width: "1.6rem", opacity: 1, duration: 0.4 }, 1.5)
                .to(".progress-dot-1", { width: "0.45rem", opacity: 0.45, duration: 0.4 }, 1.5);
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleExploreClick = (category) => {
        navigate('/projects', { state: { filter: category } });
    };

    return (
        <section className="services-section" ref={pageRef}>
            {/* Interior Design - full screen */}
            <div className="services-screen screen-0">
                <img src={interiorBg} alt="تصميم داخلي" className="service-img" />
                <div className="service-overlay" />
                <div className="service-inner">
                    <span className="service-number">01</span>
                    <h2 className="service-title">تصميم داخلي</h2>
                    <p className="service-desc">
                        تصاميم داخلية فاخرة تجمع بين الأناقة والوظيفة، لخلق مساحات معيشية مريحة تعكس ذوقكم وشخصيتكم الفريدة.
                    </p>
                    <button
                        onClick={() => handleExploreClick('interior')}
                        className="discover-btn"
                    >
                        اكتشف المزيد
                        <FaArrowLeft className="text-sm" />
                    </button>
                </div>
                <span className="service-scroll-hint">
                    مرر للأسفل
                    <FaArrowDown />
                </span>
            </div>

            {/* Exterior Design - full screen */}
            <div className="services-screen screen-1">
                <img src={exteriorBg} alt="تصميم خارجي" className="service-img" />
                <div className="service-overlay" />
                <div className="service-inner">
                    <span className="service-number">02</span>
                    <h2 className="service-title">تصميم خارجي</h2>
                    <p className="service-desc">
                        واجهات معمارية مبتكرة تعكس الهوية البصرية وتندمج بانسجام مع البيئة المحيطة، بأناقة تصمد أمام الزمن.
                    </p>
                    <button
                        onClick={() => handleExploreClick('exterior')}
                        className="discover-btn"
                    >
                        اكتشف المزيد
                        <FaArrowLeft className="text-sm" />
                    </button>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="progress-indicator">
                <span className="progress-dot progress-dot-1" />
                <span className="progress-dot progress-dot-2" />
            </div>

            {/* Progress bar */}
            <div className="progress-bar" />
        </section>
    );
};

export default Services;
