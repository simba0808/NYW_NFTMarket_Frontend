"use client";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Image } from "@nextui-org/react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";

import { postServer } from "@/lib/net/fetch/fetch";

type NFTData = {
  token_id: number;
  metadata_hash: string;
  owner: string;
  creator: string;
  asset_url: string;
};

const TabNFT = () => {
  const { address, isConnected } = useAccount();
  const [myNFTs, setMyNFTs] = useState<NFTData[]>([]);

  useEffect(() => {
    console.log(myNFTs);
  }, [myNFTs]);

  const fetchMyNFTs = useCallback(async () => {
    try {
      const res = await postServer("/nft/myNFTs", { address });
      setMyNFTs(res);
    } catch (err) {
      console.log(err);
    }
  }, [address]);

  useEffect(() => {
    if (address && isConnected) {
      fetchMyNFTs();
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        <ImageList variant="masonry" cols={5}>
          {myNFTs.map((nft, index) => {
            return (
              <Image
                key={nft.token_id}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${nft.asset_url}`}
                isZoomed
                alt={`NFT ${index}`}
                className="max-w-[300px] rounded-lg hover:cursor-pointer"
              />
            );
          })}
        </ImageList>
      </Box>
    </div>
  );
};

export default TabNFT;
