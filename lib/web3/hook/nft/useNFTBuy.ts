import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ethers } from "ethers";
import { ContractFunctionExecutionError } from "viem";

import MARKET_ABI from "@/lib/web3/contracts/NYWMarket.json";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;
const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`;

const useNFTBuy = () => {
  const { data: buyNFTHash, writeContractAsync: buyNFTAsync } =
    useWriteContract();

  const { address } = useAccount();

  const { isSuccess: isBuyNFTSuccess } = useWaitForTransactionReceipt({
    hash: buyNFTHash,
  });

  const buyNFT = async (tokenId: number, price: number) => {
    if (!buyNFTAsync) {
      return;
    }
    console.log(tokenId);
    try {
      return await buyNFTAsync({
        address: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "buyNft",
        args: [BigInt(tokenId)],
        value: ethers.parseEther(price.toString()),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    buyNFT,
    isBuyNFTSuccess,
  };
};

export default useNFTBuy;
