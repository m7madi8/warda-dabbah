import { FiArrowUpLeft, FiMenu } from "react-icons/fi";
import "./pillbutton.css";

/**
 * PillButton
 * Reused everywhere a primary CTA appears inside the Menu experience:
 * "احجز استشارة", "افتح القائمة", "أرسل الطلب".
 *
 * Matches the existing site's pill-button language:
 * light rounded-full pill + dark circular icon chip.
 */
const PillButton = ({
  label,
  onClick,
  icon = "arrow",
  type = "button",
  variant = "light",
  className = "",
}) => {
  const Icon = icon === "menu" ? FiMenu : FiArrowUpLeft;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`pill-btn pill-btn--${variant} ${className}`}
    >
      <span className="pill-btn__label">{label}</span>
      <span className="pill-btn__icon">
        <Icon />
      </span>
    </button>
  );
};

export default PillButton;
