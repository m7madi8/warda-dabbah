import { useRef, useState } from "react";
import gsap from "gsap/all";
import smoke from "../../assets/smoke_final.mp4";
import mobileHeroBg from "../../assets/hero-mobile.png";
import mobileHeroVideo from "../../assets/hero-mobile.mp4";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import BrandLogo from "../Brand/BrandLogo";

const Hero = () => {

    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });

    const mobileVideoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleSound = () => {
        const video = mobileVideoRef.current;
        if (!video) return;
        if (video.muted) {
            video.muted = false;
            video.volume = 1;
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {});
            }
            setIsMuted(false);
        } else {
            video.muted = true;
            setIsMuted(true);
        }
    };


    useGSAP(() => {
        if (!isMobHero) {
            gsap.to(".hero-section .hero-img", {
                yPercent: "-5",
                stagger: 0.02,
                scale: 1.2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                    // markers: true
                }
            });
        };
    }, [isMobHero]);

    return (
        <section className="hero-section w-dvw md:h-dvh h-[100vh] md:p-2 p-2.5 mb-20">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                <div className="responsive-mobile">
                    {/* Background image (down layer) */}
                    <div className="hero-img absolute inset-0 bg-[url('./assets/cap1.png')] bg-no-repeat bg-cover bg-center z-0 md:block hidden" />

                    {/* Mobile video fallback (mobile only) */}
                    <div className="block lg:hidden mt-6 mb-6">
                        <video
                            ref={mobileVideoRef}
                            src={mobileHeroVideo}
                            poster={mobileHeroBg}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full max-h-[70vh] rounded-[2rem] object-cover object-center shadow-[0_-25px_45px_-10px_rgba(255,0,0,0.15)]"
                        ></video>
                    </div>

                    {/* Sound toggle (mobile only) */}
                    <button
                        type="button"
                        onClick={toggleSound}
                        aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
                        aria-pressed={!isMuted}
                        className="lg:hidden absolute bottom-6 left-6 z-20 grid place-items-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white shadow-lg shadow-black/10 transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
                    >
                        {isMuted ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" fill="currentColor" stroke="none" />
                                <line x1="22" x2="16" y1="9" y2="15" />
                                <line x1="16" x2="22" y1="9" y2="15" />
                            </svg>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" fill="currentColor" stroke="none" />
                                <path d="M16 9a5 5 0 0 1 0 6" />
                                <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                            </svg>
                        )}
                    </button>

                    {/* Smoke video (upper layer) */}
                    <video
                        src={smoke}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 md:w-full md:h-full object-cover z-10 pointer-events-none object-center opacity-50 mix-blend-hard-light md:top-0 top-[5%] h-[90%]  rounded-[2rem] md:px-0"
                    ></video>
                </div>
                <div className="p-4 flex flex-col md:justify-center">
                    <div className="relative h-dvh">
                        <div className="lg:absolute lg:right-2 lg:top-[12%] flex justify-end">
                            <BrandLogo name="WARDA" tagline={false} theme="light" size="hero" className="brand-logo--align-end" />
                        </div>

                        <div className="w-full h-auto absolute  top-24 md:bottom-[8%] lg:bottom-[9%] flex md:flex-row flex-col md:justify-between md:items-end">
                            <h2
                                className="text-end lg:mt-0 md:text-[var(--base-300)] text-[var(--natural)] text-2xl font-bold md:tracking-wider leading-5 flex flex-col gap-1"
                                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                            >
                                <span>عالمي مليان</span>
                                <span>تفاصيل وجمال</span>
                                <span>بعبر عنكم</span>
                            </h2>

                            <p
                                className="md:w-[20%] w-[80%] text-[var(--base-300)] text-[0.7rem] font-bold  md:font-medium tracking-wide lg:text-start mt-2 text-justify"
                                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
                            >
                                مهندسة معمارية ومصممة ديكور داخلي - نصمم مساحات تعكس ذوقكم وشخصيتكم الفريدة
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
