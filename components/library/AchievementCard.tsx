import { trpc } from "@/app/_trpc/client";
import { AlertTriangle, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

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

const AchievementCard = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const {
    data: userAchievements,
    isLoading,
    isError,
    refetch,
  } = trpc.getUserLatestAchievements.useQuery(undefined, {
    retry: 3,

    onError: () => {
      setRetryCount((prev) => prev + 1);
    },
  });

  const handleRetry = () => {
    if (retryCount < 3) {
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {retryCount < 3 && (
          <>
            <AlertTriangle className="text-warning w-10 h-10 mb-2" />
            <span className="text-warning font-semibold">Failed to load achievements</span>
            <button onClick={handleRetry} className="text-blue-500 cursor-pointer hover:underline">
              Click here to retry
            </button>
          </>
        )}
        {retryCount >= 3 && (
          <>
            <AlertTriangle className="text-danger w-10 h-10 mb-2" />
            <span className="text-danger font-semibold">Failed to load achievements</span>
            <span className="text-danger">Exceeded retry attempts.</span>
          </>
        )}
      </div>
    );
  }

  if (!userAchievements) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <AlertTriangle className="text-danger w-10 h-10 mb-2" />
        <span className="text-danger font-semibold">Failed to load achievements</span>
        <span className="text-danger">No data available.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold mb-2 w-full">Your Latest Achievements</h3>
      <div className="flex-grow">
        {userAchievements.map((achievement, i) => (
          <div className="pt-2" key={i}>
            <div className="flex justify-between">
              <h3 className="font-bold text-md text-background-foreground truncate">
                {achievement.name}
              </h3>
              <div className="text-xs">
                <span className="font-semibold">
                  {format(new Date(achievement.dateEarned), "MMM dd, yyy")}
                </span>
              </div>
            </div>
            <p className="text-sm text-opacity-80 text-background-foreground font-medium">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementCard;
