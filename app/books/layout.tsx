"use client";

import Searchbar from "@/components/Searchbar";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Award, BookIcon, GithubIcon, HomeIcon, Menu, Settings, SwordsIcon } from "lucide-react";
import React, { useState } from "react";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [navbarMenuChange, setNavbarMenuChange] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const setSearches = (searchTerm: string) => {
    setRecentSearches((prev: string[]) => {
      const newRecentSearches = prev.filter((item: string) => item !== searchTerm);
      newRecentSearches.push(searchTerm);

      if (newRecentSearches.length > 5) {
        newRecentSearches.shift();
      }
      return newRecentSearches;
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-background">
      {/* Sidebar */}
      <div
        className={`fixed flex flex-col justify-between top-0 left-0 w-21 bg-secondary h-full shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}>
        <div className="flex items-center justify-center mt-14">
          <ul className="flex flex-col py-4 space-y-1">
            {/* Home */}
            <li className="flex justify-center">
              <a
                href="/books/library"
                className="flex flex-col items-center w-full space-y-2 text-gray-300 hover:bg-primary-hover rounded-md p-2">
                <div>
                  <HomeIcon />
                </div>
                <div className="text-sm font-medium">Home</div>
              </a>
            </li>

            {/* Search Bar */}
            <li className="flex justify-center">
              <Searchbar
                navbarMenuChange={navbarMenuChange}
                setNavbarMenuChange={setNavbarMenuChange}
                recentSearches={recentSearches}
                setSearches={setSearches}
              />
            </li>

            {/* Library */}
            <li className="flex justify-center">
              <a
                href="/books/library"
                className="flex flex-col items-center w-full space-y-2 text-gray-300 hover:bg-primary-hover rounded-md p-2">
                <div>
                  <BookIcon />
                </div>
                <div className="text-sm font-medium">Library</div>
              </a>
            </li>

            {/* Challenges */}
            <li className="flex justify-center">
              <a
                href="/books/challenges"
                className="flex flex-col items-center w-full space-y-2 text-gray-300 hover:bg-primary-hover rounded-md p-2">
                <div>
                  <SwordsIcon />
                </div>
                <div className="text-sm font-medium">Challenges</div>
              </a>
            </li>

            {/* Badges */}
            <li className="flex justify-center">
              <a
                href="/books/badges"
                className="flex flex-col items-center w-full space-y-2 text-gray-300 hover:bg-primary-hover rounded-md p-2">
                <div>
                  <Award />
                </div>
                <div className="text-sm font-medium">Badges</div>
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom */}
        <ul className="flex flex-col py-4 space-y-1 gap-4">
          <li className="px-5 gap-2">
            <Link
              isExternal
              href={siteConfig.links.github}
              aria-label="Github"
              className="text-text flex justify-center text-sm">
              <GithubIcon className="text-white" />
            </Link>
          </li>
          <li className="px-5 flex justify-center text-sm">
            <ThemeSwitch />
          </li>
          <li className="px-5 flex justify-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </li>
        </ul>
      </div>

      {/* Header */}
      <div
        className={`fixed top-0 right-0 z-10 w-full bg-secondary h-12 border-b border-background `}>
        <div className="flex items-center justify-between h-12 px-6">
          <button onClick={toggleMenu}>
            <Menu className="text-primary-foreground" />
          </button>
          <div className="flex">
            <NextLink className="flex justify-start items-center gap-1" href="/books/library">
              <Logo className="text-primary-foreground" />
              <p className="font-bold text-primary-foreground">Book Tracer</p>
            </NextLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col flex-1 w-full ${isOpen ? "ml-20" : ""}`}>
        <main className="flex-1 pt-16">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
