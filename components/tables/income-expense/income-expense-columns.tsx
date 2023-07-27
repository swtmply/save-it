"use client";

import type { IncomeExpense } from "@/lib/mock/data";
import { ColumnDef } from "@tanstack/react-table";

export const incomeExpenseColumns: ColumnDef<IncomeExpense>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }).format(row.original.date);

      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
