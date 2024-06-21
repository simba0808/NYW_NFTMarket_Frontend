import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import clsx from "clsx";
import { cookieToInitialState } from "wagmi";
import { ToastContainer } from "react-toastify";

import { Providers } from "./providers";
import Web3ModalProvider from "@/lib/web3/WagmiProvider";
import AuthSessionProvider from "@/lib/auth/AuthSessionProvider";
import { wagmiConfig } from "@/lib/web3/WagmiConfig";
import authConfig from "@/lib/auth/authConfig";

import { siteConfig } from "@/lib/config/site";
import { fontSans } from "@/lib/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );
  const session = await getServerSession(authConfig);

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-dark-blue font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Web3ModalProvider initialState={initialState}>
            <AuthSessionProvider session={session}>
              {children}
              <ToastContainer />
            </AuthSessionProvider>
          </Web3ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
