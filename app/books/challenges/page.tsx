"use client";

import { Button } from "@nextui-org/button";
import { capitalizeString } from "@/lib/utils";
import { Challenge, UserChallengesExtraDTO } from "@/types/BookSearch";
import Image from "next/image";
import { Clock, Flame, Sunrise, TargetIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
import { trpc } from "@/app/_trpc/client";
import { customToast } from "@/lib/client/utils";

function determineWord(type: string): string {
  switch (type) {
    case "PAGES":
      return "pages";
    case "BOOKS":
      return "books";
    case "STREAK":
      return "pages";
    default:
      return "days";
  }
}

const Page = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<UserChallengesExtraDTO | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: challenges, isLoading } = trpc.getChallenges.useQuery();

  useEffect(() => {
    if (!challenges) {
      return;
    }

    if (challenges.length > 0) {
      setSelectedChallenge(challenges[0]);
    }
  }, [challenges]);

  if (!challenges) {
    return null;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">LOADING...</div>;
  }

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
            {challenges.map((challenge) => (
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
            <div className="mb-4">
              <h2 className={subtitle({ className: "text-background-foreground" })}>
                Persistent Challenges
              </h2>
            </div>
            <div className="md:pr-20">
              {challenges.map((challenge) => (
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
        <ChallengeInformation
          // @ts-ignore
          challenge={selectedChallenge}
          // @ts-ignore
          setSelectedChallenge={setSelectedChallenge}
        />
      </div>
    </section>
  );
};

interface InformationProps {
  challenge: Challenge;
}

const ChallengeInformation = ({ challenge }: InformationProps) => {
  const utils = trpc.useContext();

  const { mutate: updateChallenge } = trpc.addChallenge.useMutation({
    onSuccess: (data) => {
      utils.getChallenges.invalidate();
      customToast("Challenge started!", "success");
    },
    onError: (error) => {
      customToast("Error starting challenge.", "error");
      console.error("🚀 ~ file: page.tsx:220 ~ onError: ~ error", error);
    },
  });

  function addChallenge() {
    updateChallenge({
      challengeId: challenge.id,
      clerkId: "1234",
    });
  }

  if (!challenge) {
    return null;
  }

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
              <Button isDisabled startContent={<Trash2 />} color="danger" fullWidth>
                Abandon Challenge
              </Button>
            ) : (
              <Button color="primary" fullWidth onPress={addChallenge}>
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
  challenge: UserChallengesExtraDTO;
  setSelectedChallenge: (challenge: UserChallengesExtraDTO) => void;
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
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">{challenge.name}</h2>
            <h3 className="font-bold ">
              <span className="font-semibold text-md">Points:</span> {challenge.pointsAwarded}
            </h3>
          </div>
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
