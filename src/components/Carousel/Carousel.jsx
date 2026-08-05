import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./carousel.css";

/**
 * Carousel
 * كاروسيل صور عام لصفحات تفاصيل المشاريع — GSAP فقط، بدون أي مكتبة خارجية.
 * يدعم: أسهم، نقاط، عداد رقمي، سحب باللمس/الماوس، ولوحة المفاتيح.
 */
const Carousel = ({ images = [], altBase = "" }) => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const dragState = useRef({ startX: 0, dragging: false });

  const total = images.length;

  const goTo = useCallback(
    (next) => {
      if (!total) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      xPercent: -index * 100,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [index]);

  // لوحة المفاتيح
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [index, goTo]);

  // سحب بالماوس/اللمس
  const handlePointerDown = (e) => {
    dragState.current = { startX: e.clientX, dragging: true };
  };
  const handlePointerUp = (e) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    dragState.current.dragging = false;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goTo(index + 1);
    else goTo(index - 1);
  };

  if (!total) return null;

  return (
    <div
      className="carousel"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="carousel__viewport">
        <div className="carousel__track" ref={trackRef}>
          {images.map((src, i) => (
            <div className="carousel__slide" key={i}>
              <img src={src} alt={`${altBase} ${i + 1}`} draggable="false" />
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            onClick={() => goTo(index - 1)}
            aria-label="الصورة السابقة"
          >
            <FiChevronRight />
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            onClick={() => goTo(index + 1)}
            aria-label="الصورة التالية"
          >
            <FiChevronLeft />
          </button>

          <div className="carousel__footer">
            <div className="carousel__dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel__dot ${
                    i === index ? "carousel__dot--active" : ""
                  }`}
                  onClick={() => goTo(i)}
                  aria-label={`الانتقال للصورة ${i + 1}`}
                />
              ))}
            </div>
            <span className="carousel__counter">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
