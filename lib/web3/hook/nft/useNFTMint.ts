import { useCallback } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ContractFunctionExecutionError } from "viem";

import NFTABI from "@/lib/web3/contracts/NYWNFT.json";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;

const useNFTMint = () => {
  const { data: mintData, writeContractAsync } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: mintData,
  });

  const mintNFT = useCallback(
    async (metadataURL: string) => {
      if (!writeContractAsync) {
        return;
      }

      try {
        return await writeContractAsync({
          address: MARKET_ADDRESS,
          abi: NFTABI,
          functionName: "create",
          args: [metadataURL],
        });
      } catch (err) {
        if (err instanceof ContractFunctionExecutionError) {
          console.log(err.shortMessage);
        } else {
          throw err;
        }
      }
    },
    [writeContractAsync]
  );

  return {
    mintNFT,
    isMintLoading: isLoading,
    isMintSuccess: isSuccess,
  };
};

export default useNFTMint;
