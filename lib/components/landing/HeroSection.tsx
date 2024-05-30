const HeroStatus = ({ icon, state, text }: { icon: string; state: string; text: string }) => {
  return (
    <div className="flex">
      <img src={icon} alt="Not Found" />
      <div className="ml-3">
        <p className="text-[32px] leading-[100%]">{state}</p>
        <p className="text-[20px]">{text}</p>
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
              <h2>Diversity & Technology in <p>New York World</p></h2>
              <p className="mt-4 mb-8">
                Ever dreamt of being part of the New York World? 
                NYW, the bridge between Blockchain and AI, lets you own a piece of the action. 
                Generate and mint NFTs, unlocking the future of creativity in the heart of the world.
              </p>
              <div></div>
            </div>
          </div>
          <div className="flex-[50%]">
            <img src="/state.png" className="float-right" alt="Not Found" />
          </div>
        </div>
        <div className="flex justify-between bg-white/5 rounded-md py-6 px-10">
          <HeroStatus icon="/total.svg" state="9526" text="Total Items" />
          <HeroStatus icon="/users.svg" state="1420" text="Total Owners" />
          <HeroStatus icon="/floor.svg" state="0.50" text="Floor Price" />
          <HeroStatus icon="/volume.svg" state="10.1K" text="Volume Traded (ETH)" />
        </div>
      </div>
    </section>
  );
}