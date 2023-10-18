import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Divider, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  setNavbarMenuChange: (e: boolean) => void;
  navbarMenuChange: boolean;
  recentSearches: string[];

  setSearches: (searchTerm: string) => void;
}

const Searchbar = ({ setNavbarMenuChange, recentSearches, setSearches }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const handleSearchChange = (e: string) => {
    setSearchQuery(e);
  };

  const handleClick = (searchTerm: string) => {
    onOpenChange();
    setSearches(searchTerm);
    setSearchQuery("");
    setNavbarMenuChange(false);
    router.push(`/books/search?q=${searchTerm}`);
  };

  return (
    <>
      <button
        aria-label="Search Button"
        className="flex flex-col items-center w-full space-y-2 text-gray-300 hover:bg-primary-hover hover:text-white rounded-md p-2"
        onClick={onOpen}>
        <div>
          <SearchIcon />
        </div>
        <div className="text-sm font-medium">Search</div>
      </button>
      {/* <Button
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        aria-label="Search Button"
        className="flex w-full md:w-64 justify-start text-foreground hover:text-foreground-hover focus:outline-none"
        onPress={onOpen}>
        Search...
      </Button> */}
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
                {recentSearches && recentSearches.length > 0 ? (
                  <>
                    <Divider className="mt-2" />
                    <div className="bg-background">
                      <div className="text-sm text-background-foreground">
                        <p className="font-semibold text-md mb-3">Recent</p>
                        <ul className="flex flex-col gap-2 ">
                          {recentSearches.map((title) => (
                            <RecentItem key={title} title={title} handleClick={handleClick} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : undefined}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

interface RIProps {
  title: string;
  handleClick: (searchTerm: string) => void;
}

function RecentItem({ title, handleClick }: RIProps) {
  return (
    <li
      title={`Click to search for ${title}`}
      onClick={() => handleClick(title)}
      className="bg-background-card flex hover:bg-accent rounded-md cursor-pointer p-2 ">
      <SearchIcon className="mr-2 text-base text-default-400 pointer-events-none flex-shrink-0" />
      <span className="text-lg truncate">{title}</span>
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

export default Searchbar;
