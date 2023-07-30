"use client";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface YearDataType {
  name: string;
  expense: number;
  income: number;
}

interface MonthDataType {
  date: number;
  expense: number;
  income: number;
}

interface DayDataType {
  accountType: "income" | "expense";
  value: number;
}

type DataTypes =
  | ({
      type: "year";
    } & { data: YearDataType[] })
  | ({
      type: "month";
    } & { data: MonthDataType[] })
  | ({ type: "day" } & { data: DayDataType[] });

const OverviewChart = ({ type, data }: DataTypes) => {
  const Charts = {
    year: (
      <div className="flex flex-col justify-center items-center h-full">
        <h3 className="text-lg font-bold">Coming Soon.</h3>
        <p className="text-sm text-slate-500">
          Just want to deploy a working system.
        </p>
      </div>
    ),
    // (
    //     <BarChart data={data}>
    //       <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
    //       <YAxis
    //         fontSize={12}
    //         tickLine={false}
    //         axisLine={false}
    //         tickFormatter={(value) => `₱${value}`}
    //       />
    //       <Legend />
    //       <Bar dataKey="income" fill="#8884d8" radius={[4, 4, 0, 0]} />
    //       <Bar dataKey="expense" fill="#82ca9d" radius={[4, 4, 0, 0]} />
    //     </BarChart>
    //   ),
    month: (
      <div className="flex flex-col justify-center items-center h-full">
        <h3 className="text-lg font-bold">Coming Soon.</h3>
        <p className="text-sm text-slate-500">
          Just want to deploy a working system.
        </p>
      </div>
    ),
    // (
    //   <LineChart data={data}>
    //     <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
    //     <YAxis
    //       fontSize={12}
    //       tickLine={false}
    //       axisLine={false}
    //       tickFormatter={(value) => `₱${value}`}
    //     />
    //     <Legend />
    //     <Line dataKey="income" stroke="#8884d8" />
    //     <Line dataKey="expense" stroke="#82ca9d" />
    //   </LineChart>
    // ),
    day: (
      <PieChart data={data}>
        <Legend
          formatter={(value: string, entry: any) => (
            <span style={{ color: entry.color }}>
              {entry.payload.accountType}
            </span>
          )}
          iconType="circle"
        />
        <Pie data={data} dataKey="value">
          {type === "day" &&
            data.map((account, index) => (
              <Cell
                key={`cell-${index}`}
                fill={account.accountType === "income" ? "#8884d8" : "#82ca9d"}
              />
            ))}
        </Pie>
      </PieChart>
    ),
  };

  const Chart =
    data.length !== 0 ? (
      Charts[type] ?? null
    ) : (
      <div className="flex flex-col justify-center items-center h-full">
        <h3 className="text-lg font-bold">Data is empty</h3>
        <p className="text-sm text-slate-500">No accounts for this {type}.</p>
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height={350}>
      {Chart}
    </ResponsiveContainer>
  );
};

export default OverviewChart;
