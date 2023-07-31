import { type InferModel } from "drizzle-orm";
import {
  date,
  decimal,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const accounts = mysqlTable("account", {
  id: serial("id").primaryKey(),
  type: mysqlEnum("type", ["income", "expense"]).notNull().default("income"),
  category: text("category").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  date: date("date").notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
});

export type Account = InferModel<typeof accounts>;
