import NFTShowcaseCard from "@/lib/components/card/NFTShowcaseCard";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

import ShowcaseData from "./ShowcaseData.json";

export default function ShowcaseSection() {
  return (
    <section className="mt-16">
      <div className="container">
        <h2 className="text-center">NYW NFT&apos;s Showcase</h2>
        <p className="text-center">
          The largest and unique Super rare NFT marketplace for
          crypto-collectibles
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {ShowcaseData.map((item, index) => {
            return (
              <NFTShowcaseCard
                asset={`/asset/${item.asset}`}
                avatar={item.avatar}
                nftName={item.nftName}
                nftOwner={item.nftOwner}
                price={item.price}
                key={index}
              />
            );
          })}
        </div>
        <div className="my-8 flex justify-center">
          <PrimaryButton text="View all" />
        </div>
      </div>
    </section>
  );
}
