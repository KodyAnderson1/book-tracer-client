import { trpc } from "@/app/_trpc/client";
import { customToast } from "@/lib/client/utils";
import { Button } from "@nextui-org/button";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { AlertTriangle, BellIcon, Check, Loader2, Trash2 } from "lucide-react";
import React from "react";

const MOCK_NOTIFICATIONS = [
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
];

const ManageFriends = () => {
  const utils = trpc.useContext();
  const { data: allPendingFriends, isLoading } = trpc.getPendingFriendsRequests.useQuery(
    undefined,
    {
      retryDelay: 1000 * 60 * 5,
      refetchOnWindowFocus: false, // default: true
    }
  );

  const { mutate: updateFriendRequest } = trpc.updateFriendRequest.useMutation({
    onSuccess: (data) => {
      utils.getFriendsBooks.invalidate();
      utils.getPendingFriendsRequests.invalidate();
      customToast("Friend Updated!", "success");
    },
    onError: (error) => {
      customToast("Error updating friend status.", "error");
      console.error("🚀 ~ file: page.tsx:220 ~ onError: ~ error", error);
    },
  });

  const handleSubmit = (
    action: "CONFIRMED" | "PENDING" | "BLOCKED" | "DECLINED",
    friendId: string
  ) => {
    console.log(action, friendId);

    updateFriendRequest({
      clerkId: "ckl1",
      friendId,
      status: action,
    });
  };

  // const isLoading = true;

  if (!allPendingFriends) {
    return null;
  }

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  return (
    <Dropdown placement="bottom-end">
      <Badge color="danger" content={allPendingFriends.length} shape="circle" className="mt-2 mr-2">
        <DropdownTrigger>
          <BellIcon className="fill-current mt-2  mr-2" size={25} />
        </DropdownTrigger>
      </Badge>
      <DropdownMenu aria-label="Profile Actions" variant="flat" closeOnSelect={false}>
        <DropdownSection title="Friend Requests">
          {allPendingFriends.map((notification) => (
            <DropdownItem key={notification.clerkId} showDivider>
              <div className="w-[20rem]">
                <div className="gap-4">
                  <User
                    name={notification.displayName}
                    avatarProps={{ src: notification.avatarUrl }}
                  />
                </div>
                <div className="flex justify-between w-full gap-2 mt-2">
                  <Button
                    onPress={() => handleSubmit("CONFIRMED", notification.clerkId)}
                    startContent={<Check />}
                    size="sm"
                    color="primary"
                    fullWidth>
                    Confirm
                  </Button>

                  <Button
                    onPress={() => handleSubmit("DECLINED", notification.clerkId)}
                    startContent={<Trash2 />}
                    size="sm"
                    color="warning"
                    fullWidth>
                    Decline
                  </Button>
                  <Button
                    onPress={() => handleSubmit("BLOCKED", notification.clerkId)}
                    startContent={<AlertTriangle />}
                    size="sm"
                    color="danger"
                    fullWidth>
                    Block
                  </Button>
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

interface NIProps {
  displayName: string;
  clerkId: string;
  avatarUrl: string;
}

// const NotificationItem = ({ displayName, clerkId, avatarUrl }: NIProps) => {
//   return (

//   );
// };

export default ManageFriends;
