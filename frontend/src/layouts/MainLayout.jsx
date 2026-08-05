import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { initLenis } from "../lib/lenis";
import PreloaderII from "../components/Preloader/PreloaderII";
import Logo from "../components/Buttons/Logo";
import Footer from "../components/Footer/Footer";
import FooterTitle from "../components/Footer/FooterTitle";
import Menu from "../components/Menu";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {

    useGSAP(() => {
        try {
            if (typeof window !== "undefined" && gsap.plugins && gsap.plugins.ScrollSmoother) {
                gsap.plugins.ScrollSmoother.create({
                    wrapper: "#smooth-wrapper",
                    content: "#smooth-content",
                    smooth: 1.5,
                    effects: true,
                });
            }
        } catch (err) {
            // ScrollSmoother plugin fallback
        }
    });

    return (
        <>
            <PreloaderII />
            <Logo />
            <Menu />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <Outlet /> {/* Hero, About, Contact, etc. */}
                        <Footer />
                        <FooterTitle />
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;