import React, { useEffect, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";

const friendsDataMock = [
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

const FriendCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // trpc query
  // const {
  //   data: friendsData,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = trpc.alwaysFail.useQuery(undefined, {
  //   retry: 3,

  //   onError: () => {
  //     setRetryCount((prev) => prev + 1);
  //   },
  // });

  // const handleRetry = () => {
  //   if (retryCount < 3) {
  //     refetch();
  //   }
  // };

  const loadData = () => {
    setIsLoading(true);

    // Simulate an API call with a timeout
    setTimeout(() => {
      setIsError(true);
      setIsLoading(false);

      setRetryCount((prevCount) => prevCount + 1);
    }, 2000);
  };

  useEffect(() => {
    loadData();
  }, []);

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
            <span className="text-warning font-semibold">Failed to load friends</span>
            <button
              // onClick={handleRetry}
              onClick={loadData}
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
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-bold mb-2 w-full">Your Friends are reading...</h3>
      <div className="flex-grow">
        {friendsDataMock.map((friend: any, i: number) => (
          <div key={i} className="pt-2">
            <div className="flex justify-between">
              <h3 className="font-bold text-md text-background-accent">{friend.name}</h3>
              <div className="text-xs">
                <span className="font-semibold">2 Days Ago</span>
              </div>
            </div>
            <p className="text-sm text-opacity-80 text-background-foreground font-medium overflow-x-auto overflow-hidden">
              {friend.book}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendCard;
