"use client";
import { useCallback, useState } from "react";
import { Image } from "@nextui-org/react";
import { useAccount } from "wagmi";
import {Icon} from "@iconify/react";

import EthereumIcon from "@/public/ethereum.svg";


function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const AddressDisplay = ({address}: {address: string}) => {
  return (
    <span>{shortenAddress(address)}</span>
  );
}

const CopyLink = ({url}: {url: string}) => {
  const [copied, setCopied] = useState(false);

  const onClickHandler = useCallback(() => {
    window.navigator.clipboard.writeText(url);
    setCopied(true);
  }, [url])

  return (
    <div className="flex gap-1 items-center" onClick={onClickHandler}>
        {
          copied ? 
            <Icon
              className="pointer-events-none text-2xl text-default-400"
              icon="mingcute:check-fill"
            /> :
            <Icon
              className="pointer-events-none text-2xl text-default-400"
              icon="fluent:copy-24-filled"
            />
        }
        <AddressDisplay address={url} />
      </div>
  );
}

export default function ProfileHeader() {
  const { address } = useAccount();

  return (
    <div className="flex items-center gap-5 py-4 px-6">
      <Icon icon="teenyicons:user-circle-outline" className="w-8 h-8" />
      <CopyLink url={address as string} />
      <EthereumIcon />
    </div>
  );
}