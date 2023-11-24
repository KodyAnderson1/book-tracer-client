"use client";

import { trpc } from "@/app/_trpc/client";
import { title } from "@/components/primitives";
import { Separator } from "@/components/ui/separator";
import { Card, CardBody, CardHeader, Image, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";

const mockData = [
  {
    displayName: "Bob The Builder",
    points: 10000,
    rank: 1,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Contractor",
    points: 9999,
    rank: 2,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Smithy",
    points: 8000,
    rank: 3,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Armorer",
    points: 600,
    rank: 4,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Artist",
    points: 500,
    rank: 5,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Architect",
    points: 450,
    rank: 6,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Train Conductor",
    points: 325,
    rank: 7,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Coder",
    points: 300,
    rank: 8,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Product Owner",
    points: 200,
    rank: 9,
    avatarUrl: "/beard.jfif",
  },
  {
    displayName: "Bob The Scrum Master",
    points: 100,
    rank: 10,
    avatarUrl: "/beard.jfif",
  },
];

const Leaderboard = () => {
  const [friendsLeaderboard, setFriendsLeaderboard] = React.useState(mockData.slice(3));
  const [userPoints, setUserPoints] = React.useState(0);
  const [firstPlace, setFirstPlace] = React.useState(mockData[0]);
  const [secondPlace, setSecondPlace] = React.useState(mockData[1]);
  const [thirdPlace, setThirdPlace] = React.useState(mockData[2]);

  const { data: points, isLoading } = trpc.getUserPoints.useQuery();
  const { data: leaderboard, isLoading: isLeaderboardLoading } = trpc.getLeaderboard.useQuery(
    undefined,
    {
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        setFirstPlace(data[0] || mockData[0]);
        setSecondPlace(data[1] || mockData[1]);
        setThirdPlace(data[2] || mockData[2]);
      },
    }
  );

  const { data: friendsData } = trpc.getFriendsLeaderboard.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      setFriendsLeaderboard(data);
    },
  });

  useEffect(() => {
    if (!points) {
      setUserPoints(0);
    }

    if (points) {
      setUserPoints(points);
    }
  }, [points]);

  if (isLoading || isLeaderboardLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-8 h-screen md:flex md:flex-col">
      <header className="flex justify-between md:flex-row">
        <h1 className={`${title({ className: "text-text", size: "sm" })} md:text-lg`}>
          Leaderboard
        </h1>
        <h2 className={`${title({ className: "text-text", size: "sm" })} md:text-lg mr-20`}>
          {userPoints} Points
        </h2>
      </header>
      <div className="flex justify-center items-center p-20 -mt-16 md:flex-col">
        <Card shadow="lg" className="w-full md:w-[35%]">
          <CardHeader className="flex justify-center mt-2">
            <div className="flex justify-between items-end">
              <div className="flex flex-col items-center relative">
                {/* Rank 2 (on the left) */}
                {renderTop(secondPlace, 1)}
              </div>
              <div className="flex flex-col items-center relative">
                {/* Rank 1 (in the center) */}
                {renderTop(firstPlace, 0)}
              </div>
              <div className="flex flex-col items-center relative">
                {/* Rank 3 (on the right) */}
                {renderTop(thirdPlace, 2)}
              </div>
            </div>
          </CardHeader>
          <div className="px-4 mt-2">
            <Separator className="bg-hr p-[0.05rem]" />
          </div>
          <Tabs fullWidth variant="underlined" className="flex justify-center mt-2">
            <Tab key="all" title="All">
              <CardBody>
                <table className="min-w-full ">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {leaderboard &&
                      leaderboard.slice(3).map((data, index) => (
                        <tr key={data.rank} className={index % 2 === 0 ? "bg-background-card" : ""}>
                          <td className=" py-4">
                            <div className="rounded-full text-secondary font-semibold w-4 h-8 flex items-center justify-center pl-5">
                              {data.rank}
                            </div>
                          </td>
                          <td className=" py-4">
                            <div className="flex items-center">
                              <Image
                                src={data.avatarUrl}
                                alt={data.displayName}
                                width={50}
                                height={50}
                                className="rounded-full flex items-center justify-center"
                              />
                              <span className=" ml-2">{data.displayName}</span>
                            </div>
                          </td>
                          <td className=" py-4">{data.points}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </CardBody>
            </Tab>
            <Tab key="friends" title="Friends">
              <CardBody>
                <table className="min-w-full ">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {friendsLeaderboard.map((data, index) => (
                      <tr key={data.rank} className={index % 2 === 0 ? "bg-background-card" : ""}>
                        <td className="py-4">
                          <div className="rounded-full text-secondary font-semibold w-4 h-8 flex items-center justify-center pl-5">
                            {data.rank}
                          </div>
                        </td>
                        <td className=" py-4">
                          <div className="flex items-center">
                            <Image
                              src={data.avatarUrl}
                              alt={data.displayName}
                              width={50}
                              height={50}
                              className="rounded-full flex items-center justify-center"
                            />
                            <span className=" ml-2">{data.displayName}</span>
                          </div>
                        </td>
                        <td className=" py-4">{data.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

const renderTop = (data: any, index: number) => {
  const imageSize = index === 0 ? 150 : 100;
  const bottomNum = index === 0 ? imageSize * 0.3 : imageSize * 0.5;
  const backgroundColor =
    index === 0
      ? "bg-accent"
      : index === 1
      ? "bg-secondary"
      : index === 2
      ? "bg-secondary-hover"
      : "bg-gray-500";

  return (
    <>
      <Image
        src={data.avatarUrl}
        alt={data.displayName}
        width={imageSize}
        height={imageSize}
        className="rounded-full"
      />
      <div
        className={`absolute ${backgroundColor} text-white w-8 h-8 flex items-center justify-center rounded-full`}
        style={{
          left: "50%",
          bottom: bottomNum,
          transform: "translateX(-50%)",
          zIndex: 10,
        }}>
        {data.rank}
      </div>
      <span className="mt-4">{data.displayName}</span>
      <span className="text-secondary text-sm font-semibold">{data.points}</span>
    </>
  );
};

export default Leaderboard;
