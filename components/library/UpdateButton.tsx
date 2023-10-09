import { trpc } from "@/app/_trpc/client";
import { customToast } from "@/lib/client/utils";
import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { Button } from "@nextui-org/button";
import { Check } from "lucide-react";
import React from "react";

interface Props {
  book: UserLibraryWithBookDetails;
  isValueChanged: boolean;
  setIsValueChanged: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
}

const UpdateProgressButton = ({ book, isValueChanged, setIsValueChanged, currentPage }: Props) => {
  // console.log("🚀 ~ file: UpdateButton.tsx:16 ~ UpdateProgressButton ~ currentPage:", currentPage);

  const utils = trpc.useContext();
  const { mutate: updateProgress, isLoading } = trpc.updateBookProgress.useMutation({
    onSuccess: () => {
      utils.getUserLibrary.invalidate();
      setIsValueChanged(false);
      customToast("Successfully updated progress.", "success");
    },
    onError: (err: any) => {
      console.error(err);
      customToast("Uh oh! The book did not get updated! Try again later", "error");
    },
    onSettled: () => {
      // setIsLoading(false);
    },
  });

  const handleUpdateProgress = () => {
    if (!isValueChanged || currentPage === book.last_page_read) {
      setIsValueChanged(false);
      customToast("No Progress Change Detected.", "info");
      return;
    }

    updateProgress({
      bookId: book.book_id,
      // @ts-ignore
      currentPage: currentPage[0] as number,
      clerkId: "2134",
    });
  };

  return (
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
  );
};

export default UpdateProgressButton;
