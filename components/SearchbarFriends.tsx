import { trpc } from "@/app/_trpc/client";
import { customToast } from "@/lib/client/utils";
import { SmallUser } from "@/types/BookSearch";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Divider, Modal, ModalBody, ModalContent, User, useDisclosure } from "@nextui-org/react";
import { Check, Loader2, Plus, SearchIcon, UserPlus, UserPlus2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  setNavbarMenuChange: (e: boolean) => void;
  navbarMenuChange: boolean;
  recentSearches: string[];

  setSearches: (searchTerm: string) => void;
}

const mockDataAllUsers = [
  {
    displayName: "alice_wonder",
    clerkId: "ckl1",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    displayName: "jane_smith",
    clerkId: "ckl2",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    displayName: "bob_builder",
    clerkId: "ckl3",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    displayName: "jane_smith",
    clerkId: "ckl4",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  // generate 4 more
  {
    displayName: "john_doe",
    clerkId: "ckl5",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    displayName: "fred_flintstone",
    clerkId: "ckl6",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
  {
    displayName: "joe_bloggs",
    clerkId: "ckl7",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    displayName: "ollie_williams",
    clerkId: "ckl8",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
];

const FriendsSearchbar = ({}) => {
  const [buttonStates, setButtonStates] = useState<{
    [key: string]: "loading" | "success" | "error";
  }>({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allPeople, isLoading } = trpc.getAllUsersForFriends.useQuery(undefined, {
    retryDelay: 1000 * 60 * 5,
    refetchOnWindowFocus: false, // default: true
  });

  if (!allPeople) {
    return null;
  }

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  const handleSearchChange = (e: string) => {
    setSearchQuery(e);
  };

  const handleClick = (searchTerm: string) => {
    onOpenChange();
    setSearchQuery("");
  };

  const updateButtonState = (clerkId: string, state: "loading" | "success" | "error") => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [clerkId]: state,
    }));
  };

  return (
    <>
      <button
        aria-label="Search Button"
        className="flex flex-col items-center space-y-2 text-gray-300 hover:bg-primary-hover hover:text-white rounded-md p-2"
        onClick={onOpen}>
        <div>
          <UserPlus2 className="" stroke="white" />
        </div>
        {/* <div className="text-sm font-medium">Search</div> */}
      </button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="border-[0.20px] border-background-card">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-4 bg-background">
                <Input
                  autoFocus
                  aria-label="Search"
                  value={searchQuery}
                  onValueChange={(e) => handleSearchChange(e)}
                  classNames={{
                    inputWrapper: "bg-background focus:outline-none",
                    input: "text-sm text-background-foreground focus:outline-none",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleClick(searchQuery);
                    }
                  }}
                  endContent={<SearchKbd handleClick={() => handleClick(searchQuery)} />}
                  placeholder="Search"
                  startContent={
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="search"
                />
                <Divider className="mt-2" />

                <div className="max-h-[15rem] overflow-y-auto pr-2">
                  <div className="text-sm text-background-foreground">
                    <p className="font-semibold text-md mb-3">Results</p>
                    <ul className="flex flex-col gap-2 ">
                      {allPeople
                        .filter((item) => {
                          const query = searchQuery.toLowerCase();
                          return (
                            item.displayName.toLowerCase().includes(query) ||
                            item.clerkId.toLowerCase().includes(query)
                          );
                        })
                        .map((user) => (
                          <RecentItem
                            key={user.clerkId}
                            user={user}
                            handleClick={handleClick}
                            buttonState={buttonStates[user.clerkId]}
                            updateButtonState={updateButtonState}
                          />
                        ))}
                    </ul>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

interface RIProps {
  user: SmallUser;
  handleClick: (searchTerm: string) => void;
  buttonState: "loading" | "success" | "error" | undefined;
  updateButtonState: (clerkId: string, state: "loading" | "success" | "error") => void;
}

// TODO: The button does not keep state if a person is filtered out. IE A "Requested" button turns back to Request if they get filtered out
function RecentItem({ user, handleClick, buttonState, updateButtonState }: RIProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const { mutate: addFriend } = trpc.addFriend.useMutation({
    onSuccess: (data) => {
      // utils.getFriendsBooks.invalidate();
      customToast("Friend Requested!", "success");
      updateButtonState(user.clerkId, "success");
    },
    onError: (error) => {
      customToast("Error requesting friend.", "error");
      console.error("🚀 ~ file: page.tsx:220 ~ onError: ~ error", error);
      updateButtonState(user.clerkId, "error");
    },
  });

  const buttonColor =
    buttonState === "success" ? "primary" : buttonState === "error" ? "danger" : "secondary";
  const buttonText =
    buttonState === "success" ? "Requested" : buttonState === "error" ? "Failed" : "Request";
  const buttonIcon =
    buttonState === "loading" ? undefined : buttonState === "success" ? (
      <Check className="text-white" />
    ) : buttonState === "error" ? (
      <X className="text-white" />
    ) : (
      <UserPlus2 className="text-white" />
    );

  const handleRequest = () => {
    updateButtonState(user.clerkId, "loading");
    addFriend({
      requestingClerkId: "ckl1",
      friendToAddClerkId: user.clerkId,
      successString: "Friend Requested!",
    });
  };

  return (
    <li className="bg-background-card flex rounded-md p-2 justify-between">
      <User
        name={user.displayName}
        avatarProps={{
          src: user.avatarUrl,
        }}
      />
      <div className="flex items-center">
        <Button
          isDisabled={buttonState === "error" || buttonState === "success"}
          isLoading={buttonState === "loading"}
          startContent={buttonIcon}
          color={buttonColor}
          size="sm"
          onPress={handleRequest}
          title="Click to request friendship">
          {buttonText}
        </Button>
      </div>
    </li>
  );
}

function SearchKbd({ handleClick }: { handleClick: () => void }) {
  return (
    <Kbd
      className="hidden md:inline-block bg-secondary text-white cursor-pointer"
      onClick={handleClick}
      keys={["command"]}>
      K
    </Kbd>
  );
}

export default FriendsSearchbar;
