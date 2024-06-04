"use client";
import { ReactNode, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Header({trailing}: {trailing?: ReactNode}) {
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
            { trailing }
          </header>
        </div>  
      </div>
    </div>
  );
}