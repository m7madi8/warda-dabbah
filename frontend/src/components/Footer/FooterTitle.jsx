import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import BrandLogo from '../Brand/BrandLogo';

import "./footertitle.css";

gsap.registerPlugin(ScrollTrigger);

const FooterTitle = () => {
    const ftConRef = useRef(null);

    useGSAP(() => {
        if (!ftConRef.current) return;

        gsap.from(".footer-brand-name", {
            y: 60,
            opacity: 0,
            scale: 0.96,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ftConRef.current,
                start: "top 90%",
                end: "top 75%",
                scrub: true,
            },
        });
    }, { scope: ftConRef });

    return (
        <section ref={ftConRef} className='relative z-1 w-full h-[40vh] border-1 border-t-[var(--terracotta)] overflow-hidden'>
            <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-2 px-4 sm:px-6 mt-6'>
                <p className='text-[var(--natural)] text-[0.7rem]'>
                    جميع الحقوق محفوظة © 2026
                </p>
                <p className='text-[var(--natural)] text-[0.7rem] tracking-[0.2em] uppercase'>
                    INTERIOR DESIGN
                </p>
            </div>

            <div className='footer-title w-full flex justify-center items-center py-4 px-2'>
                <BrandLogo theme="light" size="xl" tagline={false} className="footer-brand-name" />
            </div>
        </section>
    );
};

export default FooterTitle;
