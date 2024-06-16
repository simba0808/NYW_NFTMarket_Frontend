"use client";
import Image from "next/image";
import { Tabs, Tab } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAccount } from "wagmi";

import { CopyLink } from "@/lib/components/profile/profile-kit/ProfileHeader";
import TabNFT from "./tabs/TabNFT";
import TabArtwork from "./tabs/TabArtwork";

const ProfilePage = () => {
  const { address } = useAccount();

  return (
    <div className="main-pt">
      <div className="container">
        <div className="flex flex-col items-center gap-6 pt-16">
          <Image src="/profile.png" width={200} height={200} alt="Avatar" />
          <CopyLink url={address as string} className="text-lg" />
          <div className="flex gap-3 text-xl font-bold">
            <span>0 followers</span>
            <span>·</span>
            <span>0 following</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full flex flex-col items-center">
            <Tabs
              classNames={{
                tabList: "mx-4 mt-6 text-medium bg-white/5 py-2",
                tabContent: "text-large",
              }}
              size="lg"
            >
              <Tab
                key="artwork"
                textValue="Artwork"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="material-symbols:wall-art-outline" width={20} />
                    <p>Artwork</p>
                  </div>
                }
              >
                <TabArtwork />
              </Tab>
              <Tab
                key="nft"
                textValue="NFTs"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="ri:nft-line" width={20} />
                    <p>NFTs</p>
                  </div>
                }
                className="w-full"
              >
                <TabNFT />
              </Tab>
              <Tab
                key="list"
                textValue="Listing"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="gg:list" width={20} />
                    <p>Listing</p>
                  </div>
                }
              >
                <h2>Listing</h2>
              </Tab>
              <Tab
                key="like"
                textValue="Liked"
                title={
                  <div className="flex items-center gap-1.5">
                    <Icon icon="wpf:like" width={20} />
                    <p>Liked</p>
                  </div>
                }
              >
                <h2>Liked</h2>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
