"use client";
import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import { useDisconnect } from "wagmi";

const useAuthSession = () => {
  const { data: session } = useSession();
  const { disconnect } = useDisconnect();

  const disconnectAccount = useCallback(() => {
    signOut({
      redirect: false,
    });
    disconnect();
  }, [session]);

  return { session, disconnectAccount };
};

export default useAuthSession;
