"use server";
import { db } from "@/database/drizzle";
import { orders, transactions } from "@/database/schema";
import { unstable_cache } from "next/cache";

export const getSalesInfo = unstable_cache(
    async () => {
        try {
            const res = await db.select().from(transactions);
            const completedOrders = res.filter(
                (item) => item.status === "delivered" || item.status === "on-the-way"
            ).length;
            const totalRevenue = res.reduce((acc, item) => acc + item.amount, 0);
            const totalOrders = await db.select().from(orders);
            const sales = totalOrders.reduce((acc, item) => acc + item.quantity, 0);
            if (!res) {
                return undefined;
            }

            return { completedOrders, totalRevenue, sales };
        } catch (error) {
            console.log(error);
            return undefined;
        }
    },
    ["sales-info"],
    { revalidate: 3600, tags: ["sales-info"] }
);
