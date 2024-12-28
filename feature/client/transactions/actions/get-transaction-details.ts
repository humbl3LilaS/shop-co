"use server";
import { db } from "@/database/drizzle";
import { transactionDetails, transactions } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getTransactionDetails = async (transactionId: string) => {
    try {
        const [details] = await db
            .select({
                region: transactionDetails.region,
                township: transactionDetails.township,
                address: transactionDetails.address,
                postalCode: transactionDetails.postalCode,
                phoneNumber: transactionDetails.phoneNumber,
                deliveryMethod: transactionDetails.deliveryMethod,
                transactionMethod: transactionDetails.transactionMethod,
                email: transactionDetails.email,
                createdAt: transactions.createdAt,
                status: transactions.status,
            })
            .from(transactions)
            .innerJoin(transactionDetails, eq(transactionDetails.transactionId, transactions.id))
            .where(eq(transactions.id, transactionId));
        return details;
    } catch (error) {
        console.log("Error fetching transaction Details", error);
    }
};
