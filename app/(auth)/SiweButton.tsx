"use client";
import { useCallback, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useConfig, useDisconnect, useSignMessage } from "wagmi";

const SiweButton = () => {
  const { address } = useAccount();
  const { chains } = useConfig();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage();

  const onSignIn = useCallback(async () => {
    console.log(address);
    const callbackUrl = "/explore"
    if (!address) {
      localStorage.removeItem("wallteconnet");
      localStorage.removeItem("wagmi.wallet");
      localStorage.removeItem("wagmi.store");
      localStorage.removeItem("wagmi.connected");
      disconnect();

      open();
    } else {
      try {
        const message = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: chains[0].id,
          nonce: await getCsrfToken(),
        });
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        });
  
        signIn("siwe", {
          message: JSON.stringify(message),
          redirect: true,
          signature,
          callbackUrl
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [address]);

  return (
    <button onClick={onSignIn}>
      Sign
    </button>
  );
}

export default SiweButton;