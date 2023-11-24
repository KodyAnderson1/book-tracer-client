import React, { useEffect, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import FriendsSearchbar from "../SearchbarFriends";
import ManageFriends from "./ManageFriends";
import { SmallUserBook } from "@/types/BookSearch";
import { formatDateString } from "@/lib/client/utils";

const FriendCard = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between">
        <h3 className="font-bold mb-2 w-[90%] mt-2">Friends</h3>
        <div className="flex">
          <ManageFriends />
          <FriendsSearchbar />
        </div>
      </div>
      <div className="flex-grow">
        <FriendCard2 />
      </div>
    </div>
  );
};

const FriendCard2 = () => {
  const [retryCount, setRetryCount] = useState(0);

  const {
    data: friendsData,
    isLoading,
    isError,
    refetch,
  } = trpc.getFriendsBooks.useQuery(undefined, {
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

  if (!friendsData) {
    return <></>;
  }

  if (isError) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full">
          {retryCount < 3 && (
            <>
              <AlertTriangle className="text-warning w-10 h-10 mb-2" />
              <span className="text-warning font-semibold">Failed to load friends</span>
              <button
                onClick={handleRetry}
                // onClick={loadData}
                className="text-blue-500 cursor-pointer hover:underline">
                Click here to retry
              </button>
            </>
          )}
          {retryCount >= 3 && (
            <>
              <AlertTriangle className="text-danger w-10 h-10 mb-2" />
              <span className="text-danger font-semibold">Failed to load friends</span>
              <span className="text-danger">Exceeded retry attempts.</span>
            </>
          )}
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col h-full">
          <div className="flex-grow flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </>
    );
  }

  if (friendsData.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full">
          <AlertTriangle className="text-warning w-10 h-10 mb-2" />
          <span className="text-warning font-semibold">Add Some Friends!</span>
        </div>
      </>
    );
  }

  return (
    <>
      {friendsData.map((friend: SmallUserBook, i: number) => (
        <div key={i} className="pt-2">
          <div className="flex justify-between">
            <h3 className="font-bold text-md text-background-accent">{friend.username}</h3>
            <div className="text-xs">
              <span className="font-semibold">{formatDateString(friend.lastBookUpdated)}</span>
            </div>
          </div>
          <p className="text-sm text-opacity-80 text-background-foreground font-medium overflow-x-auto overflow-hidden">
            {friend.lastBookTitle}
          </p>
        </div>
      ))}
    </>
  );
};

export default FriendCard;
