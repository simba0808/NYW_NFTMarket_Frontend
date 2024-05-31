const RoadmapCard = ({ title, content, direction }: { title: string; content: string; direction: boolean }) => {
  return (
    <div className={`p-1 ${!direction ? "roadmap-card" : "roadmap-left-card"}`}>
      <div className="p-2 rounded-[0.5rem] bg-dark-blue">
        <div className={`p-4 rounded-[0.5rem] border border-gray-700/30 bg-gradient-to-r from-gray-700/50 to-gray-700/10 text-left`}>
          <p className="font-large">{title}</p>
          <p className="font-small">{content}</p>
        </div>
      </div>
    </div>
  );
}

const RoadmapCardContainer = () => {
  return (
    <div>

    </div>
  );
}

export default function RoadmapSection() {
  const contents = [
    "A complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue"
  ]
  return (
    <section className="mt-16">
      <div className="container text-center">
        <h2>NYW Roadmap</h2>
        <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
        <div className="relative mt-10">
          <div className="relative">
            <div className="flex lg:w-1/2">
              <div className="w-[80%]">
                <RoadmapCard title="Brief" content={contents[0]} direction={false} />
              </div>
              <div className="w-[20%] flex items-center">
                <img className="hidden lg:block w-full" src="/arrowlineleft.svg" />
              </div>
            </div>
            <div className="hidden lg:block place-center w-6 h-6 rounded-full bg-light-blue">
            </div>
          </div>
          <div className="relative flex justify-end lg:-translate-y-[50%]">
            <div className="flex lg:w-1/2">
              <div className="w-[20%] flex items-center">
                <img className="hidden lg:block w-full" src="/arrowlineright.svg" />
              </div>
              <div className="w-[80%]">
                <RoadmapCard title="Research" content={contents[0]} direction={true} />
              </div>
            </div>
            <div className="hidden lg:block place-center w-6 h-6 rounded-full bg-light-blue">
            </div>
            <div className="hidden lg:block place-center h-full w-[4px] bg-light-blue"></div>
          </div>
          <div className="relative lg:-translate-y-[50%]">
            <div className="flex lg:w-1/2">
              <div className="w-[80%]">
                <RoadmapCard title="Discover" content={contents[0]} direction={false} />
              </div>
              <div className="w-[20%] flex items-center">
                <img className="hidden lg:block w-full" src="/arrowlineleft.svg" />
              </div>
            </div>
            <div className="hidden lg:block place-center w-6 h-6 rounded-full bg-light-blue"></div>
            <div className="hidden lg:block place-center h-full w-[4px] bg-light-blue"></div>
          </div>
          <div className="relative flex justify-end lg:-translate-y-[100%]">
            <div className="flex lg:w-1/2">
              <div className="w-[20%] flex items-center">
                <img className="hidden lg:block w-full" src="/arrowlineright.svg" />
              </div>
              <div className="w-[80%]">
                <RoadmapCard title="Design" content={contents[0]} direction={true} />
              </div>
            </div>
            <div className="hidden lg:block place-center w-6 h-6 rounded-full bg-light-blue"></div>
            <div className="hidden lg:block place-center h-full w-[4px] bg-light-blue"></div>
          </div>
          <div className="relative lg:-translate-y-[100%]">
            <div className="flex lg:w-1/2">
              <div className="w-[80%]">
                <RoadmapCard title="Testing" content={contents[0]} direction={false} />
              </div>
              <div className="w-[20%] flex items-center">
                <img className="hidden lg:block w-full" src="/arrowlineleft.svg" />
              </div>
            </div>
            <div className="hidden lg:block place-center w-6 h-6 rounded-full bg-light-blue"></div>
            <div className="hidden lg:block place-center h-full w-[4px] bg-light-blue"></div>
          </div>
          <div className="relative flex justify-end lg:-translate-y-[150%]">
            <div className="flex lg:w-1/2">
              <div className="w-[20%] flex items-center">
                <img className="hidden lg:block w-full" src="/arrowlineright.svg" />
              </div>
              <div className="w-[80%]">
                <RoadmapCard title="Launch & Feedback" content={contents[0]} direction={true} />
              </div>
            </div>
            <div className="hidden lg:block place-center w-6 h-6 rounded-full bg-light-blue"></div>
          </div>
        </div>
      </div>
    </section>
  );
}