import { Account } from "@/lib/db/schema";
import { DollarSign, PiggyBank } from "lucide-react";
import { Fragment, ReactNode } from "react";

type AccountListItemProps = {
  account: Account;
};

export function AccountList(props: { children: ReactNode }) {
  return <div className="flex flex-col gap-6">{props.children}</div>;
}

export function AccountListItem(props: AccountListItemProps) {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-slate-200 rounded-full w-10 max-h-10 aspect-square flex justify-center items-center">
            {props.account.type === "income" ? (
              <PiggyBank className="w-5 h-5" />
            ) : (
              <DollarSign className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{props.account.category}</p>
            <span className="text-xs text-slate-500 capitalize">
              {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                props.account.date
              )}
            </span>
          </div>
        </div>
        <p className="font-medium text-lg">
          {props.account.type === "income" ? (
            <>
              +
              {Intl.NumberFormat("en-US", {
                currency: "PHP",
                style: "currency",
              }).format(Number(props.account.amount))}
            </>
          ) : (
            <>
              -
              {Intl.NumberFormat("en-US", {
                currency: "PHP",
                style: "currency",
              }).format(Number(props.account.amount))}
            </>
          )}
        </p>
      </div>
    </Fragment>
  );
}
