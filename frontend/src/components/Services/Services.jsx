import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown, FaArrowLeft } from 'react-icons/fa';
import interiorBg from '../../assets/interior.jpg';
import exteriorBg from '../../assets/exterior.jpg';
import './services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const pageRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ✅ الحالة الأولية الثابتة (لا تعتمد على أي ScrollTrigger)
            // autoAlpha بدل opacity: بيتحكم بـ opacity + visibility معًا،
            // فالشاشة المخفية تصير فعليًا غير مرئية وغير قابلة للتفاعل،
            // وما تقدر تتراكب بصريًا فوق الشاشة الظاهرة.
            gsap.set(".screen-0", { autoAlpha: 1, zIndex: 2 });
            gsap.set(".screen-0 .service-img", { scale: 1.05 });
            gsap.set(".screen-0 .service-title", { yPercent: 110, opacity: 0 });
            gsap.set(".screen-0 .service-number, .screen-0 .service-desc, .screen-0 .discover-btn", { y: 40, opacity: 0 });
            gsap.set(".screen-0 .service-scroll-hint", { opacity: 0 });

            gsap.set(".screen-1", { autoAlpha: 0, zIndex: 1 });
            gsap.set(".screen-1 .service-img", { scale: 1.3 });
            gsap.set(".screen-1 .service-title", { y: 40, yPercent: 110, opacity: 0 });
            gsap.set(".screen-1 .service-number, .screen-1 .service-desc, .screen-1 .discover-btn", { y: 40, opacity: 0 });

            // ✅ تايم لاين واحد فقط، مربوط بنفس الـ ScrollTrigger المثبّت (pin)
            // كل شي - دخول screen-0، الانتقال لـ screen-1، وظهور محتواه - بيصير بنفس الحركة المتزامنة مع السكرول
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".services-section",
                    start: "top top",
                    end: "+=250%",
                    scrub: 1,
                    pin: true,
                    // إذا تغيّر ارتفاع الصفحة (مثلاً بعد تحميل الصور) بتعاد حسابات
                    // الـ start/end تلقائيًا بدل ما تضل محفوظة بقيم قديمة خاطئة
                    invalidateOnRefresh: true,
                }
            });

            tl
                // === دخول screen-0 (تصميم داخلي) - أول شي بيصير فور ما يبدأ الـ pin ===
                .to(".screen-0 .service-number", { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0)
                .to(".screen-0 .service-title", { y: 0, yPercent: 0, opacity: 1, duration: 0.6, ease: "power4.out" }, 0.05)
                .to(".screen-0 .service-desc", { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.2)
                .to(".screen-0 .discover-btn", { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.3)
                .to(".screen-0 .service-scroll-hint", { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.35)

                // === استقرار على screen-0 ثم بدء التكبير التمهيدي لصورتها ===
                .to(".screen-0 .service-img", { scale: 1.2, duration: 1.4, ease: "power2.inOut" }, 0.6)

                // === الانتقال من interior إلى exterior ===
                // نرفع z-index لـ screen-1 لحظة ما تبدأ تظهر فوق، ونخفّض screen-0
                // بعد ما تختفي بالكامل — يضمن ترتيب الرسم الصحيح بأي حالة
                .set(".screen-1", { zIndex: 3 }, 2.2)
                .to(".screen-0", { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, 2.2)
                .to(".screen-1", { autoAlpha: 1, duration: 0.9, ease: "power2.inOut" }, 2.2)
                .set(".screen-0", { zIndex: 0 }, 3.1)
                .to(".screen-1 .service-img", { scale: 1.05, duration: 1.6, ease: "power2.inOut" }, 2.3)

                // === ظهور عناصر screen-1 (تصميم خارجي) ===
                .to(".screen-1 .service-number", { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 2.6)
                .to(".screen-1 .service-title", { y: 0, yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" }, 2.7)
                .to(".screen-1 .service-desc", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 2.95)
                .to(".screen-1 .discover-btn", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 3.1)

                // === Progress indicator ===
                .to(".progress-bar", { scaleX: 1, duration: 4, ease: "none" }, 0)
                .to(".progress-dot-2", { width: "1.6rem", opacity: 1, duration: 0.4 }, 2.2)
                .to(".progress-dot-1", { width: "0.45rem", opacity: 0.45, duration: 0.4 }, 2.2);

            // ✅ شبكة أمان: إذا الصور تحمّلت بعد ما GSAP حسب مواقع الـ pin،
            // نعيد حساب ScrollTrigger عشان ما يضل شغال على قياسات قديمة
            const images = pageRef.current.querySelectorAll(".service-img");
            let loadedCount = 0;
            const handleImageLoad = () => {
                loadedCount += 1;
                if (loadedCount === images.length) {
                    ScrollTrigger.refresh();
                }
            };
            images.forEach((img) => {
                if (img.complete) {
                    handleImageLoad();
                } else {
                    img.addEventListener("load", handleImageLoad, { once: true });
                }
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleExploreClick = (category) => {
        navigate('/projects', { state: { filter: category } });
    };

    return (
        <section className="services-section" ref={pageRef}>
            {/* Interior Design - يظهر أولاً */}
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

            {/* Exterior Design - يظهر بعد التمرير */}
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