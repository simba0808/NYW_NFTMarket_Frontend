"use client";
import { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Tab, Tabs, Spinner, Spacer, Input, SelectItem, Textarea, Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import TabImage from "./components/tabs/TabImage";
import TabVideo from "./components/tabs/TabVideo";
import TabMusic from "./components/tabs/TabMusic";
import ImageCard from "./components/ImageCard";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

enum WorkingTabs {
  Image = "image",
  Video = "video",
  Music = "music",
}

let width = 0;
let height = 0;

const handleRatioSelect = (w: number, h: number) => {
  width = w;
  height = h;
};

const CreateNFT = () => {
  const [activeTab, setActiveTab] = useState<WorkingTabs>(WorkingTabs.Image);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genImg, setGenImg] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [inputText, setInputText] = useState("");
  const [model_id, setModel_id] = useState('');

  useEffect(() => {
    const divElement = document.getElementById("detailed-container");
    console.log(divElement)
    if(divElement) {
      window.scrollTo({
        top: divElement.getBoundingClientRect().top + window.pageYOffset - 120,
        behavior: 'smooth' // Optional: Add smooth scrolling effect
      });
    }
  }, [])

  const GenerateImage = () => {
    setIsGenerating(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      key: "gkHp5WXV99e8TKY8R4ctMcnYED7p4twNXZ2BX85V8FFh9FmcGOhMiBx4KMIw",
      prompt: inputText,
      model_id: model_id,
      negative_prompt: "bad quality",
      width: width,
      height: height,
      safety_checker: false,
      seed: null,
      num_inference_steps: "31",
      enhance_prompt: true,
      guidance_scale: 7.5,
      multi_lingual: true,
      panorama: true,
      self_attention: true,
      upscale: "no",
      embeddings_model: null,
      lora_model: null,
      tomesd: "yes",
      clip_skip: "2",
      use_karras_sigmas: true,
      vae: null,
      lora_strength: null,
      scheduler: "UniPCMultistepScheduler",
      samples: 3,
      base64: false,
      webhook: null,
      track_id: null,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };



    fetch("https://modelslab.com/api/v6/images/text2img", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const resultImage = JSON.parse(result);
        console.log(resultImage);
        if (resultImage.status === "error") {
          // showToast("error", resultImage.message);
          return;
        }

        const imageData = resultImage.output;
        console.log({ imageData })
        setGenImg([imageData[0], imageData[1], imageData[2]]);
        setIsGenerating(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div >
      <div className="relative">
        <img className="w-full max-h-[600px]" src="/page-create.png" alt="Not Found" />
      </div>
      <div className="container" id="detailed-container">
        <Breadcrumbs
          separator=">>"
          itemClasses={{
            separator: "px-2"
          }}
          className="my-6"
        >
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Create NFTs</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col lg:flex-row gap-3 pb-6">
          <div className="lg:max-w-[350px] px-3 bg-white/5 rounded-md  p-4 pr-0">
            <div className="lg:h-[calc(100vh-220px)] lg:overflow-y-auto pr-4">
              <Tabs
                aria-label="Notifications"
                color="primary"
                classNames={{
                  base: "w-full",
                  tabList: "gap-6 px-6 py-0 w-full relative rounded-none border-b border-divider",
                  tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                  cursor: "w-full bg-[#22d3ee]",
                  tab: "max-w-fit px-2 h-12",
                }}
                selectedKey={activeTab}
                variant="underlined"
                onSelectionChange={(selected) => setActiveTab(selected as WorkingTabs)}
              >
                <Tab
                  key="image"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Image</span>
                    </div>
                  }
                />
                <Tab
                  key="video"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Video</span>
                    </div>
                  }
                />
                <Tab
                  key="music"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Music</span>
                    </div>
                  }
                />
              </Tabs>
              {
                <TabImage modelSetter={setModel_id} onSelect={handleRatioSelect} inputText={inputText} setInputText={setInputText} /> ||
                activeTab == WorkingTabs.Video && <TabVideo /> ||
                activeTab == WorkingTabs.Music && <TabMusic />
              }
              <div className="flex flex-col gap-3 py-6">
                <div className="flex justify-center">
                  <PrimaryButton
                    text="Create Now"
                    onClick={() => { GenerateImage(); setIsCreating(true); }}
                    //isLoading={isGenerating}
                  />
                </div>
                <p className="text-center">Cost: 2 $cNFP</p>
                <div className="py-2 bg-white/5 text-xs text-center rounded-md">
                  You don't have enough $cNFP to create. Get More $cNFP
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 bg-white/5 rounded-md">
            <div className="lg:h-[calc(100vh-220px)]  ">
              <div className="w-full h-full flex justify-center items-center text-center">
                {!isCreating ? (
                  <div className="max-w-[500px] flex justify-center items-center flex-col text-center">
                    <img src="/generate.svg" alt="Not Found" />
                    <p>Generated images will appear here</p>
                    <p className="font-small">Looks like you haven't created anything yet! Click the button below to copy a sample prompt and then click Generate.</p>
                    <PrimaryButton className="min-w-[300px] mt-8" text="Use sample prompt" />
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center flex-col">
                    {isGenerating ? (
                      <Spinner label="Loading..." size="lg" style={{ color: '#15BFFD', background: 'transparent'}} />
                    ) : (
                      <div className="w-full">
                        <div className="grid grid-cols-3 gap-3">
                          {genImg.length === 3 && genImg.map((item, id) => {
                            return (
                              <div key={id}>
                                <ImageCard
                                  selectedList={selectedList}
                                  setSelectedList={setSelectedList}
                                  imgSrc={item}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <Spacer y={2} />
                          {!isCreating ? (
                            <div></div>
                          ) : (
                            <Input
                              aria-label="Search"
                              classNames={{
                                inputWrapper: "w-full h-full bg-white/10 py-2 text-lg",
                              }}
                              labelPlacement="outside"
                              placeholder="Search Prompts"
                              radius="sm"
                              startContent={
                                <span>Name:</span>
                              }
                              endContent={
                                <PrimaryButton text="Name" />
                              }
                            />
                          )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;