import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";
import WagmiProvider from "@/lib/web3/WagmiProvider";
import { wagmiConfig } from "@/lib/web3/WagmiConfig";

import { siteConfig } from "@/lib/config/site";
import { fontSans } from "@/lib/config/fonts";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(wagmiConfig, headers().get("cookie"));

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-dark-blue font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <WagmiProvider initialState={initialState}>
            {children}
          </WagmiProvider>
        </Providers>
      </body>
    </html>
  );
}
