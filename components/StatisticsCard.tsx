import React from "react";

interface Props {
  name: string;
  value: string;
}

const StatisticsCard = ({ name, value }: Props) => {
  return (
    <div className="pt-2">
      <div className="flex justify-between font-semibold">
        <div className="">{name}</div>

        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
};

export default StatisticsCard;
