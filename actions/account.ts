"use server";

import { AddAccountFormType } from "@/components/forms/add-account-form";
import { db } from "@/lib/db";
import { accounts } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function addAccountAction(input: AddAccountFormType) {
  const user = await currentUser();

  await db.insert(accounts).values({ ...input, userId: user?.id! });

  revalidatePath("/");
}
