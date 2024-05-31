"use client";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
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
    <div className="header__wrapper overflow-x bg-dark-blue">
      <div className=" bg-white/5">
        <div className="header__container">
          <header className="flex flex-row items-center justify-between">
            {logoElement}
            <ul className="hidden md:flex items-center justify-between gap-[28px]">
              <li onClick={() => router.push("/explore")}>
                <span>Explorer NFT</span>
              </li>
              <li onClick={() => router.push("/create")}>
                <span>Create NFT</span>
              </li>
              <li onClick={() => router.push("/earn")}>
                <span>EARN</span>
              </li>
              <li onClick={() => router.push("/campaign")}>
                <span>Campaigns</span>
              </li>
            </ul>
            <div className="relative w-32 md:w-40">
              <img src="/bluebutton.png" alt="Not Found" />
              <span className="place-center z-10 w-full text-center">Connect Wallet</span>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}