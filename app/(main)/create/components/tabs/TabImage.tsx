"use client";
import { useState } from "react";
import {
  Select,
  SelectItem,
  Textarea,
  Card,
  CardFooter,
  Image,
} from "@nextui-org/react";

import ImageUploader from "../ImageUploader";
import RatioCard from "../RatioCard";
export default function TabImage({
  modelSetter,
  inputText,
  setInputText,
  imageSize,
  setImageSize,
  initImage,
  setInitImage,
}: any) {
  const models = [
    { key: "Stable Diffusion", label: "Stable Diffusion" },
    { key: "Midjourney", label: "Midjourney" },
    { key: "DALL-E", label: "DALL-E" },
  ];
  const styles = [
    { name: "Pixel", model_id: "pixel-art-v3" },
    { name: "Cartoon", model_id: "cartoonish" },
    { name: "Anime", model_id: "anime-diffusion" },
    { name: "Fantasy", model_id: "sdxl-basemodel-3-fantasy" },
    { name: "3d", model_id: "realscifi" },
    { name: "Sketch", model_id: "queratogray-sketch" },
    { name: "Technology", model_id: "techrealistic" },
    { name: "Digital-art", model_id: "spybg" },
    { name: "Film", model_id: "realistic-vision-v40" },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleCardClick = (model_id: string) => {
    console.log(model_id);
    modelSetter(model_id);
  };

  return (
    <div className="prompt-container py-6 divide-y-1 divide-white/10">
      <div>
        <div className="mb-5">
          <p className="mb-1">Choose a model</p>
          <Select
            variant="bordered"
            disabledKeys={["Midjourney", "DALL-E"]}
            placeholder="Choose a model"
            aria-label="select"
            labelPlacement="outside"
            classNames={{
              base: "max-w",
              trigger: "h-12",
            }}
            listboxProps={{
              hideSelectedIcon: true,
              itemClasses: {
                base: [
                  "text-default-700",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "dark:data-[hover=true]:bg-[#15BFFD]",
                  "data-[pressed=true]:opacity-70",
                  "data-[hover=true]:bg-[#15BFFD]",
                  "data-[selectable=true]:focus:bg-[#15BFFD]",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            popoverProps={{
              offset: 10,
              classNames: {
                base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-[#232740]",
              },
            }}
          >
            {models.map((model) => (
              <SelectItem key={model.key}>{model.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="mb-5">
          <p className="mb-1">Image Upload</p>
          <ImageUploader />
        </div>
        <div className="mb-5">
          <div className="mb-1 flex justify-between">
            <p>Image Prompt</p>
            <p>Random Prompt</p>
          </div>
          <Textarea
            variant="bordered"
            aria-label="prompt"
            labelPlacement="outside"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe something you'd like to see generated. Experiment with different words and styles..."
            className="!text-[12px] col-span-12 md:col-span-6 mb-6 md:mb-0"
          />
        </div>
        <div className="mb-5">
          <p className="mb-1">Select a Style</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-3">
            {styles.map((style, index) => (
              <Card
                key={index}
                data-model-id={style.model_id}
                isFooterBlurred
                radius="lg"
                className="border-none hover:cursor-pointer max-w-[150px]"
              >
                <Image
                  alt="Not Found"
                  className={`object-cover ${
                    selectedImageIndex === index
                      ? "border-[#15BFFD] border-2"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    handleCardClick(style.model_id);
                  }}
                  height={200}
                  width={200}
                  src={`/asset/style${index + 1}.png`}
                />
                <CardFooter className="p-0 justify-center absolute bottom-1 z-10">
                  <p className="text-tiny text-white/80">{style.name}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <p className="mb-1">Aspect Ratios</p>
          <div className="grid grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5].map((size, index) => (
              <RatioCard
                key={index}
                size={size}
                imageSize={imageSize}
                setImageSize={setImageSize}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
