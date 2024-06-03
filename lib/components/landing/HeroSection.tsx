import Link from "next/link";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

const HeroStatus = ({ icon, state, text }: { icon: string; state: string; text: string }) => {
  return (
    <div className="flex">
      <img className="w-10 h-10 lg:w-20 lg:h-20" src={icon} alt="Not Found" />
      <div className="ml-3 flex flex-col justify-between">
        <p className="text-[18px] lg:text-[32px] font-semibold leading-[100%]">{state}</p>
        <p className="text-[10px] lg:text-[20px]">{text}</p>
      </div>
    </div>
  );
};

export default function HeroSection() {
  
  return (
    <section className="">
      <div className="container">
        <div className="flex flex-col lg:flex-row flex-wrap py-4">
          <div className="flex-[50%] flex items-center">
            <div>
              <h2 className="">Diversity & Technology in <p className="lg:">New York World</p></h2>
              <p className="mt-4 mb-8">
                Ever dreamt of being part of the New York World? 
                NYW, the bridge between Blockchain and AI, lets you own a piece of the action. 
                Generate and mint NFTs, unlocking the future of creativity in the heart of the world.
              </p>
              <div className="flex items-center gap-10">
                <PrimaryButton text="Join Us" className="w-[200px]" />
                <Link href="https://web.telegram.org/" className="text-lg text-light-blue font-medium underline underline-offset-4 uppercase">Join Community</Link>
              </div>
            </div>
          </div>
          <div className="flex-[50%]">
            <img src="/state.png" className="float-right" alt="Not Found" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-y-4 bg-white/5 rounded-md p-4 lg:py-6 lg:px-10">
          <HeroStatus icon="/total.svg" state="9526" text="Total Items" />
          <HeroStatus icon="/users.svg" state="1420" text="Total Owners" />
          <HeroStatus icon="/floor.svg" state="0.50" text="Floor Price" />
          <HeroStatus icon="/volume.svg" state="10.1K" text="Volume Traded (ETH)" />
        </div>
      </div>
    </section>
  );
}