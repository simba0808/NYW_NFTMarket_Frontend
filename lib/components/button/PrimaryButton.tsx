import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  text: string;
  className?: string;
  varient?: "primary" | "secondary";
  onClick?: () => void;
};

const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  className,
  varient = "primary",
  onClick
}) => {
  return (
    <div className={
      twMerge(
        "w-[150px] h-[40px] group relative overflow-hidden rounded text-white transition-all duration-300 ease-out", 
        className,
        varient==="primary" ? "btn":"btn-reverse"
      )
    }
    onClick={onClick}
    >
      <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-700 group-hover:-translate-x-40">
      </span>
      <span className={twMerge("relative w-full text-center uppercase", varient==="secondary" && "font-small font-normal")}>
        { text }
      </span>
    </div>
  );
}

export default PrimaryButton;