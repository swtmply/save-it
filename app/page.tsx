import { getUserAccountByDay, getUserAccounts } from "@/actions/account";
import AddAccountSheet from "@/components/add-account-sheet";
import CenterWrapper from "@/components/center-wrapper";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import OverviewChart from "@/components/overview-chart";
import SummaryCards from "@/components/summary-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccountList, AccountListItem } from "../components/account-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { getDaysInMonth } from "date-fns";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const RootPage = async () => {
  const accounts = await getUserAccounts();
  const dayAccounts = accounts.filter(
    (account) =>
      Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        account.date
      ) ===
      Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date())
  );

  return (
    <CenterWrapper>
      <div className="grid lg:grid-cols-12 grid-cols-4 gap-4">
        <div className="col-span-full flex items-center justify-between">
          <h3 className="text-3xl font-bold">Dashboard</h3>
          <div className="flex gap-4 items-center">
            <CalendarDateRangePicker />
            <AddAccountSheet />
          </div>
        </div>
        <div className="hidden lg:col-span-full gap-4 lg:grid lg:grid-cols-12">
          <SummaryCards accounts={accounts} />
        </div>
        <Card className="lg:col-span-7 col-span-5 lg:max-h-[450px] min-h-[450px]">
          <Tabs defaultValue="day">
            <CardHeader className="lg:flex-row gap-2 justify-between">
              <CardTitle>Overview</CardTitle>
              <TabsList className="grid w-[300px] grid-cols-3 !m-0">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="year">
                <OverviewChart
                  type="year"
                  data={months.map((month) => ({
                    name: month.slice(0, 3),
                    // TODO get expense income for the month
                    expense: Math.floor(Math.random() * 50000) + 10000,
                    income: Math.floor(Math.random() * 50000) + 10000,
                  }))}
                />
              </TabsContent>
              <TabsContent value="month">
                <OverviewChart
                  type="month"
                  data={[...new Array(getDaysInMonth(new Date())).keys()].map(
                    (day) => ({
                      date: day + 1,
                      expense: Math.floor(Math.random() * 50000) + 10000,
                      income: Math.floor(Math.random() * 50000) + 10000,
                    })
                  )}
                />
              </TabsContent>
              <TabsContent value="day">
                <OverviewChart
                  type="day"
                  data={dayAccounts.map((account) => ({
                    accountType: account.type,
                    value: Number(account.amount),
                  }))}
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <Card className="col-span-5 lg:max-h-[450px] min-h-[450px] mb-16 lg:mb-0">
          <CardHeader>
            <CardTitle>Recent Incomes and Expenses</CardTitle>
            <CardDescription>
              List of your recent incomes and expenses this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountList>
              {accounts.slice(0, 5).map((account) => {
                return <AccountListItem key={account.id} account={account} />;
              })}
            </AccountList>
            <Link href="/accounts" className="flex justify-center p-2">
              <p className="text-sm text-blue-500 hover:underline">
                See more...
              </p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </CenterWrapper>
  );
};

export default RootPage;
