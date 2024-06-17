"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button, Card, Image } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import useSaveImage from "@/lib/hooks/image/useSaveImage";
import useToast from "@/lib/hooks/toast/useToast";

import "./style.scss";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

type CardProps = {
  id: number;
  selectedImage: number;
  setSelectedImage: (type: number) => void;
  imgSrc: string;
  prompt: string;
};

export default function ImageCard(props: CardProps) {
  const { id, imgSrc, selectedImage, setSelectedImage, prompt } = props;
  const { address } = useAccount();

  const { isSaving, isSaved, setIsSaved, saveImage } = useSaveImage();
  const customToast = useToast();

  useEffect(() => {
    if (isSaved === "success") {
      customToast("success", "Successfully saved to your arkwork");
      setIsSaved("");
    } else if (isSaved === "failed") {
      customToast("failed", "Already exist in your artwork");
      setIsSaved("");
    }
  }, [isSaved]);

  function handleClick() {
    setSelectedImage(id);
  }

  return (
    <Card
      className={twMerge(
        "card-container border-blue-400 w-full h-full relative",
        selectedImage === id && "border-2 ring-4"
      )}
    >
      <Image
        alt="Failed"
        className="object-cover hover:cursor-pointer min-w-[250px] min-h-[250px]"
        src={imgSrc}
        isZoomed
      />
      <div className="overlay" onClick={handleClick}>
        <PrimaryButton
          text="Save To Artwork"
          onClick={() => saveImage(address as string, imgSrc, prompt)}
        />
        <PrimaryButton text="Mint Your NFT" />
      </div>
    </Card>
  );
}
