import { Account } from "../db/schema";

export const incomeExpenseData: Account[] = [
  {
    id: 1,
    category: "Salary",
    date: new Date("2023-07-01"),
    amount: "1000",
    userId: "1",
    type: "income",
  },
  {
    id: 2,
    category: "Rent",
    date: new Date("2023-07-05"),
    amount: "500",
    userId: "1",
    type: "expense",
  },
  {
    id: 3,
    category: "Groceries",
    date: new Date("2023-07-10"),
    amount: "200",
    userId: "1",
    type: "expense",
  },
  {
    id: 4,
    category: "Gas",
    date: new Date("2023-07-15"),
    amount: "100",
    userId: "1",
    type: "expense",
  },
  {
    id: 5,
    category: "Savings",
    date: new Date("2023-07-20"),
    amount: "500",
    userId: "1",
    type: "income",
  },
];
