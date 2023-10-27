import { trpc } from "@/app/_trpc/client";
import { customToast } from "@/lib/client/utils";
import {
  BadgeWithNext,
  UserChallengesExtraDTO,
  UserLibraryWithBookDetails,
} from "@/types/BookSearch";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import { Check } from "lucide-react";
import React from "react";
import EarnedRewardsModal, { Reward } from "../EarnedRewardsModal";

interface Props {
  book: UserLibraryWithBookDetails;
  isValueChanged: boolean;
  setIsValueChanged: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
}

const UpdateProgressButton = ({ book, isValueChanged, setIsValueChanged, currentPage }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [rewards, setRewards] = React.useState<Reward[] | null>(null);

  const utils = trpc.useContext();
  const { mutate: updateProgress, isLoading } = trpc.updateBookProgress.useMutation({
    onSuccess: (data) => {
      utils.getUserLibrary.invalidate();

      // @ts-ignore
      const badgesToReward: Reward[] = data.badgesEarned.map((badge: BadgeWithNext) => {
        return {
          name: badge.name,
          description: badge.description,
          imageUrl: badge.imageUrl,
          points: badge.pointsAwarded,
          type: badge.type,
          threshold: badge.threshold,
          tier: badge.tier,
          parentType: "Badge",
        };
      });

      const challengesToReward: Reward[] | null =
        data.challenges &&
        data.challenges
          .filter(
            (item) => item.status === "COMPLETED_CHALLENGE" || item.status === "FAILED_CHALLENGE"
          )
          .map((challenge: UserChallengesExtraDTO) => {
            return {
              name: challenge.name,
              description: challenge.description,
              points: challenge.pointsAwarded,
              type: challenge.type,
              threshold: challenge.threshold,
              status: challenge.status,
              duration: challenge.duration,
              parentType: "Challenge",
            };
          });

      const rewards = [...badgesToReward, ...(challengesToReward ?? [])];
      const sortedRewards = rewards.sort((a, b) => {
        if (a.status === "FAILED_CHALLENGE") return 1;
        if (b.status === "FAILED_CHALLENGE") return -1;
        return 0;
      });

      setRewards(sortedRewards);

      if (rewards && rewards.length > 0) {
        onOpen();
      }

      setIsValueChanged(false);
      customToast("Successfully updated progress.", "success");
    },
    onError: (err: any) => {
      console.error(err);
      customToast("Uh oh! The book did not get updated! Try again later", "error");
    },
  });

  const handleUpdateProgress = () => {
    let lastPageRead = 0;
    let action: "STARTED_BOOK" | "READ_PAGES" | "COMPLETED_BOOK" = "STARTED_BOOK";

    if (!isValueChanged || currentPage === book.last_page_read) {
      setIsValueChanged(false);
      customToast("No Progress Change Detected.", "info");
      return;
    }

    if (!book.page_count || book.page_count === 0) {
      customToast("This book has no pages!", "error");
      return;
    }

    if (!book.last_page_read) {
      lastPageRead = 0;
      action = "STARTED_BOOK";
    } else {
      lastPageRead = book.last_page_read;
      action = "READ_PAGES";
    }

    if (currentPage >= book.page_count) {
      action = "COMPLETED_BOOK";
    }

    if (currentPage < lastPageRead) {
      customToast("You can't go back in time! Please enter a valid page number.", "error");
      return;
    }

    // @ts-ignore
    const currPage = currentPage[0] as number;

    updateProgress({
      bookId: book.book_id,
      currentPage: currPage,
      clerkId: "2134",
      pagesRead: currPage - lastPageRead,
      action: action,
    });
  };

  return (
    <>
      {rewards && rewards.length > 0 && (
        <EarnedRewardsModal reward={rewards} isOpen={isOpen} onOpenChange={onOpenChange} />
      )}

      <Button
        startContent={isLoading ? null : <Check />}
        isDisabled={!isValueChanged}
        isLoading={isLoading}
        color="primary"
        onClick={handleUpdateProgress}
        fullWidth
        className="text-white py-2 rounded h-8 flex justify-center items-center">
        Update Progress
      </Button>
    </>
  );
};

export default UpdateProgressButton;
