import PrimaryButton from "@/lib/components/button/PrimaryButton";

import type { FC } from "react";

type Props = {
  asset: string;
  avatar: string;
  nftName: string;
  nftOwner: string;
  price: string;
}


const NFTShowcaseCard: FC<Props> = ({ asset, avatar, nftName, nftOwner, price }) => {
  return (
    <div className="p-2 rounded-md bg-white/5">
      <div className="">
        <img className="w-full object-fill rounded-md" src={`/asset/${asset}`} alt="Not Found" />
      </div>
      <div className="divide-y-[1px] divide-slate-700/40">
        <div className="flex py-3">
          <img className="w-12 h-12" src={`/asset/${avatar}`} alt="Not Found" />
          <div className="ml-3">
            <p className="font-medium">{nftName}</p>
            <p>By @{nftOwner}</p>
          </div>
        </div>
        <div className="py-3">
          <div className="flex justify-between ">
            <span>{price} ETH</span>
          </div>
          <div className="flex justify-center mt-3">
            <PrimaryButton text="Buy Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTShowcaseCard;