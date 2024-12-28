"use server";
import { db } from "@/database/drizzle";
import { orders, transactionDetails, transactions } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";

export const cancelTransaction = async (transactionId: string) => {
    try {
        const [delDetail] = await db
            .delete(transactionDetails)
            .where(eq(transactionDetails.transactionId, transactionId))
            .returning();
        if (!delDetail) {
            return undefined;
        }
        const [delTransaction] = await db
            .delete(transactions)
            .where(eq(transactions.id, transactionId))
            .returning();
        if (!delTransaction) {
            return undefined;
        }
        const [delOrders] = await db
            .delete(orders)
            .where(inArray(orders.id, delTransaction.orders))
            .returning();
        if (!delOrders) {
            return undefined;
        }
        return delTransaction;
    } catch (error) {
        console.error(error);
    }
};
