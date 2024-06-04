"use client";
import React, { useMemo } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Header from "@/lib/components/layout/Header";
import Footer from "@/lib/components/layout/Footer";
import ToggleProfile from "@/lib/components/profile/ToggleProfile";
import PrimaryButton from "@/lib/components/button/PrimaryButton";

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const path = usePathname();

  const headerTrailing = useMemo(() => (
    <div>
      {
        session ? 
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
    <div className="h-[100vh] bg-dark-blue">
      <Header trailing={headerTrailing} />
      {children}
    </div>
  );
}