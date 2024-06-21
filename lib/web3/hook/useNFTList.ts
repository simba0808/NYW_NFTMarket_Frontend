import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ContractFunctionExecutionError } from "viem";

import MARKET_ABI from "@/lib/web3/contracts/NYWMarket.json";

const MARKET_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ADDRESS as `0x${string}`;

const useNFTList = () => {
  const { data: listData, writeContractAsync } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: listData,
  });

  const listNFT = async (tokenId: number, price: number, royalty: number) => {
    if (!writeContractAsync) {
      return;
    }

    try {
      return await writeContractAsync({
        address: MARKET_ADDRESS,
        abi: MARKET_ABI,
        functionName: "listNft",
        args: [tokenId, price, royalty],
      });
    } catch (err) {
      if (err instanceof ContractFunctionExecutionError) {
        console.log(err.shortMessage);
      } else {
        throw err;
      }
    }
  };

  return {
    listNFT,
    isListLoading: isLoading,
    isListSuccess: isSuccess,
  };
};

export default useNFTList;
