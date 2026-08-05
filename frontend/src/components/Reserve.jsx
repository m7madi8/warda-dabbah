import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowUpRight, FiX, FiHome, FiLayers, FiClipboard } from "react-icons/fi";
import "./reserve.css";

gsap.registerPlugin(useGSAP);

const projectTypes = [
  { id: "residential", label: "سكني", icon: FiHome },
  { id: "commercial", label: "تجاري", icon: FiLayers },
  { id: "supervision", label: "إشراف على التنفيذ", icon: FiClipboard },
];

const Reserve = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  const openModal = () => setIsOpen(true);

  const resetForm = () => {
    setSelectedType(null);
    setPreferredDate("");
    setPreferredTime("");
    setIsSubmitted(false);
    setError("");
  };

  const closeModal = () => {
    if (!backdropRef.current || !panelRef.current) {
      setIsOpen(false);
      resetForm();
      return;
    }
    gsap
      .timeline({
        onComplete: () => {
          setIsOpen(false);
          resetForm();
        },
      })
      .to(panelRef.current, {
        x: "100%",
        duration: 0.45,
        ease: "power3.in",
      })
      .to(
        backdropRef.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "-=0.25"
      );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType || !preferredDate || !preferredTime) {
      setError("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }
    setError("");
    setIsSubmitted(true);
    // TODO: ربط هذا بنقطة الـ API الفعلية لاستقبال طلبات الاستشارة
  };

  // إغلاق عبر مفتاح Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // أنيميشن الفتح: fadeIn للخلفية + انزلاق اللوحة من اليمين (RTL: من جهة البداية)
  useGSAP(
    () => {
      if (!isOpen || !backdropRef.current || !panelRef.current) return;

      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(panelRef.current, { x: "100%" });

      gsap
        .timeline()
        .to(backdropRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" })
        .to(
          panelRef.current,
          { x: "0%", duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
    },
    { dependencies: [isOpen] }
  );

  const selectedTypeLabel = projectTypes.find((t) => t.id === selectedType)?.label;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
      .replace(/\//g, ".");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [h, m] = timeString.split(":");
    const hour = Number(h);
    const period = hour >= 12 ? "م" : "ص";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:${m} ${period}`;
  };

  // الزر والنافذة كلاهما يُعرضان عبر Portal إلى document.body لنفس سبب
  // مودال Projects: عنصر ScrollSmoother في MainLayout يطبّق transform على
  // غلاف المحتوى، وهذا يكسر position: fixed لأي عنصر ابن له.
  return createPortal(
    <>
      <button
        type="button"
        onClick={openModal}
        className="reserve-trigger fixed z-[95] inline-flex items-center gap-2.5 md:gap-3 rounded-full bg-white/90 md:bg-white backdrop-blur-md md:backdrop-blur-none pr-3 pl-4 py-2.5 md:py-4 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="reserve-trigger__label">احجز استشارة</span>
        <span className="reserve-trigger__icon flex items-center justify-center rounded-full bg-[var(--base-300)] text-[var(--base-100)] w-8 h-8 md:w-10 md:h-10">
          <FiArrowUpRight />
        </span>
      </button>

      {isOpen && (
        <div
          ref={backdropRef}
          className="reserve-modal fixed inset-0 z-[100]"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserve-modal-title"
        >
          <div ref={panelRef} className="reserve-modal__panel">
            <button
              type="button"
              className="reserve-modal__close"
              onClick={closeModal}
              aria-label="إغلاق"
            >
              <FiX />
            </button>

            <div className="reserve-modal__scroll">
              <div className="reserve-modal__header">
                <h2 id="reserve-modal-title" className="reserve-modal__title">
                  لنجعلها بداية مميزة، احجز استشارتك مع المهندسة
                </h2>
                <p className="reserve-modal__subtitle">
                  هل أنت مستعد لتحويل فكرتك إلى مساحة حقيقية؟ احجز استشارتك المعمارية
                  عبر تعبئة النموذج، ونتشرف بلقائك قريباً!
                </p>
              </div>

              {isSubmitted ? (
                <div className="reserve-modal__success">
                  <p className="reserve-modal__success-title">تم استلام طلبك</p>
                  <p className="reserve-modal__success-text">
                    شكراً لتواصلك معنا! سيتواصل فريقنا لتأكيد موعد استشارتك بخصوص
                    مشروعك {selectedTypeLabel ? `(${selectedTypeLabel})` : ""} بتاريخ{" "}
                    {formatDate(preferredDate)} الساعة {formatTime(preferredTime)}.
                  </p>
                  <button
                    type="button"
                    className="reserve-modal__done-btn rounded-full"
                    onClick={closeModal}
                  >
                    تم
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="reserve-modal__body">
                  {/* Step 1 */}
                  <fieldset className="reserve-step">
                    <legend className="reserve-step__label">
                      (١) ما هو نوع مشروعك؟
                    </legend>
                    <div className="reserve-types">
                      {projectTypes.map((type) => {
                        const isActive = type.id === selectedType;
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            aria-pressed={isActive}
                            className={`reserve-type-card ${
                              isActive ? "reserve-type-card--active" : ""
                            }`}
                          >
                            <span className="reserve-type-card__icon">
                              <Icon />
                            </span>
                            <span className="reserve-type-card__label">
                              {type.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Step 2 */}
                  <fieldset className="reserve-step">
                    <legend className="reserve-step__label">
                      (٢) متى ترغب بجدولة الاستشارة؟
                    </legend>
                    <div className="reserve-datetime">
                      <label className="reserve-field">
                        <span className="reserve-field__label">تاريخ الاستشارة</span>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="reserve-field__input"
                        />
                      </label>
                      <label className="reserve-field">
                        <span className="reserve-field__label">الوقت المفضل</span>
                        <input
                          type="time"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="reserve-field__input"
                        />
                      </label>
                    </div>
                  </fieldset>

                  {error && <p className="reserve-error">{error}</p>}

                  <div className="reserve-summary">
                    <div className="reserve-summary__info">
                      <span className="reserve-summary__label">نوع المشروع</span>
                      <span className="reserve-summary__value">
                        {selectedTypeLabel || "اختر النوع"}
                      </span>
                    </div>
                    <div className="reserve-summary__info">
                      <span className="reserve-summary__label">الموعد</span>
                      <span className="reserve-summary__value">
                        {preferredDate && preferredTime
                          ? `${formatDate(preferredDate)} — ${formatTime(preferredTime)}`
                          : "اختر الموعد"}
                      </span>
                    </div>
                    <button type="submit" className="reserve-submit-btn rounded-full">
                      إرسال الطلب
                      <FiArrowUpRight />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Reserve;