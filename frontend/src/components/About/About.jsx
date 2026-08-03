import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import engineerPhoto from '../../assets/warda-dabbah.jpg';
import './about.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.about-image-wrapper',
                { scale: 0.92, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-section',
                        start: 'top 75%',
                    },
                }
            );

            gsap.from('.about-image-wrapper img', {
                scale: 1.15,
                duration: 1.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 75%',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            gsap.fromTo('.about-text',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-section',
                        start: 'top 70%',
                    },
                }
            );

            // Count-up animation for stats
            document.querySelectorAll('.stat-number').forEach((el) => {
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                const obj = { value: 0 };
                gsap.to(obj, {
                    value: target,
                    duration: 2.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about-stats',
                        start: 'top 85%',
                    },
                    onUpdate: () => {
                        el.textContent = `${Math.round(obj.value)}${suffix}`;
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about-section min-h-screen py-16 md:py-24 px-2 md:px-8 mb-10 flex items-center" ref={sectionRef}>
            <div className="max-w-7xl mx-auto w-full">
                <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-stretch">
                    <div className="about-image-wrapper relative rounded-[2.5rem] overflow-hidden min-h-[420px] md:min-h-[560px] order-2 lg:order-1">
                        <img
                            src={engineerPhoto}
                            alt="WARDA DABBAH - Interior Design"
                            className="w-full h-full object-cover object-top"
                        />
                        <div className="about-image-overlay absolute inset-0 pointer-events-none" />
                        <div className="about-image-badge absolute bottom-6 right-6 md:bottom-8 md:right-8">
                            <span className="about-badge-name">WARDA DABBAH</span>
                            <span className="about-badge-tagline">Interior Design</span>
                        </div>
                    </div>

                    <div className="about-content flex flex-col justify-center px-2 md:px-6 order-1 lg:order-2">
                        <span className="about-text about-label text-[var(--accent)] text-sm md:text-base font-semibold tracking-widest mb-4">
                            من نحن
                        </span>
                        <h2 className="about-text text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--base-300)] mb-6 leading-tight">
                            شغف بالتفاصيل
                            <br />
                            <span className="text-[var(--natural)]">وإبداع في كل زاوية</span>
                        </h2>
                        <div className="about-text space-y-5 text-base md:text-lg text-[var(--natural)] leading-relaxed">
                            <p>
                                WARDA DABBAH مهندسة معمارية ومصممة ديكور داخلي، تؤمن بأن كل مساحة تحكي قصة — وكل تفصيل يعكس شخصية أصحابها وذوقهم الرفيع.
                            </p>
                            <p>
                                فلسفتها في التصميم تقوم على دمج الأصالة العربية المعاصرة مع أحدث صيحات التصميم العالمي، مستخدمة مواد طبيعية فاخرة وألوان دافئة تخلق أجواء مريحة ومبهجة.
                            </p>
                            <p>
                                تعمل عن كثب مع عملائها لفهم احتياجاتهم وتطلعاتهم، ثم تحوّل أحلامهم إلى واقع ملموس يجمع بين الجمال والعملية والاستدامة.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats - merged into About */}
                <div className="about-stats relative mt-14 md:mt-24 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden px-6 md:px-14 py-12 md:py-20">
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-0">
                        <div className="stat-item md:flex-1 md:pe-14 md:border-e border-[var(--accent)] text-center md:text-start">
                            <div
                                className="stat-number text-7xl md:text-[8.5rem] leading-none font-bold text-[var(--base-300)]"
                                data-target="10"
                                data-suffix="+"
                            >
                                +10
                            </div>
                            <div className="mt-4 text-base md:text-lg text-[var(--base-300)] font-semibold">سنوات خبرة</div>
                        </div>

                        <div className="stat-item md:flex-1 md:px-14 md:border-e border-[var(--accent)] text-center md:text-start">
                            <div
                                className="stat-number text-6xl md:text-7xl leading-none font-bold text-[var(--base-300)]"
                                data-target="50"
                                data-suffix="+"
                            >
                                +50
                            </div>
                            <div className="mt-4 text-base md:text-lg text-[var(--base-300)] font-semibold">مشروع منجز</div>
                        </div>

                        <div className="stat-item md:flex-1 md:ps-14 text-center md:text-start">
                            <div
                                className="stat-number text-6xl md:text-7xl leading-none font-bold text-[var(--base-300)]"
                                data-target="100"
                                data-suffix="%"
                            >
                                100%
                            </div>
                            <div className="mt-4 text-base md:text-lg text-[var(--base-300)] font-semibold">رضا العملاء</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
