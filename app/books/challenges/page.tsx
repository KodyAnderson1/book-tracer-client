"use client";

import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/react";
import { parseISO, format } from "date-fns";
import { capitalizeString } from "@/lib/utils";
import { Challenge, Challenges } from "@/types/BookSearch";
import Image from "next/image";
import { Clock, Flame, Sunrise, TargetIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import useMediaQuery from "@/components/useMediaQuery";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { subtitle, title } from "@/components/primitives";

function determineWord(type: string): string {
  switch (type) {
    case "PAGES":
      return "pages";
    case "BOOKS":
      return "books";
    case "STREAK":
      return "days";
    default:
      return "days";
  }
}

const mockData: Challenges = [
  {
    id: 1,
    userChallengeId: 2,
    name: "Daily Reading Challenge",
    description: "Read every day for a week",
    frequency: "DAILY",
    type: "STREAK",
    threshold: 7,
    duration: 7,
    challengeStartDate: null,
    challengeEndDate: null,
    pointsAwarded: 50,
    userChallengeStartDate: "2023-10-11T22:56:30.158199",
    userChallengeEndDate: "2023-10-17T23:59:59",
    status: "STARTED_CHALLENGE",
    dateProgress: {
      progress: 85.71428571428571,
      daysCompleted: 6,
      daysRemaining: 1,
    },
    additionalInfo: {
      done: 6.0,
      toGo: 1.0,
      percentComplete: 85.71428571428571,
    },
  },
  {
    id: 2,
    userChallengeId: 3,
    name: "Weekly Reading Challenge",
    description: "Read at least 250 pages in a week",
    frequency: "WEEKLY",
    type: "PAGES",
    threshold: 250,
    duration: 7,
    challengeStartDate: null,
    challengeEndDate: null,
    pointsAwarded: 100,
    userChallengeStartDate: "2023-10-12T10:00:00",
    userChallengeEndDate: "2023-10-18T23:59:59",
    status: "STARTED_CHALLENGE",
    dateProgress: {
      progress: 71.42857142857143,
      daysCompleted: 5,
      daysRemaining: 2,
    },
    additionalInfo: {
      done: 180.0,
      toGo: 70.0,
      percentComplete: 72.0,
    },
  },
  {
    id: 3,
    userChallengeId: 4,
    name: "Monthly Reading Challenge",
    description: "Read 5 books in a month",
    frequency: "MONTHLY",
    type: "BOOKS",
    threshold: 5,
    duration: 30,
    challengeStartDate: null,
    challengeEndDate: null,
    pointsAwarded: 500,
    userChallengeStartDate: null,
    userChallengeEndDate: null,
    status: null,
    dateProgress: null,
    additionalInfo: null,
  },
];

const mockDataSpecial: Challenges = [
  {
    id: 1,
    userChallengeId: 2,
    name: "Daily Reading Challenge",
    description: "Read every day for a week",
    frequency: "DAILY",
    type: "STREAK",
    threshold: 7,
    duration: 7,
    challengeStartDate: null,
    challengeEndDate: null,
    pointsAwarded: 500,
    userChallengeStartDate: null,
    userChallengeEndDate: null,
    status: null,
    dateProgress: null,
    additionalInfo: null,
  },
  {
    id: 2,
    userChallengeId: 3,
    name: "Weekly Reading Challenge",
    description: "Read at least 250 pages in a week",
    frequency: "WEEKLY",
    type: "PAGES",
    threshold: 250,
    duration: 7,
    challengeStartDate: null,
    challengeEndDate: null,
    pointsAwarded: 500,
    userChallengeStartDate: null,
    userChallengeEndDate: null,
    status: null,
    dateProgress: null,
    additionalInfo: null,
  },
  {
    id: 3,
    userChallengeId: 4,
    name: "Monthly Reading Challenge",
    description: "Read 5 books in a month",
    frequency: "MONTHLY",
    type: "BOOKS",
    threshold: 5,
    duration: 30,
    challengeStartDate: null,
    challengeEndDate: null,
    pointsAwarded: 500,
    userChallengeStartDate: null,
    userChallengeEndDate: null,
    status: null,
    dateProgress: null,
    additionalInfo: null,
  },
];

const Page = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="gap-4 py-8 flex flex-col md:flex-row h-screen relative">
      <div className="w-full md:w-[55%] overflow-y-auto h-full no-scrollbar -mt-10">
        <header>
          <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
            Challenges
          </h1>
        </header>

        {isMobile ? (
          <div className="flex flex-col justify-center">
            {mockData.map((challenge) => (
              <Sheet key={challenge.id}>
                <SheetTrigger>
                  <ChallengeCard
                    challenge={challenge}
                    setSelectedChallenge={setSelectedChallenge}
                  />
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>{challenge.name || "Challenge"}</SheetTitle>
                    <SheetDescription>
                      <div>
                        <div>
                          <ul className="flex pl-2 mt-2 w-full">
                            <li className="flex items-center flex-grow">
                              <Clock size={20} />{" "}
                              <span className="ml-2">{challenge.duration} days</span>
                            </li>
                            <li className="flex items-center flex-grow">
                              <Sunrise size={20} />{" "}
                              <span className="ml-2">{capitalizeString(challenge.frequency)}</span>
                            </li>
                            <li className="flex items-center flex-grow">
                              <Flame size={20} />{" "}
                              <span className="ml-2">{capitalizeString(challenge.type)}</span>
                            </li>
                            <li className="flex items-center flex-grow">
                              <TargetIcon size={20} />{" "}
                              <span className="ml-2">{challenge.threshold}</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mt-4">Challenge Description</h3>
                          <div>{challenge.description}</div>
                        </div>
                        <div className="p-2 mt-6">
                          {challenge.status === "STARTED_CHALLENGE" ? (
                            <Button startContent={<Trash2 />} color="danger" fullWidth>
                              Abandon Challenge
                            </Button>
                          ) : (
                            <Button color="primary" fullWidth>
                              Start Challenge
                            </Button>
                          )}
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        ) : (
          <>
            {/* <div className="mb-4 mt-2">
              <h2 className={subtitle({ className: "text-background-foreground" })}>
                Timed Challenges
              </h2>
            </div>
            <div className="md:pr-20">
              {mockDataSpecial.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  setSelectedChallenge={setSelectedChallenge}
                />
              ))}
            </div> */}
            <div className="mb-4">
              <h2 className={subtitle({ className: "text-background-foreground" })}>
                Persistent Challenges
              </h2>
            </div>
            <div className="md:pr-20">
              {mockData.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  setSelectedChallenge={setSelectedChallenge}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="hidden md:block md:w-1/2 -ml-4 md:border-l md:border-background-foreground bg-background-card -mt-12">
        <ChallengeInformation challenge={selectedChallenge ?? mockData[0]} />
      </div>
    </section>
  );
};

const ChallengeInformation = ({ challenge }: { challenge: Challenge }) => {
  return (
    <div className="pt-2 px-4 flex flex-col h-full">
      <div className="h-1/2 flex justify-center ">
        <Image
          width={400}
          height={400}
          className="w-1/2 p-4 object-cover "
          src="/reading.png"
          alt="A group of people reading"
        />
      </div>
      <div className="flex-grow">
        <h2 className="font-bold mt-4 ml-2">{challenge.name}</h2>
        <div>
          <ul className="flex pl-2 mt-4 w-full">
            <li className="flex items-center flex-grow">
              <Clock size={20} /> <span className="ml-2">{challenge.duration} days</span>
            </li>
            <li className="flex items-center flex-grow">
              <Sunrise size={20} />{" "}
              <span className="ml-2">{capitalizeString(challenge.frequency)}</span>
            </li>
            <li className="flex items-center flex-grow">
              <Flame size={20} /> <span className="ml-2">{capitalizeString(challenge.type)}</span>
            </li>
            <li className="flex items-center flex-grow">
              <TargetIcon size={20} /> <span className="ml-2">{challenge.threshold}</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-between flex-col">
          <div className="mt-6">
            <h3 className="text-lg font-bold">Challenge Description</h3>
            <div>{challenge.description}</div>
          </div>
          <div className="p-2 mt-36">
            {challenge.status === "STARTED_CHALLENGE" ? (
              <Button startContent={<Trash2 />} color="danger" fullWidth>
                Abandon Challenge
              </Button>
            ) : (
              <Button color="primary" fullWidth>
                Start Challenge
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChallengeCardProps {
  challenge: Challenge;
  setSelectedChallenge: (challenge: Challenge) => void;
}

const ChallengeCard = ({ challenge, setSelectedChallenge }: ChallengeCardProps) => {
  return (
    <div
      onClick={() => setSelectedChallenge(challenge)}
      className="cursor-pointer flex flex-col md:flex-row bg-background-card border border-background-foreground rounded-lg shadow-md w-full h-auto md:h-48 mt-4">
      <div className="w-full md:w-1/4 p-2">
        <Image
          width={200}
          height={200}
          className="w-full h-full rounded-lg"
          src="/thumbnail_1.png"
          alt="Your Image"
        />
      </div>
      <div className="w-full md:w-3/4 flex flex-col justify-between p-4">
        <div>
          <h2 className="font-bold text-lg">{challenge.name}</h2>
          {challenge.additionalInfo ? (
            <p className="text-sm text-text-accent">
              <span className="font-semibold">{challenge.additionalInfo?.done} </span>
              {determineWord(challenge.type)} down,{" "}
              <span className="font-semibold">{challenge.additionalInfo?.toGo} to go</span>
            </p>
          ) : (
            <p className="text-sm text-text-accent">Get Started!</p>
          )}
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              {challenge.additionalInfo ? (
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-secondary">
                  {Math.round(challenge.additionalInfo?.percentComplete) ?? 0}%
                </span>
              ) : null}
            </div>
          </div>
          {challenge.additionalInfo ? (
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-background border border-secondary">
              <div
                style={{ width: `${challenge.additionalInfo?.percentComplete}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Page;
