"use client";
import { useEffect, useState } from "react";
import { Button, Input, Switch,Accordion, AccordionItem, Pagination } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import FeaturedIcon from "@/public/icon/featured.svg";
import PFPIcon from "@/public/icon/pfp.svg";
import VideoIcon from "@/public/icon/movie.svg";
import MusicIcon from "@/public/icon/music.svg";
import NewIcon from "@/public/icon/new.svg";
import FireIcon from "@/public/icon/fire.svg";
import LikeIcon from "@/public/icon/like.svg";
import FollowIcon from "@/public/icon/follow.svg";

import MultiCarousel from "@/lib/components/carousel/MultiCarousel";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

import NFTDetails from "./NFTDetails.json";

import type { CommentType } from "@/lib/components/card/NFTViewCard";

type CommentJsonType = CommentType[];


const Explorer = () => {

  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState(-1);

  const DetailNFTView = ({nftId}: {nftId: number}) => {
    const [page, setPage] = useState<number>(1);
    const [comments, setComments] = useState<CommentJsonType>([]);
  
    const pages = Math.ceil(NFTDetails[nftId-1].comments.length / 8);
  
    useEffect(() => {
      setComments(NFTDetails[nftId-1].comments.slice((page-1)*8, (page-1)*8+8));
    }, [page]);

    useEffect(() => {
      const divElement = document.getElementById("detailed-container");
      if(divElement) {
        window.scrollTo({
          top: divElement.getBoundingClientRect().top + window.pageYOffset - 180,
          behavior: 'smooth' // Optional: Add smooth scrolling effect
        });
      }
    }, [nftId]);
  
    const CommentCard = ({creator, comment}: {creator: string; comment: string;}) => {
      return (
        <div className="flex gap-4 py-4 border-b-1 border-gray-700/30">
          <img className="w-8 h-8" src="/asset/avatar.png" alt="Not Found" />
          <div>
            <p className="font-medium">{creator}</p>
            <p className="small-font mt-2">{comment}</p>
          </div>
        </div>
      );
    }
  
    return (
      <div id="detailed-container">
        <div className="flex flex-col lg:flex-row gap-6 mt-4 lg:mt-10">
          <div className="p-2 lg:bg-white/10 rounded-md">
            <img className="max-h-[600px]" src={NFTDetails[nftId-1].asset} alt="Not Found" />
          </div>
          <div className="w-full">
            <h2>{NFTDetails[nftId-1].name}</h2>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <img src="/asset/avatar.png" alt="Not Found" />
                <div>
                  <p>{NFTDetails[nftId-1].creator}</p>
                  <p>{NFTDetails[nftId-1].id}</p>
                </div>
              </div>
              <div className="flex gap-3 lg:gap-6">
                <span className="flex gap-1">
                  <FireIcon />
                  <span>{NFTDetails[nftId-1].fire}</span>
                </span>
                <span className="flex gap-1">
                  <LikeIcon />
                  <span>{NFTDetails[nftId-1].like}</span>
                </span>
                <span>
                  <FollowIcon />
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-6 gap-y-2">
              <div className="lg:w-[30%]">
                <p>Current Price</p>
                <p className="text-2xl font-semibold">{NFTDetails[nftId-1].price} ETH</p>
              </div>
              <div>
                <p>Auction end in</p>
                <p className="text-2xl font-semibold">00d  00h  00m  00s</p>
              </div>
            </div>
            <div className="mt-8">
              <PrimaryButton className="w-[200px]" text="Purchase NFT" />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Accordion
            fullWidth
            keepContentMounted
            className="gap-3 px-0"
            itemClasses={{
              base: "!bg-white/10",
              title: "font-medium",
              trigger: "py-4 md:py-6",
              content: "pt-0 pb-6 text-base text-default-500",
              indicator: "data-[open=true]:rotate-180",
            }}
            selectionMode="multiple"
            variant="splitted"
          >
              <AccordionItem
                key={0}
                indicator={<Icon icon="solar:alt-arrow-down-linear" width={24} />}
                title="Prompt"
              >
                {NFTDetails[nftId-1].prompt}
              </AccordionItem>
          </Accordion>
        </div>
        <div className="mt-10">
          <h2>Comment</h2>
          <p>Write your comment for this NFT:</p>
          <div className="mt-6">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "w-full h-full p-2 bg-white/10",
              }}
              labelPlacement="outside"
              placeholder="Share your thoughts"
              radius="sm"
              startContent={
                <img className="w-8" src="/asset/avatar.png" alt="Not Found" />
              }
              endContent = {
                <Button className="bg-light-blue text-dark-blue font-semibold">Send</Button>
              }
            />
          </div>
          <div className="mt-6">
            {
              comments.map((comment, index) => {
                return (
                  <CommentCard
                    key={index}
                    creator={comment.comment_creator}
                    comment={comment.comment_data}
                  />
                );
              })
            }
            
          </div>
          <div className="flex justify-between items-center py-3">
            <span>Show List {page} of {NFTDetails[nftId-1].comments.length}</span>
            <Pagination
              isCompact
              showControls
              showShadow
              variant="light"
              className="text-dark-blue"
              page={page}
              total={pages}
              onChange={(page: number) => setPage(page)}
            />
          </div>
        </div>
        <div className="mt-10 text-center">
          <h2>More by SDXL 1.0 </h2>
          <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
          <div className="mt-8">
            <MultiCarousel 
              data={NFTDetails} 
              delay={2500} 
              selectedNFT={selectedNFT} 
              setSelectedNFT={setSelectedNFT}
            />
          </div>
        </div>
        <div className="mt-10 text-center">
          <h2>You might also like</h2>
          <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
          <div className="mt-8">
            <MultiCarousel 
              data={NFTDetails} 
              delay={3000} 
              selectedNFT={selectedNFT} 
              setSelectedNFT={setSelectedNFT}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <img className="w-full max-h-[600px]" src="/metaverse.png" alt="Not Found" />
        <div className="absolute top-0 w-full h-full bg-transparent/5" />
      </div>
      <div className="container">
        <div className="flex justify-between items-center mt-10">
          <span>
            <span className="hover:cursor-pointer">Home</span> 
            <span className={`${selectedNFT==-1?"text-light-blue":""} hover:cursor-pointer`} onClick={() => setSelectedNFT(-1)}> &#187; NFT’s EXPLORE</span>
            {
              selectedNFT !== -1 && <span className="text-light-blue hover:cursor-pointer"> &#187; {NFTDetails[selectedNFT - 1].name}</span>
            }
          </span>
          <Switch defaultSelected color="secondary">
            <span>Buy Now</span>
          </Switch>
        </div>
        {
          selectedNFT === -1 ? 
            <div>
              <div className="flex flex-col lg:flex-row gap-4 p-2 mt-6 bg-white/10 rounded-md">
                <Input
                  aria-label="Search"
                  classNames={{
                    inputWrapper: "w-full h-full bg-white/10",
                  }}
                  labelPlacement="outside"
                  placeholder="Search Prompts"
                  radius="sm"
                  startContent={
                    <Icon className="text-default-500" icon="solar:magnifer-linear" width={20} />
                  }
                />
                <div className="svg-container flex flex-wrap lg:flex-nowrap gap-2 font-medium">
                  <span className={`${selectedItem == 0 ? "text-light-blue":""} item`} onClick={() => setSelectedItem(0)}>
                    <FeaturedIcon className={selectedItem == 0?"fill-light-blue":"fill-white"} />
                    Featured
                  </span>
                  <span className={`${selectedItem == 1 ? "text-light-blue":""} item`} onClick={() => setSelectedItem(1)}>
                    <PFPIcon className={selectedItem == 1?"fill-light-blue":"fill-white"} />
                    PFP
                  </span>
                  <span className={`${selectedItem == 2 ? "text-light-blueeee":""} item`} onClick={() => setSelectedItem(2)}>
                    <VideoIcon className={selectedItem == 2?"fill-light-blue":"fill-white"} />
                    Video
                  </span>
                  <span className={`${selectedItem == 3 ? "text-light-blue":""} item`} onClick={() => setSelectedItem(3)}>
                    <MusicIcon className={selectedItem == 3?"fill-light-blue":"fill-white"} />
                    Music
                  </span>
                  <span className={`${selectedItem == 4 ? "text-light-blue":""} item`} onClick={() => setSelectedItem(4)}>
                    <NewIcon className={selectedItem == 4?"fill-light-blue":"fill-white"} />
                    Newest
                  </span>
                </div>
              </div>
              <div className="explorer-identifier mt-8 flex flex-wrap gap-2 lg:gap-4">
                <Button radius="full">
                  #Kimchi-Challenge 
                </Button>
                <Button radius="full">
                  #AvengerDAO
                </Button>
                <Button radius="full">
                  #abstract
                </Button>
                <Button radius="full">
                  #illustration
                </Button>
                <Button radius="full">
                  #film
                </Button>
                <Button radius="full">
                  #technology 
                </Button>
                <Button radius="full">
                  #sketch
                </Button>
                <Button radius="full">
                  #pixel
                </Button>
                <Button radius="full">
                  #cartoon
                </Button>
                <Button radius="full">
                  #anime
                </Button>
              </div>
              <div className="text-center">
                <div className="mt-16">
                  <h2>Hot</h2>
                  <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
                  <div className="mt-10">
                    <MultiCarousel 
                      selectedNFT={selectedNFT} 
                      setSelectedNFT={setSelectedNFT} 
                      delay={2500} 
                      data={NFTDetails} 
                    />
                  </div>
                  <div className="flex justify-center mt-12">
                    <PrimaryButton className="w-[300px]" text="show all hot models" />
                  </div>
                </div>
                <div className="mt-16">
                  <h2>Most used</h2>
                  <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
                  <div className="mt-10">
                    <MultiCarousel 
                      selectedNFT={selectedNFT} 
                      setSelectedNFT={setSelectedNFT}
                      delay={2000} 
                      data={NFTDetails} 
                    />
                  </div>
                  <div className="flex justify-center mt-12">
                    <PrimaryButton className="w-[300px]" text="View All Voice Models" />
                  </div>
                </div>
                <div className="mt-16 mb-20">
                  <h2>Hot</h2>
                  <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
                  <div className="mt-10">
                    <MultiCarousel 
                      delay={3000} 
                      data={NFTDetails} 
                      selectedNFT={selectedNFT} 
                      setSelectedNFT={setSelectedNFT}
                    />
                  </div>
                  <div className="flex justify-center mt-12">
                    <PrimaryButton className="w-[300px]" text="view all Video Models" />
                  </div>
                </div>
              </div>
            </div> : (
              <DetailNFTView nftId={selectedNFT} />
            )
            
        }
        
        
      </div>
    </div>
  );
}

export default Explorer;