"use server";

import { AddAccountFormType } from "@/components/forms/add-account-form";
import { db } from "@/lib/db";
import { accounts } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs";
import { and, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addAccountAction(input: AddAccountFormType) {
  const user = await currentUser();

  await db.insert(accounts).values({ ...input, userId: user?.id! });

  revalidatePath("/");
}

export async function getUserAccounts() {
  const user = await currentUser();
  const userAcounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, user?.id!))
    .orderBy(desc(accounts.date));

  return userAcounts;
}

export async function getUserMonthAccountsTotal() {
  const user = await currentUser();
  const userAcounts = await db
    .select({
      amount: sql<number>`sum(${accounts.amount})`,
      date: accounts.date,
      type: accounts.type,
    })
    .from(accounts)
    .where(eq(accounts.userId, user?.id!))
    .groupBy(accounts.date, accounts.type)
    .orderBy(desc(accounts.date));

  return userAcounts;
}
