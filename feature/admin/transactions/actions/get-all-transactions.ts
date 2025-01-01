"use server";
import { db } from "@/database/drizzle";
import { transactions, users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getAllTransactions = async () => {
    const res = await db
        .select({
            id: transactions.id,
            userId: users.id,
            userName: users.userName,
            createdAt: transactions.createdAt,
            status: transactions.status,
            amount: transactions.amount,
        })
        .from(transactions)
        .innerJoin(users, eq(users.id, transactions.customerId));

    if (!res) {
        return [];
    }
    return res;
};

export type ITransactionInfo = NonNullable<Awaited<ReturnType<typeof getAllTransactions>>>[number];
