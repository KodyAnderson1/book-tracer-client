interface Props {
  name: string;
  book: string;
}

const FriendCard = ({ name, book }: Props) => {
  return (
    <div className="pt-2">
      <div className="flex justify-between">
        <h3 className="font-bold text-md text-background-foreground">{name}</h3>
        <div className="text-xs">
          <span className="font-semibold">2 Days Ago</span>
        </div>
      </div>
      <p className="text-sm text-opacity-80 text-background-foreground font-medium overflow-x-auto overflow-hidden">
        {book}
      </p>
    </div>
  );
};

export default FriendCard;
