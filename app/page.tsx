import AddAccountSheet from "@/components/add-account-sheet";
import CenterWrapper from "@/components/center-wrapper";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import OverviewChart from "@/components/overview-chart";
import RecentAccountsCard from "@/components/recent-accounts-card";
import SummaryCard from "@/components/summary-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { Account, accounts as dbAccounts } from "@/lib/db/schema";

const RootPage = async () => {
  const accounts = (await db.select().from(dbAccounts)).reverse();

  const totalIncomes = accounts.reduce(
    (prev, current) =>
      current.type === "income" ? prev + Number(current.amount) : prev,
    0
  );
  const totalExpenses = accounts.reduce(
    (prev, current) =>
      current.type === "expense" ? prev + Number(current.amount) : prev,
    0
  );

  const highestIncome = accounts.reduce(
    (prev, current) =>
      current.type === "income"
        ? prev.amount > current.amount
          ? prev
          : current
        : prev,
    {} as Account
  );

  const highestExpense = accounts.reduce(
    (prev, current) =>
      current.type === "expense"
        ? prev.amount > current.amount
          ? prev
          : current
        : prev,
    {} as Account
  );

  const summaryCardsData = [
    { title: "Total Expenses", amount: totalExpenses, description: "" },
    {
      title: "Largest Spending",
      amount: Number(highestExpense.amount),
      description: highestExpense.category,
    },
    { title: "Total Incomes", amount: totalIncomes, description: "" },
    {
      title: "Largest Income",
      amount: Number(highestIncome.amount),
      description: highestIncome.category,
    },
  ];

  return (
    <CenterWrapper>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full flex items-center justify-between">
          <h3 className="text-3xl font-bold">Dashboard</h3>
          <div className="flex gap-4">
            <CalendarDateRangePicker />
            <AddAccountSheet />
          </div>
        </div>
        {summaryCardsData.map((cardData) => (
          <SummaryCard key={cardData.title} {...cardData} />
        ))}
        <Card className="col-span-7 max-h-[430px]">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
        <RecentAccountsCard accounts={accounts.slice(0, 5)} />
      </div>
    </CenterWrapper>
  );
};

export default RootPage;
