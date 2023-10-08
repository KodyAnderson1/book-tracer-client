import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const statisticalData = [
  {
    name: "Books Read",
    value: "10",
  },
  {
    name: "Pages Read",
    value: "1000",
  },
  {
    name: "Something Else",
    value: "100",
  },
  {
    name: "Something Else Again",
    value: "200",
  },
];

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

interface IProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: IProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatisticsCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, seIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const loadData = () => {
    setIsLoading(true);

    // Simulate an API call with a timeout
    setTimeout(() => {
      seIsError(true);
      setIsLoading(false);

      setRetryCount((prevCount) => prevCount + 1);
    }, 2000);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {retryCount < 3 && (
          <>
            <AlertTriangle className="text-warning w-10 h-10 mb-2" />
            <span className="text-warning font-semibold">Failed to load statistics</span>
            <button
              // onClick={handleRetry}
              onClick={loadData}
              className="text-blue-500 cursor-pointer hover:underline">
              Click here to retry
            </button>
          </>
        )}
        {retryCount >= 3 && (
          <>
            <AlertTriangle className="text-danger w-10 h-10 mb-2" />
            <span className="text-danger font-semibold">Failed to load statistics</span>
            <span className="text-danger">Exceeded retry attempts.</span>
          </>
        )}
      </div>
    );
  }

  // return (
  //   <div className="flex flex-col h-full">
  //     <h3 className="font-bold mb-2">Some Statistics...</h3>
  //     <div className="flex-grow">
  //       {statisticalData.map((stat, i) => (
  //         <React.Fragment key={i}>
  //           <div className="pt-2">
  //             <div className="flex justify-between font-semibold">
  //               <div>{stat.name}</div>
  //               <span className="text-background-foreground">{stat.value}</span>
  //             </div>
  //           </div>
  //           {i < statisticalData.length - 1 && <Separator className="mt-2" />}
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatisticsCard;
