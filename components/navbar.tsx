"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

import { Logo } from "@/components/icons";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Searchbar from "./Searchbar";
import { useState } from "react";

export const Navbar = () => {
  const [navbarMenuChange, setNavbarMenuChange] = useState(false);

  const navbarMenuChangeHandler = (e: boolean) => {
    setNavbarMenuChange(e);
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered className="bg-secondary text-white">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Book Tracer</p>
          </NextLink>
        </NavbarBrand>
        <NavbarItem className="hidden md:flex lg:w-80">
          <Searchbar
            navbarMenuChange={navbarMenuChange}
            setNavbarMenuChange={setNavbarMenuChange}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx("data-[active=true]:text-primary data-[active=true]:font-medium")}
                href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-white" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>

        <SignedIn>
          <NavbarItem className="hidden md:flex">
            <UserButton />
          </NavbarItem>
        </SignedIn>

        <SignedOut>
          <NavbarItem className="hidden md:flex">
            <SignInButton />
          </NavbarItem>
        </SignedOut>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-white" />
        </Link>
        <ThemeSwitch />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <NavbarItem>
            <SignInButton />
          </NavbarItem>
        </SignedOut>
        <NavbarMenuToggle onChange={setNavbarMenuChange} />
      </NavbarContent>

      <NavbarMenu>
        <Searchbar navbarMenuChange={navbarMenuChange} setNavbarMenuChange={setNavbarMenuChange} />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
