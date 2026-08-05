import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiX, FiCheck } from "react-icons/fi";
import PillButton from "../PillButton/PillButton";
import "./bookingmodal.css";

const PROJECT_TYPES = ["سكني", "تجاري", "مكتبي", "فيلا", "أخرى"];

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  email: "",
  projectType: "",
  area: "",
  city: "",
  budget: "",
  date: "",
  description: "",
};

/**
 * BookingModal
 * Fixed "Book Consultation" trigger + full consultation-request modal.
 * Not a plain contact form — framed as an engineering/consultation intake.
 *
 * `isOpen` / `onOpen` / `onClose` are controlled from the parent page so any
 * other CTA on the page (e.g. the Contact section's button) can open the
 * same modal without DOM-querying into this component.
 */
const BookingModal = ({ isOpen, onOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const modalRef = useRef(null);
  const fixedBtnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fixedBtnRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!modalRef.current) return;
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(modalRef.current, { display: "flex" });
        gsap.fromTo(
          ".booking-modal__backdrop",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4 }
        );
        gsap.fromTo(
          ".booking-modal__panel",
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out", delay: 0.1 }
        );
      } else {
        gsap.to(modalRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => gsap.set(modalRef.current, { display: "none" }),
        });
      }
    }, modalRef);
    return () => ctx.revert();
  }, [isOpen]);

  const openModal = () => {
    setIsSuccess(false);
    setForm(INITIAL_FORM);
    onOpen();
  };

  const closeModal = () => onClose();

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Integration note: wire this to the studio's existing lead/API endpoint.
    setIsSuccess(true);
    gsap.fromTo(
      ".booking-modal__success > *",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  };

  return (
    <>
      <div className="booking-modal__fixed" ref={fixedBtnRef}>
        <PillButton label="احجز استشارة" variant="accent" onClick={openModal} />
      </div>

      <div className="booking-modal" ref={modalRef} role="dialog" aria-modal="true">
        <div className="booking-modal__backdrop" onClick={closeModal} />

        <div className="booking-modal__panel">
          <button className="booking-modal__close" onClick={closeModal} aria-label="إغلاق">
            <FiX />
          </button>

          {!isSuccess ? (
            <>
              <div className="booking-modal__head">
                <span className="booking-modal__eyebrow">Consultation Request</span>
                <h3 className="booking-modal__title">لنفهم مشروعك أولاً</h3>
                <p className="booking-modal__sub">
                  أخبرنا عن الفراغ الذي تحلم به، وسيتواصل معك فريقنا لتحديد موعد الاستشارة.
                </p>
              </div>

              <form className="booking-modal__form" onSubmit={handleSubmit}>
                <div className="booking-modal__row">
                  <label className="booking-modal__field">
                    <span>الاسم الكامل</span>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={handleChange("fullName")}
                      placeholder="اسمك الثلاثي"
                    />
                  </label>
                  <label className="booking-modal__field">
                    <span>رقم الهاتف</span>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="+966 5X XXX XXXX"
                    />
                  </label>
                </div>

                <div className="booking-modal__row">
                  <label className="booking-modal__field">
                    <span>البريد الإلكتروني</span>
                    <input
                      type="email"
                      required
                      dir="ltr"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="name@email.com"
                    />
                  </label>
                  <label className="booking-modal__field">
                    <span>نوع المشروع</span>
                    <select
                      required
                      value={form.projectType}
                      onChange={handleChange("projectType")}
                    >
                      <option value="" disabled>
                        اختر النوع
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="booking-modal__row">
                  <label className="booking-modal__field">
                    <span>مساحة المشروع (م²)</span>
                    <input
                      type="number"
                      min="0"
                      value={form.area}
                      onChange={handleChange("area")}
                      placeholder="150"
                    />
                  </label>
                  <label className="booking-modal__field">
                    <span>المدينة / الموقع</span>
                    <input
                      type="text"
                      value={form.city}
                      onChange={handleChange("city")}
                      placeholder="المدينة"
                    />
                  </label>
                </div>

                <div className="booking-modal__row">
                  <label className="booking-modal__field">
                    <span>الميزانية التقريبية</span>
                    <input
                      type="text"
                      value={form.budget}
                      onChange={handleChange("budget")}
                      placeholder="مثال: 50,000 – 100,000"
                    />
                  </label>
                  <label className="booking-modal__field">
                    <span>موعد الاستشارة المفضل</span>
                    <input
                      type="date"
                      value={form.date}
                      onChange={handleChange("date")}
                    />
                  </label>
                </div>

                <label className="booking-modal__field booking-modal__field--full">
                  <span>وصف المشروع</span>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={handleChange("description")}
                    placeholder="حدثنا عن رؤيتك، أسلوبك المفضل، وأي تفاصيل تهمك..."
                  />
                </label>

                <button type="submit" className="booking-modal__submit">
                  <span>إرسال طلب الاستشارة</span>
                </button>
              </form>
            </>
          ) : (
            <div className="booking-modal__success">
              <span className="booking-modal__success-icon">
                <FiCheck />
              </span>
              <span className="booking-modal__eyebrow">Request Received</span>
              <h3 className="booking-modal__title">وصلنا طلبك بنجاح</h3>
              <p className="booking-modal__sub">
                سيتواصل معك فريق الاستوديو خلال 48 ساعة لتأكيد موعد استشارتك.
              </p>
              <button className="booking-modal__submit booking-modal__submit--ghost" onClick={closeModal}>
                إغلاق
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingModal;
