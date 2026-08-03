import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowLeft } from 'react-icons/fa';
import './map.css';

gsap.registerPlugin(ScrollTrigger);

const Map = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".map-frame-wrap",
                { scale: 1.08, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".map-section",
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(".map-card",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".map-section",
                        start: "top 65%",
                    }
                }
            );

            gsap.to(".map-pin", {
                y: -14,
                duration: 1.2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="map-section relative h-screen min-h-[600px] w-full overflow-hidden" ref={sectionRef}>
            {/* Map fills the full section as background */}
            <div className="map-frame-wrap absolute inset-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.123456789!2d35.2!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA3JzI0LjQiTiAzNcKwMDcnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                    className="map-frame w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقع استوديو WARDA DABBAH"
                ></iframe>
                <div className="map-overlay absolute inset-0" />
            </div>

            {/* Custom pin */}
            <div className="map-pin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-10">
                <div className="w-9 h-9 rounded-full bg-[var(--base-300)] border-[3px] border-[var(--accent)] flex items-center justify-center shadow-xl">
                    <span className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
            </div>

            {/* Floating frosted glass card */}
            <div className="map-card absolute bottom-6 left-4 md:bottom-10 md:left-8 z-20 w-[min(92%,24rem)] rounded-[2rem] p-8 map-glass">
                <span className="text-[var(--accent)] text-xs font-semibold tracking-[0.25em] uppercase">موقعنا</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--base-300)] mt-3 mb-3 leading-tight">
                    استوديو WARDA DABBAH
                </h2>
                <p className="text-[var(--natural)] leading-relaxed mb-7">
                    فلسطين - رام الله<br />
                    شارع المناطير الحي الغربي
                </p>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Ramallah+Al-Muntar+Street"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-[var(--base-300)] text-[var(--base-100)] px-7 py-3.5 font-bold transition-all duration-300 hover:bg-[var(--accent)] hover:tracking-widest"
                >
                    افتح في الخريطة
                    <FaArrowLeft className="text-sm" />
                </a>
            </div>
        </section>
    );
};

export default Map;
