import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowLeft, FaPhone, FaEnvelope } from 'react-icons/fa';
import './map.css';

gsap.registerPlugin(ScrollTrigger);

const Map = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".map-reveal",
                { y: 28, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".map-section",
                        start: "top 75%",
                    },
                }
            );

            gsap.fromTo(
                ".map-frame-wrap",
                { opacity: 0, scale: 1.03 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".map-section",
                        start: "top 75%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="map-section" ref={sectionRef}>
            <div className="map-inner">
                <div className="map-info">
                    <span className="map-eyebrow map-reveal">Visit The Studio</span>
                    <h3 className="map-title map-reveal">
                        استوديو <span>Warda Dabbah</span>
                    </h3>

                    <p className="map-address map-reveal">
                        فلسطين، رام الله<br />
                        شارع المناطير، الحي الغربي
                    </p>

                    <div className="map-contacts map-reveal">
                        <a href="tel:+970591234567" className="map-contact-link">
                            <FaPhone />
                            <span>+970 (0) 59 123 4567</span>
                        </a>
                        <a href="mailto:hello@wardadabbah.com" className="map-contact-link">
                            <FaEnvelope />
                            <span>hello@wardadabbah.com</span>
                        </a>
                    </div>

                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Ramallah+Al-Muntar+Street"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-cta map-reveal"
                    >
                        افتح في الخريطة
                        <FaArrowLeft />
                    </a>
                </div>

                <div className="map-visual">
                    <div className="map-frame-wrap">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.123456789!2d35.2!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA3JzI0LjQiTiAzNcKwMDcnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                            className="map-frame"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="موقع استوديو Warda Dabbah"
                        />
                        <span className="map-pin" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Map;