import CenterWrapper from "@/components/center-wrapper";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import OverviewChart from "@/components/overview-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { incomeExpenseData } from "@/lib/mock/data";
import { DollarSign, PiggyBank } from "lucide-react";
import { Fragment } from "react";

const RootPage = async () => {
  return (
    <CenterWrapper>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full flex items-center justify-between">
          <h3 className="text-3xl font-bold">Dashboard</h3>
          <div className="flex gap-4">
            <CalendarDateRangePicker />
            <Button>New Income/Expense</Button>
          </div>
        </div>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              <span className="text-sm">Total Expenses</span>
            </CardTitle>
            <CardContent className="p-0">
              <p className="font-bold text-2xl">
                {Intl.NumberFormat("en-US", {
                  currency: "PHP",
                  style: "currency",
                }).format(100000)}
              </p>
            </CardContent>
            <CardFooter className="p-0 text-sm text-slate-500">
              -20% this month.
            </CardFooter>
          </CardHeader>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              <span className="text-sm">Largest Spending</span>
            </CardTitle>
            <CardContent className="p-0">
              <p className="font-bold text-2xl">
                {Intl.NumberFormat("en-US", {
                  currency: "PHP",
                  style: "currency",
                }).format(100000)}
              </p>
            </CardContent>
            <CardFooter className="p-0 text-sm text-slate-500">
              Shopping Clothes
            </CardFooter>
          </CardHeader>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              <span className="text-sm">Total Incomes</span>
            </CardTitle>
            <CardContent className="p-0">
              <p className="font-bold text-2xl">
                {Intl.NumberFormat("en-US", {
                  currency: "PHP",
                  style: "currency",
                }).format(100000)}
              </p>
            </CardContent>
            <CardFooter className="p-0 text-sm text-slate-500">
              +30% this month.
            </CardFooter>
          </CardHeader>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              <span className="text-sm">Largest Income</span>
            </CardTitle>
            <CardContent className="p-0">
              <p className="font-bold text-2xl">
                {Intl.NumberFormat("en-US", {
                  currency: "PHP",
                  style: "currency",
                }).format(100000)}
              </p>
            </CardContent>
            <CardFooter className="p-0 text-sm text-slate-500">
              Lazhopee
            </CardFooter>
          </CardHeader>
        </Card>
        <Card className="col-span-7 max-h-[430px]">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
        <Card className="col-span-5 max-h-[430px]">
          <CardHeader>
            <CardTitle>Recent Incomes and Expenses</CardTitle>
            <CardDescription>
              List of your recent incomes and expenses this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {incomeExpenseData.map((data) => {
              return (
                <Fragment key={data.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-200 rounded-full w-10 max-h-10 aspect-square flex justify-center items-center">
                        {data.type === "income" ? (
                          <PiggyBank className="w-5 h-5" />
                        ) : (
                          <DollarSign className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{data.category}</p>
                        <span className="text-xs text-slate-500 capitalize">
                          {data.type}
                        </span>
                      </div>
                    </div>
                    <p className="font-medium text-lg">
                      {data.type === "income" ? (
                        <>
                          +
                          {Intl.NumberFormat("en-US", {
                            currency: "PHP",
                            style: "currency",
                          }).format(data.amount)}
                        </>
                      ) : (
                        <>
                          -
                          {Intl.NumberFormat("en-US", {
                            currency: "PHP",
                            style: "currency",
                          }).format(data.amount)}
                        </>
                      )}
                    </p>
                  </div>
                </Fragment>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </CenterWrapper>
  );
};

export default RootPage;
