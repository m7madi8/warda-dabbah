import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuOverlayNav from "../../components/Menu/MenuOverlayNav/MenuOverlayNav";
import MenuHero from "../../components/Menu/MenuHero/MenuHero";
import MenuGallery from "../../components/Menu/MenuGallery/MenuGallery";
import MenuAbout from "../../components/Menu/MenuAbout/MenuAbout";
import MenuServices from "../../components/Menu/MenuServices/MenuServices";
import MenuMap from "../../components/Menu/MenuMap/MenuMap";
import MenuContact from "../../components/Menu/MenuContact/MenuContact";
import BookingModal from "../../components/Menu/BookingModal/BookingModal";
import PillButton from "../../components/Menu/PillButton/PillButton";
import "./menu.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Menu page
 * Route: /menu
 *
 * Integration:
 * - Wrapped by the site's existing MainLayout (Lenis / ScrollSmoother untouched).
 * - Register in Router as: <Route path="/menu" element={<Menu />} />
 */
const Menu = () => {
  const pageRef = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // refresh ScrollTrigger once the page's real height is in the DOM
      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="menu-page" ref={pageRef} dir="rtl" lang="ar">
      <div className="menu-page__nav-trigger">
        <PillButton
          label="القائمة"
          icon="menu"
          variant="dark"
          onClick={() => setIsNavOpen(true)}
        />
      </div>

      <MenuOverlayNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <MenuHero onOpenMenu={() => setIsNavOpen(true)} />
      <MenuGallery />
      <MenuAbout />
      <MenuServices />
      <MenuMap />
      <MenuContact onOpenBooking={() => setIsBookingOpen(true)} />

      <BookingModal
        isOpen={isBookingOpen}
        onOpen={() => setIsBookingOpen(true)}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default Menu;
