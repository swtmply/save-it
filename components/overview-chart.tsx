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
      <BarChart data={data}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₱${value}`}
        />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    month: (
      <LineChart data={data}>
        <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₱${value}`}
        />
        <Legend />
        <Line dataKey="income" stroke="#8884d8" />
        <Line dataKey="expense" stroke="#82ca9d" />
      </LineChart>
    ),
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

  const Chart = Charts[type] ?? null;

  return (
    <ResponsiveContainer width="100%" height={350}>
      {Chart}
    </ResponsiveContainer>
  );
};

export default OverviewChart;
