import React from "react";
import { Card, Button, Image } from "@nextui-org/react";
// import { CheckIcon } from "@heroicons/react/24/outline";

export default function ImageCard(props: any) {

  const { selectedList, setSelectedList, id, imgSrc } = props;

  function handleClick() {
    if(!imgSrc) {
      return;
    }
    if (selectedList?.find((it: number) => it === id)) {
      setSelectedList(selectedList?.filter((it: number) => it !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
    console.log(selectedList)
  }

  return (
    <Card>
      <Image
        alt="Failed"
        className="object-cover hover:cursor-pointer"
        src={imgSrc}
        onClick={() => handleClick()} // Added onClick handler to the Image
      />
      <div className="absolute z-10 pt-1 pl-1">
        <Button
          isIconOnly
          radius="full"
          variant="light"
        >
          {selectedList?.find((it: number) => it === id)}
        </Button>
      </div>
    </Card>
  );
}
