import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account } from "@/lib/db/schema";
import { DollarSign, PiggyBank } from "lucide-react";
import { Fragment } from "react";

type RecentAccountsCardProps = {
  accounts: Account[];
};

const RecentAccountsCard = ({ accounts }: RecentAccountsCardProps) => {
  return (
    <Card className="col-span-5 max-h-[430px]">
      <CardHeader>
        <CardTitle>Recent Incomes and Expenses</CardTitle>
        <CardDescription>
          List of your recent incomes and expenses this month.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {accounts.map((account) => {
          return (
            <Fragment key={account.id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-200 rounded-full w-10 max-h-10 aspect-square flex justify-center items-center">
                    {account.type === "income" ? (
                      <PiggyBank className="w-5 h-5" />
                    ) : (
                      <DollarSign className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{account.category}</p>
                    <span className="text-xs text-slate-500 capitalize">
                      {account.type}
                    </span>
                  </div>
                </div>
                <p className="font-medium text-lg">
                  {account.type === "income" ? (
                    <>
                      +
                      {Intl.NumberFormat("en-US", {
                        currency: "PHP",
                        style: "currency",
                      }).format(Number(account.amount))}
                    </>
                  ) : (
                    <>
                      -
                      {Intl.NumberFormat("en-US", {
                        currency: "PHP",
                        style: "currency",
                      }).format(Number(account.amount))}
                    </>
                  )}
                </p>
              </div>
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecentAccountsCard;
