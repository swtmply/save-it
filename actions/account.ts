"use server";

import { AddAccountFormType } from "@/components/forms/add-account-form";
import { db } from "@/lib/db";
import { accounts } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs";
import { and, desc, eq } from "drizzle-orm";
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

export async function getUserAccountByDay(date: Date) {
  const user = await currentUser();
  const userAcounts = await db
    .select()
    .from(accounts)
    .where(and(eq(accounts.userId, user?.id!), eq(accounts.date, date)))
    .orderBy(desc(accounts.date));

  return userAcounts;
}
