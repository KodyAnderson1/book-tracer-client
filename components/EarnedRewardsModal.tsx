import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, XCircle } from "lucide-react";
import ReactConfetti from "react-confetti";

function determineEarnedPhraseBadge(type: string, threshold: number): string {
  switch (type) {
    case "PAGES":
      return `You just read ${threshold} pages!`;
    case "BOOKS":
      return `You just read ${threshold} books!`;
    case "STREAK":
      return `You just completed a ${threshold} day reading streak!`;
    case "COMPLETION":
      return `You just earned ${threshold} badges!`;
    case "CHALLENGES":
      return `You just completed ${threshold} challenges!`;
    case "FRIENDS":
      return `You just added ${threshold} friends!`;
    case "Engagement":
      return `You have reviewed ${threshold} books!`;
    case "COLLECTOR":
      return `You just collected ${threshold} books!`;
    default:
      return "You just did something! Wooooo!";
  }
}

function determineTwoWordPhraseBadge(type: string): string {
  switch (type) {
    case "PAGES":
      return `Pages Read`;
    case "BOOKS":
      return `Books Read`;
    case "STREAK":
      return `Daily Streak`;
    case "COMPLETION":
      return `Badges Earned`;
    case "CHALLENGES":
      return `Challenges Completed`;
    case "FRIENDS":
      return `Friends Gained`;
    case "Engagement":
      return `Reviews Written`;
    case "Collector":
      return `Books Collected`;
    default:
      return "You just did something! Wooooo!";
  }
}

function determineTitle(parentType: string, status: string) {
  if (parentType === "Challenge") {
    return status === "FAILED_CHALLENGE" ? "Challenge Failed" : "Challenge Completed!";
  }
  return "New Badge Unlocked!";
}

export interface Reward {
  name: string;
  description: string;
  type: string;
  threshold: number;
  points: number;
  imageUrl?: string;
  tier?: number;
  status?: string;
  parentType: string;
  duration?: number;
}

function determineEarnedPhraseChallenge(
  type: string,
  threshold: number,
  duration: number,
  failed: boolean
): string {
  const failedPhrase = failed ? "failed" : "completed";

  switch (type.toUpperCase()) {
    case "PAGES":
      return `You just read ${threshold} pages in ${duration} days!`;
    case "BOOKS":
      return `You just read ${threshold} books!`;
    case "STREAK":
      return `You just ${failedPhrase} a ${threshold} day reading streak!`;
    case "COMPLETION":
      return `You just earned ${threshold} badges!`;
    case "CHALLENGES":
      return `You just ${failedPhrase} ${threshold} challenges!`;
    case "FRIENDS":
      return `You just added ${threshold} friends!`;
    case "Engagement":
      return `You have reviewed ${threshold} books!`;
    case "Collector":
      return `You just collected ${threshold} books!`;
    default:
      return `You just ${failedPhrase} a ${threshold} day reading streak!`;
  }
}

interface Props {
  reward: Reward[] | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EarnedRewardsModal = ({ reward, isOpen, onOpenChange }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();

  if (!reward) return null;

  const currentReward = reward[currentPage - 1];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="overflow-hidden">
      <ModalContent>
        {(onClose) => (
          <>
            {currentReward.status !== "FAILED_CHALLENGE" && (
              <ReactConfetti width={window.innerWidth} height={window.innerHeight} gravity={0.1} />
            )}
            <ModalHeader className="flex justify-center">
              {determineTitle(currentReward.parentType, currentReward.status || "")}
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <h1 className="flex justify-center">
                  {currentReward.parentType === "Challenge" &&
                  currentReward.status === "FAILED_CHALLENGE"
                    ? "Challenge Failed"
                    : "Congratulations"}
                  , {user?.firstName || user?.username || ""}
                </h1>
                <div className="flex justify-center mb-4">
                  {currentReward.parentType === "Challenge"
                    ? determineEarnedPhraseChallenge(
                        currentReward.type,
                        currentReward.threshold,
                        currentReward.duration ?? 0,
                        currentReward.status === "FAILED_CHALLENGE"
                      )
                    : determineEarnedPhraseBadge(currentReward.type, currentReward.threshold)}
                </div>
                <div className="flex justify-center">
                  {currentReward.parentType === "Challenge" ? (
                    currentReward.status === "FAILED_CHALLENGE" ? (
                      <XCircle size={300} strokeWidth={"0.5px"} className="text-danger" />
                    ) : (
                      <CheckCircle2 size={300} strokeWidth={"0.5px"} className="text-success" />
                    )
                  ) : (
                    <Image
                      src={currentReward.imageUrl || "/images/placeholder.png"}
                      alt={currentReward.name}
                      width={300}
                      height={300}
                      className="flex justify-center"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="font-semibold flex justify-center">
                    {currentReward.parentType === "Challenge"
                      ? currentReward.status === "FAILED_CHALLENGE"
                        ? "Better luck next time!"
                        : "Challenge Completed!"
                      : determineTwoWordPhraseBadge(currentReward.type)}
                  </h2>
                  {currentReward.tier ? (
                    <p className="text-center">Level {currentReward.tier}</p>
                  ) : null}
                </div>
              </div>
            </ModalBody>
            {reward && reward.length > 1 ? (
              <ModalFooter className="flex justify-center">
                <Pagination
                  loop
                  showControls
                  total={reward.length}
                  page={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                />
              </ModalFooter>
            ) : null}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EarnedRewardsModal;
