import { MdArrowBack } from "react-icons/md";
import AnimateBtn from "./AnimateBtn";
import { useNavigate } from "react-router-dom";

const ReserveBtn = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Scroll to contact section
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    return (
        <div className="relative z-49" onClick={handleClick}>
            <div className="absolute left-4 md:left-6 top-4 md:top-[2vw] px-1 py-1 hidden md:flex justify-end items-center rounded-4xl gap-2 cursor-pointer bg-[var(--base-300)]">
                <AnimateBtn btnName="تواصل"/>
                <MdArrowBack className="bg-[var(--base-200)] text-[var(--natural)] w-6 md:w-[2.5vw] h-auto md:h-auto rounded-full p-1" />
            </div>
        </div>
    )
}

export default ReserveBtn;