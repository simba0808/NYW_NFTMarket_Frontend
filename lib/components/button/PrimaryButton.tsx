export default function PrimaryButton({ text }: { text: string }) {
  
  return (
    <div className="w-[150px] h-[40px] btn">
      <span className="z-10 w-full text-center uppercase">
        { text }
      </span>
    </div>
  );
}