"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount, useWriteContract } from "wagmi";
import { Breadcrumbs, BreadcrumbItem, Tab, Tabs, Spinner, Spacer, Input } from "@nextui-org/react";

import TabImage from "./components/tabs/TabImage";
import TabVideo from "./components/tabs/TabVideo";
import TabMusic from "./components/tabs/TabMusic";
import ImageCard from "./components/ImageCard";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

import NFTABI from "@/lib/web3/contracts/NYWNFT.json";

enum WorkingTabs {
  Image = "image",
  Video = "video",
  Music = "music",
}

const MARKET_ADDRESS = (
  process.env.NEXT_PUBLIC_MARKET_ADDRESS
) as `0x${string}`;

const CreateNFT = () => {
  const router = useRouter()
  const { data } = useSession();
  const { isConnected, address } = useAccount();

  const { writeContractAsync: mintNFTAsync } = useWriteContract()

  const [activeTab, setActiveTab] = useState<WorkingTabs>(WorkingTabs.Image);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genImg, setGenImg] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [inputText, setInputText] = useState("");
  const [model_id, setModel_id] = useState('');
  const [imageSize, setImageSize] = useState(0);

  const [nftName, setNftName] = useState("");

  const imageSizeArr = [
    { width: 1024, height: 1024 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 1024, height: 576 },
    { width: 576, height: 1024 },
  ]

  useEffect(() => {
    console.log(data, address, isConnected)
    if (data?.provider !== "siwe" || (isConnected === false && !address)) {
      signOut({
        redirect: false
      })
      router.push("/signin");
    }
    const divElement = document.getElementById("detailed-container");
    if(divElement) {
      window.scrollTo({
        top: divElement.getBoundingClientRect().top + window.pageYOffset - 120,
        behavior: "smooth", // Optional: Add smooth scrolling effect
      });
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const GenerateImage = () => {
    setIsGenerating(true);
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      key: "gkHp5WXV99e8TKY8R4ctMcnYED7p4twNXZ2BX85V8FFh9FmcGOhMiBx4KMIw",
      prompt: inputText,
      model_id: model_id,
      negative_prompt: "bad quality",
      width: imageSizeArr[imageSize-1].width,
      height: imageSizeArr[imageSize-1].height,
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
      redirect: "follow",
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
        console.log({ imageData });
        setGenImg([imageData[0], imageData[1], imageData[2]]);
        setIsGenerating(false);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  const token = process.env.NEXT_PUBLIC_PINATA_JWT;

  const uploadJSONToIPFS = async (JSONBody: any) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(JSONBody)
      });
      
      const data: any = res.json();
    
      return {
        success: true,
        pinataURL: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`
      };
    } catch (error: any) {
      console.error(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  };
  
  const uploadMetadata = async (nftName: string, nftAssetURL: string) => {
    console.log(nftName, nftAssetURL)
    return new Promise(async (resolve, reject) => {
      if (!nftName || !nftAssetURL) {
        reject(new Error("Missing nftColName or nftFileURL"));
        return;
      }

      const nftJSON = {
        name: nftName,
        image: nftAssetURL, 
        description: "Your NFT description here", // Add a description field if you want
        attributes: [], // Add any custom attributes you want here
      };

      console.log("Json", nftJSON)
      try {
        const res = await uploadJSONToIPFS(nftJSON); // Since uploadJSONToIPFS looks like an async function
        if (res.success === true) {
          resolve(res);
        } else {
          throw new Error('Uploading to Pinata failed');
        }
      } catch (err) {
        reject(err);
      }
    });
  }


  const mintNow = async () => {
    if (nftName === "" || genImg[selectedImage] === "") {
      alert("Select image and insert nft name");
      return;
    } else {
      const uploadRes: any = await uploadMetadata(nftName, genImg[selectedImage]);
      console.log(uploadRes)
      if (uploadRes.success === true) {
        const metadataURL = uploadRes?.pinataURL

        try {
          const tx2 = await mintNFTAsync({
            address: MARKET_ADDRESS,
            abi: NFTABI,
            functionName: "create",
            args: [metadataURL],
          });
          console.log(tx2)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  return (
    <div>
      <div className="relative">
        <img
          className="w-full max-h-[600px]"
          src="/page-create.png"
          alt="Not Found"
        />
      </div>
      <div className="container" id="detailed-container">
        <Breadcrumbs
          separator=">>"
          itemClasses={{
            separator: "px-2",
          }}
          className="my-6"
        >
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Create NFTs</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col lg:flex-row gap-3 pb-6">
          <div className="lg:max-w-[350px] px-3 bg-white/5 rounded-md  p-4 pr-0">
            <div className="lg:h-[calc(100vh-220px)] lg:overflow-y-auto pr-4 flex flex-col">
              <Tabs
                fullWidth
                color="primary"
                classNames={{
                  base: "w-full",
                  tabList:
                    "gap-3 px-3 py-0 w-full relative rounded-none border-b border-divider",
                  tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                  cursor: "w-full bg-[#22d3ee]",
                  tab: "px-2 h-12",
                }}
                selectedKey={activeTab}
                variant="underlined"
                onSelectionChange={(selected) =>
                  setActiveTab(selected as WorkingTabs)
                }
              >
                <Tab
                  key="image"
                  title={
                    <div className="flex items-center space-x-1">
                      <GalleryIcon />
                      <span>Image</span>
                    </div>
                  }
                />
                <Tab
                  key="video"
                  title={
                    <div className="flex items-center space-x-1">
                      <VideoIcon />
                      <span>Video</span>
                    </div>
                  }
                />
                <Tab
                  key="music"
                  title={
                    <div className="flex items-center space-x-1">
                      <MusicIcon />
                      <span>Music</span>
                    </div>
                  }
                />
              </Tabs>
              {
                <TabImage 
                  modelSetter={setModel_id} 
                  inputText={inputText} 
                  setInputText={setInputText} 
                  imageSize={imageSize}
                  setImageSize={setImageSize}
                /> ||
                activeTab == WorkingTabs.Video && <TabVideo /> ||
                activeTab == WorkingTabs.Music && <TabMusic />
              }
              <div className="flex flex-col gap-3 py-6">
                <div className="flex justify-center">
                  <PrimaryButton
                    text="Create Now"
                    onClick={() => {
                      GenerateImage();
                      setIsCreating(true);
                    }}
                    isLoading={isLoading}
                  />
                </div>
                <p className="text-center">Cost: 2 $cNYW</p>
                <div className="py-2 bg-white/5 text-xs text-center rounded-md">
                  You don't have enough $cNYW to create. Get More $cNYW
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
                    <p className="font-small">
                      Looks like you haven't created anything yet! Click the
                      button below to copy a sample prompt and then click
                      Generate.
                    </p>
                    <PrimaryButton
                      className="min-w-[300px] mt-8"
                      text="Use sample prompt"
                    />
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center flex-col">
                    {isGenerating ? (
                      <Spinner
                        label="Loading..."
                        size="lg"
                        style={{ color: "#15BFFD", background: "transparent" }}
                      />
                    ) : (
                      <div className="w-full">
                        <div className="grid lg:grid-cols-3 gap-3">
                          {genImg.length === 3 && genImg.map((item, id) => {
                            return (
                              <ImageCard
                                id={id}
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                imgSrc={item}
                              />
                            );
                          })}
                        </div>
                        <Spacer y={6} />
                          {!isCreating ? (
                            <div></div>
                          ) : (
                            <Input
                              aria-label="Search"
                              classNames={{
                                inputWrapper: "w-full h-full bg-white/10 py-2",
                                input: "text-lg"
                              }}
                              value={nftName}
                              onChange={(e) => setNftName(e.target.value)}
                              labelPlacement="outside"
                              placeholder="Input your NFT name"
                              radius="sm"
                              endContent={
                                <PrimaryButton onClick={mintNow} text="Mint Now" />
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
};

export default CreateNFT;
