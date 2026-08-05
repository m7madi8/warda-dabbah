import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

import "./preloaderII.css";

gsap.registerPlugin(SplitText);

export default function PreloaderII() {
    useGSAP(() => {
        try {
            const hasSplitText = typeof SplitText !== "undefined" && typeof SplitText.create === "function";
            const splits = {};

            if (hasSplitText) {
                const splitElements = [
                    { key: "nameChars", selector: ".preloader-brand-name", type: "chars" },
                ];
                splitElements.forEach(({ key, selector, type }) => {
                    const config = { type, mask: type };
                    if (type === "chars") config.charsClass = "char";
                    if (type === "lines") config.linesClass = "line";
                    splits[key] = SplitText.create(selector, config);
                });
                if (splits.nameChars && splits.nameChars.chars) {
                    gsap.set(splits.nameChars.chars, { y: "110%" });
                }
            }

            gsap.set(".preloader-progress-fill", { scaleX: 0 });
            gsap.set(".preloader-logo", { opacity: 0, scale: 0.96 });

            const tl = gsap.timeline({ delay: 0.3 });

            tl.to(".preloader-logo", {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
            });

            if (splits.nameChars && splits.nameChars.chars) {
                tl.to(
                    splits.nameChars.chars,
                    {
                        y: "0%",
                        stagger: 0.08,
                        duration: 0.9,
                        ease: "power4.out",
                    },
                    "-=0.4"
                );
            }

            tl.to(
                ".preloader-progress-fill",
                {
                    scaleX: 1,
                    duration: 2.2,
                    ease: "power2.inOut",
                },
                "-=0.2"
            )
            .to({}, { duration: 0.35 });

            if (splits.nameChars && splits.nameChars.chars) {
                tl.to(
                    splits.nameChars.chars,
                    {
                        y: "-110%",
                        stagger: 0.04,
                        duration: 0.7,
                        ease: "power4.in",
                    },
                    "exit"
                );
            }

            tl.to(
                ".preloader-logo",
                {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                },
                "exit"
            )
            .to(
                ".preloader-panel",
                {
                    y: "-100%",
                    duration: 1,
                    ease: "power4.inOut",
                },
                "exit+=0.15"
            )
            .to(
                ".preloader-mask",
                {
                    scale: 5,
                    duration: 2.5,
                    ease: "power3.inOut",
                },
                "exit+=0.1"
            )
            .to(
                ".preloader-mask",
                {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.4"
            );
        } catch (e) {
            console.warn("Preloader animation fallback:", e);
        }
    }, []);

    return (
        <div className="preloader-root fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
            <div className="preloader-panel">
                <div className="preloader-inner">
                    <div className="preloader-logo">
                        <span className="preloader-brand-name">WARDA DABBAH</span>
                    </div>

                    <div className="preloader-progress-track">
                        <div className="preloader-progress-fill" />
                    </div>
                </div>
            </div>

            <div className="preloader-mask" />
        </div>
    );
}