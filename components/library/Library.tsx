"use client";

import React, { useEffect, useState } from "react";
import AchievementCard from "@/components/library/AchievementCard";

import FriendCard from "@/components/library/FriendCard";
import LibraryTabs from "@/components/library/LibraryTabs";
import StatisticsCard from "@/components/StatisticsCard";
import { title, subtitle } from "@/components/primitives";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/app/_trpc/client";
import { useUser } from "@clerk/nextjs";
import { customToast } from "@/lib/client/utils";

const friendsData = [
  {
    name: "alice_wonder",
    book: "Thinking in Java",
  },
  {
    name: "jane_smith",
    book: "The Hobbit",
  },
  {
    name: "bob_builder",
    book: "Harry Potter and the Chamber of Secrets",
  },
];

const achievementsData = [
  {
    name: "Genre Guru",
    level: "2",
    dateRecieved: "1 Week Ago",
  },
  {
    name: "Book Worm",
    level: "1",
    dateRecieved: "Yesterday",
  },
  {
    name: "Recent Reader",
    level: "3",
    dateRecieved: "Today",
  },
];

const statisticalData = [
  {
    name: "Books Read",
    value: "10",
  },
  {
    name: "Pages Read",
    value: "1000",
  },
  {
    name: "Something Else",
    value: "100",
  },
  {
    name: "Something Else Again",
    value: "200",
  },
];

const Library = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const { mutate: saveNewUser, isLoading } = trpc.addNewUser.useMutation({
    onSuccess: () => {
      // stuff
    },
    onError: (err) => {
      console.error(err);
      customToast("Uh oh! Looks like there was an error loading your profile", "error");
    },
    onSettled: () => {
      // setIsLoading(false);
    },
  });

  useEffect(() => {
    console.log("INSIDE USE EFFECT");

    if (!user) {
      return;
    }

    saveNewUser({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      clerkId: user.id,
    });
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  return (
    <section className="flex flex-col px-4 md:px-0">
      <header>
        <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
          Your Library
        </h1>
        <h2 className={subtitle({ className: "text-background-foreground" })}>
          Welcome, {user.firstName || user.username || "User"}
        </h2>
      </header>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex-grow p-4 w-full min-h-[100vh]">
          <div className="flex w-full flex-col">
            <LibraryTabs />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/4 lg:space-y-2 lg:space-x-0 pt-4 lg:pt-0 px-4 space-y-4 max-h-[57rem]">
          <div className="bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0 ">
            <h3 className="font-bold">Your Friends are reading...</h3>
            {/* <Suspense fallback={"Loading..."}> */}
            {friendsData.map((friend, i) =>
              i < friendsData.length - 1 ? (
                <>
                  <FriendCard
                    key={friend.name + i + friend.book}
                    name={friend.name}
                    book={friend.book}
                  />
                  <Separator className="mt-2" />
                </>
              ) : (
                <FriendCard key={friend.name + i} name={friend.name} book={friend.book} />
              )
            )}
            {/* </Suspense> */}
          </div>

          <div className="bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0 ">
            <h3 className="font-bold">Your Latest Achievements...</h3>
            {/* <Suspense fallback={"Loading..."}> */}
            {achievementsData.map((achiement, i) =>
              i < achievementsData.length - 1 ? (
                <>
                  <AchievementCard
                    key={achiement.name + i + achiement.level}
                    name={achiement.name}
                    level={achiement.level}
                    dateRecieved={achiement.dateRecieved}
                  />
                  <Separator className="mt-2" />
                </>
              ) : (
                <AchievementCard
                  key={achiement.name + i}
                  name={achiement.name}
                  level={achiement.level}
                  dateRecieved={achiement.dateRecieved}
                />
              )
            )}
            {/* </Suspense> */}
          </div>
          <div className="bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0 ">
            <h3 className="font-bold">Some Statistics...</h3>
            {/* <Suspense fallback={"Loading..."}> */}
            {statisticalData.map((stat, i) =>
              i < statisticalData.length - 1 ? (
                <>
                  <StatisticsCard
                    key={stat.name + i + stat.value}
                    name={stat.name}
                    value={stat.value}
                  />
                  <Separator className="mt-2" />
                </>
              ) : (
                <StatisticsCard key={stat.name + i} name={stat.name} value={stat.value} />
              )
            )}
            {/* </Suspense> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Library;
