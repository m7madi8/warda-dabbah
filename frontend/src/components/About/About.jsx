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
            // Image entrance - scale & fade
            gsap.fromTo('.about-image-wrapper',
                { scale: 0.94, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-section',
                        start: 'top 75%',
                    },
                }
            );

            // Image subtle parallax on scroll
            gsap.from('.about-image-wrapper img', {
                scale: 1.12,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 75%',
                    end: 'bottom top',
                    scrub: 1.2,
                },
            });

            // Text stagger entrance
            gsap.fromTo('.about-text',
                { y: 70, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.1,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-section',
                        start: 'top 70%',
                    },
                }
            );

            // Count-up animation for stats with refined timing
            document.querySelectorAll('.stat-number').forEach((el) => {
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                const obj = { value: 0 };
                gsap.to(obj, {
                    value: target,
                    duration: 2.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.about-stats',
                        start: 'top 80%',
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
        <section className="about-section min-h-screen py-20 md:py-32 px-4 md:px-8 flex items-center" ref={sectionRef}>
            <div className="max-w-7xl mx-auto w-full">
                {/* Main content grid */}
                <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-stretch">
                    {/* Image - clean and minimal */}
                    <div className="about-image-wrapper relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[580px] order-2 lg:order-1">
                        <img
                            src={engineerPhoto}
                            alt="Warda Dabbah - Interior Design"
                            className="w-full h-full object-cover object-top"
                        />
                        <div className="about-image-overlay absolute inset-0 pointer-events-none" />
                    </div>

                    {/* Content - text-driven, generous spacing */}
                    <div className="about-content flex flex-col justify-center order-1 lg:order-2">
                        <span className="about-text about-label text-[var(--accent)] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-6 md:mb-8">
                            من أنا
                        </span>

                        <h2 className="about-text text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--base-300)] mb-8 md:mb-12 leading-[1.1]">
                            أصمم
                            <br />
                            <span className="text-[var(--natural)]">مساحات راقية</span>
                        </h2>

                        <div className="about-text space-y-6 text-base md:text-lg text-[var(--natural)] leading-relaxed font-light">
                            <p className="max-w-md">
                                أنا وردة ذباح، مهندسة معمارية ومصممة ديكور داخلي. أؤمن بأن كل مساحة تحمل قصة فريدة تستحق أن تُروى بأسلوب راقٍ ومتقن.
                            </p>
                            <p className="max-w-md">
                                أسعى إلى خلق بيئات تجمع بين الجمال الخالص والوظيفة الذكية، مع عناية بأدق التفاصيل التي تعكس شخصيتك وتلبي احتياجاتك اليومية.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section - refined and clean */}
                <div className="about-stats relative mt-20 md:mt-32 rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-24">
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-0">
                        <div className="stat-item md:flex-1 md:pe-12 md:border-e border-[var(--accent)] border-opacity-40 text-center md:text-start">
                            <div
                                className="stat-number text-7xl md:text-8xl leading-none font-bold text-[var(--base-300)]"
                                data-target="10"
                                data-suffix="+"
                            >
                                +10
                            </div>
                            <div className="mt-5 text-sm md:text-base text-[var(--base-300)] font-medium tracking-wide">سنوات خبرة</div>
                        </div>

                        <div className="stat-item md:flex-1 md:px-12 md:border-e border-[var(--accent)] border-opacity-40 text-center md:text-start">
                            <div
                                className="stat-number text-7xl md:text-8xl leading-none font-bold text-[var(--base-300)]"
                                data-target="50"
                                data-suffix="+"
                            >
                                +50
                            </div>
                            <div className="mt-5 text-sm md:text-base text-[var(--base-300)] font-medium tracking-wide">مشروع منجز</div>
                        </div>

                        <div className="stat-item md:flex-1 md:ps-12 text-center md:text-start">
                            <div
                                className="stat-number text-7xl md:text-8xl leading-none font-bold text-[var(--base-300)]"
                                data-target="100"
                                data-suffix="%"
                            >
                                100%
                            </div>
                            <div className="mt-5 text-sm md:text-base text-[var(--base-300)] font-medium tracking-wide">رضا العملاء</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;