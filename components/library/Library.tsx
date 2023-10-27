"use client";

import React, { useEffect } from "react";
import AchievementCard from "@/components/library/AchievementCard";

import FriendCard from "@/components/library/FriendCard";
import LibraryTabs from "@/components/library/LibraryTabs";
import StatisticsCard from "@/components/StatisticsCard";
import { title, subtitle } from "@/components/primitives";
import { trpc } from "@/app/_trpc/client";
import { useUser } from "@clerk/nextjs";
import { customToast } from "@/lib/client/utils";
import { Loader2 } from "lucide-react";
import { CustomLoading } from "../CustomLoading";

const Library = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const { mutate: saveNewUser, isLoading } = trpc.addNewUser.useMutation({
    onError: (err) => {
      console.error(err);
      customToast("Uh oh! Looks like there was an error loading your profile", "error");
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    saveNewUser({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      clerkId: user.id,
      imageUrl: user.imageUrl,
    });
  }, []);

  if (!isLoaded) {
    return (
      <section className="flex flex-col h-screen px-4 md:px-0">
        <header>
          <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
            Your Library
          </h1>
          <h2 className={subtitle({ className: "text-background-foreground" })}>
            Welcome!&nbsp;
            <span className="font-semibold">Signing you in...</span>
          </h2>
        </header>
        <div className="flex-grow flex justify-center items-center">
          <Loader2 absoluteStrokeWidth={true} height={120} width={120} className="animate-spin" />
        </div>
      </section>
    );
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  if (isLoading) {
    return (
      <CustomLoading
        header="Your Library"
        isLoading={isLoading}
        user={user.firstName || user.username || "User"}
      />
    );
  }

  return (
    <section className="flex flex-col px-4 md:px-0">
      <header>
        <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
          Your Library
        </h1>
        <h2 className={subtitle({ className: "text-background-foreground" })}>
          Welcome,&nbsp;
          <span className="font-semibold">{user.firstName || user.username || "User"}</span>
        </h2>
      </header>

      <div className="flex flex-col lg:flex-row w-full ">
        <div className="flex-grow p-4 w-full lg:w-[60%] xl:w-[70%] 2xl:w-[70%] min-h-[100vh]">
          <div className="flex w-full flex-col">
            <LibraryTabs />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-[40%] xl:w-[30%] 2xl:w-[20%] lg:space-y-2 lg:space-x-0 pt-4 lg:pt-0 px-4 space-y-4 max-h-[57rem]">
          <div className="flex flex-col bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0">
            <FriendCard />
          </div>

          <div className="flex flex-col bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0">
            <AchievementCard />
          </div>
          <div className="flex flex-col bg-background-card border border-background-foreground pt-2 px-4 h-1/3 rounded overflow-y-auto pb-3 lg:pb-0">
            <StatisticsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Library;
