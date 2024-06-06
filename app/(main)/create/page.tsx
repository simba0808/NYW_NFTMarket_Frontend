"use client";
import { useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Tab, Tabs, Spinner, Spacer, SelectItem, Textarea, Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

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
      samples: 4,
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
        setGenImg([imageData[0], imageData[1], imageData[2], imageData[3]]);
        setIsGenerating(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div >
      <div className="relative">
        <img className="w-full max-h-[600px]" src="/page-create.png" alt="Not Found" />
      </div>
      <div className="container">
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
          <div className="lg:w-1/3 px-3 bg-white/5 rounded-md">
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
                  isLoading={isGenerating}
                />
              </div>
              <p className="text-center">Cost: 2 $cNFP</p>
              <div className="py-2 bg-white/5 text-xs text-center rounded-md">
                You don't have enough $cNFP to create. Get More $cNFP
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 px-3 bg-white/5 rounded-md">
            <div className="flex justify-center items-center text-center h-[900px]">
              {!isCreating ? (
                <div className="flex justify-center items-center flex-col text-center">
                  <img src="/generate.svg" alt="Not Found" />
                  <p>Generated images will appear here</p>
                  <p className="font-small">Looks like you haven't created anything yet! Click the button below to copy a sample prompt and then click Generate.</p>
                  <PrimaryButton className="min-w-[300px] mt-4" text="Use sample prompt" />
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col">
                  {isGenerating ? (
                    <Spinner label="Loading..." size="lg" style={{ color: '#15BFFD' }} />
                  ) : (
                    <div className="flex flex-wrap">
                      {genImg.length === 4 && genImg.map((item, id) => {
                        return (
                          <div key={id} className="w-1/2 p-2">
                            <ImageCard
                              selectedList={selectedList}
                              setSelectedList={setSelectedList}
                              imgSrc={item}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            <Spacer y={2} />
            <div>
              {!isCreating ? (
                <div></div>
              ) : (
                <div className="flex justify-between items-center bg-white/5 rounded-md p-4">
                  <p>Name:</p>
                  <PrimaryButton text="Name" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;