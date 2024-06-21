"use client";
import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  Badge,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

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
      <img
        src="/logo.png"
        className="hover:cursor-pointer"
        onClick={onLogo}
        alt="Not Found"
      />
    );
  }, []);

  const headerTrailing = useMemo(
    () => (
      <div>
        {session && address ? (
          <ToggleProfile />
        ) : (
          <PrimaryButton
            text={path === "/signin" ? "Get Started" : "Connect Wallet"}
            className="w-32 md:w-40"
            onClick={() => router.push("/signin")}
            varient="secondary"
          />
        )}
      </div>
    ),
    [session, status]
  );

  return (
    <div className="w-full">
      <Navbar
        classNames={{
          base: "lg:bg-transparent lg:backdrop-filter-none",
          wrapper: "px-4 sm:px-6",
          item: "data-[active=true]:text-primary max-w-[1536px]",
        }}
        height="100px"
        maxWidth="2xl"
      >
        <NavbarBrand>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
          {logoElement}
        </NavbarBrand>
        <NavbarContent
          className="ml-4 hidden h-12 w-full max-w-fit gap-8 rounded-full bg-white/15 px-8  sm:flex"
          justify="start"
        >
          <NavbarItem>
            <Link className="flex gap-2 text-inherit" href="/explore">
              Explorer NFT
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              aria-current="page"
              className="flex gap-2 text-inherit"
              href="/create"
            >
              Create NFT
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="flex gap-2 text-inherit" href="/earn">
              EARN
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="flex gap-2 text-inherit" href="/campaigns">
              Campaigns
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          className="ml-auto flex h-12 max-w-fit items-center gap-0 rounded-full p-0 lg:bg-content2 lg:px-1 lg:dark:bg-content1"
          justify="end"
        >
          {/* Search */}
          <NavbarItem className="mr-2 hidden lg:flex">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper:
                  "bg-default-100 group-data-[hover=true]:bg-default-50 group-data-[focus=true]:bg-100",
              }}
              labelPlacement="outside"
              placeholder="Search..."
              radius="full"
              startContent={
                <Icon
                  className="text-default-500"
                  icon="solar:magnifer-linear"
                  width={20}
                />
              }
            />
          </NavbarItem>
          {/* Mobile search */}
          <NavbarItem className="lg:hidden">
            <Button isIconOnly radius="full" variant="light">
              <Icon
                className="text-default-500"
                icon="solar:magnifer-linear"
                width={20}
              />
            </Button>
          </NavbarItem>
          {/* Theme change */}
          <NavbarItem className="hidden lg:flex">
            <Button isIconOnly radius="full" variant="light">
              <Icon
                className="text-default-500"
                icon="solar:sun-linear"
                width={24}
              />
            </Button>
          </NavbarItem>
          {/* Settings */}
          <NavbarItem className="hidden lg:flex">
            <Button isIconOnly radius="full" variant="light">
              <Icon
                className="text-default-500"
                icon="solar:settings-linear"
                width={24}
              />
            </Button>
          </NavbarItem>
          {/* Notifications */}
          <NavbarItem className="flex">
            <Popover offset={12} placement="bottom-end">
              <PopoverTrigger>
                <Button
                  disableRipple
                  isIconOnly
                  className="overflow-visible"
                  radius="full"
                  variant="light"
                >
                  <Badge
                    color="danger"
                    content="5"
                    showOutline={false}
                    size="md"
                  >
                    <Icon
                      className="text-default-500"
                      icon="solar:bell-linear"
                      width={22}
                    />
                  </Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
                <span>KKK</span>
              </PopoverContent>
            </Popover>
          </NavbarItem>
          {/* User Menu */}
          <NavbarItem className="px-2">{headerTrailing}</NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem isActive>
            <Link
              aria-current="page"
              className="w-full"
              color="primary"
              href="/explore"
            >
              Explorer NFT
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/create">
              Create NFT
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/earn">
              EARN
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/campaigns">
              Campaigns
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
    // <div className="header__wrapper overflow-x bg-dark-blue shadow-lg shadow-white/10">
    //   <div className=" bg-white/5">
    //     <div className="header__container">
    //       <header className="flex flex-row items-center justify-between">
    //         {logoElement}
    //         <ul className="hidden md:flex items-center justify-between gap-[28px]">
    //           <li
    //             role="button"
    //             tabIndex={0}
    //             onClick={() => router.push("/explore")}
    //           >
    //             <span>Explorer NFT</span>
    //           </li>
    //           <li
    //             role="button"
    //             tabIndex={0}
    //             onClick={() => router.push("/create")}
    //           >
    //             <span>Create NFT</span>
    //           </li>
    //           <li
    //             role="button"
    //             tabIndex={0}
    //             onClick={() => router.push("/earn")}
    //           >
    //             <span>EARN</span>
    //           </li>
    //           <li
    //             role="button"
    //             tabIndex={0}
    //             onClick={() => router.push("/campaign")}
    //           >
    //             <span>Campaigns</span>
    //           </li>
    //         </ul>
    //         {headerTrailing}
    //       </header>
    //     </div>
    //   </div>
    // </div>
  );
}
