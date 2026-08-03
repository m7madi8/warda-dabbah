import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import contactBg from '../../assets/interior.jpg';
import './contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        message: ''
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".contact-heading",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".contact-section",
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(".contact-visual",
                { scale: 1.06, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".contact-section",
                        start: "top 75%",
                    }
                }
            );

            gsap.fromTo(".contact-form",
                { x: -40, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".contact-section",
                        start: "top 60%",
                    }
                }
            );

            gsap.fromTo(".contact-pill",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".contact-section",
                        start: "top 55%",
                    }
                }
            );

            gsap.fromTo(".contact-hours",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".contact-section",
                        start: "top 50%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // UI-only form submission - will be connected to backend later
        console.log('Form submitted:', formData);
        alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
        setFormData({ name: '', contact: '', message: '' });
    };

    return (
        <section className="contact-section min-h-screen w-full flex items-center py-24 md:py-16" ref={sectionRef}>
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Visual side */}
                <div className="contact-visual relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden min-h-[280px] md:min-h-[560px] order-2 lg:order-1">
                    <img
                        src={contactBg}
                        alt="استوديو WARDA DABBAH للتصميم"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,42,38,0.55)] via-transparent to-transparent" />
                    <div className="absolute bottom-8 right-8">
                        <p className="text-[var(--base-100)] text-[0.6rem] tracking-[0.35em] uppercase" dir="ltr" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                            WARDA DABBAH — INTERIOR DESIGN
                        </p>
                    </div>
                </div>

                {/* Content side */}
                <div className="order-1 lg:order-2">
                    <div className="contact-heading mb-10">
                        <span className="text-[var(--accent)] text-sm font-semibold tracking-widest mb-4 block">
                            تواصل معنا
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--base-300)] mb-5 leading-tight">
                            فلنحول فكرتك
                            <br />
                            <span className="text-[var(--natural)]">إلى واقع ملموس</span>
                        </h2>
                        <p className="text-[var(--natural)] text-base md:text-lg leading-relaxed">
                            نحن هنا للاستماع إلى أفكاركم والرد على استفساراتكم حول مشاريعكم التصميمية.
                        </p>
                    </div>

                    {/* Form card */}
                    <div className="contact-form contact-glass rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-[var(--natural)] py-3 focus:outline-none focus:border-[var(--base-300)] transition-colors text-[var(--base-300)] text-lg placeholder-transparent"
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute right-0 top-3 text-[var(--natural)] transition-all duration-300 pointer-events-none ${
                                        formData.name ? '-translate-y-7 text-sm text-[var(--base-300)]' : ''
                                    } peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-[var(--base-300)]`}
                                >
                                    الاسم
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-[var(--natural)] py-3 focus:outline-none focus:border-[var(--base-300)] transition-colors text-[var(--base-300)] text-lg placeholder-transparent"
                                />
                                <label
                                    htmlFor="contact"
                                    className={`absolute right-0 top-3 text-[var(--natural)] transition-all duration-300 pointer-events-none ${
                                        formData.contact ? '-translate-y-7 text-sm text-[var(--base-300)]' : ''
                                    } peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-[var(--base-300)]`}
                                >
                                    وسيلة التواصل (هاتف / إيميل)
                                </label>
                            </div>

                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-[var(--natural)] py-3 focus:outline-none focus:border-[var(--base-300)] transition-colors text-[var(--base-300)] text-lg placeholder-transparent resize-none"
                                ></textarea>
                                <label
                                    htmlFor="message"
                                    className={`absolute right-0 top-3 text-[var(--natural)] transition-all duration-300 pointer-events-none ${
                                        formData.message ? '-translate-y-7 text-sm text-[var(--base-300)]' : ''
                                    } peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-[var(--base-300)]`}
                                >
                                    الرسالة
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-full bg-[var(--base-300)] text-[var(--base-100)] py-4 font-bold text-lg transition-all duration-500 hover:bg-[var(--accent)] hover:tracking-widest active:scale-95"
                            >
                                إرسال الرسالة
                            </button>
                        </form>

                        {/* Working hours strip */}
                        <div className="contact-hours flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 border-t border-[var(--accent)] pt-6 mt-8">
                            <span className="font-bold text-[var(--base-300)]">ساعات العمل</span>
                            <span className="text-[var(--natural)] text-sm">الأحد - الخميس: 9:00 ص - 5:00 م</span>
                            <span className="text-[var(--natural)] text-sm">الجمعة - السبت: مغلق</span>
                        </div>
                    </div>

                    {/* Social pills */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="https://wa.me/972546656914"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-pill flex items-center justify-between gap-3 rounded-full bg-[var(--base-100)] border border-[var(--accent)] px-4 py-2.5 group hover:border-[var(--base-300)] transition-colors"
                        >
                            <span className="w-11 h-11 rounded-full bg-[var(--accent)] text-[var(--base-100)] flex items-center justify-center text-xl group-hover:bg-[var(--base-300)] transition-colors">
                                <FaWhatsapp />
                            </span>
                            <span className="font-bold text-[var(--base-300)]">واتساب</span>
                            <span className="text-[var(--natural)] text-sm" dir="ltr">0546656914</span>
                        </a>

                        <a
                            href="https://instagram.com/warda_dabbah"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-pill flex items-center justify-between gap-3 rounded-full bg-[var(--base-100)] border border-[var(--accent)] px-4 py-2.5 group hover:border-[var(--base-300)] transition-colors"
                        >
                            <span className="w-11 h-11 rounded-full bg-[var(--accent)] text-[var(--base-100)] flex items-center justify-center text-xl group-hover:bg-[var(--base-300)] transition-colors">
                                <FaInstagram />
                            </span>
                            <span className="font-bold text-[var(--base-300)]">انستغرام</span>
                            <span className="text-[var(--natural)] text-sm" dir="ltr">@warda_dabbah</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
