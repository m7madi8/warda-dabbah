import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AnimateBtn from "../Buttons/AnimateBtn";

const Navbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    // Simple navigation - can be enhanced with a proper menu modal
    navigate('/projects');
  };

  return (
    <div 
      onClick={handleMenuClick}
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-fit max-w-[92vw] h-9 md:h-10 p-1 flex items-center justify-end gap-2 bg-[var(--base-300)] rounded-4xl z-50 cursor-pointer group transition-all duration-500"
    >
      <div>
        <div className="pl-3 md:pl-4 text-[var(--base-200)]">
          <AnimateBtn btnName="المشاريع" />
        </div>
      </div>
      <div className="bg-[var(--base-200)] rounded-full p-1.5 md:p-2">
        <IoMdMenu className="text-sm md:text-base text-[var(--natural)] transition-transform duration-500 group-hover:rotate-[360deg]" />
      </div>
    </div>
  );
};

export default Navbar;
