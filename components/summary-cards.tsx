import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Account } from "@/lib/db/schema";

type SummaryCardProps = {
  title: string;
  description?: string;
  amount: number;
};

const SummaryCards = ({ accounts }: { accounts: Account[] }) => {
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

  return summaryCardsData.map((cardData) => (
    <SummaryCard key={cardData.title} {...cardData} />
  ));
};

const SummaryCard = ({ amount, title, description }: SummaryCardProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          <span className="text-sm">{title}</span>
        </CardTitle>
        <CardContent className="p-0">
          <p className="font-bold text-2xl">
            {Intl.NumberFormat("en-US", {
              currency: "PHP",
              style: "currency",
            }).format(amount || 0)}
          </p>
        </CardContent>
        <CardFooter className="p-0 text-sm text-slate-500">
          {description}
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default SummaryCards;
