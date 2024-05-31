import { twMerge } from "tailwind-merge";

export default function PrimaryButton({ className, text }: { className?: string; text: string }) {
  
  return (
    <div className={twMerge("w-[150px] h-[40px] btn", className)}>
      <span className="z-10 w-full text-center uppercase">
        { text }
      </span>
    </div>
  );
}