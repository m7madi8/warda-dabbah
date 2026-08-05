import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiLinkedin, FiFacebook } from "react-icons/fi";
import PillButton from "../PillButton/PillButton";
import "./menucontact.css";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  { icon: FiPhone, label: "الهاتف", value: "+966 5X XXX XXXX" },
  { icon: FiMail, label: "البريد الإلكتروني", value: "hello@studio.com" },
  { icon: FiMapPin, label: "العنوان", value: "شارع التصميم، الحي الراقي، المدينة" },
];

const SOCIALS = [
  { icon: FiInstagram, label: "Instagram" },
  { icon: FiLinkedin, label: "LinkedIn" },
  { icon: FiFacebook, label: "Facebook" },
];

const MenuContact = ({ onOpenBooking }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-contact__reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="menu-contact" ref={sectionRef}>
      <div className="menu-contact__inner">
        <div className="menu-contact__lead menu-contact__reveal">
          <span className="menu-contact__eyebrow">Let's Talk</span>
          <h2 className="menu-contact__title">لنبدأ حكاية مساحتك</h2>
          <p className="menu-contact__tagline">A conversation before a concept</p>
          <PillButton
            label="احجز استشارة"
            variant="accent"
            onClick={onOpenBooking}
            className="menu-contact__cta"
          />
        </div>

        <div className="menu-contact__details menu-contact__reveal">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
            <div className="menu-contact__item" key={label}>
              <span className="menu-contact__item-icon">
                <Icon />
              </span>
              <span className="menu-contact__item-text">
                <span className="menu-contact__item-label">{label}</span>
                <span className="menu-contact__item-value">{value}</span>
              </span>
            </div>
          ))}

          <div className="menu-contact__socials">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a href="#" key={label} aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuContact;
