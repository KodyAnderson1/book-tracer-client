import React from "react";

interface Props {
  name: string;
  level: string;
  dateRecieved: string;
}

const AchievementCard = ({ name, level, dateRecieved }: Props) => {
  return (
    <div className="pt-2">
      <div className="flex justify-between">
        <h3 className="font-bold text-md text-background-foreground">{name}</h3>
        <div className="text-xs">
          <span className="font-semibold">{dateRecieved}</span>
        </div>
      </div>
      <p className="text-sm text-opacity-80 text-background-foreground font-medium">
        Level {level}
      </p>
    </div>
  );
};

export default AchievementCard;
