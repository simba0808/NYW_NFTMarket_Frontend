"use client";
import { useState } from "react";
import {Breadcrumbs, BreadcrumbItem, Tab, Tabs, Select, SelectItem, Textarea, Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import TabImage from "./components/tabs/TabImage";
import TabVideo from "./components/tabs/TabVideo";
import TabMusic from "./components/tabs/TabMusic";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

enum WorkingTabs {
  Image = "image",
  Video = "video",
  Music = "music",
}

const CreateNFT = () => {
  const [activeTab, setActiveTab] = useState<WorkingTabs>(WorkingTabs.Image);
    
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
          <div className="lg:max-w-[400px] px-3 bg-white/5 rounded-md">
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
              activeTab == WorkingTabs.Image && <TabImage /> ||
              activeTab == WorkingTabs.Video && <TabVideo /> ||
              activeTab == WorkingTabs.Music && <TabMusic />
            }
          </div>
          <div className="grow">
            <div className="relative flex justify-center w-full aspect-square bg-white/5 rounded-md">
              <div className="max-w-[400px] absolute top-[50vh] -translate-y-[50%] flex flex-col items-center gap-4 text-center">
                <img src="/generate.svg" alt="Not Found" />
                <p>Generated images will appear here</p>
                <p className="font-small">Looks like you haven't created anything yet! Click the button below to copy a sample prompt and then click Generate.</p>
                <PrimaryButton className="min-w-[300px] mt-4" text="Use sample prompt" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFT;