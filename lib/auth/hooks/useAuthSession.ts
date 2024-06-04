"use client";
import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";


const useAuthSession = () => {
  const { data: session } = useSession();

  const disconnect = useCallback(() => {
    signOut({
      redirect: false
    })
  }, [session]);

  return { session, disconnect }
}

export default useAuthSession;