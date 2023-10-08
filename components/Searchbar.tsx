import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Divider, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const recentSearches = [
  "The Hobbit",
  "The Lord of the Rings The Lord of the Rings The Lord of the Rings The Lord of the Rings",
  "The Silmarillion",
];

interface Props {
  setNavbarMenuChange: (e: boolean) => void;
  navbarMenuChange: boolean;
}

const Searchbar = ({ setNavbarMenuChange, navbarMenuChange }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  const handleSearchChange = (e: string) => {
    setSearchQuery(e);
  };

  const handleClick = (searchTerm: string) => {
    onOpenChange();
    setRecentSearches((prev) => {
      const newRecentSearches = prev.filter((item) => item !== searchTerm);
      newRecentSearches.push(searchTerm);

      if (newRecentSearches.length > 5) {
        newRecentSearches.shift();
      }
      return newRecentSearches;
    });
    setSearchQuery("");
    navbarMenuChange && setNavbarMenuChange(false);
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <>
      <Button
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        aria-label="Search Button"
        className="flex w-full md:w-64 justify-start text-foreground hover:text-foreground-hover focus:outline-none"
        onPress={onOpen}>
        Search...
      </Button>
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
