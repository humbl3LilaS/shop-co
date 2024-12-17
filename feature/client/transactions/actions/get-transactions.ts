"use server"
import {db} from "@/database/drizzle";
import {transactions} from "@/database/schema";
import {auth} from "@/auth";
import {eq} from "drizzle-orm";

export const getTransactions = async () => {
    try {
        const session = await auth();

        if (!session) {
            return undefined;
        }
        const res = await db.select().from(transactions).where(eq(transactions.customerId, session.user.id));
        if (!res) {
            return undefined;
        }
        return res;
    } catch (error) {
        console.log(error)
    }
}

export type ITransaction = NonNullable<Awaited<ReturnType<typeof getTransactions>>>[number];

