"use client";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const onLogo = useCallback(() => {
    router.push("/");
  }, []);

  const logoElement = useMemo(() => {
    return (
      <img src="/logo.png" className="hover:cursor-pointer" onClick={onLogo} alt="Not Found" />
    );
  }, []);

  return (
    <div className="w-full rounded-t-md border-t border-[#15BFFD44] ">
      <div className="footer__wrapper">
        <div className="footer__container">
          <footer className="">
            <div className="flex flex-col lg:flex-row justify-between gap-4 py-4">
              <div className="">
                {logoElement}
                <div className="max-w-[400px] mt-3 text-[14px]">
                  Ever dreamt of being part of the New York World? 
                  NYW, the bridge between Blockchain and AI, 
                  lets you own a piece of the action. Generate and mint NFTs, 
                  unlocking the future of creativity in the heart of the world.
                </div>
                <div className="flex gap-3 mt-3">
                  <span><img src="/socials/facebook.svg" alt="Not Found" /></span>
                  <span><img src="/socials/instagram.svg" alt="Not Found" /></span>
                  <span><img src="/socials/twitter.svg" alt="Not Found" /></span>
                  <span><img src="/socials/linkedin.svg" alt="Not Found" /></span>
                  <span><img src="/socials/telegram.svg" alt="Not Found" /></span>
                  <span><img src="/socials/discord.svg" alt="Not Found" /></span>
                  <span><img src="/socials/youtube.svg" alt="Not Found" /></span> 
                </div>
              </div>
              <div className="flex justify-between lg:gap-10 text-[12px] lg:text-[14px]">
                <ul className="flex flex-col gap-4">
                  <li className="text-[14px] lg:text-[20px] font-bold">Marketplace</li>
                  <li><Link href="/find" />Explore</li>
                  <li><Link href="/find" />Create</li>
                  <li><Link href="/find" />Earn</li>
                  <li><Link href="/find" />Campaign</li>
                </ul>
                <ul className="flex flex-col gap-4">
                  <li className="text-[14px] lg:text-[20px] font-bold">Partnership</li>
                  <li><Link href="/find" />Giveaway Collaboration</li>
                  <li><Link href="/find" />Art Theme Collaboration</li>
                  <li><Link href="/find" />Apply for Mod</li>
                  <li><Link href="/find" />Apply for Ambassador</li>
                </ul>
                <ul className="flex flex-col gap-4">
                  <li className="text-[14px] lg:text-[20px] font-bold">Resources</li>
                  <li><Link href="/find" />NFP Documentation</li>
                  <li><Link href="/find" />Logo</li>
                  <li><Link href="/find" />Terms of Service</li>
                  <li><Link href="/find" />Privacy Policy</li>
                </ul>
              </div>
              <div className="max-w-[400px] flex flex-col justify-center gap-4">
                <p className="text-[20px] font-bold">Stay in the loop</p>
                <p className="text-[14px]">Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating NFTs.</p>
                <div className="relative flex rounded-md">
                  <div className="rounded-l-md p-2 bg-white/10">
                    <input type="email" className="border-none outline-none bg-transparent" placeholder="Enter your email address" /> 
                  </div>
                  <div className="inset-0 bg-[#15BFFD] rounded-r-md flex items-center px-2">SUBSCRIBE</div>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] my-3 bg-white/10"></div>
            <p className="text-center text-[#727483]">Copyright ©2024NYWC. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}