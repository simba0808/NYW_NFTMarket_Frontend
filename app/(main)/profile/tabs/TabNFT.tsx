"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Moralis from "moralis";
import { Image } from "@nextui-org/react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";

const TabNFT = () => {
  const { address, isConnected } = useAccount();
  const [myNFTs, setMyNFTs] = useState<any>([]);

  useEffect(() => {
    const initializeMoralis = async () => {
      try {
        await Moralis.start({
          apiKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjBmMjc2MzU3LWUyYjgtNDIzMy04ZjliLTYxZjg2NTI3NjhiOCIsIm9yZ0lkIjoiMzg4NjQ4IiwidXNlcklkIjoiMzk5MzU5IiwidHlwZUlkIjoiMjVhODMxZjUtZDBlMC00MGE4LThiYWYtYjMyZmU5YjNiNDVkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTM1MTk4MTQsImV4cCI6NDg2OTI3OTgxNH0.eRuR9YT4XQZ_aSG7SY9epvzXWMWl7pEANmyvJmvTQ1I", // Ensure this is securely handled
        });
      } catch (error) {
        console.log(error);
      }
    };

    initializeMoralis();
  }, []);

  useEffect(() => {
    async function fetchNFTs(address) {
      try {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: "0xAA36A7",
          address,
        });
        console.log("totoal", response.raw.result);
        const urls = response.raw.result.filter((nft) => nft.metadata !== null);
        console.log(urls);
        setMyNFTs(urls);
      } catch (e) {
        console.error(e);
      }
    }

    if (address && isConnected) {
      fetchNFTs(address);
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        <ImageList variant="masonry" cols={5}>
          {myNFTs.map((nft, index) => {
            return (
              <Image
                key={nft}
                src={JSON.parse(nft.metadata).image}
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
