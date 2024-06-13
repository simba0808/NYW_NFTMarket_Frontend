import React from "react";
import { Card, Image } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function ImageCard(props: any) {
  const { selectedImage, setSelectedImage, id, imgSrc } = props;

  function handleClick() {
    setSelectedImage(id);
  }

  return (
    <Card
      className={twMerge(
        "border-blue-400 min-h-[250px]",
        selectedImage === id && " border-2 ring-4"
      )}
    >
      <Image
        alt="Failed"
        className="object-cover hover:cursor-pointer min-w-[250px] min-h-[250px]"
        src={imgSrc}
        isLoading
        onClick={handleClick}
      />
    </Card>
  );
}
