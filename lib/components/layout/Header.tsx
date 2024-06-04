"use client";
import { ReactNode, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import ToggleProfile from "@/lib/components/profile/ToggleProfile";
import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { useAccount } from "wagmi";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { address } = useAccount();
  const path = usePathname();
  
  const onLogo = useCallback(() => {
    router.push("/");
  }, []);

  const logoElement = useMemo(() => {
    return (
      <img src="/logo.png" className="hover:cursor-pointer" onClick={onLogo} alt="Not Found" />
    );
  }, []);

  const headerTrailing = useMemo(() => (
    <div>
      {
        session && address ? 
          <ToggleProfile /> :
          <PrimaryButton 
            text={path==="/signin"?"Get Started":"Connect Wallet"}
            className="w-32 md:w-40" 
            onClick={() => router.push("/signin")} varient="secondary" 
          />
      }
    </div>
  ), [session, status]);
  
  return (
    <div className="header__wrapper overflow-x bg-dark-blue shadow-lg shadow-white/10">
      <div className=" bg-white/5">
        <div className="header__container">
          <header className="flex flex-row items-center justify-between">
            {logoElement}
            <ul className="hidden md:flex items-center justify-between gap-[28px]">
              <li role="button" tabIndex={0} onClick={() => router.push("/explore")}>
                <span>Explorer NFT</span>
              </li>
              <li role="button" tabIndex={0} onClick={() => router.push("/create")}>
                <span>Create NFT</span>
              </li>
              <li role="button" tabIndex={0} onClick={() => router.push("/earn")}>
                <span>EARN</span>
              </li>
              <li role="button" tabIndex={0} onClick={() => router.push("/campaign")}>
                <span>Campaigns</span>
              </li>
            </ul>
            { headerTrailing }
          </header>
        </div>  
      </div>
    </div>
  );
}