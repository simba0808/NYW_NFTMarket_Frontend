import React from "react";
import { Card, Image } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function ImageCard(props: any) {

  const { selectedImage, setSelectedImage, id, imgSrc } = props;

  function handleClick() {
    console.log(id)
    setSelectedImage(id);
  }

  return (
    <Card className={twMerge(
        "border-blue-400 ",
        selectedImage === id && " border-2 ring-4"
      )
    }>
      <Image
        alt="Failed"
        className="object-cover hover:cursor-pointer"
        src={imgSrc}
        onClick={handleClick} // Added onClick handler to the Image
      />
    </Card>
  );
}
