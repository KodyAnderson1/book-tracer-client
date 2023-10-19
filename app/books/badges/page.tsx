"use client";

import { trpc } from "@/app/_trpc/client";
import { CustomLoading } from "@/components/CustomLoading";
import { Badge } from "@/types/BookSearch";
import Image from "next/image";
import React from "react";

const Page = () => {
  const { data: userBadges, isLoading } = trpc.getUserBadges.useQuery();

  if (isLoading) {
    return <CustomLoading header="Badges" isLoading={isLoading} />;
  }

  if (!userBadges) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-background-card border border-background-foreground rounded-lg p-2 shadow-2xl">
        <div className="">
          {Object.keys(userBadges).map((category) => (
            <div key={category}>
              <MyDivider title={category} />
              <div className="flex justify-center flex-wrap">
                {userBadges[category].map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BadgeCard = ({ badge }: { badge: Badge }) => {
  const borderColor = badge.dateEarned ? "border border-success" : "";
  return (
    <div
      className={`mx-4 my-4 p-4 bg-background rounded-xl shadow-lg h-[250px] w-[250px] flex flex-col items-center ${borderColor}`}>
      <div className="w-32 h-32 mb-4 flex justify-center">
        <Image src={badge.imageUrl} alt={badge.name} width={100} height={100} />
      </div>
      <div className="flex flex-col items-center flex-grow">
        <h4 className="text-lg font-bold text-center">{badge.name}</h4>
        <p className="text-sm text-gray-500 text-center">{badge.description}</p>
      </div>

      {badge.dateEarned ? (
        <div className="mt-4 w-full text-center">
          <span className="font-bold">{badge.pointsAwarded} Points</span>
          {badge.dateEarned ? <span className="ml-4 text-success">Earned</span> : null}
        </div>
      ) : badge.additionalBadgeInfo ? (
        <div className="mt-4 w-full text-center flex justify-between">
          <span className="text-sm text-text">{badge.additionalBadgeInfo.done}</span>
          <span className="font-bold">{badge.pointsAwarded} Points</span>
          <span className="text-sm text-text">{badge.additionalBadgeInfo.toGo}</span>
        </div>
      ) : (
        <div className="mt-4 w-full text-center">
          <span className="font-bold">{badge.pointsAwarded} Points</span>
          {badge.dateEarned ? <span className="ml-4 text-success">Earned</span> : null}
        </div>
      )}
      {badge.additionalBadgeInfo ? (
        <div className="w-full text-center">
          {/* <span className="font-bold">{badge.additionalBadgeInfo.percentComplete}</span> */}
          <div className="overflow-hidden h-2 -mb-1 text-xs flex rounded bg-background border border-secondary">
            <div
              style={{ width: `${badge.additionalBadgeInfo.percentComplete}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

// {badge.dateEarned ? <span className="ml-4 text-success">Earned</span> : null}

{
  /* <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-background border border-secondary">
<div
  style={{ width: `${challenge.additionalInfo?.percentComplete}%` }}
  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
</div> */
}

interface MyDividerProps {
  className?: string;
  title: string;
}

const MyDivider: React.FC<MyDividerProps> = ({ title, className }) => (
  <div className={`flex items-center ${className ? className : ""}`}>
    <div className="font-bold mr-4 text-2xl">{title}</div>
    <div className="flex-grow h-[1px] bg-background-foreground mt-2 shadow-md"></div>
  </div>
);

export default Page;
